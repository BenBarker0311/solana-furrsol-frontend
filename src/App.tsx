import './styles/normalize.css';
import './styles/fonts.css';
import './styles/utils.css';
import './styles/app.css';

import React, { useMemo, useEffect, useRef, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import { getPhantomWallet, getSolflareWallet } from '@solana/wallet-adapter-wallets';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';

import ThemeProvider from "@material-ui/styles/ThemeProvider"

import CONFIG from './config'

import MuiTheme from "./components/theme"
import DashboardPage from "./pages/Frontend/DashboardPage";
import MartPage from "./pages/Frontend/MartPage";
import InventoryPage from "./pages/Frontend/InventoryPage";

require('@solana/wallet-adapter-react-ui/styles.css');

const { CLUSTER_API } = CONFIG;

const AppWithProvider = () => {
  const wallets = useMemo(
    () => [getPhantomWallet(), getSolflareWallet()],
    []
  );
  return (
    <ThemeProvider theme={MuiTheme}>
      <ConnectionProvider endpoint={CLUSTER_API}>
        
          <WalletProvider wallets={wallets} autoConnect>
            <WalletModalProvider>
              <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<DashboardPage />} />
                    <Route path="/mart" element={<MartPage />} />
                    <Route path="/inventory" element={<InventoryPage />} />
                    <Route path='/*' element={<DashboardPage />}/>
                  </Routes>
              </BrowserRouter>
            </WalletModalProvider>
          </WalletProvider>
        
      </ConnectionProvider>
    </ThemeProvider>
  )
}
export default AppWithProvider;