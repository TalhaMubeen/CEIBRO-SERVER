import React from 'react'
import { Grid } from '@material-ui/core'
import { TASKS } from '../../../constants/task.constants'
import TaskTable from './TaskTable'
import EmptyTask from './EmptyTask'

const TaskList = () => {
    return (
        <Grid container>
            {TASKS?.length > 0 && <TaskTable/> }
            {TASKS?.length === 0 && <EmptyTask/> }
        </Grid>
    )
}

export default TaskList;
