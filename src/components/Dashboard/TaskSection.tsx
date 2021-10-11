import React from 'react'
import { Button, Grid, Typography } from '@material-ui/core'
import StatusMenu from '../Utills/Others/StatusMenu'
import { getAllStatus } from '../../config/project.config'
import TaskList from './TaskList'

interface TaskSectionInt {

}

const TaskSection: React.FC<TaskSectionInt> = () => {
    const allStatus = getAllStatus()
    
    return (
        <div>
            <Grid container alignItems="center">
                <Grid item xs={6} style={styles.titleContainer}>
                    <Typography component="h1" variant="h5">
                        My Tasks
                    </Typography>
                    <Button variant="contained" color="primary" size="small" style={styles.btn}>
                        Create
                    </Button>
                </Grid>
                <Grid style={styles.menuWrapper} item xs={6}>
                    <StatusMenu
                        options={allStatus.splice(1, allStatus.length)}
                    />
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
    }
}