import { Badge, Button, Grid, makeStyles, Typography } from '@material-ui/core';
import * as React from 'react';
import colors from '../../assets/colors';
import InputInvite from './InputInvite';
import ViewInvitations from './ViewInvitations'

interface InvitationsProps {
}

const Invitations: React.FunctionComponent<InvitationsProps> = (props) => {
  
  const classes = useStyles()
  
  return (
    <Grid container>
        <Grid item xs={12} className={classes.inviteWrapper}>
            <InputInvite/>
        </Grid>
        <Grid item xs={12} className={classes.viewInvitation}>
            <Typography className={classes.invitationText}>
                Invitations
                <Badge badgeContent={4} className={classes.badge}>
                </Badge>
            </Typography>
            <ViewInvitations/>
        </Grid>
    </Grid>
  )
};

export default Invitations;


const useStyles = makeStyles({
  inviteWrapper: {
      background: colors.white,
      padding: "20px 15px",
      borderRadius: 5
  },
  viewInvitation: {
      borderTop: `1px solid ${colors.lightGrey}`,
      background: colors.white,
      padding: "10px 15px",
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
  },
  invitationText: {
      fontSize: 14,
      fontWeight: 500
  },
  badge: {
      marginLeft: 20,
      color: colors.white
  }
})
