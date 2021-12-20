import React from 'react'
import { Badge, makeStyles, Typography } from '@material-ui/core'
import { getColorByStatus } from '../../../config/project.config'
import { getStyleClass } from '../../../config/styles.config'
import colors from '../../../assets/colors'

interface StatusMenuInt {
   title: string;
   count: number; 
}

interface StatusMenuProps {
    options: StatusMenuInt[]
}


export const StatusMenu: React.FC<StatusMenuProps> = (props) => {
    const { options } = props
    const classes = useStyles()
    
    return (
        <>
          {options && options.map((option, index) => {
                    return (
                    <div key={index} className={`${classes.statusChip} ${getStyleClass(option.title)}`}>
                        <Typography className={classes.chipTitle}>
                            {option.title}
                        </Typography>
                        <Badge color="primary" badgeContent={option.count} >
                        </Badge>
                    </div>
                )
                })}  
        </>
    )
}

export default StatusMenu



const useStyles = makeStyles({
    statusChip: {
        padding: "10px 10px",
        width: 100,
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'space-around',
        ['@media (max-width:960px)']: {
            justifyContent: 'space-between',
        }
    },
    chipTitle: {
        color: colors.primary,
        fontSize: 14,
        fontWeight: 500
    },
    ongoing: {
        background: getColorByStatus('ongoing')
    }
    ,
    completed: {
        background: getColorByStatus('completed')
    }
    ,
    draft: {
        background: getColorByStatus('draft')
    },
    approved: {
        background: getColorByStatus('approved')
    },
    submitted: {
        background: getColorByStatus('submitted')
    },
    rejeced: {
        background: getColorByStatus('rejected')    
    }
})
