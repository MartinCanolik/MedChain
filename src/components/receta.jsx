import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { useState } from "react";

const SEARCH_RESULT = gql`
  query searchResult($hash: String!) {
    search(hash: $hash) {
      result
    }
  }
`;

function Home() {
  const [hash, setHash] = useState("");
  const { loading, error, data } = useQuery(SEARCH_RESULT, {
    variables: { hash },
  });

  const handleSearch = () => {
    // La consulta se ejecuta automáticamente debido al uso de useQuery
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-800">
      <h1 className="text-white text-3xl font-bold mb-5">
        Bienvenido farmacólogo
      </h1>
      <p className="text-white text-xl mb-5">
        Ingrese el hash de la receta en el siguiente casillero
      </p>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Ingrese el hash a buscar"
          value={hash}
          onChange={(e) => setHash(e.target.value)}
          className="rounded p-3 text-xl"
        />
        <button
          onClick={handleSearch}
          className="rounded bg-blue-500 text-white p-3 text-xl hover:bg-blue-700"
        >
          Buscar
        </button>
      </div>
      {loading && (
        <p className="text-white text-xl mt-5">Cargando...</p>
      )}
      {error && (
        <p className="text-white text-xl mt-5">
          Error en la búsqueda
        </p>
      )}
      {data && (
        <p className="text-white text-xl mt-5">
          Resultado: {data.search.result}
        </p>
      )}
    </div>
  );
}

export default Home;