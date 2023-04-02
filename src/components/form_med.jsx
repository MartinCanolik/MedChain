import React, { useState } from "react";
// import DateRangeComp from "./DateRangeComp";
import { Formik, Form, Field, ErrorMessage } from "formik";
// import format from "date-fns/format";
import axios from "axios";
import Swal from "sweetalert2";
import { validationSchema } from "../schema/schema";

const Form_med = () => {
	// const [stay, setStay] = useState([]);

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
						name: `${values.firstName} ${values.lastName}`,
						email: "martin.canolik@gmail.com",
					},
					to: [
						{
							email: "martin.canolik@gmail.com",
							name: "Martin Canolik",
						},
					],
					subject: "Solicitud De Reserva !",
					htmlContent: `<html><head></head><body>
						<h2>Consulta: </h2>
						<p>${values.query}</p>
						<span><b>Adultos: </b> ${values.adults}</span><br>
						<span><b>Niños: </b> ${values.children}</span><br>
						<span><b>Email: </b> ${values.email}</span><br>
						<span><b>Telefono: </b> ${values.phone}</span><br>
						<span><b>Desde: </b> ${values.startDate} <b>Hasta: </b> ${values.endDate}</span><br>
						</body></html>`,
				},
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					"api-key": process.env.REACT_APP_API_KEY,
				},
			});
			swappUpSuccess(values.firstName);

			console.log(response);
		} catch (err) {
			swappUpError();
			console.log(err);
		}
	};
	// const startDate = stay.length && format(stay[0].startDate, "dd/MM/yyyy");
	// const endDate = stay.length && format(stay[0].endDate, "dd/MM/yyyy");

	return (
		<div className=''>
			<Formik
				initialValues={{
					adults: "",
					children: "",
					firstName: "",
					lastName: "",
					email: "",
					query: "",
					phone: "",
					// startDate: startDate,
					// endDate: endDate,
				}}
				onSubmit={(values, { resetForm }) => {
					submitForm({ ...values });

					resetForm();
				}}
				validationSchema={validationSchema}>
				{({ isSubmitting, errors }) => (
					<Form className='w-full bg-nav h-[585px] justify-center  items-center px-4 flex flex-col gap-3 rounded'>
						<h1 className='tracking-wide text-white mb-5 text-2xl font-bold '>
							Reserva
						</h1>
						<hr className='border-2 border-white opacity-50 w-full mb-3' />
						<div className='flex w-full '>
							<div className='w-1/4 cursor-pointer px-3'>
								<label
									htmlFor='adults'
									className=' tracking-wide text-white text-xm font-bold '>
									Adultos
								</label>
								<Field
									className='cursor-pointer appearance-none text-sm mt-2 py-2 px-3 w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
									component='select'
									id='adults'
									name='adults'>
									<option className='text-slate-700' value='0'>
										0
									</option>
									<option className='text-slate-700' value='1'>
										1
									</option>
									<option className='text-slate-700' value='2'>
										2
									</option>
									<option className='text-slate-700' value='3'>
										3
									</option>
									<option className='text-slate-700' value='4'>
										4
									</option>
									<option className='text-slate-700' value='5'>
										5
									</option>
								</Field>
							</div>

							<div className='w-1/4 cursor-pointer px-3'>
								<label
									htmlFor='children'
									className=' tracking-wide text-white text-s font-bold mb-2'>
									Niños
								</label>
								<Field
									className='cursor-pointer appearance-none text-sm mt-2 py-2 px-3 w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
									component='select'
									id='children'
									name='children'>
									<option value='0'>0</option>
									<option value='1'>1</option>
									<option value='2'>2</option>
									<option value='3'>3</option>
									<option value='4'>4</option>
									<option value='5'>5</option>
								</Field>
							</div>
							<div className='w-1/2 cursor-pointer px-3 '>
								<label htmlFor='' className=' text-white text-sm font-bold'>
									Check in - Check out
								</label>
								{/* <input
									type='text'
									className='appearance-none text-sm mt-2 py-2 px-3 w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
								/> */}
								{/* <DateRangeComp setStay={setStay} /> */}
							</div>
						</div>

						<div className='flex '>
							<div className='1/2 md:w-1/2 px-3'>
								<label
									htmlFor='firstName'
									className=' tracking-wide text-sm text-white font-bold mb-2'>
									Nombre
								</label>
								<Field
									type='text'
									name='firstName'
									placeholder='Nombre *'
									className={
										errors.firstName
											? "appearance-none text-sm mt-2 py-2 px-3 w-full text-sm mt-2 py-2 px-3 bg-red-100 text-gray-700 border border-customRed rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
											: "appearance-none text-sm mt-2 py-2 px-3 w-full text-sm mt-2 py-2 px-3 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
									}
								/>
								<ErrorMessage name='firstName'>
									{(msg) => (
										<div className='text-customRed italic pl-1 text-xs font-semibold'>
											{msg}
										</div>
									)}
								</ErrorMessage>
							</div>
							<div className='w-1/2 md:w-1/2 px-3'>
								<label
									htmlFor='lastName'
									className=' tracking-wide text-white text-sm font-bold mb-2'>
									Apellido
								</label>
								<Field
									type='text'
									name='lastName'
									placeholder='Apellido *'
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
						</div>

						<div className='flex'>
							<div className='w-1/2 md:w-1/2 px-3'>
								<label
									htmlFor='email'
									className=' tracking-wide text-white text-sm font-bold mb-2'>
									Email
								</label>
								<Field
									type='email'
									name='email'
									placeholder='Email *'
									className={
										errors.email
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
							<div className='w-1/2 md:w-1/2 px-3'>
								<label
									htmlFor='lastName'
									className=' tracking-wide text-white text-sm font-bold mb-2'>
									Telefono
								</label>
								<Field
									type='text'
									name='phone'
									placeholder='Telefono *'
									className={
										errors.lastName
											? "appearance-none text-sm mt-2 py-2 px-3 w-full bg-red-100 text-gray-700 border border-customRed rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
											: "appearance-none text-sm mt-2 py-2 px-3 w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
									}
								/>
								<ErrorMessage name='phone'>
									{(msg) => (
										<div className='text-customRed italic pl-1 text-xs font-semibold'>
											{msg}
										</div>
									)}
								</ErrorMessage>
							</div>
						</div>
						<div className='w-full flex flex-col items-center justify-center '>
							<div className='w-[80%]  p-3'>
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
							</div>
							<button
								type='submit'
								// disabled={isSubmitting}
								className='bg-brown hover:bg-nav text-white font-bold  py-2 px-4 rounded border-2 border-transparent focus:outline-none focus:shadow-outline hover:text-green-800 hover:border-green-800  disabled:opacity-5'>
								Enviar
							</button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default Form_med;
