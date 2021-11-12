import { makeStyles } from '@material-ui/core'
import React from 'react'
import colors from '../assets/colors'
import Sidebar from '../components/Sidebar/Sidebar'
import Topbar from '../components/Topbar/Topbar'
import { RootState } from '../redux/reducers/index'
import { useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'

interface AppLayoutInterface {
}

const AppLayout: React.FC<AppLayoutInterface> = ({ children }) => {
    const classes = useStyles()
    const navbarOpen = useSelector((state: RootState) => state.app.navbar)
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 960px)'}) 

    return (
        <div className={classes.wrapper}>
            <Sidebar/>
            {navbarOpen && isTabletOrMobile && <div className={classes.blackWrapper}></div>}
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
        marginLeft: 200,
        overflowX: 'hidden',
        overflowY: 'auto',
        background: colors.lightGrey,
        ['@media (max-width:960px)']: {
            marginLeft: 0,
            padding: 0
        }
    },
    children: {
        paddingBottom: 50,
        padding: '10px 35px',
        ['@media (max-width:960px)']: {
            padding: '10px 10px'
        },
        ['@media (max-width:1280px)']: {
            padding: '10px 20px'
        }
    },
    blackWrapper: {
        position: "absolute",
        background: colors.black,
        opacity: 0.3,
        width: '100vw',
        height: '100vh',
        zIndex: 3
    }
}))
