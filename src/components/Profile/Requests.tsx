import * as React from 'react';
import Invitations from './Invitations'
import Connections from './Connections'
import { Grid, makeStyles } from '@material-ui/core';
import { useMediaQuery } from 'react-responsive';

interface IRequestsProps {
}

const Requests: React.FunctionComponent<IRequestsProps> = (props) => {
  
  const classes = useStyles()
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 960px)'})

  return (
    <Grid item xs={12} md={4} className={classes.wrapper}>
        <Invitations/>
        <Connections/>
    </Grid>
  )
};

export default Requests;


const useStyles = makeStyles({
  wrapper: {
    ['@media (max-width:960px)']: {
      paddingTop: 10
    }
  }
})

