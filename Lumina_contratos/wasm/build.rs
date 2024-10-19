use sails_client_gen::ClientGenerator;
use std::{env, fs, path::PathBuf};
use app::CreditRequestProgram;  // Ensure we're using the correct program

fn main() {
    // Build contract to get .opt.wasm
    sails_rs::build_wasm();

    // Path where the file "Cargo.toml" is located (points to the root of the project)
    let cargo_toml_path = PathBuf::from(env::var("CARGO_MANIFEST_DIR").unwrap());

    // Path where the client will be generated 
    let outdir_path = PathBuf::from(env::var("OUT_DIR").unwrap());

    // Path where the file "app.idl" will be created
    let idl_path = cargo_toml_path.clone().join("app.idl");
    let client_path = outdir_path.clone().join("app_client.rs");

    // Generate the contract IDL using CreditRequestProgram instead of TrafficLightProgram
    sails_idl_gen::generate_idl_to_file::<CreditRequestProgram>(idl_path.clone())  // This was updated
        .unwrap();

    // Generate the clients for the contract
    ClientGenerator::from_idl_path(&idl_path)
        .generate_to(client_path.clone())
        .unwrap();

    // Copy the generated client from OUT_DIR to the current directory where the Cargo.toml is located 
    fs::copy(client_path, cargo_toml_path.join("app_client.rs"))
        .unwrap();
}