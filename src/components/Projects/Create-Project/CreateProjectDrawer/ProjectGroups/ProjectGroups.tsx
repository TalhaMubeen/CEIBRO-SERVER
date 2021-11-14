import { Button, Grid, makeStyles, Typography } from '@material-ui/core'
import ListIcon from '@material-ui/icons/List';
import colors from '../../../../../assets/colors';
import HorizontalBreak from '../../../../Utills/Others/HorizontalBreak';
import ProjectGroupsList from './ProjectGroupsList'

const ProjectRoles = () => {

    const classes = useStyles()

    return (
        <>
            <Grid container>
                <Grid item xs={12} className={classes.actionWrapper}>
                    <Button
                        variant="outlined"
                        color="primary"
                        startIcon={<ListIcon />}
                        className={classes.actionButton}
                    >
                        Bulk edit
                    </Button>

                    <Button
                        variant="outlined"
                        color="primary"
                        className={classes.actionButton}
                    >
                        Add a group
                    </Button>
                </Grid>
                <Grid item xs={12} className={classes.titleWrapper}>
                    <Typography className={classes.title}>
                        Group name
                    </Typography>
                    <HorizontalBreak/>
                </Grid>


                <Grid item xs={12} className={classes.groupsWrapper}>
                    <ProjectGroupsList/>
                </Grid>

            </Grid>
        </>
    )
}

export default ProjectRoles


const useStyles = makeStyles({
    actionWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingBottom: 10
    },
    actionButton: { 
        fontSize: 12,
        fontWeight: 'bold',
        fontStyle: 'normal'
    },
    titleWrapper: {
        paddingTop: 0,
        ['@media (max-width:960px)']: {
            paddingBottom: 10,
            paddingTop: 10,
        }
    },
    title: {
        fontSize: 12,
        fontWeight: 500,
        color: colors.textGrey,
        paddingBottom: 10
    },
    groupsWrapper: {
        
    }
})

