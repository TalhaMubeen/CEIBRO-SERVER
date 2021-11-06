import React from 'react'
import { Button, Grid, Typography } from '@material-ui/core'
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
        title: 'Submitted',
        count: 3
    },
    {
        title: 'Rejected',
        count: 5
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
        count: 12
    }
]

interface TaskSectionInt {

}

const TaskSection: React.FC<TaskSectionInt> = () => {
    const allStatus = myStatus
    const dispatch = useDispatch()
    const history = useHistory()

    const openTaskDrawer = () => {
        dispatch(taskActions.openDrawer())
    }

    const handleClick = () => {
        history.push('/tasks')
    }

    return (
        <div>
            <Grid container alignItems="center">
                <Grid item xs={12} md={3} style={styles.titleContainer}>
                    <Typography component="h1" variant="h5">
                        My Tasks
                    </Typography>
                    <Button onClick={openTaskDrawer} variant="contained" color="primary" size="small" style={styles.btn}>
                        Create
                    </Button>
                </Grid>
                <Grid style={styles.menuWrapper} item xs={12} md={8}>
                    <StatusMenu
                        options={allStatus}
                    />
                </Grid>
                <Grid item xs={12} md={1}>
                    <Button onClick={handleClick} variant="outlined" color="primary" size="medium" style={styles.viewAll} >
                        View all
                    </Button>
                </Grid>
            </Grid>
            <TaskList />
        </div>
    )
}

export default TaskSection

const styles = {
    menuWrapper: {
        display: 'flex'
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