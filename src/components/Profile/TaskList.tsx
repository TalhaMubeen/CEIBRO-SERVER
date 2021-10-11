
import { Grid } from '@material-ui/core'
import React from 'react'
import TaskCard, { ProjectInterface } from '../Utills/TaskCard/TaskCard'

const TaskList = () => {
    return (
        <Grid container>
            {projects && 
                projects.map((project: ProjectInterface, index: number) => {
                    return (
                        <TaskCard key={index} project={project}/>
                    )
                })
            }
        </Grid>
    )
}

export default TaskList 

const projects: ProjectInterface[] = [
    {
        dueDate: '26-07-2021',
        owner: 'Ilja Nikolajev',
        title: 'New project Title 1',
        subTasks: 50,
        docs: 250,
        chat: 0,
        status: "Draft",
        assignedTo: "Vesse-12"
    },
    {
        dueDate: '26-07-2021',
        owner: "Vesse-12",
        title: 'New project Title 1',
        subTasks: 50,
        docs: 250,
        chat: 0,
        status: "Submitted",
        assignedTo: "PaeVellja 112-4"
    },
    {
        dueDate: '26-07-2021',
        owner: 'Ilja Nikolajev',
        title: 'New project Title 1',
        subTasks: 50,
        docs: 250,
        chat: 0,
        status: "Rejected",
        assignedTo: "PaeVellja 112-4"
    },
    {
        dueDate: '26-07-2021',
        owner: "PaeVellja 112-4",
        title: 'New project Title 1',
        subTasks: 50,
        docs: 250,
        chat: 0,
        status: "Submitted",
        assignedTo: "Vesse-18"
    },
]

