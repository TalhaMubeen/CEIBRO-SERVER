import React from 'react'
import DatePicker from '../Utills/Inputs/DatePicker'
import SelectDropdown from '../Utills/Inputs/SelectDropdown'
import { Grid, makeStyles } from '@material-ui/core'
import ProjectSection from './ProjectSection'
import TaskSection from './TaskSection'

const Dashboard = () => {

    const classes = useStyles()

    return (
        <Grid item xs={12}>
            {/* <Grid container>
                <Grid item xs={3} className={classes.datePicker}>
                    <DatePicker/>
                </Grid>

                <Grid item xs={4} className={classes.datePicker}>
                    <SelectDropdown title="Assigned to" />
                </Grid>

                <Grid item xs={4} className={classes.datePicker}>
                    <SelectDropdown title="Projects" />
                </Grid>
            </Grid> */}
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
