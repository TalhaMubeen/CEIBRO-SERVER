import React from 'react'
import SubTaskList from './SubTaskList'
import DatePicker from '../../Utills/Inputs/DatePicker'
import SelectDropdown from '../../Utills/Inputs/SelectDropdown'
import { Grid, makeStyles } from '@material-ui/core'
import { getAllStatus, getColorByStatus } from '../../../config/project.config'
import StatusMenu from '../../Utills/Others/StatusMenu'

const Project = () => {

    const classes = useStyles()

    const allStatus = getAllStatus()

    return (
        <Grid item xs={12}>
            <Grid container>
                <Grid item xs={12} md={3} className={classes.datePicker}>
                    <DatePicker/>
                </Grid>

                <Grid item xs={12} md={4} className={classes.datePicker}>
                    <SelectDropdown title="Assigned to" />
                </Grid>

                <Grid item xs={12} md={4} className={classes.datePicker}>
                    <SelectDropdown title="Projects" />
                </Grid>
            </Grid>

            <Grid container className={classes.allStatus}>
                <StatusMenu
                    options={allStatus}
                />
            </Grid>

            <SubTaskList/>
        </Grid>
    )
}

export default Project

const useStyles = makeStyles({
    datePicker: {
        padding: 5
    },
    allStatus: {
        paddingLeft: 5
    },
    statusChip: {
        padding: "10px 10px",
        width: 100,
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    ongoing: {
        background: getColorByStatus('ongoing')
    }

    ,
    completed: {
        background: getColorByStatus('completed')
    }

    ,
    draft: {
        background: getColorByStatus('draft')
    },

    approved: {
        background: getColorByStatus('approved')
    },


})
