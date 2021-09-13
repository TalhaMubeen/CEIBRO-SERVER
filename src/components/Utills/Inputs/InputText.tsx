import React, { FC } from 'react'
import './inputText.css'

interface InputTextInterface {
    placeholder?: string;
}

const InputText: FC<InputTextInterface> = (props) => {
    const { placeholder } = props
    return (
        <div style={{ width: '100%'}}>
            <input 
                placeholder={placeholder}
                type="text" 
                className="input-text" 
            />
        </div>
    )
}

export default InputText
