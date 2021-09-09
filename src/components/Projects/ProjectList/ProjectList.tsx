
import React from 'react'
import ProjectCard from '../../Utills/ProjectCard/ProjectCard'
const ProjectList = () => {
    return (
        <div>
            {projects && 
                projects.map(project => {
                    return (
                        <ProjectCard 
                            src={project.src}
                            dueDate={project.dueDate}
                            owner={project.owner}
                            title={project.title}
                        />
                    )
                })
            }
        </div>
    )
}

export default ProjectList

const projects = [
    {
        src: 'https://lh3.googleusercontent.com/proxy/ptx0HiI8D4-a21cwZ-qQPHPFqN8oNYRVVNGgFESpyFFEhMfx3eN7EaKtJGT0Dt5wcSJFDLDsTRQepvlnZLLasseyTcgPENnHWHXEkpT-RFJINLVgr6skgV5Wy2xiGfjI',
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

