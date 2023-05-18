import React, { useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import Card from './Card';
import { Link } from 'react-router-dom';


const GET_PRESCRIPTIONS = gql`
query GetPrescriptions{
  allPrescriptions {
      id
      patientName
	    doctorName
	    issuedDate
	    expiryDate
      dosage
      frequency
	    medicineName
	    used
  }
}
`;


const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { loading, error, data } = useQuery(GET_PRESCRIPTIONS);

  return (
    <div>


      {/* <form onSubmit={handleSubmit}> */}
      {/* <form>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <button 
      // onClick={() => getPrescriptions()}
      >Get Prescriptions</button> */}


      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <ul>
          {
            data.allPrescriptions.map((recipe) => {
              return (
                  <Card recipe={recipe} />
              )
            }
            )}
        </ul>
      )}
    </div>
  );
};

export default Search;


// function Home() {
//   const [hash, setHash] = useState("");
//   const [result, setResult] = useState("");

//   const handleSearch = async () => {
//     try {
//       const response = await fetch(`/ search / ${ hash } `);
//       const data = await response.json();
//       setResult(data.result);
//     } catch (error) {
//       console.error(error);
//       setResult("Error en la búsqueda");
//     }
//   };

//   return (
//     <div className="w-full h-96 flex flex-col justify-center items-center gap-5">
//       <h1 className='text-white'>Bienvenido farmacologo</h1>
//       <p className='text-white'>Ingrese el hash de la receta en el siguiente casillero</p>
//       <div className="flex gap-2">
//         <input
//           type="text"
//           placeholder="Ingrese el hash a buscar"
//           value={hash}
//           onChange={(e) => setHash(e.target.value)}
//           className="rounded p-3 text-xl"
//         />
//         <button onClick={handleSearch} className="rounded bg-button p-3 text-xl hover:bg-lime-500">Buscar</button>
//       </div>
//       {result && <p className='text-chain'>Resultado: {result}</p>}
//     </div>
//   );
// }

// export default Home;



