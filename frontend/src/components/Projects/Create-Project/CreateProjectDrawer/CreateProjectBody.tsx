import React from 'react'
import { Grid, makeStyles } from '@material-ui/core'
import ProjectOverview from './ProjectOverview/ProjectOverview'
import ProjectRoles from './ProjectRoles/ProjectRoles'
import ProjectMembers from './ProjectMember/ProjectMembers'
import ProjectGroups from './ProjectGroups/ProjectGroups'
import ProjectDocuments from './ProjectDocuments/ProjectDocuments'
import TimeProfile from './TimeProfile/TimeProfile'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../redux/reducers'

const CreateProjectBody = () => {
    const classes = useStyles()

    const selectedMenue = useSelector((state: RootState) => state.project.menue)

    return (
        <Grid container className={classes.body}>
            {selectedMenue === 1 && <ProjectOverview/>}
            {selectedMenue === 2 && <ProjectRoles/>}
            {selectedMenue === 3 && <ProjectGroups/>}
            {selectedMenue === 4 && <ProjectDocuments/>}
            {selectedMenue === 5 && <ProjectMembers/>}
            {selectedMenue === 6 && <TimeProfile/>}
        </Grid>
    )
}

export default CreateProjectBody


const useStyles = makeStyles({
    body: {
        padding: 20,
        overflowY: 'scroll',
        height: 'calc(100vh - 230px)',
        ['@media (max-width:960px)']: {
            paddingTop: 10
        }
    }
})
