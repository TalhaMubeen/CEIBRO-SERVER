import React from 'react'
import { Button, Grid, makeStyles, Typography } from '@material-ui/core'
import StatusMenu from '../Utills/Others/StatusMenu'
import { getAllStatus } from '../../config/project.config'
import TaskList from './TaskList'
import taskActions from '../../redux/action/task.action'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'

const myStatus = [
    
    {
        title: 'Ongoing',
        count: 8
    },
    {
        title: 'Approved',
        count: 1
    },
    {
        title: 'Done',
        count: 5
    },
    {
        title: 'Draft',
        count: 2
    }
]

interface TaskSectionInt {

}

const TaskSection: React.FC<TaskSectionInt> = () => {
    const allStatus = myStatus
    const dispatch = useDispatch()
    const history = useHistory()
    const classes = useStyles()

    const openTaskDrawer = () => {
        dispatch(taskActions.openDrawer())
    }

    const handleClick = () => {
        history.push('/tasks')
    }

    return (
        <div>
            <Grid container alignItems="center">
                <Grid item xs={12} md={3} className={classes.titleContainer} style={styles.titleContainer}>
                    <Typography component="h1" variant="h5">
                        My Tasks
                    </Typography>
                    <Button onClick={openTaskDrawer} variant="contained" color="primary" size="small" style={styles.btn}>
                        Create
                    </Button>
                </Grid>
                <Grid style={styles.menuWrapper} className={classes.menuWrapper} item xs={12} md={8}>
                    <StatusMenu
                        options={allStatus}
                    />
                </Grid>
                <Grid item xs={12} md={1}>
                    <Button onClick={handleClick} className={classes.viewAll} variant="outlined" color="primary" size="medium" style={styles.viewAll} >
                        View all
                    </Button>
                </Grid>
            </Grid>
            <TaskList />
        </div>
    )
}

export default TaskSection

const useStyles = makeStyles({
    menuWrapper: {
        display: 'flex',
        justifyContent: 'flex-end',
        flexWrap: 'wrap',
        ['@media (max-width:960px)']: {
            justifyContent: 'flex-start',
        }
    },
    titleContainer: {
        ['@media (max-width:960px)']: {
            paddingTop: 14,
            paddingBottom: 14
        }
    },
    viewAll: {
        ['@media (max-width:960px)']: {
            marginLeft: 10,
            marginTop: 10
        }
    }
})

const styles = {
    menuWrapper: {
        display: 'flex',
    },
    titleContainer: {
        display: 'flex'
    },
    btn: {
        marginLeft: 10
    },
    viewAll: {
        fontSize: 9
    }
}