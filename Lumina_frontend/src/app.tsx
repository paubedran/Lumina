// src/app.tsx
import { useEffect } from "react";
import { useAccount, useApi } from "@gear-js/react-hooks";
import { ApiLoader } from "@/components";
import { Header } from "./components/layout";
import { withProviders } from "./app/hocs";
import { useWalletSync } from "@/features/wallet/hooks";
import { Routing } from "./pages";

import { useInitSails } from "./app/hooks";
import { CONTRACT_DATA } from "./app/consts";
import Home from './pages/home/home'; // Asegúrate de que la ruta sea correcta

function Component() {
  const { isApiReady } = useApi();
  const { isAccountReady } = useAccount();

  // Configura tu ID de contrato y IDL
  useInitSails({
    network: 'wss://testnet.vara.network',
    contractId: CONTRACT_DATA.programId,
    idl: CONTRACT_DATA.idl
  });
  
  useWalletSync();

  const isAppReady = isApiReady && isAccountReady;

  // App con contexto
  return (
    <>
      <Header isAccountVisible={isAccountReady} />
      {isAppReady ? <Home /> : <ApiLoader />} {/* Aquí se mostrará el componente Home */}
    </>
  );
}

export const App = withProviders(Component);
