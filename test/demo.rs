/// Rust Semantic Token Demonstration
/// Showcases semantic highlighting for Rust code

use std::collections::HashMap;
use std::fmt::{self, Display};

// Enums with data
#[derive(Debug, Clone, PartialEq)]
pub enum UserRole {
    Admin { permissions: Vec<String> },
    Moderator { level: u8 },
    User,
    Guest,
}

// Structs
#[derive(Debug, Clone)]
pub struct User {
    id: u64,
    name: String,
    email: String,
    role: UserRole,
    active: bool,
}

#[derive(Debug)]
pub struct UserManager {
    users: HashMap<u64, User>,
    next_id: u64,
}

// Trait definitions
pub trait Authenticable {
    fn authenticate(&self, password: &str) -> bool;
    fn has_permission(&self, permission: &str) -> bool;
}

pub trait Validator {
    fn validate(&self) -> Result<(), ValidationError>;
}

// Custom error type
#[derive(Debug)]
pub enum ValidationError {
    EmptyName,
    InvalidEmail,
    UnknownError(String),
}

impl Display for ValidationError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            ValidationError::EmptyName => write!(f, "Name cannot be empty"),
            ValidationError::InvalidEmail => write!(f, "Invalid email format"),
            ValidationError::UnknownError(msg) => write!(f, "Error: {}", msg),
        }
    }
}

impl std::error::Error for ValidationError {}

// Implementation blocks
impl User {
    pub fn new(name: String, email: String, role: UserRole) -> Self {
        Self {
            id: 0,
            name,
            email,
            role,
            active: true,
        }
    }

    pub fn is_admin(&self) -> bool {
        matches!(self.role, UserRole::Admin { .. })
    }

    pub fn deactivate(&mut self) {
        self.active = false;
    }

    fn validate_email(email: &str) -> bool {
        email.contains('@') && email.contains('.')
    }
}

impl Validator for User {
    fn validate(&self) -> Result<(), ValidationError> {
        if self.name.is_empty() {
            return Err(ValidationError::EmptyName);
        }
        if !Self::validate_email(&self.email) {
            return Err(ValidationError::InvalidEmail);
        }
        Ok(())
    }
}

impl Display for User {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "User(id={}, name={}, role={:?})", self.id, self.name, self.role)
    }
}

impl UserManager {
    pub fn new() -> Self {
        Self {
            users: HashMap::new(),
            next_id: 1,
        }
    }

    pub fn add_user(&mut self, mut user: User) -> u64 {
        let id = self.next_id;
        user.id = id;
        self.users.insert(id, user);
        self.next_id += 1;
        id
    }

    pub fn get_user(&self, id: u64) -> Option<&User> {
        self.users.get(&id)
    }

    pub fn get_user_mut(&mut self, id: u64) -> Option<&mut User> {
        self.users.get_mut(&id)
    }

    pub fn remove_user(&mut self, id: u64) -> Option<User> {
        self.users.remove(&id)
    }

    pub fn find_by_name(&self, name: &str) -> Vec<&User> {
        self.users
            .values()
            .filter(|user| user.name == name)
            .collect()
    }

    pub fn active_users(&self) -> impl Iterator<Item = &User> {
        self.users.values().filter(|user| user.active)
    }
}

impl Default for UserManager {
    fn default() -> Self {
        Self::new()
    }
}

// Generic functions
pub fn find_by_id<'a, T>(items: &'a [T], predicate: impl Fn(&T) -> bool) -> Option<&'a T> {
    items.iter().find(|item| predicate(item))
}

pub fn map_collection<T, U, F>(items: Vec<T>, mapper: F) -> Vec<U>
where
    F: Fn(T) -> U,
{
    items.into_iter().map(mapper).collect()
}

// Macros
macro_rules! create_user {
    ($name:expr, $email:expr) => {
        User::new($name.to_string(), $email.to_string(), UserRole::User)
    };
    ($name:expr, $email:expr, $role:expr) => {
        User::new($name.to_string(), $email.to_string(), $role)
    };
}

// Constants and statics
const MAX_USERS: usize = 1000;
const DEFAULT_ROLE: UserRole = UserRole::User;
static mut GLOBAL_COUNT: u64 = 0;

// Associated functions and methods demonstration
pub mod utils {
    use super::*;

    pub fn is_valid_username(username: &str) -> bool {
        username.len() >= 3 && username.chars().all(|c| c.is_alphanumeric() || c == '_')
    }

    pub fn format_user_info(user: &User) -> String {
        format!("{} <{}>", user.name, user.email)
    }
}

// Main function with various patterns
fn main() {
    let mut manager = UserManager::new();

    // Creating users with different patterns
    let admin = create_user!("Alice", "alice@example.com", UserRole::Admin {
        permissions: vec!["read".to_string(), "write".to_string(), "delete".to_string()]
    });

    let moderator = User::new(
        "Bob".to_string(),
        "bob@example.com",
        UserRole::Moderator { level: 5 },
    );

    let regular_user = create_user!("Charlie", "charlie@example.com");

    // Adding users
    let admin_id = manager.add_user(admin);
    let mod_id = manager.add_user(moderator);
    let user_id = manager.add_user(regular_user);

    // Pattern matching
    if let Some(user) = manager.get_user(admin_id) {
        match &user.role {
            UserRole::Admin { permissions } => {
                println!("Admin with {} permissions", permissions.len());
            }
            UserRole::Moderator { level } => {
                println!("Moderator level {}", level);
            }
            UserRole::User => println!("Regular user"),
            UserRole::Guest => println!("Guest user"),
        }
    }

    // Iterators and closures
    let active_count = manager.active_users().count();
    println!("Active users: {}", active_count);

    let names: Vec<String> = manager
        .active_users()
        .map(|u| u.name.clone())
        .collect();

    // Error handling
    let test_user = User::new("".to_string(), "test@example.com".to_string(), UserRole::User);
    match test_user.validate() {
        Ok(_) => println!("User is valid"),
        Err(e) => eprintln!("Validation error: {}", e),
    }

    // Lifetime and borrowing examples
    let user_ref = manager.get_user(user_id);
    if let Some(u) = user_ref {
        println!("Found user: {}", u);
    }

    // Mutable borrowing
    if let Some(user) = manager.get_user_mut(mod_id) {
        user.deactivate();
    }

    // Using utility functions
    let valid = utils::is_valid_username("test_user_123");
    println!("Username valid: {}", valid);
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_user_creation() {
        let user = User::new("Test".to_string(), "test@example.com".to_string(), UserRole::User);
        assert_eq!(user.name, "Test");
        assert!(user.active);
    }

    #[test]
    fn test_user_manager() {
        let mut manager = UserManager::new();
        let user = create_user!("Alice", "alice@example.com");
        let id = manager.add_user(user);
        assert!(manager.get_user(id).is_some());
    }
}
