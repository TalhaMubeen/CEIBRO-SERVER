import { Badge, Button, Grid, ListItemIcon, ListItemText, makeStyles, Menu, MenuItem, Typography } from '@material-ui/core'
import Textfield from '../Utills/Inputs/TextField'
import { Create, NotificationsNoneSharp } from '@material-ui/icons'
import React from 'react'
import Avatar from '@material-ui/core/Avatar';
import MenuIcon from '@material-ui/icons/Menu';
import './topbar.css'
import appActions from '../../redux/action/app.action';
import projectActions from '../../redux/action/project.action';
import { useDispatch } from 'react-redux';
import { useMediaQuery } from 'react-responsive'
// import { RootState } from '../../redux/reducers'
import colors from '../../assets/colors';
import { Link } from 'react-router-dom';
import ProfileBtn from './ProfileBtn'

const Topbar = () => {
    const classes = useStyles()

    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 960px)'}) 

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const dispatch = useDispatch();
    // const { navbar } = useSelector((store: RootState) => store.app)
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const toggleNavbar = () => {
        dispatch(appActions.toggleNavbar())
    }

    const openProjectDrawer = () => {
        dispatch(projectActions.openDrawer())
    }

    return (
        <div className={`topbar ${classes.topNavbarWrapper}`}>
            <Grid 
                container
                direction="row"
                alignItems="center"
                className={classes.container}
            >

                {isTabletOrMobile && 
                    <Grid item xs={2}>
                        <MenuIcon onClick={toggleNavbar}/>
                    </Grid>
                }

                <Grid item xs={4} md={3} className={classes.titleContainer}>
                    <Typography variant="h6" component="h6">
                        Projects
                    </Typography>
                    <Button onClick={openProjectDrawer} size="small" color="primary" variant="contained">Create</Button>
                </Grid>

                <Grid item xs={1} md={4}></Grid>

                <Grid 
                    xs={5}
                    md={3}
                    item
                >
                    <Textfield
                        id="input-with-icon-adornment"
                        placeholder="Search"
                        className={classes.searchInput}
                        size="small"
                        inputProps={{
                            className: classes.searchInput
                        }}
                    />
                </Grid>
                <Grid 
                    xs={3}
                    md={2}
                    item
                    style={{display: 'flex', justifyContent: 'flex-start'}}
                >

                    <div className={classes.nameWrapper}>
                        <Typography>
                            IIja
                        </Typography>
                        <Typography>
                            Nikolajev
                        </Typography>
                    </div>

                    <ProfileBtn/>

                    <Typography>
                        <Badge badgeContent={4}>
                            <NotificationsNoneSharp className={classes.bell}/>
                        </Badge>
                    </Typography>
                </Grid>

            </Grid>
        </div>
    )
}

export default Topbar

const useStyles = makeStyles(theme => ({
    topNavbarWrapper: {
        height: 60,
        paddingRight: 20,
        background: colors.white
    },
    container: {
        height: '100%',
    },
    searchInput: {
        height: 12,
    },
    bell: {
        // color: colors.white,
        fontSize: 20
    },
    titleContainer: {
        display: 'flex',
        justifyContent: 'space-evenly'
    },
    nameWrapper: {
        display: 'flex',
        alignItems: 'flex-end',
        flexDirection: 'column',
        fontSize: 14,
        fontWeight: 500
    }
}))
