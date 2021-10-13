
import { Grid } from '@material-ui/core'
import React from 'react'
import { TaskInterface } from '../../constants/interfaces/task.interface'
import { TASKS } from '../../constants/task.constants'
import TaskCard from '../Utills/TaskCard/TaskCard'


const TaskList = () => {

    const tasks = TASKS.slice(0,4)

    return (
        <Grid container>
            {tasks && 
                tasks.map((task: TaskInterface, index: number) => {
                    return (
                        <TaskCard key={index} task={task}/>
                    )
                })
            }
        </Grid>
    )
}

export default TaskList 
