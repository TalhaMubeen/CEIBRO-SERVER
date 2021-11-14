import { Button, Grid, makeStyles } from '@material-ui/core'
import ListIcon from '@material-ui/icons/List';
import MembersTable from './MembersTable'
import CreateMember from './CreateMember'

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

                    <CreateMember/>
                </Grid>

                <Grid item xs={12}>
                    <MembersTable/>
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
        alignItems: 'center',
        ['@media (max-width:960px)']: {
            alignItems: 'flex-start',
            paddingBottom: 20
        }
    },
    actionButton: { 
        fontSize: 12,
        fontWeight: 'bold',
        fontStyle: 'normal'
    }
})

