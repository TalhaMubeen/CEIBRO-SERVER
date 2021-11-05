import React from 'react'
import { useDispatch } from 'react-redux'
import { Typography, Button, makeStyles } from '@material-ui/core'
import projectActions from '../../redux/action/project.action'
import taskActions from '../../redux/action/task.action'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import colors from '../../assets/colors'

const Title = () => {
    
    const dispatch = useDispatch()
    const { location } = useHistory()
    const classes = useStyles()

    const openProjectDrawer = () => {
        dispatch(projectActions.openDrawer())
    }

    const openTaskDrawer = () => {
        dispatch(taskActions.openDrawer())
    }

    const getTitle = () => {
        if(location.pathname.includes('project')) return (
            <>
                <Typography variant="h6" component="h6">
                    Project
                </Typography>
                <Button 
                    onClick={openProjectDrawer} 
                    size="small" 
                    color="primary" 
                    variant="contained"
                >
                    Create
                </Button>
            </>
        )


        if(location.pathname.includes('task')) return (
            <>
                <Typography variant="h6" component="h6">
                    Task
                </Typography>
                <Button 
                    onClick={openTaskDrawer} 
                    size="small" 
                    color="primary" 
                    variant="contained"
                >
                    Create
                </Button>
            </>
        )

        if(location.pathname.includes('dashboard')) return (
            <>
                <Typography variant="h6" component="h6">
                    Dashboard
                </Typography>
                <Button 
                    size="small" 
                    color="primary" 
                    variant="contained"
                >
                    <Link className={classes.login} to="/login">
                        Login
                    </Link>
                </Button>
            </>
        )
        
    }
    
    return (
        <>
            {getTitle()}
        </>
    )
}

export default Title

const useStyles = makeStyles({
    login: {
        color: colors.white,
        textDecoration: 'none'
    }
})