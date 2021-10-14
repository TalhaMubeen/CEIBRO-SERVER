import React from 'react'
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import colors from '../../../assets/colors';
import { GrClose } from 'react-icons/gr'
import { useDispatch } from 'react-redux';
import taskActions from '../../../redux/action/task.action';

const TaskDrawerHeader = () => {
    const classes = useStyles()

    const dispatch = useDispatch()

    const handleClose = () => {
        dispatch(taskActions.closeDrawer())
    }

    return (
        <div className={classes.drawerHeader}>
            <div className={classes.headerTitleWrapper}>
                <Typography className={classes.headerTitle}>
                    New Task
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

export default TaskDrawerHeader;

const useStyles = makeStyles({
    drawerHeader: {
        backgroundColor: colors.white,
        height: 50,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 10,
        borderBottom: `0.5px solid ${colors.grey}`
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
