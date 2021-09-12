import React from 'react'
import { Grid, makeStyles, Typography } from '@material-ui/core'
import colors from '../../../../assets/colors'
import HorizontalBreak from '../../../Utills/Others/HorizontalBreak'

const menus = [
    {
        id: 1,
        title: 'Overview'
    },
    {
        id: 2,
        title: 'Role(s)'
    },
    {
        id: 3,
        title: 'Group(s)'
    },
    {
        id: 4,
        title: 'Documents'
    },
    {
        id: 5,
        title: 'Members'
    },
    {
        id: 6,
        title: 'Time Profile'
    }
]

function ProjectDrawerMenu() {
    const classes = useStyles()
    return (
        <>
            <Grid container>
                {menus && menus.map((menu, index) => {
                    return (
                        <div key={index} className={`${classes.statusChip}`}>
                            <Typography className={classes.menu}>
                                {menu.title}
                            </Typography>
                        </div>
                    )
                })}
            </Grid>
            <Grid container className={classes.breakContainer}>
                <HorizontalBreak/>
            </Grid>
        </>
    )
}

export default ProjectDrawerMenu


const useStyles = makeStyles({
    statusChip: {
        padding: "10px 10px",
        width: 80,
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    menu: {
        fontSize: 14,
        fontWeight: 500,
        color: colors.primary,
        cursor: 'pointer'
    },
    breakContainer: {
        padding: '5px 25px 25px 25px'
    }
})
