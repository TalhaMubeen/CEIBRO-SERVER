import React from 'react'
import { Button, Grid, makeStyles } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/reducers'
import colors from '../../../assets/colors'
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
        background: colors.white,
        ['@media (max-width:960px)']: {
            flexDirection: 'column',
            alignItems: 'flex-end'
        }
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
