import React, { useState } from 'react';
import { gql, useLazyQuery } from '@apollo/client';

/*const SEARCH_RECIPE = gql`
  query searchRecipe($searchTerm: String!) {
    searchRecipe(searchTerm: $searchTerm) {
      id
      title
      description
    }
  }
`;

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchRecipe, { loading, error, data }] = useLazyQuery(SEARCH_RECIPE);

  const handleSubmit = (e) => {
    e.preventDefault();
    searchRecipe({ variables: { searchTerm } });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <ul>
          {data.searchRecipe.map((recipe) => (
            <li key={recipe.id}>
              <h2>{recipe.title}</h2>
              <p>{recipe.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search; */


function Home() {
  const [hash, setHash] = useState("");
  const [result, setResult] = useState("");

  const handleSearch = async () => {
    try {
      const response = await fetch(`/search/${hash}`);
      const data = await response.json();
      setResult(data.result);
    } catch (error) {
      console.error(error);
      setResult("Error en la búsqueda");
    }
  };

  return (
    <div className="w-full h-96 flex flex-col justify-center items-center gap-5">
      <h1 className='text-white'>Bienvenido farmacologo</h1>
      <p className='text-white'>Ingrese el hash de la receta en el siguiente casillero</p>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Ingrese el hash a buscar"
          value={hash}
          onChange={(e) => setHash(e.target.value)}
          className="rounded p-3 text-xl"
        />
        <button onClick={handleSearch} className="rounded bg-button p-3 text-xl hover:bg-lime-500">Buscar</button>
      </div>
      {result && <p className='text-chain'>Resultado: {result}</p>}
    </div>
  );
}

export default Home;



