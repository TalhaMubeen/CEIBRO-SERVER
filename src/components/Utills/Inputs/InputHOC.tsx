import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React, { FC } from 'react'
import colors from '../../../assets/colors'

interface InputHOCInterface {
    title: string

}

const InputHOC: FC<InputHOCInterface> = (props) =>  {
    const { children, title } = props
    const classes = useStyles()

    return (
        <div className={classes.outerWrapper}>
            <div className={classes.titleWrapper}>
                <Typography className={classes.title}>
                    {title}
                </Typography>
            </div>
            {children}
        </div>
    )
}

export default InputHOC

const useStyles = makeStyles({
    outerWrapper: {
        background: colors.white,
        display: 'flex',
        alignItems: 'center',
        border: `1px solid ${colors.grey}`,
        paddingRight: 8,
        borderRadius: 4
    },
    titleWrapper: {
        padding: 11,
        flex: 1,
        borderRight: `1px solid ${colors.lightGrey}`
    },
    title: {
        fontSize: 10,
        fontWeight: 500,
        color: colors.textGrey
    }
})
