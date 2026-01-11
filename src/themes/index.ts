import apathy from "./apathy";
import apatheticOcean from "./apatheticOcean";
import apathyExperimental from "./apathyExperimental";
import minted from "./minted";
import slate from "./slate";
import { ThemeDefinition } from './types';

export const themes: Record<string, ThemeDefinition> = {
  "Apathy": apathy,
  "Apathetic Ocean": apatheticOcean,
  "Apathy Experimental": apathyExperimental,
  "Minted": minted,
  "Slate": slate,
};