import React from 'react'
import { makeStyles } from '@material-ui/core'
import InputHOC from './InputHOC'

const DatePicker = () => {

    const classes = useStyles()

    return (
        <InputHOC title="Due Date">
            <input className={classes.dateInput} type="date" />
        </InputHOC>
    )
}

export default DatePicker



const useStyles = makeStyles({
    dateInput: {
        border: 'none',
        background: 'transparent',
        flex: 3,
        '&:focus': {
            border: 'transparent'
        },
        '&:active': {
            border: 'transparent'
        },
        '&:focus-visible': {
            outline: 'transparent'
        }
    },
})
