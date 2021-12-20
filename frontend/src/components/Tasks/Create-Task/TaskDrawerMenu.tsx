import React from 'react'
import { Grid, makeStyles, Typography } from '@material-ui/core'
import colors from '../../../assets/colors'
import HorizontalBreak from '../../Utills/Others/HorizontalBreak'
import { useDispatch, useSelector } from 'react-redux'
import projectActions from '../../../redux/action/project.action'
import { RootState } from '../../../redux/reducers'
import InputText from '../../Utills/Inputs/InputText'
import SelectDropdown from '../../Utills/Inputs/SelectDropdown'
import DatePicker from '../../Utills/Inputs/DatePicker'
import DrawerSubTasks from './DrawerSubTask'
import CreateSubTask from '../SubTasks/CreateSubTaskDrawer'

function TaskDrawerMenu() {
    const classes = useStyles()
    const dispatch = useDispatch()

    const selectedMenue = useSelector((state: RootState) => state.project.menue)

    const handleClick = (id:number) => {
        // dispatch(projectActions.setMenue(id))
    }

    return (
        <Grid container className={classes.outerWrapper}>
            <Grid className={classes.titleWrapper} item xs={12}>
                <InputText 
                    placeholder="Enter Task title"
                />
            </Grid>
            <Grid xs={12} md={3}>
                <div className={classes.projectWrapper}>
                    <SelectDropdown 
                        title="Project"
                    />
                </div>
            </Grid>

            <Grid xs={12} md={3} >
                <div className={classes.inputWrapper}>
                    <SelectDropdown 
                        title="Admin"
                    />
                </div>
            </Grid>

            <Grid xs={12} md={3}>
                <div className={classes.inputWrapper}>
                    <SelectDropdown 
                        title="Assign to"
                    />
                </div>
            </Grid>

            <Grid xs={12} md={3}>
                <div className={classes.dateWrapper}>
                    <DatePicker/>
                </div>
            </Grid>

            <Grid xs={12} >
                <div className={classes.createSubTask}>
                    <CreateSubTask/>
                </div>
            </Grid>

        </Grid>
    )
}

export default TaskDrawerMenu


const useStyles = makeStyles({
    outerWrapper: {
        padding: "10px 20px",
        background: colors.white
    },
    titleWrapper: {
        // padding: "15px 20px"
    },
    inputWrapper: {
        paddingTop: 10,
        paddingLeft: 10,
        ['@media (max-width:600px)']: {
            paddingLeft: 0
        }
    },
    projectWrapper: {
        padding: "10px 0px"
    },
    dateWrapper: {
        paddingTop: 10,
        paddingLeft: 10,
        ['@media (max-width:600px)']: {
            paddingLeft: 0
        }
    },
    createSubTask: {
        display: 'flex',
        justifyContent: 'flex-end'
    }
})
