import { Checkbox, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import { FolderSpecialOutlined } from '@material-ui/icons';
import React, { useState } from 'react'
import InputCheckbox from '../../../../Utills/Inputs/InputCheckbox'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { BiChevronDown } from 'react-icons/bi';
import { FaChevronDown, FaChevronLeft, FaChevronRight, FaChevronUp, FaTrash } from 'react-icons/fa';
import { HiDownload, HiTrash, HiUpload } from 'react-icons/hi';
import colors from '../../../../../assets/colors'

function createData(name: string, approve: boolean, submit: boolean) {
  return { name, approve, submit };
}

const rows = [
  {
    folderName: 'Folder name',
    modified: '18/08/06',
    member: 'Electrikfild',
    files: [
      {
        fileName: 'file1.jpg',
        modified: '18/08/2021'
      },
      {
        fileName: 'file23.jpg',
        modified: '18/08/2021'
      },
      {
        fileName: 'fil23.jpg',
        modified: '18/08/2021'
      },
      {
        fileName: 'file4.jpg',
        modified: '18/08/2021'
      },
      {
        fileName: 'file4.jpg',
        modified: '18/08/2021'
      },
      {
        fileName: 'file4.jpg',
        modified: '18/08/2021'
      },
      {
        fileName: 'file4.jpg',
        modified: '18/08/2021'
      }
    ]
  },
  {
    folderName: 'Folder name',
    modified: '18/08/06',
    member: 'Electrikfild',
    files: [
      {
        fileName: 'file1.jpg',
        modified: '18/08/2021'
      },
      {
        fileName: 'file23.jpg',
        modified: '18/08/2021'
      },
      {
        fileName: 'fil23.jpg',
        modified: '18/08/2021'
      },
      {
        fileName: 'file4.jpg',
        modified: '18/08/2021'
      },
      {
        fileName: 'file4.jpg',
        modified: '18/08/2021'
      },
      {
        fileName: 'file4.jpg',
        modified: '18/08/2021'
      },
      {
        fileName: 'file4.jpg',
        modified: '18/08/2021'
      }
    ]
  },
  {
    folderName: 'Folder name',
    modified: '18/08/06',
    member: 'Electrikfild',
    files: [
      {
        fileName: 'file1.jpg',
        modified: '18/08/2021'
      },
      {
        fileName: 'file23.jpg',
        modified: '18/08/2021'
      },
      {
        fileName: 'fil23.jpg',
        modified: '18/08/2021'
      },
      {
        fileName: 'file4.jpg',
        modified: '18/08/2021'
      },
      {
        fileName: 'file4.jpg',
        modified: '18/08/2021'
      },
      {
        fileName: 'file4.jpg',
        modified: '18/08/2021'
      },
      {
        fileName: 'file4.jpg',
        modified: '18/08/2021'
      }
    ]
  },
  {
    folderName: 'Folder name',
    modified: '18/08/06',
    member: 'Electrikfild',
    files: [
      {
        fileName: 'file1.jpg',
        modified: '18/08/2021'
      },
      {
        fileName: 'file23.jpg',
        modified: '18/08/2021'
      },
      {
        fileName: 'fil23.jpg',
        modified: '18/08/2021'
      },
      {
        fileName: 'file4.jpg',
        modified: '18/08/2021'
      },
      {
        fileName: 'file4.jpg',
        modified: '18/08/2021'
      },
      {
        fileName: 'file4.jpg',
        modified: '18/08/2021'
      },
      {
        fileName: 'file4.jpg',
        modified: '18/08/2021'
      }
    ]
  },
  {
    folderName: 'Folder name',
    modified: '18/08/06',
    member: 'Electrikfild',
    files: [
      {
        fileName: 'file1.jpg',
        modified: '18/08/2021'
      },
      {
        fileName: 'file23.jpg',
        modified: '18/08/2021'
      },
      {
        fileName: 'fil23.jpg',
        modified: '18/08/2021'
      },
      {
        fileName: 'file4.jpg',
        modified: '18/08/2021'
      },
      {
        fileName: 'file4.jpg',
        modified: '18/08/2021'
      },
      {
        fileName: 'file4.jpg',
        modified: '18/08/2021'
      },
      {
        fileName: 'file4.jpg',
        modified: '18/08/2021'
      }
    ]
  },
  {
    folderName: 'Folder name',
    modified: '18/08/06',
    member: 'Electrikfild',
    files: [
      {
        fileName: 'file1.jpg',
        modified: '18/08/2021'
      },
      {
        fileName: 'file23.jpg',
        modified: '18/08/2021'
      },
      {
        fileName: 'fil23.jpg',
        modified: '18/08/2021'
      },
      {
        fileName: 'file4.jpg',
        modified: '18/08/2021'
      }
    ]
  },
  {
    folderName: 'Folder name',
    modified: '18/08/06',
    member: 'Electrikfild',
    files: [
      {
        fileName: 'file1.jpg',
        modified: '18/08/2021'
      },
      {
        fileName: 'file23.jpg',
        modified: '18/08/2021'
      },
      {
        fileName: 'fil23.jpg',
        modified: '18/08/2021'
      },
      {
        fileName: 'file4.jpg',
        modified: '18/08/2021'
      }
    ]
  },
  {
    folderName: 'Folder name',
    modified: '18/08/06',
    member: 'Electrikfild',
    files: [
      {
        fileName: 'file1.jpg',
        modified: '18/08/2021'
      },
      {
        fileName: 'file23.jpg',
        modified: '18/08/2021'
      },
      {
        fileName: 'fil23.jpg',
        modified: '18/08/2021'
      },
      {
        fileName: 'file4.jpg',
        modified: '18/08/2021'
      }
    ]
  },
  
];

const getTableRow = (name: string, modified: string, memeber: string, classes: any, isFile:boolean = false, handleFolderClick: any, index: any, open: boolean) => {
  
  const handleClick = () => {
    if(!isFile) {
      handleFolderClick(index)
    } 
  }
  
  return (
    <TableRow key={index} onClick={handleClick} style={{background: !isFile? colors.white: 'inherit'}}>
      <TableCell component="th" scope="row" className={classes.nameWrapper}>
        {!isFile && !open && <FaChevronRight/>}
        {!isFile && open && <FaChevronDown/>}
        {!isFile && <FolderSpecialOutlined className={classes.folderIcon}/> }
        <Typography className={`${classes.name} ${isFile? classes.file: ''}`}>
          {name}
        </Typography>
      </TableCell>
      <TableCell align="right" className={classes.dateWrapper}>
        <Typography>
          {modified}
        </Typography>
      </TableCell>

      <TableCell align="right" className={classes.memberWrapper}>
        {!isFile && <Typography>
          {memeber}
        </Typography>}
        {isFile && <div className={classes.fileActions}>
          <HiUpload/>
          <HiDownload/>
          <HiTrash/>
        </div>}
      </TableCell>
    </TableRow>
  )
}

const getTableRows: any = (rows: any, classes: any, openIndex: any, handleFolderClick:any) => {
  const allRows: any = []

  const handleClick = (index: number) => {
    handleFolderClick(index)
  }

  rows.forEach((row: any, index: number) => {

    allRows.push(getTableRow(row.folderName,  row.modified, row.member, classes, false, handleClick, index, openIndex === index))
    
    if(index === openIndex) {
      row.files.forEach((file:any, secondIndex: number) => {
        allRows.push(getTableRow(file.fileName,  file.modified, '', classes, true, handleClick, `file${secondIndex}`, false))
      })
    }

  })
  return allRows
  
  
  
  
  
  
}

const ProjectDocumentList = () => {
  const classes = useStyles();
  const [openIndex, setOpenIndex] = useState<number | null>(null)


  const handleFolderClick = (index: number) => {
    setOpenIndex(index === openIndex? null: index )
  }


  const allRows: any = [...getTableRows(rows, classes, openIndex, handleFolderClick)]
  
  return (
    <TableContainer >
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Date modified</TableCell>
            <TableCell align="right">Members</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allRows.map((row:any) => {
            return row
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ProjectDocumentList

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
    nameWrapper: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: 11,
      borderBottom: 'none'
    },
    name: {
      fontSize: 14,
      fontWeight: 500,
    },
    folderIcon: {
      fontSize: 20,
      paddingRight: 20
    },
    dateWrapper: {
      padding: 9,
      borderBottom: 'none'
    },
    memberWrapper: {
      padding: 10,
      borderBottom: 'none'
    },
    file: {
      marginLeft: 62
    },
    fileActions: {
      color: colors.primary
    }
  });
