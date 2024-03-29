import Link from "next/link";
import {FC} from "react";

const Home: FC = () => {
    return (
        <main>
            <Link href={'/register'}>Register</Link>
            <Link href={'/login'}>Login</Link>
            Fiche perso
        </main>
    );
}
export default Home