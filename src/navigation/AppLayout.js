import { makeStyles } from '@material-ui/core'
import React from 'react'
import Sidebar from '../components/Sidebar/Sidebar'
import Topbar from '../components/Topbar/Topbar'

const AppLayout = ({ children }) => {
    const classes = useStyles()

    return (
        <div className={classes.wrapper}>
            <Sidebar/>
            <div className={classes.content}>
                <Topbar/>
                <div className={classes.children}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default AppLayout


const useStyles = makeStyles(theme => ({
    wrapper: {
        height: '100vh',
        overflow: 'hidden',
    },
    content: {
        height: '100vh',
        marginLeft: 240,
        overflowX: 'hidden',
        overflowY: 'auto',
        padding: '10px 35px',
        [theme.breakpoints.down('md')]: {
            marginLeft: 0,
            padding: 10
        }
    },
    children: {
        paddingBottom: 50
    }
}))
