import React, { FC, useState } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';

import './inputText.css'
import colors from '../../../assets/colors';
import { FormControlLabel } from '@material-ui/core';


const CustomCheckbox = withStyles({
    root: {
      color: colors.darkYellow,
      '&$checked': {
        color: colors.darkYellow,
      },
    },
    checked: {},
  })((props: CheckboxProps) => <Checkbox color="default" {...props} />);



interface InputCheckboxInterface {
    checked: boolean
    label?: string
}

const InputCheckbox: FC<InputCheckboxInterface> = (props) => {
    const { checked, label } = props

    const [check, setChecked] = useState<boolean>(checked)

    const toggle = () => {
      setChecked(!check)
    }

    return (
        <div style={{ width: '100%'}}>
            <FormControlLabel
                control={<CustomCheckbox checked={check} />}
                label={label}
                onClick={toggle}
            />
        </div>
    )
}

export default InputCheckbox
