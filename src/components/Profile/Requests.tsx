import * as React from 'react';
import Invitations from './Invitations'
import Connections from './Connections'
import { Grid } from '@material-ui/core';

interface IRequestsProps {
}

const Requests: React.FunctionComponent<IRequestsProps> = (props) => {
  return (
    <Grid item xs={12} md={4}>
        <Invitations/>
        <Connections/>
    </Grid>
  )
};

export default Requests;
