'use client'
import {ReactElement} from "react";
import LoginUserForm from "@/features/authentication/LoginUserForm";
import RegisterUserForm from "@/features/authentication/RegisterUserForm";

const Authentication = (): ReactElement => {
    return (
        <main>
            Obreatlas
            <LoginUserForm/>
            <RegisterUserForm/>
        </main>
    );
}
export default Authentication