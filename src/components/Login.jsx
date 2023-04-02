import React from "react";
import { useParams ,useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const {type} = useParams()

    return(
        <div className="w-full h-96 flex flex-col justify-center items-center gap-5">
            <button className="rounded text-3xl bg-button w-96 p-5 hover:bg-lime-500">Conectar Wallet</button>
        </div>
    )
}

export default Login;