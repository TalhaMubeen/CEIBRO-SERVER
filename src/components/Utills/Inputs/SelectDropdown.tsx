import React, { FC } from 'react'
import { makeStyles } from '@material-ui/core'
import InputHOC from './InputHOC'
import Select from 'react-select'

const options = [
    { value: 'All', label: 'All' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]
  

interface My {
    title: string
}

const SelectDropdown: FC<My> = (props) => {

    const classes = useStyles()

    const style = {
        control: (base: any) => ({
          ...base,
          border: 0,
          // This line disable the blue border
          boxShadow: "none",
          flex: 2
        })
      };

    return (
        <InputHOC title={props.title}>
            <div className={classes.select}>
                <Select options={options} styles={style} value={options[0]} />
            </div>
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
    select: {
        flex: 3,
        zIndex: 2
    }
})
