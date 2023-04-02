import React from "react";
import { Web3Button } from '@web3modal/react'

const Login = () => {

    return (
        <div className="w-full h-96 flex flex-col justify-center items-center gap-5">
            <button className="rounded text-3xl bg-button w-96 p-5 hover:bg-lime-500">Conectar Wallet</button>
            {/* <Web3Button /> */}
        </div>
    )
}

export default Login;