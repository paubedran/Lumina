use sails_rs::prelude::*;
use gstd::msg;
use crate::states::credit_request_state::{CreditRequestState, IoCreditRequestState};

// Definición de los enums para Purpose y TimeToPay usando solo números
#[derive(Encode, Decode, TypeInfo, Clone, Copy, Debug)]
#[codec(crate = sails_rs::scale_codec)]
#[scale_info(crate = sails_rs::scale_info)]
pub enum Purpose {
    P0 = 0,
    P1 = 1,
    P2 = 2,
    P3 = 3,
    P4 = 4,
    P5 = 5,
    P6 = 6,
    P7 = 7,
}

#[derive(Encode, Decode, TypeInfo, Clone, Copy, Debug)]
#[codec(crate = sails_rs::scale_codec)]
#[scale_info(crate = sails_rs::scale_info)]
pub enum TimeToPay {
    T0 = 0,
    T1 = 1,
    T2 = 2,
    T3 = 3,
    T4 = 4,
    T5 = 5,
}

// Estructura del servicio de solicitudes de crédito
#[derive(Default)]
pub struct CreditRequestService;

impl CreditRequestService {
    pub fn seed() {
        CreditRequestState::init_state();  // Inicializar el estado
    }
}

#[service]
impl CreditRequestService {
    pub fn new() -> Self {
        Self  // Crear un nuevo servicio
    }

    // Método para manejar una solicitud de crédito
    pub fn request_credit(
        &mut self,
        amount_requested: u32,
        purpose: Purpose,
        time_to_pay: TimeToPay,
    ) -> CreditRequestEvent {
        let state = CreditRequestState::state_mut();
        // Insertar la solicitud en el estado usando enums directamente
        state.all_requests.insert(
            msg::source().into(),
            (amount_requested, purpose, time_to_pay),
        );
        CreditRequestEvent::Success
    }

    // Método para obtener todas las solicitudes de crédito
    pub fn get_requests(&self) -> IoCreditRequestState {
        CreditRequestState::state_ref().to_owned().into()
    }
}

// Enum para eventos relacionados con solicitudes de crédito
#[derive(Encode, Decode, TypeInfo)]
#[codec(crate = sails_rs::scale_codec)]
#[scale_info(crate = sails_rs::scale_info)]
pub enum CreditRequestEvent {
    Success,
}


