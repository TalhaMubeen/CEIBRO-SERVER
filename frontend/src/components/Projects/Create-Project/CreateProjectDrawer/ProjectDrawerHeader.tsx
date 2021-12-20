import React from 'react'
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import colors from '../../../../assets/colors';
import { GrClose } from 'react-icons/gr'
import { useDispatch } from 'react-redux';
import projectActions from '../../../../redux/action/project.action';

const ProjectDrawerHeader = () => {
    const classes = useStyles()

    const dispatch = useDispatch()

    const handleClose = () => {
        dispatch(projectActions.closeDrawer())
    }

    return (
        <div className={classes.drawerHeader}>
            <div className={classes.headerTitleWrapper}>
                <Typography className={classes.headerTitle}>
                    New Project
                </Typography>
            </div>
            <div className={classes.headerIcons} onClick={handleClose}>
                <Typography>
                    Close
                </Typography>
                <GrClose className={classes.icon} /> 
            </div>
        </div>
    )
}

export default ProjectDrawerHeader;

const useStyles = makeStyles({
    drawerHeader: {
        backgroundColor: colors.white,
        height: 50,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20
    },
    headerTitleWrapper: {
    },
    headerTitle: {
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: 30
    },
    headerIcons: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: colors.primary,
        cursor: 'pointer'
    },
    icon: {
        fontSize: 15,
        color: 'red',
        paddingLeft: 5
    }
})
