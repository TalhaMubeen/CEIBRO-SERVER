import React from 'react'
import { Badge, Grid, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core'
import { TaskInterface } from '../../../constants/interfaces/task.interface'
import { TASKS } from '../../../constants/task.constants'
import TaskCard from '../../Utills/TaskCard/TaskCard'
import colors from '../../../assets/colors'
import { FaClipboard } from 'react-icons/fa'
import { AttachFile, Chat, MoreVert } from '@material-ui/icons'
import { getColorByStatus, getTextColorByStatus } from '../../../config/project.config'
import { useHistory } from 'react-router'

const TaskTable = () => {

    const classes = useStyles()
    const history = useHistory()

    const getBageStyle = (status: string) => {
        return {
            background: getColorByStatus(status),
            padding: 6,
            color: getTextColorByStatus(status),
            borderRadius: 5
        }
    }

    const handleClick = () => {
        history.push('/task/23')
    }

    return (
        <>
        {TASKS && 
                TASKS.length > 1 && 
                    <TableContainer component={Paper}>
                        <Table className="task-table">
                            <TableHead>
                                <TableRow>
                                    <TableCell width={'35%'}>Task name</TableCell>
                                    <TableCell>Due date</TableCell>
                                    <TableCell>Assigned to</TableCell>
                                    <TableCell>Subtask</TableCell>
                                    <TableCell>Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {TASKS && 
                                    TASKS.map((task: TaskInterface, index: number) => {
                                        return (
                                            <TableRow hover key={index} onClick={handleClick}>
                                                <TableCell component="th" scope="row">
                                                    <Typography className={classes.taskTitle}>
                                                        {task.title}
                                                    </Typography>
                                                    <Typography className={classes.taskOwner}>
                                                        {task.owner}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell className={classes.dueDate} component="th" scope="row">
                                                    {task.dueDate}
                                                </TableCell>
                                                <TableCell className={`${classes.assignedTo} ongoing-badge`} component="th" scope="row">
                                                    <Typography>
                                                        {task.assignedTo}
                                                    </Typography>
                                            </TableCell>
                                                <TableCell component="th" scope="row">
                                                    <div className={classes.subTaskWrapper}>
                                                        <div className={classes.subTask}>
                                                            <FaClipboard style={{ color: colors.lightSkyBlue }}/>
                                                            <Typography className={classes.subTaskText}>
                                                                {task.subTasks} &nbsp;
                                                                SubTask(s)
                                                            </Typography>
                                                        </div>
                                                        <div className={classes.attachmentWrapper}>
                                                            <Typography className={classes.attachmentText}>
                                                                0
                                                                <AttachFile className={classes.attachementIcons} />
                                                            </Typography>

                                                            <Typography className={classes.attachmentText}>
                                                                4
                                                                <Chat className={classes.attachementIcons} />
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    <div className={classes.statusWrapper}>
                                                        <div style={getBageStyle(task.status)}>
                                                            <Typography className={classes.statusBadge}>
                                                                {task.status}
                                                            </Typography>
                                                        </div>  
                                                            <MoreVert className={classes.moreIcon} />
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
            }
            
        </>
    )
}

export default TaskTable


const useStyles = makeStyles({
    taskTitle: {
      fontSize: 12,
      fontWeight: 'bold'
    },
    taskOwner: {
        fontSize: 14,
        fontWeight: 500,
        color: colors.textPrimary
    },
    dueDate: {
        fontSize: 12,
        fontWeight: 500
    },
    assignedTo: {
        fontSize: 12,
        fontWeight: 500,
    },
    moreBadge: {
      background: colors.darkYellow,
      color: colors.white
    },
    assignedToInner: { 
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      },
      subTaskWrapper: {
          display: 'flex',
          justifyContent: 'space-between'
      },
      subTask: {
          display: 'flex'
      },
      subTaskText: {
          display: 'flex',
          fontSize: 10,
          fontWeight: 500
      },
      attachmentWrapper: {
          display: 'flex'
      },
      attachementIcons: {
          fontSize: 14,
          color: colors.lightSkyBlue 
      },
      attachmentText: {
          fontSize: 10,
          display: 'flex',
          alignItems: 'center'
      },
      statusWrapper: {
          display: 'flex',
          justifyContent: 'space-between'
      },
      statusBadge: {
          fontSize: 10,
          fontWeight: 500
      },
      moreIcon: {
          fontSize: 20,
          color: colors.lightSkyBlue
      }
  })