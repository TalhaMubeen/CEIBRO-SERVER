import React, { FC } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Typography } from '@material-ui/core'
import colors from '../../../assets/colors'

interface ProjectCard {
    src: string,
    dueDate: string
    owner: string
    title: string
}

const ProjectCard: FC<ProjectCard> = (props) =>  {
    const { src, dueDate, owner, title } = props
    const classes = useStyles()

    return (
        <Grid className={classes.cardWrapper} item xs={12} sm={6} md={3}>
            <Grid item xs={12} className={classes.imageWrapper}>
                <img className={classes.image} src={src} alt="ceibro-project-logo" />
            </Grid>
            <Grid container xs={12}>
                <Grid xs={5}>
                    <Typography className={classes.meta}>
                        Due Date
                    </Typography>
                    <Typography className={classes.metaValue}>
                        {dueDate}
                    </Typography>
                    
                </Grid>
                <Grid xs={4}>
                    <Typography className={classes.meta}>
                        Owner
                    </Typography>
                    <Typography className={classes.metaValue}>
                        {owner}
                    </Typography>
                </Grid>
            </Grid>

            <Grid item xs={12}>
                <Typography className={classes.title}>
                    {title}
                </Typography>
            </Grid>
        </Grid>
    )
}

export default ProjectCard

const useStyles = makeStyles({
    cardWrapper: {
        height: 270,
        padding: 20,
        background: colors.white,
        border: `1px solid`,
        borderColor:  colors.lightBlack,
        boxSizing: "border-box",
        borderRadius: 5
    },
    imageWrapper: {

    },
    image: {
        width: '100%',
        height: 100,
        borderRadius: 4
    },
    meta: {
        fontWeight: 500,
        fontSize: 10,
        color: colors.lightBlack
    },
    metaValue: {
        fontWeight: 500,
        fontSize: 12
    },
    title: {
        fontWeight: "bold",
        fontSize: 14
    }
})
