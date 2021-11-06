import React from 'react'
import { Grid, makeStyles } from '@material-ui/core'
// import ProjectOverview from './ProjectOverview/ProjectOverview'
// import ProjectRoles from './ProjectRoles/ProjectRoles'
// import ProjectMembers from './ProjectMember/ProjectMembers'
// import ProjectGroups from './ProjectGroups/ProjectGroups'
// import ProjectDocuments from './ProjectDocuments/ProjectDocuments'
// import TimeProfile from './TimeProfile/TimeProfile'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/reducers'
import DrawerSubTask from './DrawerSubTask'

const CreateProjectBody = () => {
    const classes = useStyles()

    const selectedMenue = useSelector((state: RootState) => state.project.menue)

    return (
        <Grid container className={classes.body}>
            <DrawerSubTask/>
            <DrawerSubTask/>
            <DrawerSubTask/>
            <DrawerSubTask/>
            <DrawerSubTask/>
            <DrawerSubTask/>
        </Grid>
    )
}

export default CreateProjectBody


const useStyles = makeStyles({
    body: {
        padding: 20,
        overflow: 'scroll',
        height: 'calc(100vh - 230px)',    
    }
})
