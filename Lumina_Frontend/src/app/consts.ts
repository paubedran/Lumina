import { HexString } from '@gear-js/api';

interface ContractSails {
  programId: HexString,
  idl: string
}

export const ACCOUNT_ID_LOCAL_STORAGE_KEY = 'account';

export const ADDRESS = {
  NODE: import.meta.env.VITE_NODE_ADDRESS,
  BACK: import.meta.env.VITE_BACKEND_ADDRESS,
  GAME: import.meta.env.VITE_CONTRACT_ADDRESS as HexString,
};

export const ROUTES = {
  HOME: '/',
  EXAMPLES: '/examples',
  NOTFOUND: '*',
};

// To use the example code, enter the details of the account that will pay the vouchers, etc. (name and mnemonic)
// Here, you have an example account that contains tokens, in your dApp, you need to put a sponsor name
// and a sponsor mnemonic
export const sponsorName = 'Alice';
export const sponsorMnemonic = 'bottom drive obey lake curtain smoke basket hold race lonely fit walk';

export const CONTRACT_DATA: ContractSails = {
  programId: '0x960b208eefb9fdbbb7ef3173a89f4d10612537b97fad87041d5eed56a2575456',
  idl: `type Purpose = enum {
  P0,
  P1,
  P2,
  P3,
  P4,
  P5,
  P6,
  P7,
};

type TimeToPay = enum {
  T0,
  T1,
  T2,
  T3,
};

type CreditRequestEvent = enum {
  Success,
  CollateralTooLow,
};

type IoCreditRequestState = struct {
  all_requests: vec struct { actor_id, struct { u32, u32, Purpose, TimeToPay } },
};

constructor {
  New : ();
};

service CreditRequest {
  RequestCredit : (amount_requested: u32, collateral: u32, purpose: Purpose, time_to_pay: TimeToPay) -> CreditRequestEvent;
  query GetRequests : () -> IoCreditRequestState;
};`
};