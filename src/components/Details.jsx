import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import img from '../logos/example-logo.jpg';
import styles from './CSS/Details.module.css';
import { useHistory } from 'react-router-dom';
import {  useDispatch, useSelector} from "react-redux";
import { gql, useQuery } from '@apollo/client';



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

export default function Detail(props){
    

    const Search = () => {
        const [searchTerm, setSearchTerm] = useState('');
        const { loading, error, data } = useQuery(GET_PRESCRIPTIONS);


        
    }



    data.allPrescriptions.map((recipe) => {
        console.log(recipe)
        return(
          <li key={recipe.id}>
            <h2>{recipe.doctorName}</h2>
            <p>{recipe.medicineName}</p>
          </li>)
      }
    )



    return (
        <div>
         
       { 
         recipe.id? 
        
         <div className={styles.dt}> 
            <Link to='/pharmacy'><button className={styles.btn}>Back to pharmacy</button> </Link>
            <img className={styles.carding} src={img} alt="img not found" width='200px' height='250px'/>
             <h1 className={styles.title}>Paciente: {recipe.patientName} </h1>
             <h2 className={styles.typ2}>Doctor: {recipe.doctorName}</h2>
             <h4 className={styles.typ2}>Medicina: {recipe.medicineName }</h4>
             <h5 className={styles.typ}>Dosis del medicamento: {recipe.dosage}</h5>
             <h5 className={styles.typ2}>Frecuencia del medicamento: {recipe.frecuency}</h5>
             <h5 className={styles.typ}>VTO de receta: {recipe.expiryDate}</h5>

             {/* <Link> <button>Dispatch</button> </Link> */}
        
             {/* {id.length > 15 ? (
          <button className="recipe-delete" onClick={() => handleDelete()}>
            DELETE
          </button>
        ) : null} */}
        
         </div> : 
         
         <div> <h2 className={styles.back}></h2> </div>
  
      }
          </div>
      )
}