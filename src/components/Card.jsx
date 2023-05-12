import React from "react";
import style from './CSS/Card.module.css'
import img from '../logos/example-logo.jpg'
import { useEffect, useState } from 'react';
import { gql, useMutation } from '@apollo/client';

export default function Card({ image, recipe }) {
  const UPDATE_PRESCRIPTION_MUTATION = gql`
  mutation UpdatePrescription($id: ID!, $used: Boolean!) {
    updatePrescription(id: $id, fields: { used: $used }) {
      txHash
      prescription {
        id
        doctorName
        patientName
        used
      }
    }
  }
`;

const [isUsed, setIsUsed] = useState(recipe.used);

  const [updatePrescription, { loading, error, data }] = useMutation(
    UPDATE_PRESCRIPTION_MUTATION
  );

  const handleSubmit = () => {
    if(!recipe.used){
      updatePrescription({
        variables: {
          id: recipe.id,
          used: true,
    }
    });
    setIsUsed(true);
    }
  };
  useEffect(() => {

  }, []);
  return (
    <div className={style.card} key={recipe.id}>
      <div className={style.cd}>
        <img className={style.carding} src={image ? image : img} alt="img not found" width='15px' height='15px' />
        <h3 className={style.ti}> Dr.{recipe.doctorName} </h3>
        <p className={style.types}>{recipe.medicineName}</p>
        <h4 className={style.types}>VTO de receta: {recipe.expiryDate}</h4>
        <button className={isUsed ? "" :'rounded-md text-l w-40 text-white font-semibold p-3 py-2 px-4 mb-5 mx-auto bg-button hover:scale-105'}
          onClick={handleSubmit}
        >Entregado</button>
      </div>
    </div>

  )
}