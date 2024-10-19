use sails_rs::prelude::*;
use gstd::collections::HashMap;
use crate::services::credit_request_service::{Purpose, TimeToPay};

// Definir una variable estática para el estado
pub static mut CREDIT_REQUEST_STATE: Option<CreditRequestState> = None;

// Estructura para almacenar los datos de solicitudes de crédito
#[derive(Clone, Default)]
pub struct CreditRequestState {
    pub all_requests: HashMap<ActorId, (u32, Purpose, TimeToPay)>,
}

impl CreditRequestState {
    pub fn new() -> Self {
        Self {
            all_requests: HashMap::new(),
        }
    }

    pub fn init_state() {
        unsafe {
            CREDIT_REQUEST_STATE = Some(Self::new());
        }
    }

    pub fn state_mut() -> &'static mut CreditRequestState {
        let state = unsafe { CREDIT_REQUEST_STATE.as_mut() };
        debug_assert!(state.is_some(), "State not initialized");
        unsafe { state.unwrap_unchecked() }
    }

    pub fn state_ref() -> &'static CreditRequestState {
        let state = unsafe { CREDIT_REQUEST_STATE.as_ref() };
        debug_assert!(state.is_some(), "State not initialized");
        unsafe { state.unwrap_unchecked() }
    }
}

// Estructura para la representación de I/O del estado
#[derive(Encode, Decode, TypeInfo)]
#[codec(crate = sails_rs::scale_codec)]
#[scale_info(crate = sails_rs::scale_info)]
pub struct IoCreditRequestState {
    pub all_requests: Vec<(ActorId, (u32, Purpose, TimeToPay))>,
}

impl From<CreditRequestState> for IoCreditRequestState {
    fn from(value: CreditRequestState) -> Self {
        let all_requests = value.all_requests.into_iter().collect();
        Self { all_requests }
    }
}
