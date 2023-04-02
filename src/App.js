import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Form_med from "./components/form_med";

function App() {
	return (
		<>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/form' element={<Form_med />} />
			</Routes>
		</>
	);
}

export default App;
