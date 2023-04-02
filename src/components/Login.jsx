import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Swal from "sweetalert2";
import * as Yup from "yup";
// import { Web3Button } from '@web3modal/react'

const Login = () => {
    const { type } = useParams();
    const navigate = useNavigate();
    const swappUpSuccess = (name) => {
        Swal.fire({
            icon: "success",
            title: `Bienvenid@ de vuelta!`,
            showConfirmButton: false,
            timer: 2500,
        });
    };
    return  (
        <Formik
            initialValues={{
                email: "",
                password: "",
            }}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                resetForm();
                swappUpSuccess();
                setTimeout(navigate(`/${type}`), 1000);
            }}
            validationSchema={Yup.object({
                email: Yup.string()
                    .email("Direccion de mail invalida")
                    .required("Direccion de mail requerida. *"),
                password: Yup.string()
                    .min(6, "La contraseña debe contener al menos 6 caracteres")
                    .required("Contraseña requerida. *"),
            })}>
            {({ isSubmitting, errors }) => (
                <Form className='relative w-full mx-auto max-w-2xl bg-customGray p-4 flex flex-col justify-center items-center gap-2 my-8 rounded'>
                    {/* <label
                        htmlFor='user'
                        className='block tracking-wide text-white text-left text-s font-bold mb-2 mt-10'>
                        Email
                    </label> */}
                    <div className='w-full px-3'>
                        <Field
                            type='text'
                            name='email'
                            placeholder='email*'
                            className={
                                errors.email
                                    ? "appearance-none block w-full bg-red-100 text-gray-700 border border-customRed rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                    : "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            }
                        />
                        <ErrorMessage name='email'>
                            {(msg) => (
                                <div className='text-white italic pl-1 text-base font-semibold'>
                                    {msg}
                                </div>
                            )}
                        </ErrorMessage>
                        {/* <Web3Button /> */}
        </div>
                    {/* <label
                        htmlFor='password'
                        className='block tracking-wide text-white text-s font-bold mb-2 pt-5'>
                        Contraseña
                    </label> */}
                    <div className='w-full px-3'>
                        <Field
                            type='password'
                            name='password'
                            placeholder='contraseña *'
                            className={
                                errors.password
                                    ? "appearance-none block w-full bg-red-100 text-red-700 border border-customRed rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                    : "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            }
                        />
                        <ErrorMessage name='password'>
                            {(msg) => (
                                <div className='text-white italic pl-1 text-base font-semibold'>
                                    {msg}
                                </div>
                            )}
                        </ErrorMessage>
                    </div>
                    <div className="w-full px-3">
                        <button
                            type='submit'
                            className='rounded text-l bg-med w-full text-white font-bold p-3 py-3 mb-5 mx-auto hover:bg-lime-500'
                            disabled={isSubmitting}>
                            Iniciar Sesión
                        </button>

                    </div>

                </Form>
            )}
        </Formik>
    );
};

export default Login;
