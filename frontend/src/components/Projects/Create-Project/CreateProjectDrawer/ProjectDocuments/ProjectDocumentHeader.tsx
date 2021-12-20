import { Button, Grid, makeStyles } from '@material-ui/core'
import ListItemIcon from '@material-ui/icons/List'
import { TramSharp } from '@material-ui/icons'
import React from 'react'
import { AiOutlineUnorderedList } from 'react-icons/ai'
import { BsGrid } from 'react-icons/bs'
import colors from '../../../../../assets/colors'
import InputText from '../../../../Utills/Inputs/InputText'

const ProjectDocumentHeader = () => {

    const classes = useStyles()

    return (
        <>
        <Grid item xs={12} md={2} className={classes.actionWrapper}>
            <Button
                variant="outlined"
                color="primary"
                startIcon={<ListItemIcon />}
                className={classes.actionButton}
            >
                Bulk edit
            </Button>

        </Grid>

        <Grid item xs={12} md={7} className={classes.actionWrapper}>
            <InputText placeholder="Find Document" />
        </Grid>

        <Grid item xs={12} md={3} className={classes.secondActionWrapper}>
            <Button
                variant="outlined"
                color="primary"
                className={classes.actionButton}
            >
                Create a folder
            </Button>

            <div className={classes.viewIcons}>
                <BsGrid style={{ color: colors.primary }}/>
                <AiOutlineUnorderedList/>
            </div>

        </Grid>
        </>

    )
}

export default ProjectDocumentHeader



const useStyles = makeStyles({
    actionWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        ['@media (max-width:960px)']: {
            paddingBottom: 10
        }
    },
    secondActionWrapper: {
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        ['@media (max-width:960px)']: {
            justifyContent: 'space-between'
        }
    },
    actionButton: { 
        fontSize: 12,
        fontWeight: 'bold',
        fontStyle: 'normal'
    },
    viewIcons: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '50px'
    }
})