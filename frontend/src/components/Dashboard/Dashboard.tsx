import { Grid, makeStyles } from '@material-ui/core'
import ProjectSection from './ProjectSection'
import TaskSection from './TaskSection'
import SmartMenuBar from './SmartMenuBar'

const Dashboard = () => {

    const classes = useStyles()

    return (
        <Grid item xs={12}>
            <SmartMenuBar/>
            <TaskSection/>
            <ProjectSection/>
        </Grid>
    )
}

export default Dashboard

const useStyles = makeStyles({
    datePicker: {
        padding: 5
    },
    allStatus: {
        paddingLeft: 5
    }
})
