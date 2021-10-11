
import { Grid } from '@material-ui/core'
import React from 'react'
import ProjectCard, { ProjectInterface } from '../Utills/ProjectCard/ProjectCard'
import CreateProject from '../Utills/ProjectCard/CreateProjectCard'

const ProjectList = () => {
    return (
        <Grid container>
            {projects && 
                projects.map((project: ProjectInterface, index: number) => {
                    return (
                        <ProjectCard key={index} project={project}/>
                    )
                })
            }
        </Grid>
    )
}

export default ProjectList

const projects: ProjectInterface[] = [
    {
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJiA64OL0zB3WgkXuD6CIgbJoUhYIlwcX-lZUX10zqSzENf803PFTNHpcDn3p6nIZjvWY&usqp=CAU',
        dueDate: '26-07-2021',
        owner: 'Ilja Nikolajev',
        title: 'New project Title 1',
        tasks: 50,
        docs: 250,
        users: 47,
        chat: 0,
        status: "Draft",
        statusDate: "22-05-2021"
    },
    {
        src: 'http://www.houseprojectonline.com/admin/galerija/85.ALUDRA.jpg',
        dueDate: '26-07-2021',
        owner: 'IIljalajeadfadf ajdlfjas ldv',
        title: 'New project Title 2',
        tasks: 40,
        docs: 10,
        users: 97,
        chat: 5,
        status: "Ongoing",
        statusDate: "22-05-2021"
    },
    {
        src: 'https://images.adsttc.com/media/images/5ecd/d4ac/b357/65c6/7300/009d/newsletter/02C.jpg?1590547607',
        dueDate: '26-07-2021',
        owner: 'Bjlaksdolajev',
        title: 'New project Title 3',
        tasks: 50,
        docs: 250,
        users: 47,
        chat: 0,
        status: "Completed",
        statusDate: "22-05-2021"
    },
    {
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJiA64OL0zB3WgkXuD6CIgbJoUhYIlwcX-lZUX10zqSzENf803PFTNHpcDn3p6nIZjvWY&usqp=CAU',
        dueDate: '26-07-2021',
        owner: 'Ilja Nikolajev',
        title: 'New project Title 1',
        tasks: 50,
        docs: 250,
        users: 47,
        chat: 0,
        status: "Draft",
        statusDate: "22-05-2021"
    }
]

