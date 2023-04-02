import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Form_med from "./components/form_med";
import Login from "./components/Login";
import MedChain from "./components/MedChain";
// import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
// import { Web3Modal } from '@web3modal/react'
// import { configureChains, createClient, WagmiConfig } from 'wagmi'
// import { polygonMumbai } from 'wagmi/chains'

// const chains = [polygonMumbai];

// const projectId = String(process.env.REACT_APP_WC_PROJECT_ID)
// const { provider } = configureChains(chains, [w3mProvider({ projectId })])
// const wagmiClient = createClient({
// 	autoConnect: true,
// 	connectors: w3mConnectors({ projectId, version: 1, chains }),
// 	provider
// })
// const ethereumClient = new EthereumClient(wagmiClient, chains)

import DrugS from "./components/DrugS";

function App() {
	return (
		<>
			{/* <WagmiConfig client={wagmiClient}> */}
			<MedChain />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/doctor' element={<Form_med />} />
				<Route path='/login/:type' element={<Login />} />
				<Route path='/pharmacy' element={<DrugS />} />
			</Routes>
			{/* </WagmiConfig>

			<Web3Modal projectId={projectId} ethereumClient={ethereumClient} /> */}
		</>
	);
}

export default App;
