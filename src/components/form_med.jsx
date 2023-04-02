import React, { useState, useEffect } from "react";
import DateRangeComp from "./DateRangeComp";
import { Formik, Form, Field, ErrorMessage } from "formik";
import format from "date-fns/format";
import axios from "axios";
import Swal from "sweetalert2";
import { validationSchema } from "../schema/schema";
import { useMutation, gql } from "@apollo/client";

const Form_med = () => {
	// console.log(process.env.REACT_APP_API_KEY);
	const CREATE_PRESCRIPTION = gql`
		mutation CreatePrescription(
			$patientName: String!
			$doctorName: String!
			$issuedDate: String!
			$expiryDate: String!
			$medicineName: String!
			$dosage: Int!
			$frequency: Float!
			$used: Boolean
		) {
			createPrescription(
				prescription: {
					patientName: $patientName
					doctorName: $doctorName
					issuedDate: $issuedDate
					expiryDate: $expiryDate
					medicineName: $medicineName
					dosage: $dosage
					frequency: $frequency
					used: $used
				}
			) {
				txHash
				prescription {
					id
					patientName
					doctorName
					medicineName
				}
			}
		}
	`;
	const [stay, setStay] = useState([]);

	const [createPrescription, { data, loading, error }] =
		useMutation(CREATE_PRESCRIPTION);

	useEffect(() => {
		console.log(data);
		console.log(error);
	}, [data, error]);

	//alerts
	const swappUpSuccess = (name) => {
		Swal.fire({
			icon: "success",
			title: `Receta creada, gracias por confiar en MedChain !.`,
			showConfirmButton: false,
			timer: 2500,
		});
	};
	const swappUpError = () => {
		Swal.fire({
			icon: "error",
			title: "Oops...",
			text: "Ha ocurrido un error al intentar enviar el email",
			footer: '<a href="">Intente con algun medio de contacto alternativo</a>',
		});
	};

	const submitForm = async (values) => {
		try {
			const response = await axios({
				method: "post",
				url: "https://api.sendinblue.com/v3/smtp/email",
				data: {
					sender: {
						name: `MedChain`,
						email: "martin.canolik@gmail.com",
					},
					to: [
						{
							email: "martin.canolik@gmail.com",
							name: "Martin Canolik",
						},
					],
					subject: "RECETA MEDICA",
					htmlContent: `<html><head></head><body>
						<h2>Receta MedChain: </h2>
					
						<img src="https://res.cloudinary.com/drhj3sc2o/image/upload/v1680457297/QR_ncsyn0.jpg" alt="" /><br><br/>
						<span><b>Nombre del paciente: </b> ${values.patientName}</span><br>
						<span><b>Nombre del medico: </b> ${values.doctorName}</span><br>
						<span><b>Medicina: </b> ${values.medicineName}</span><br>
						<span><b>Dosis: </b> ${values.dosage}</span><br>
						<span><b>Frecuencia: </b> ${values.frequency}</span><br>
						<span><b>Desde: </b> ${values.issuedDate} <b>Hasta: </b> ${values.expiryDate}</span><br>
						</body></html>`,
				},
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					"api-key": "",
				},
			});
			swappUpSuccess();

			const { dosage, frequency, email, issuedDate, expiryDate, ...rest } =
				values;

			const receta = {
				variables: {
					...rest,
					issuedDate,
					expiryDate,

					used: true,
				},
			};
			// console.log({ receta });
			console.log({ ...receta });
			createPrescription({ ...receta });

			console.log(response);
		} catch (err) {
			swappUpError();
			console.log(err);
		}
	};

	return (
		<div className='bg-background h-full py-10 '>
			<Formik
				initialValues={{
					patientName: "",
					doctorName: "",
					medicineName: "",
					email: "",
					dosage: "",
					frequency: "",

					issuedDate: "12/2/2023",
					expiryDate: "13/2/2023",
				}}
				onSubmit={(values, { resetForm }) => {
					submitForm({ ...values });

					resetForm();
				}}
				validationSchema={validationSchema}>
				{({ isSubmitting, errors }) => (
					<Form className=''>
						<div className='className= flex flex-col items-center justify-center gap-5'>
							<div className='w-1/3 bg-form  mx-auto justify-center  items-center pb-5 px-3 flex flex-col gap-3 rounded'>
								<h1 className='tracking-wide text-background mt-5 text-3xl font-bold '>
									Recetario
								</h1>

								<hr className='border-2 border-white opacity-50 w-full mb-3' />
								<div className='w-full px-3'>
									{/* <label
									htmlFor='patientName'
									className=' tracking-wide text-sm text-white font-bold mb-2'>
									Nombre del paciente
								</label> */}
									<Field
										type='text'
										name='patientName'
										placeholder='Nombre del paciente*'
										className={
											errors.firstName
												? "appearance-none text-sm mt-2 py-2 px-3 w-full text-sm mt-2 py-2 px-3 bg-red-100 text-gray-700 border border-customRed rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
												: "appearance-none text-sm mt-2 py-2 px-3 w-full text-sm mt-2 py-2 px-3 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
										}
									/>
									<ErrorMessage name='patientName'>
										{(msg) => (
											<div className='text-customRed italic pl-1 text-xs font-semibold'>
												{msg}
											</div>
										)}
									</ErrorMessage>
								</div>
								<div className='w-full px-3'>
									{/* <label
								htmlFor='lastName'
								className=' tracking-wide text-white text-sm font-bold mb-2'>
								Nombre del doctor
							</label> */}
									<Field
										type='text'
										name='doctorName'
										placeholder='Nombre del doctor *'
										className={
											errors.lastName
												? "appearance-none text-sm mt-2 py-2 px-3 w-full bg-red-100 text-gray-700 border border-customRed rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
												: "appearance-none text-sm mt-2 py-2 px-3 w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
										}
									/>
									<ErrorMessage name='doctorName'>
										{(msg) => (
											<div className='text-customRed italic pl-1 text-xs font-semibold'>
												{msg}
											</div>
										)}
									</ErrorMessage>
								</div>
								<div className='w-full px-3'>
									<DateRangeComp setStay={setStay} />
								</div>
								<div className='w-full px-3'>
									{/* <label
								htmlFor='lastName'
								className=' tracking-wide text-white text-sm font-bold mb-2'>
								Nombre del doctor
							</label> */}
									<Field
										type='number'
										name='dosage'
										placeholder='Dosis *'
										className={
											errors.lastName
												? "appearance-none text-sm mt-2 py-2 px-3 w-full bg-red-100 text-gray-700 border border-customRed rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
												: "appearance-none text-sm mt-2 py-2 px-3 w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
										}
									/>
									<ErrorMessage name='dosage'>
										{(msg) => (
											<div className='text-customRed italic pl-1 text-xs font-semibold'>
												{msg}
											</div>
										)}
									</ErrorMessage>
								</div>
								<div className='w-full px-3'>
									{/* <label
								htmlFor='lastName'
								className=' tracking-wide text-white text-sm font-bold mb-2'>
								Nombre del doctor
							</label> */}
									<Field
										type='number'
										name='frequency'
										placeholder='Frecuencia *'
										className={
											errors.lastName
												? "appearance-none text-sm mt-2 py-2 px-3 w-full bg-red-100 text-gray-700 border border-customRed rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
												: "appearance-none text-sm mt-2 py-2 px-3 w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
										}
									/>
									<ErrorMessage name='lastName'>
										{(msg) => (
											<div className='text-customRed italic pl-1 text-xs font-semibold'>
												{msg}
											</div>
										)}
									</ErrorMessage>
								</div>
								<div className='w-full px-3'>
									{/* <label
								htmlFor='lastName'
								className=' tracking-wide text-white text-sm font-bold mb-2'>
								Nombre del doctor
							</label> */}
									<Field
										type='text'
										name='email'
										placeholder='Email del paciente *'
										className={
											errors.lastName
												? "appearance-none text-sm mt-2 py-2 px-3 w-full bg-red-100 text-gray-700 border border-customRed rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
												: "appearance-none text-sm mt-2 py-2 px-3 w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
										}
									/>
									<ErrorMessage name='email'>
										{(msg) => (
											<div className='text-customRed italic pl-1 text-xs font-semibold'>
												{msg}
											</div>
										)}
									</ErrorMessage>
								</div>
								<div className='w-full px-3'>
									{/* <label
								htmlFor='lastName'
								className=' tracking-wide text-white text-sm font-bold mb-2'>
								Nombre del doctor
							</label> */}
									<Field
										type='text'
										name='medicineName'
										placeholder='Nombre del medicamento *'
										className={
											errors.lastName
												? "appearance-none text-sm mt-2 py-2 px-3 w-full bg-red-100 text-gray-700 border border-customRed rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
												: "appearance-none text-sm mt-2 py-2 px-3 w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
										}
									/>
									<ErrorMessage name='medicineName'>
										{(msg) => (
											<div className='text-customRed italic pl-1 text-xs font-semibold'>
												{msg}
											</div>
										)}
									</ErrorMessage>
								</div>
								{/* <div className='w-full flex flex-col items-center justify-center '> */}
								{/* <div className='w-[80%]  p-3'>
								<Field
									placeholder='Deje su consulta...'
									className={
										errors.query
											? "appearance-none text-sm mt-2 py-2 px-3 w-full  h-20 bg-red-100 text-gray-700 border border-customRed rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
											: "appearance-none text-sm mt-2 py-2 px-3 w-full  h-20 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 scroll-y"
									}
									component='textarea'
									name='query'
								/>
							</div> */}
							</div>
							<div className='w-1/3'>
								<button
									type='submit'
									// disabled={isSubmitting}
									// className='bg-med hover:bg-nav text-white font-bold  py-2 px-4 mb-5 rounded hover:border-green-800'>
									className='rounded text-l bg-med w-full text-white font-bold p-3 py-2 px-4 mb-5 mx-auto hover:bg-lime-500'>
									Enviar
								</button>
							</div>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default Form_med;
