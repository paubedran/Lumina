[![Open in Gitpod](https://img.shields.io/badge/Open_in-Gitpod-white?logo=gitpod)]( https://gitpod.io/new/#https://github.com/Vara-Lab/Sails-Smart-Contract-Builder-Template.git)


# Sails Smart Contract Builder Template

# Deploy the Contract on the IDEA Platform and Interact with Your Contract

## Step 1: Open Contract on Gitpod

<p align="center">
  <a href="https://gitpod.io/#https://github.com/Vara-Lab/Sails-Smart-Contract-Builder-Template.git" target="_blank">
    <img src="https://gitpod.io/button/open-in-gitpod.svg" width="240" alt="Gitpod">
  </a>
</p>


## Step 2: Compile and Deploy the Smart Contract

### Rust: You need to have rust 1.80 or newer to be able to compile your contract:

```bash
rustup install 1.83
rustup default 1.83
rustup target add wasm32-unknown-unknown
rustup component add rust-src --toolchain 1.83-x86_64-unknown-linux-gnu
```
### Compile the smart contract by running the following command:

```bash
cargo build --release
```

Once the compilation is complete, locate the `*.opt.wasm` file in the `target/wasm32-unknown-unknown/release` directory.


## Step 3: Download Your Substrate Wallet.

1. To interact with the Gear IDEA and deploy your contract, you will need to download a wallet extension such as [Polkadot-JS](https://polkadot.js.org/extension/), [Talisman](https://talisman.xyz/), or [Subwallet](https://subwallet.app/) to interact with Substrate-based chains.

<div align="center">
  <img src="https://polkadot.js.org/extension/extension-overview.png" alt="Polkadot-JS Extension">
</div>


## Step 4: Deploy Your Contract on Vara Network

1. Access [Gear IDE](https://idea.gear-tech.io/programs?node=wss%3A%2F%2Frpc.vara.network) using your web browser.
2. Connect your Substrate wallet to Gear IDEA.
3. Upload the `*.opt.wasm` and `*.Idl` files by clicking the "Upload Program" button.

## Standards: [Standards](https://github.com/gear-foundation/standards.git)  