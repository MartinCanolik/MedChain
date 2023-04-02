import React, { useState } from 'react';
import { gql, useLazyQuery } from '@apollo/client';

const SEARCH_RECIPE = gql`
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

export default Search;














/*import React from 'react';
import Logo from '../img/logoHenry.png'
import { Link } from 'react-router-dom';
import React, { Component } from 'react';


class Home extends Component {
	constructor(props) {
	  super(props);
	  this.state = {
		searchQuery: ""
	  };
	}
  
	handleInputChange = event => {
	  this.setState({
		searchQuery: event.target.value
	  });
	};
  
	render() {
	  const { searchQuery } = this.state;
	  return (
		<div>
		  <h1>Bienvenido farmacologo</h1>
		  <p>Introduzca el codigo de la receta</p>
		  <form>
			<input
			  type="text"
			  placeholder="Buscar..."
			  value={searchQuery}
			  onChange={this.handleInputChange}
			/>
			<button type="submit">Buscar</button>
		  </form>
		</div>
	  );
	}
  }

  export default Home;*/
/*function Drugs({onSearch}) {
  return (
    
  );
};

export default Drugs;*/