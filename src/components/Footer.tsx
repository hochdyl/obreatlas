'use client'
import React, {ReactElement} from "react";
import AppVersion from "@/components/AppVersion";

const Footer = (): ReactElement => {
    return (
        <footer>
            <AppVersion/>
        </footer>
    )
}
export default Footer