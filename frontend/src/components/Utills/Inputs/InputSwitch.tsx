import React, { FC, useState } from 'react'
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch, { SwitchClassKey, SwitchProps } from '@material-ui/core/Switch';

import './inputText.css'
import { Typography } from '@material-ui/core';

interface InputSwitchtInterface {
    label: string
}

interface Styles extends Partial<Record<SwitchClassKey, string>> {
    focusVisible?: string;
  }
  
  interface Props extends SwitchProps {
    classes: Styles;
  }

const InputTextArea: FC<InputSwitchtInterface> = (props) => {
    const [checked, setChecked] = useState(true)
    const { label } = props

    const toggle = () => setChecked(!checked)

    return (
        <div style={styles.wrapper}>
            <FormControlLabel
                control={<IOSSwitch checked={checked} name="checkedB" />}
                label={<Typography style={styles.formControlLabel}>{label}</Typography>}
                onClick={toggle}
            />
        </div>
    )
}

export default InputTextArea

const styles = {
    wrapper: {
        width: '100%'
    },
    formControlLabel: {
        fontSize: 14,
        fontWeight: 500
    }
}

const IOSSwitch = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 40,
      height: 22,
      padding: 0,
      margin: theme.spacing(1),
    },
    switchBase: {
      padding: 1,
      '&$checked': {
        transform: 'translateX(16px)',
        color: theme.palette.common.white,
        '& + $track': {
          backgroundColor: '#52d869',
          opacity: 1,
          border: 'none',
        },
      },
      '&$focusVisible $thumb': {
        color: '#52d869',
        border: '6px solid #fff',
      },
    },
    thumb: {
      width: 20,
      height: 20,
    },
    track: {
      borderRadius: 26 / 2,
      border: `1px solid ${theme.palette.grey[400]}`,
      backgroundColor: theme.palette.grey[50],
      opacity: 1,
      transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
    focusVisible: {},
  }),
)(({ classes, ...props }: Props) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});
