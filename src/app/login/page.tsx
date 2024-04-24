import {ReactElement} from "react";
import LoginUserForm from "@/features/authentication/LoginUserForm";

const Login = (): ReactElement => {

    return (
        <main>
            <h1>Login</h1>
            <LoginUserForm/>
        </main>
    );
}
export default Login