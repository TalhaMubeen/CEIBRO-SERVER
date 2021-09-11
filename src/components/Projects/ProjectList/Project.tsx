import React from 'react'
import ProjectList from './ProjectList'
import DatePicker from '../../Utills/Inputs/DatePicker'
import SelectDropdown from '../../Utills/Inputs/SelectDropdown'
import { Badge, Grid, makeStyles, Typography } from '@material-ui/core'
import { getAllStatus, getColorByStatus } from '../../../config/project.config'

const Project = () => {

    const classes = useStyles()

    const allStatus = getAllStatus()

    const getStyleClass = (status: string) => {
        console.log('hllo', status)
        switch(status.toLowerCase()) {
            case 'all':
            return 'all-badge';

            case 'ongoing':
                return 'ongoing-badge';

            case 'completed':
                return 'completed-badge'
            case 'done':
                return 'completed-badge';
                
            case 'approved':
                return 'approved-badge';

            case 'draft':
                return 'draft-badge'
            
        }
    }

    return (
        <Grid xs={12}>
            <Grid container xs={12}>
                <Grid item xs={3} className={classes.datePicker}>
                    <DatePicker/>
                </Grid>

                <Grid item xs={4} className={classes.datePicker}>
                    <SelectDropdown title="Assigned to" />
                </Grid>

                <Grid item xs={4} className={classes.datePicker}>
                    <SelectDropdown title="Projects" />
                </Grid>
            </Grid>

            <Grid container className={classes.allStatus}>
                {allStatus && allStatus.map(status => {
                    return (
                    <div className={`${classes.statusChip} ${getStyleClass(status.title)}`}>
                        <Typography>
                            {status.title}
                        </Typography>
                        <Badge color="primary" badgeContent={status.count}>
                        </Badge>
                    </div>
                )
                })}
            </Grid>

            <ProjectList/>
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
