#![no_std]

use sails_rs::prelude::*;

pub mod states;
pub mod services;

use services::credit_request_service::CreditRequestService;

pub struct CreditRequestProgram;

#[program]
impl CreditRequestProgram {
    pub fn new() -> Self {
        CreditRequestService::seed();  // Sembrar el estado inicial
        Self
    }

    #[route("CreditRequest")]
    pub fn credit_request_svc(&self) -> CreditRequestService {
        CreditRequestService::new()
    }
}
