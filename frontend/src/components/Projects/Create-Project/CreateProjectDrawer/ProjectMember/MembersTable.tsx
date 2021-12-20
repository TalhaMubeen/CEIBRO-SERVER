import { Checkbox, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import React from 'react'
import colors from '../../../../../assets/colors';
import InputCheckbox from '../../../../Utills/Inputs/InputCheckbox'
import Select from '../../../../Utills/Inputs/Select'


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

const roleOptions = [
  {
    title: 'Project Manager',
    value: '1'
  },
  {
    title: 'Project Lead',
    value: '2'
  },
  {
    title: 'Worker',
    value: '3'
  }
]


const groupOptions = [
  {
    title: 'Electrikud',
    value: '1'
  }
]


const RolesTable = () => {
  const classes = useStyles();

  return (
    <TableContainer >
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Role</TableCell>
            <TableCell align="right">Group</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className="lower-padding">
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row" style={{ width: '60%'}}>
                <div className={classes.nameWrapper}>
                  <Typography className={classes.name}>{row.name}</Typography>
                  <Typography className={classes.organizationName}>Company name</Typography>
                </div>
              </TableCell>
              <TableCell align="right" style={{ width: '20%'}}>
                  <Select options={roleOptions} selectedValue={row.role}/>
              </TableCell>
              <TableCell align="right" style={{ width: '20%'}}>
                  <Select options={groupOptions} selectedValue={1}/>
              </TableCell>
              {/* <TableCell align="right"  style={{ width: '20%'}}>
                <InputCheckbox checked={row.submit} />
              </TableCell> */}
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
    }
  });
