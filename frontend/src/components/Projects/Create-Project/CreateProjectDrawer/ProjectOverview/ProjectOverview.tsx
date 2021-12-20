import { Grid, makeStyles } from '@material-ui/core'
import React from 'react'
import DatePicker from '../../../../Utills/Inputs/DatePicker'
import SelectDropdown from '../../../../Utills/Inputs/SelectDropdown'
import ImagePicker from '../../../../Utills/Inputs/ImagePicker'
import HorizontalBreak from '../../../../Utills/Others/HorizontalBreak'
import colors from '../../../../../assets/colors'
import ProjectOverViewForm from './ProjectOverViewForm'

const ProjectOverview = () => {

    const classes = useStyles()

    return (
        <>
        <Grid container>
                <Grid item xs={12} sm={6} md={3}>
                    <DatePicker/>
                </Grid>

                <Grid item xs={12} sm={6} md={5} className={classes.datePickerWrapper}>
                    <SelectDropdown title="Owner"/>
                </Grid>

                <Grid item xs={12} md={8} style={{ padding: '20px 5px'}}>
                    <HorizontalBreak color={colors.grey}/>
                </Grid>
            </Grid>

            <Grid container className={classes.secondForm}>
                <Grid item xs={12} md={2} className={classes.imagePicker}>
                    <ImagePicker/>
                </Grid>

                <Grid item xs={12} md={6}>
                    <ProjectOverViewForm />
                </Grid>

            </Grid>
        </>
    )
}

export default ProjectOverview



const useStyles = makeStyles({
    datePickerWrapper: {
        paddingLeft: 20,
        ['@media (max-width:600px)']: {
            paddingLeft: 0,
            paddingTop: 20
        }
    },
    secondForm: {
        paddingTop: 0
    },
    imagePicker: {
        ['@media (max-width:600px)']: {
            paddingBottom: 20
        }
    }
})

