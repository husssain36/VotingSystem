import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { ContextProvider } from './context/ContextProvider';
import { ThirdwebProvider, useContract } from "@thirdweb-dev/react";
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <ThirdwebProvider activeChain="goerli">
      <ContextProvider>
        <App />
      </ContextProvider>
    </ThirdwebProvider>
)
