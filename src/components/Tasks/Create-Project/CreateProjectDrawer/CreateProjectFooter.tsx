import React from 'react'
import { Button, Grid, makeStyles } from '@material-ui/core'
import ProjectOverview from './ProjectOverview/ProjectOverview'
import ProjectRoles from './ProjectRoles/ProjectRoles'
import ProjectMembers from './ProjectMember/ProjectMembers'
import ProjectGroups from './ProjectGroups/ProjectGroups'
import ProjectDocuments from './ProjectDocuments/ProjectDocuments'
import TimeProfile from './TimeProfile/TimeProfile'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../redux/reducers'
import colors from '../../../../assets/colors'
import { BiTrash } from 'react-icons/bi'
import { FaTrash } from 'react-icons/fa'

const CreateProjectBody = () => {
    const classes = useStyles()

    const selectedMenue = useSelector((state: RootState) => state.project.menue)

    return (
        <Grid container justifyContent="flex-end" className={classes.body}>
            <Button className={classes.draft} color="primary">Save as draft</Button>
            <Button className={classes.trash} color="primary">
                <FaTrash/>
            </Button>
            <Button className={classes.create} variant="contained" color="primary">
                Create project 
            </Button>

        </Grid>
    )
}

export default CreateProjectBody


const useStyles = makeStyles({
    body: {
        padding: 20,
        background: colors.white
    },
    create: {
        marginLeft: 50,
        fontSize: 12,
        fontWeight: 500
    },
    draft: {
        fontSize: 12,
        fontWeight: 500
    },
    trash: { 
        color: 'red'
    }
})
