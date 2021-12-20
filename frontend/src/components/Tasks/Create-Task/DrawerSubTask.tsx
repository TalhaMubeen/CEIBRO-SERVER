import { Grid, makeStyles, Typography } from '@material-ui/core'
import { AttachFile, Chat, Create, Delete, Image } from '@material-ui/icons'
import React from 'react'
import { connect } from 'react-redux'
import colors from '../../../assets/colors'

const DrawerSubTask = () => {
    const classes = useStyles()
    return (
        <Grid container className={classes.subTaskWrapper}>
            <Grid container>
                <Grid item xs={2} className={classes.dateWrapper}>
                    <Typography className={classes.dateTitle}>
                        Due Date:
                    </Typography>
                    &nbsp;
                    <Typography className={classes.date}>
                        2-05-2020
                    </Typography>
                </Grid>


                <Grid item xs={2} className={classes.dateWrapper}>
                    <Typography className={classes.dateTitle}>
                        Assigned to:
                    </Typography>
                    &nbsp;
                    <Typography className={classes.date}>
                        Paul Marif
                    </Typography>
                </Grid>


                <Grid item xs={4} className={classes.attachmentWrapper}>
                    <Typography className={classes.attachments}>
                        2 <AttachFile className={classes.attachmentIcon}/>
                    </Typography>
                    <Typography className={classes.attachments}>
                        0 <Chat className={classes.attachmentIcon}/>
                    </Typography>
                    <Typography className={classes.attachments}>
                        0 <Image className={classes.attachmentIcon}/>
                    </Typography>
                </Grid>

                <Grid item xs={4} className={classes.actionWrapper}>
                    <Create className={classes.actionIcons}/>
                    <Delete className={classes.actionIcons} style={{ color: colors.btnRed }} />
                </Grid>
            </Grid>

            <Grid container>
                <Typography className={classes.title}>
                    Cum sociis natoque penatibus et magnis dis parturient
                </Typography>

                <Typography className={classes.description}>
                    Cras mattis consectetur purus sit amet fermentum. Donec sed odio dui. Nullam id dolor id nibh ultricies vehicula ut id elit.
                </Typography>
            </Grid>    
        </Grid>
    )
}

export default DrawerSubTask

const useStyles = makeStyles({ 
    subTaskWrapper: {
        height: 130,
        borderBottom: `0.5px solid ${colors.textGrey}`,
        paddingBottom: 20,
        paddingTop: 15,
        minWidth: 1000
    },
    dateWrapper: {
        display: 'flex',
    },
    dateTitle: {
        fontSize: 12,
        fontWeight: 500,
        color: colors.textGrey
    },
    date: {
        fontSize: 12,
        fontWeight: 500
    },
    attachmentWrapper: {
        display: 'flex',
        justifyContent: 'center',
        fontSize: 10
    },
    attachments: {
        fontSize: 12,
        display: 'flex',
        color: colors.textPrimary
    },
    attachmentIcon: {
         fontSize: 14,
         color: colors.textPrimary
    },
    actionWrapper: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    actionIcons: {
        fontSize: 14,
        background: colors.white,
        padding: 5,
        borderRadius: '50%'
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    description: {
        fontSize: 14,
        fontWeight: 500
    }
})