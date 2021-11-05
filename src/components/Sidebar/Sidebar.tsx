import { Badge, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import assets from '../../assets/assets'
import colors from '../../assets/colors'
import { SingleConfig } from '../../navigation/SidebarConfig'
import { RootState } from '../../redux/reducers'
import { useMediaQuery } from 'react-responsive'
import OutsideClickHandler from 'react-outside-click-handler';
import appActions from '../../redux/action/app.action'
import './sidebar.css'


function Sidebar() {
    const classes = useStyles()
    const configs = useSelector((store: RootState) => store.app.sidebarRoutes)
    const navbarOpen = useSelector((store: RootState) => store.app.navbar)
    const dispatch = useDispatch()
    const history = useHistory()
    const intl = useIntl();
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 960px)'}) 

  
    const handleRouteClick = (config: SingleConfig) => {
        history.push(`/${config.path}`)
        if(isTabletOrMobile && navbarOpen) {
            dispatch(appActions.setNavbarOpen(false))
        }
    }

    const getNavbarStyles = () => {
        let styles = {}
        if(isTabletOrMobile) {
            styles = {
                left: navbarOpen? '0px': '-300px'
            }
        }
        return styles;
    }

    const toggleSidebar = () => {
        dispatch(appActions.toggleNavbar())
    } 

    return (
        <OutsideClickHandler
            onOutsideClick={toggleSidebar}
            disabled={!isTabletOrMobile || !navbarOpen}
        > 
            <div className={`${classes.sidebarWrapper} sidebarWrapper`} style={getNavbarStyles()}>
                <div className={classes.logoWrapper}>
                    <img src={assets.logo} alt="ceibro-logo"/>
                </div>

                <div className={classes.menueWrapper}>
                    {configs && Object.values(configs).map(config => {
                        return (
                            <div
                                key={config.title}
                                className={`${classes.menue } ${window.location.pathname.includes(config.path)? classes.active: ''}`}  
                                onClick={() => handleRouteClick(config)}
                            >
                                <div className={classes.iconWrapper}>
                                    <Typography className={classes.icon}>
                                        {config.icon}
                                    </Typography>
                                </div>
                                <Typography className={classes.title}>
                                    {intl.formatMessage({id: config.title})}
                                </Typography>
                                <div className={classes.badge}>
                                    {config.notification > 0 && 
                                        <Badge badgeContent={config.notification} color="error">
                                        </Badge>
                                    }
                                </div>
                            </div>
                        )
                    }) }
                </div>
            </div>
        </OutsideClickHandler>
    )
}

export default Sidebar

const useStyles = makeStyles(theme => ({
    sidebarWrapper: {
        background: colors.grey,
        width: 200,
        height: '100vh',
        position: 'absolute',
        [theme.breakpoints.down('md')]: {
            position: "absolute",
            zIndex: 2,
          }
    },
    logoWrapper: {
        maxHeight: 150,
    },
    menueWrapper: {
        height: 'calc(100vh - 150px)',
        overflowY: 'auto',
    },
    menue: {
        display: 'flex',
        alignItems: 'center',
        padding: '10px 10px',
        borderBottom: `1px solid ${colors.white}`,
        fontSize: 16,
        fontWeight: 500,
        color: colors.primary,
        cursor: 'pointer',
        '&:hover': {
            background: colors.white    
        }
    },
    iconWrapper: {
        flex: 1,
        display: 'flex'
    },
    icon: {
        padding: 4,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '50%',
        background: colors.white,
        color: colors.black
    },
    title: {
        flex: 3
    },
    badge: {
        flex: 1
    },
    active: {
        background: colors.white,
        color: `${colors.black} !important`
    }
}))
