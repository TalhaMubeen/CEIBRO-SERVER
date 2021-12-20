import React, { FC } from 'react'
import './inputText.css'

interface InputTexAreatInterface {
    placeholder?: string;
    rows?: number;
}

const InputTextArea: FC<InputTexAreatInterface> = (props) => {
    const { placeholder, rows } = props
    return (
        <div style={{ width: '100%'}}>
            <textarea 
                placeholder={placeholder}
                className="input-text-area"
                rows={rows || 8}
            />
        </div>
    )
}

export default InputTextArea
