import React, { useState } from "react";

const Home = () => {

	const [medico, setMedico] = useState({})
	const [farmacia, setFarmacia] = useState({})

	const handleMedico = () => {
		
	}

	return (
		<div className="container">
			<h1>MedChain</h1>
			<button>Soy Médico</button>
			<button>Soy Farmacia</button>
		</div>
	)
};

export default Home;
