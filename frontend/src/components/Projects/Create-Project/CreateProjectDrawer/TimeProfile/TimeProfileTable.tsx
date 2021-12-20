import { makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import React from 'react'
import { AiOutlineCheckCircle } from 'react-icons/ai';
import colors from '../../../../../assets/colors';


function createData(name: string, approve: boolean, role: number) {
  return { name, approve, role };
}

const rows = [
  createData('Owner', true, 1),
  createData('Project Manager', true, 2),
  createData('Project Lead', false, 3),
  createData('Worker', false, 1),
  createData('Owner', true, 1),
  createData('Project Manager', true, 2),
  createData('Project Lead', false, 3),
  createData('Worker', false, 1),
];


const RolesTable = () => {
  const classes = useStyles();

  return (
    <TableContainer >
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Layout name</TableCell>
            <TableCell align="left">Role</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className="lower-padding">
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row" style={{ width: '60%'}}>
                  <Typography className={classes.name}>{row.name}</Typography>
              </TableCell>
              <TableCell align="left" className={classes.roleWrapper} >
                  <Typography>
                    Project manager
                  </Typography>

                  <div className={classes.actions}>
                    <div className={classes.statusChip}>
                      <AiOutlineCheckCircle className={classes.statusIcon}/>
                      <Typography className={classes.statusText}>
                        Activate
                      </Typography>
                    </div>
                    <div className={classes.options}>
                      <MoreVert/>
                    </div>
                  </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default RolesTable

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
    nameWrapper: {

    },
    name: {
      fontSize: 14,
      fontWeight: 'bold',
      color: colors.primary
    },
    organizationName: {
      fontWeight: 500,
      fontSize: 12
    },
    roleWrapper: {
      display: 'flex',
      justifyContent: 'space-between'
    },
    statusChip: {
      display: 'flex',
      alignItems: 'center',
      padding: 10,
      background: colors.white,
      color: colors.primary
    },
    statusIcon: {
      color: colors.lightGreen,
      paddingRight: 10
    },
    statusText: {
      fontSize: 12,
      fontWeight: 500
    },
    options: {
      color: colors.primary
    },
    actions: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  });
