import React, { FC } from 'react'
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
    return (
        <div style={{ width: '100%'}}>
            <FormControlLabel
                control={<CustomCheckbox checked={checked} />}
                label={label}
            />
        </div>
    )
}

export default InputCheckbox
