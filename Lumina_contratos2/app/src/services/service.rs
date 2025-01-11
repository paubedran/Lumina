// service.rs
// necessary crates
use sails_rs::{
    prelude::*,
    gstd::msg,
};

// import the state
use crate::states::*;
use crate::services::service::state::*;

#[derive(Default)]
pub struct Service;

// Impl for seed related function to init the state
impl Service {
    // Related function to init the service state (call only once)
    pub fn seed() {
        State::init_state();
    }
}

#[service]
impl Service {
    // Service constructor
    pub fn new() -> Self {
        Self
    }

    // Method to allow lenders to add funds
    pub fn add_funds(&mut self, amount: u64) -> Events {
        // Add validations
        if amount == 0 {
            return Events::Error("Amount must be greater than zero".to_string());
        }

        // Update state
        State::state_mut().add_lender(amount);

        // Success event
        Events::FundsAdded
    }

    // Method to calculate potential borrowers
    pub fn calculate_borrowers(&mut self) -> Events {
        // Logic to match lenders with borrowers based on categories
        // ...
        
        // Success event
        Events::BorrowersCalculated
    }

    // Method to distribute funds to categories
    pub fn distribute_funds(&mut self, amount: u64, category: String) -> Events {
        // Add validations
        if amount == 0 {
            return Events::Error("Amount must be greater than zero".to_string());
        }
        
        // Logic for distributing funds
        // Update the state by distributing amount in the specified category
        
        // Change State

        // Success event
        Events::FundsDistributed
    }

    // Returns a struct as a response to the user with state info
    pub fn query(&self) -> IoState {
        State::state_ref()
            .to_owned()
            .into()
    }

    // Query to get all lenders
    pub fn get_lenders(&self) -> Vec<Lender> {
        State::state_ref().lenders.clone()
    }

    // Query to get average requested amount per category
    pub fn get_avg_amount(&self, category: String) -> Option<u64> {
        State::state_ref().average_requested_amount(category)
    }

    // Query to get borrowers in specified category
    pub fn get_borrowers_by_category(&self, category: String) -> Vec<Borrower> {
        match category {
            val if val == "gold".to_string() => State::state_ref().gold_category.clone(),
            val if val == "silver".to_string() => State::state_ref().silver_category.clone(),
            val if val == "bronze".to_string() => State::state_ref().bronze_category.clone(),
            _ => vec![],
        }
    }
}

// Struct to use as a response to the user
#[derive(Encode, Decode, TypeInfo)]
#[codec(crate = sails_rs::scale_codec)]
#[scale_info(crate = sails_rs::scale_info)]
pub enum Events {
    FundsAdded,
    BorrowersCalculated,
    FundsDistributed,
    Error(String),
}
