import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.jsx";

// Import ThirdWeb
import { ThirdwebWeb3Provider } from '@3rdweb/hooks';

// Include what chains you want to support.
// 4 - Rinkerby
const supportedChains = [4];

// Include what type of wallet you want to support.
// In this case, we support the Metamask wallet which is an injected wallet.
const connectors = {
  injected: {},
}

// Wrap the App with ThirdWeb3Provider.
ReactDOM.render(
  <React.StrictMode>
    <ThirdwebWeb3Provider
      supportedChains={supportedChains}
      connectors={connectors}
    >
      <div className="landing">
        <App />
      </div>
    </ThirdwebWeb3Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
