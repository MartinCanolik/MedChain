import React, { useState } from "react";
import { useNavigate } from "react-router";

const Home = () => {

	const [userType, setUserType] = useState({ user: "" })
	const navigate = useNavigate();

	const handleClick = (event) => {
		setUserType({ user: event.target.value })
		navigate('/login')
	}

	return (
		<div className="w-full h-96 flex flex-col justify-center items-center gap-5">
			<button onClick={handleClick} value="doctor" className="rounded text-3xl bg-button w-96 p-5 hover:bg-lime-500">Soy Médico</button>
			<button onClick={handleClick} value="pharmacy" className="rounded text-3xl bg-button w-96 p-5 hover:bg-lime-500">Soy Farmacia</button>
		</div>
	)
};

export default Home;
