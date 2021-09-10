import React, { FC } from 'react'
import { makeStyles } from '@material-ui/core'
import InputHOC from './InputHOC'

interface My {
    title: string
}

const SelectDropdown: FC<My> = (props) => {

    const classes = useStyles()

    return (
        <InputHOC title={props.title}>
            <select name="cars" id="cars" className={classes.dropdown}>
                <option value="volvo">All</option>
                <option value="saab">Alex</option>
                <option value="mercedes">Colin</option>
                <option value="audi">Ingram</option>
            </select>
        </InputHOC>
    )
}

export default SelectDropdown



const useStyles = makeStyles({
    dropdown: {
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
