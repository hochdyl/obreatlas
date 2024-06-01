'use client'
import {ReactElement} from "react";

type AutocompleteProps = {
    onSelect: () => void
}

const Autocomplete = ({onSelect}: AutocompleteProps): ReactElement => {
    return (
        <>
            <input type="text" placeholder="search"/>
            <button onClick={() => onSelect()}>Simuler la selection</button>
        </>
    )
}
export default Autocomplete