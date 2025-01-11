// State.rs
// Necessary crates
use sails_rs::{
    prelude::*,
};

// Static mutable variable (contract's state)
pub static mut STATE: Option<State> = None;

// Create a struct for the state
#[derive(Clone, Default)]
pub struct State {
    pub lenders: Vec<Lender>,
    pub gold_category: Vec<Borrower>,
    pub silver_category: Vec<Borrower>,
    pub bronze_category: Vec<Borrower>,
}

#[derive(Encode, Decode, TypeInfo,Clone)]
#[codec(crate = sails_rs::scale_codec)]
#[scale_info(crate = sails_rs::scale_info)]
pub struct Lender {
    pub amount_available: u64,
}

#[derive(Encode, Decode, TypeInfo, Clone)]
#[codec(crate = sails_rs::scale_codec)]
#[scale_info(crate = sails_rs::scale_info)]
pub struct Borrower {
    pub requested_amount: u64,
}

// Impl to set methods or related functions
impl State {
    // Method to create a new instance 
    pub fn new() -> Self {
        Self{..Default::default()}
    }
    
    // Related function to init the state
    pub fn init_state() {
        unsafe {
            STATE = Some(Self::new());
        };
    }

    // Related function to get the state as mut
    pub fn state_mut() -> &'static mut State {
        let state = unsafe { STATE.as_mut() };
        debug_assert!(state.is_some(), "The state is not initialized");
        unsafe { state.unwrap_unchecked() }
    }

    // Related function to get the state as ref
    pub fn state_ref() -> &'static State {
        let state = unsafe { STATE.as_ref() };
        debug_assert!(state.is_some(), "The state is not initialized");
        unsafe { state.unwrap_unchecked() }
    }
    
    // Add a lender
    pub fn add_lender(&mut self, amount_available: u64) {
        let lender = Lender {
            amount_available,
        };
        self.lenders.push(lender);
    }

    // Add a borrower
    pub fn add_borrower(&mut self, requested_amount: u64, category: String) {
        let borrower = Borrower {
            requested_amount,
        };
        match category {
            val if val == "gold".to_string() => self.gold_category.push(borrower),
            val if val == "silver".to_string() => self.silver_category.push(borrower),
            val if val == "bronze".to_string() => self.bronze_category.push(borrower),
            _ => {},
        }
    }

    // Get average amounts requested per category
    pub fn average_requested_amount(&self, category: String) -> Option<u64> {
        let category_vec = match category {
            val if val == "gold".to_string() => &self.gold_category,
            val if val == "silver".to_string() => &self.silver_category,
            val if val == "bronze".to_string() => &self.bronze_category,
            _ => return None,
        };
        if category_vec.is_empty() {
            return None;
        }
        let total: u64 = category_vec.iter().map(|b| b.requested_amount).sum();
        Some(total / category_vec.len() as u64)
    }
}

// Create a struct for an IO state
#[derive(Encode, Decode, TypeInfo)]
#[codec(crate = sails_rs::scale_codec)]
#[scale_info(crate = sails_rs::scale_info)]
pub struct IoState {
    pub lenders: Vec<Lender>,
    pub gold_borrowers: Vec<Borrower>,
    pub silver_borrowers: Vec<Borrower>,
    pub bronze_borrowers: Vec<Borrower>,
    pub gold_avg: Option<u64>,
    pub silver_avg: Option<u64>,
    pub bronze_avg: Option<u64>,
}

impl From<State> for IoState {
    fn from(state: State) -> Self {
        let gold_avg = state.average_requested_amount("gold".to_string());
        let silver_avg = state.average_requested_amount("silver".to_string());
        let bronze_avg = state.average_requested_amount("bronze".to_string());
        Self {
            lenders: state.lenders,
            gold_borrowers: state.gold_category,
            silver_borrowers: state.silver_category,
            bronze_borrowers: state.bronze_category,
            gold_avg,
            silver_avg,
            bronze_avg,
        }
    }
}