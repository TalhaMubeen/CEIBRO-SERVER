import React from 'react'
import { Grid, makeStyles, Typography } from '@material-ui/core'
import colors from '../../../../assets/colors'
import HorizontalBreak from '../../../Utills/Others/HorizontalBreak'
import { useDispatch, useSelector } from 'react-redux'
import projectActions from '../../../../redux/action/project.action'
import { RootState } from '../../../../redux/reducers'
import { useMediaQuery } from 'react-responsive'

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
    const dispatch = useDispatch()

    const selectedMenue = useSelector((state: RootState) => state.project.menue)
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 960px)'})

    const handleClick = (id:number) => {
        dispatch(projectActions.setMenue(id))
    }

    return (
        <>
            <Grid container>
                {menus && menus.map((menu, index) => {
                    return (
                        <div key={index} className={`${classes.statusChip}`} onClick={() => handleClick(menu.id)}>
                            <Typography className={classes.menu} style={{ color: selectedMenue === menu.id? colors.black: colors.primary}}>
                                {menu.title}
                            </Typography>
                        </div>
                    )
                })}
            </Grid>
            {!isTabletOrMobile && <Grid container className={classes.breakContainer}>
                <HorizontalBreak/>
            </Grid>}
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
        justifyContent: 'space-around',
        ['@media (max-width:960px)']: {
            justifyContent: 'flex-start'
        }
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
