import React from "react";
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
    if (!recipe.used) {
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
    <li key={recipe.id} className='flex flex-col items-center justify-center h-full py-10 gap-4'>
      <div className='w-1/3 bg-form  mx-auto justify-between  items-center pb-5 px-10 flex flex-col rounded'>
        <h1 className='tracking-wide text-background text-3xl font-bold py-5'>Receta</h1>
        <hr className='border-2 border-white opacity-50 w-full mb-3' />
        <div className="w-full flex gap-4 flex-col items-left">
          <div className="w-full">
            <h3 className='flex opacity-50 w-full mb-3 items-left'> Nombre del Doctor: </h3>
            <h3 className='text-lg text-light w-full mb-3'> Dr.{recipe.doctorName}</h3>
          </div>
          <div className="w-full">
            <h3 className='flex opacity-50 w-full mb-3 items-left'> Fecha de emisión y vencimiento: </h3>
            <h3 className='text-lg text-light w-full mb-3'> {recipe.issuedDate} - {recipe.expiryDate}</h3>
          </div>
          <div className="w-full" >
            <h3 className='flex opacity-50 w-full mb-3 items-left'> Nombre del medicamento:</h3>
            <h3 className='text-lg text-light w-full mb-3'> {recipe.medicineName}</h3>
          </div>
          <button className={isUsed ? "" : 'rounded-md text-l w-40 text-white font-semibold p-3 py-2 px-4 mb-5 mx-auto bg-button hover:scale-105'}
            onClick={handleSubmit}
          >Entregado</button>
        </div>
      </div>
      {/* <div>
        <img className={style.carding} src={image ? image : img} alt="img not found" width='200px' height='250px' />
        <h3 className={style.ti}> Dr.{recipe.doctorName} </h3>
        <p>{recipe.medicineName}</p>
        <h4 className={style.types}>VTO de receta: {recipe.expiryDate}</h4>
        <button className={isUsed ? "" :'rounded-md text-l w-40 text-white font-semibold p-3 py-2 px-4 mb-5 mx-auto bg-button hover:scale-105'}
          onClick={handleSubmit}
        >Entregado</button>
      </div> */}
    </li>

  )
}