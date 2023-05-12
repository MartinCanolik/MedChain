import React from "react";
import style from './CSS/Card.module.css'
import img from '../logos/example-logo.jpg'
import { useEffect, useState } from 'react';
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

export default function Card({ image, recipe}) {
  console.log(recipe)
  return (
        <li key={recipe.id} className={style.card}>
          <div className={style.cd}>
            <img className={style.carding} src={image ? image : img} alt="img not found" width='200px' height='250px' />
            <h3 className={style.ti}> Dr.{recipe.doctorName} </h3>
            <p>{recipe.medicineName}</p>
            <h4 className={style.types}>VTO de receta: {recipe.expiryDate}</h4>
            <button>Entregado</button>
          </div>
        </li>
    
    )
}