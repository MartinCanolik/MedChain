import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Form_med from "./components/form_med";
import Login from "./components/Login";
import MedChain from "./components/MedChain";

function App() {
	return (
		<>
			<MedChain/>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/form' element={<Form_med />} />
				<Route path='/login/:type' element={<Login />} />
			</Routes>
		</>
	);
}

export default App;
