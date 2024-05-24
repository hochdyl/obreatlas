'use client'
import {ReactElement} from "react";
import Link from "next/link";

const NotFound = (): ReactElement => {
    return (
        <main>
            <p>404 woupsi</p>
            <Link href={'/'}>Back to games</Link>
        </main>
    )
}
export default NotFound