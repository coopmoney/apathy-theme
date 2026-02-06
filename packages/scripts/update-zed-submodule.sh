#!/usr/bin/env bash
set -euo pipefail

# This script clones coopmoney/zed-extensions, finds the submodule
# that references this repo (by matching "apathy-theme"), updates it
# to point at the current release's tag or commit, commits, pushes a
# branch and opens a PR.

REPO="coopmoney/zed-extensions"
TMPDIR=$(mktemp -d)

echo "Determining source ref (tag or commit) from current repo..."
# Capture source refs before changing directories
SRC_TOPLEVEL=$(git rev-parse --show-toplevel 2>/dev/null || echo "")
if [ -z "$SRC_TOPLEVEL" ]; then
  echo "Not in a git repository. Exiting."
  exit 1
fi

SRC_COMMIT=$(git -C "$SRC_TOPLEVEL" rev-parse --verify HEAD)
SRC_TAG=$(git -C "$SRC_TOPLEVEL" describe --tags --exact-match HEAD 2>/dev/null || true)
if [ -n "$SRC_TAG" ]; then
  REF="$SRC_TAG"
else
  REF="$SRC_COMMIT"
fi

echo "Using ref: $REF"

echo "Cloning ${REPO} into ${TMPDIR}..."
if [ -n "${GITHUB_TOKEN-}" ]; then
  git clone "https://x-access-token:${GITHUB_TOKEN}@github.com/${REPO}.git" "$TMPDIR"
else
  git clone "git@github.com:${REPO}.git" "$TMPDIR"
fi

cd "$TMPDIR"
BRANCH="update/apathy-theme-${REF//[^a-zA-Z0-9._-]/_}"
git checkout -b "$BRANCH"

echo "Searching .gitmodules for a submodule referencing 'apathy-theme'..."
submodule_key=$(git config -f .gitmodules --get-regexp 'submodule\..*\.url' | awk '/apathy-theme/{print $1; exit}' || true)
if [ -z "$submodule_key" ]; then
  echo "No submodule url containing 'apathy-theme' found in .gitmodules"
  exit 1
fi
submodule_name=$(echo "$submodule_key" | sed -E 's/submodule\.(.*)\.url/\1/')
submodule_path=$(git config -f .gitmodules --get "submodule.${submodule_name}.path")
if [ -z "$submodule_path" ]; then
  echo "Could not determine path for submodule ${submodule_name}"
  exit 1
fi

echo "Found submodule: ${submodule_name} at path: ${submodule_path}"
git submodule init "$submodule_path" || true
git submodule update --init --recursive "$submodule_path" || true

echo "Updating submodule to ref ${REF}..."
pushd "$submodule_path" >/dev/null
git fetch origin --tags || true
if git rev-parse --verify "$REF" >/dev/null 2>&1; then
  git checkout "$REF"
else
  # try fetching tags/branches then checkout
  git fetch --all || true
  git checkout "$REF" || { echo "Failed to checkout ${REF} in submodule"; exit 1; }
fi
popd >/dev/null

git add "$submodule_path"
if git commit -m "chore(submodule): update apathy-theme to ${REF}"; then
  echo "Committed submodule update"
else
  echo "No submodule changes to commit"
  exit 0
fi

echo "Pushing branch ${BRANCH}..."
if [ -n "${GITHUB_TOKEN-}" ]; then
  git push "https://x-access-token:${GITHUB_TOKEN}@github.com/${REPO}.git" "$BRANCH"
else
  git push --set-upstream origin "$BRANCH"
fi

PR_TITLE="chore: update apathy-theme submodule to ${REF}"
PR_BODY="Automated update of the apathy-theme submodule to ${REF}."

if command -v gh >/dev/null 2>&1; then
  echo "Creating PR using gh..."
  gh pr create --repo "${REPO}" --title "$PR_TITLE" --body "$PR_BODY" --base main --head "$BRANCH"
else
  echo "gh CLI not found; attempting GitHub API PR creation"
  if [ -z "${GITHUB_TOKEN-}" ]; then
    echo "GITHUB_TOKEN not set; cannot create PR. Branch pushed: ${BRANCH}"
    exit 0
  fi
  if ! command -v jq >/dev/null 2>&1; then
    echo "jq not found; installing or run manually to create PR. Branch pushed: ${BRANCH}"
    exit 0
  fi
  data=$(jq -n --arg title "$PR_TITLE" --arg head "$BRANCH" --arg base "main" --arg body "$PR_BODY" '{title: $title, head: $head, base: $base, body: $body}')
  resp=$(curl -s -X POST -H "Authorization: token ${GITHUB_TOKEN}" -H "Content-Type: application/json" -d "$data" "https://api.github.com/repos/${REPO}/pulls")
  echo "$resp" | jq -r '.html_url'
fi

echo "Update script finished."
