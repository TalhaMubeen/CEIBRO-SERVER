import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Add } from '@material-ui/icons'
import colors from '../../../assets/colors'


const ProjectCard = () =>  {
    const classes = useStyles()

    return (
        <Grid className={classes.cardOuterWrapper} item xs={12} sm={6} md={3}>
            <Add className={classes.icon}/>
            <Typography className={classes.text}>
                Create new project
            </Typography>
        </Grid>
    )
}

export default ProjectCard

const useStyles = makeStyles({
    cardOuterWrapper: {
        padding: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        cursor: 'pointer',
        "&:hover": {
            border: `1px solid ${colors.mediumGrey}`,
            borderRadius: 4
        },
        height: 270,
    },
    text: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.primary
    },
    icon: {
        fontSize: 40,
        fontWeight: 'normal',
        color: colors.primary
    }
    
})
