'use client'
import {ReactElement} from "react";
import Link from "next/link";

const NotFoundPage = (): ReactElement => {
    return (
        <>
            <p>404 woupsi</p>
            <Link href={'/'}>Back to games</Link>
        </>
    )
}
export default NotFoundPage