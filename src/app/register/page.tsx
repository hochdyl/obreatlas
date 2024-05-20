import {ReactElement} from "react";
import RegisterUserForm from "@/features/authentication/RegisterUserForm";

const Register= (): ReactElement => {

    return (
        <main>
            <h1>Register</h1>
            <RegisterUserForm/>
        </main>
    );
}
export default Register