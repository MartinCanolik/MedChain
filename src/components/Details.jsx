import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import img from '../logos/example-logo.jpg';
import styles from './CSS/Details.module.css';
import { gql, useQuery } from '@apollo/client';

const PRESCRIPTION_BY_ID = gql`
  query PrescriptionById($id: ID!) {
    prescriptionById(id: $id) {
      id
      doctorName
      patientName
      dosage
      used
      issuedDate
      expiryDate
      frequency
      medicineName
    }
  }
`;

export default function Detail({id}) {
  console.log(id)
  const { loading, error, data } = useQuery(PRESCRIPTION_BY_ID, {
    variables: { id },
  });

  console.log(data)
  return (
    <div>

      {
        id ?

          <div className={styles.dt}>
            <Link to='/pharmacy'><button className={styles.btn}>Back to pharmacy</button> </Link>
            <img className={styles.carding} src={img} alt="img not found" width='200px' height='250px' />
            <h1 className={styles.title}>Paciente: {data.patientName} </h1>
            <h2 className={styles.typ2}>Doctor: {data.doctorName}</h2>
            <h4 className={styles.typ2}>Medicina: {data.medicineName}</h4>
            <h5 className={styles.typ}>Dosis del medicamento: {data.dosage}</h5>
            <h5 className={styles.typ2}>Frecuencia del medicamento: {data.frecuency}</h5>
            <h5 className={styles.typ}>VTO de receta: {data.expiryDate}</h5>

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