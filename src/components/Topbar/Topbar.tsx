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
import Title from './Title'
import { useHistory } from 'react-router'

const Topbar = (props: any) => {
    const classes = useStyles()

    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 960px)'})
    const history = useHistory() 

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



    return (
        <div className={`topbar ${classes.topNavbarWrapper}`}>
            <Grid 
                container
                direction="row"
                alignItems="center"
                className={classes.container}
            >

                {isTabletOrMobile && 
                    <Grid item xs={2} className={classes.menuIconWrapper}>
                        <MenuIcon onClick={toggleNavbar}/>
                    </Grid>
                }

                <Grid item xs={7} md={history.location.pathname.includes('chat') ? 5: 3} className={classes.titleContainer}>
                    <Title/>
                </Grid>

                {!isTabletOrMobile && <Grid item xs={1} md={history?.location.pathname.includes('chat')? 2: 4}></Grid>}

                {!isTabletOrMobile && 
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
                }
                <Grid 
                    xs={3}
                    md={2}
                    item
                    style={{display: 'flex', justifyContent: 'center'}}
                >

                    {!isTabletOrMobile && 
                        <div className={classes.nameWrapper}>
                            <Typography>
                                IIja
                            </Typography>
                            <Typography>
                                Nikolajev
                            </Typography>
                        </div>
                    }
                    <ProfileBtn/>

                    {!isTabletOrMobile && 
                        <Typography>
                            <Badge badgeContent={4}>
                                <NotificationsNoneSharp className={classes.bell}/>
                            </Badge>
                        </Typography>
                    }
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
    menuIconWrapper: {
        [theme.breakpoints.down('md')]: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%"
        }
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
        // justifyContent: 'space-evenly',
        // ['@media (max-width:960px)']: {
            justifyContent: "space-between"
        // }
    },
    nameWrapper: {
        display: 'flex',
        alignItems: 'flex-end',
        flexDirection: 'column',
        fontSize: 14,
        fontWeight: 500
    }
}))
