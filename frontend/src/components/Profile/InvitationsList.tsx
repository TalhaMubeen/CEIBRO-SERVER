import { Button, Grid, List, ListItem, makeStyles, Typography } from '@material-ui/core';
import * as React from 'react';
import colors from '../../assets/colors';
import NameAvatar from '../Utills/Others/NameAvatar';
import { INVITATIONS_LIST } from '../../constants/invitations.constants'
import { InvitationInterface } from '../../constants/interfaces/invitation.interface';

interface IInvitationsListProps {
}

const InvitationsList: React.FunctionComponent<IInvitationsListProps> = (props) => {
    const classes = useStyles()

    return (
        <List>
            {INVITATIONS_LIST && INVITATIONS_LIST.map((invitation: InvitationInterface) => { 
                    return (
                        <ListItem>
                            <Grid container className={classes.wrapper}>
                                <Grid item xs={2}>
                                    <NameAvatar name={invitation.name} />
                                </Grid>
                                <Grid item xs={8} >
                                    <div>
                                        <Typography className={classes.titleText}>
                                            {invitation.name}
                                        </Typography>
                                        <Typography className={classes.subTitleText}>
                                            Company
                                        </Typography>
                                    </div>
                                    <div className={classes.actionWrapper}>
                                        <Button className={classes.actionBtn} color="primary" variant="contained">Accept</Button>
                                        <Button className={classes.actionBtn} variant="contained">Decline</Button>
                                    </div>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography className={classes.time}>
                                        {invitation.time}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </ListItem>
                    )
                })}
        </List>
    )
};

export default InvitationsList;


const useStyles = makeStyles({
    wrapper: {
        borderBottom: `1px solid ${colors.grey}`,
    },
    titleText: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    subTitleText: {
        fontSize: 12,
        fontWeight: 500,
        color: colors.textGrey
    },
    actionWrapper: {
        display: 'flex',
        justifyContent: 'flex-start',
        gap: 25,
        paddingTop: 10,
        paddingBottom: 15
    },
    actionBtn: {
        fontSize: 12,
        fontWeight: 'bold'
    },
    time: {
        fontSize: 12,
        fontWeight: 'bold',
        color: colors.textGrey
    }
})

