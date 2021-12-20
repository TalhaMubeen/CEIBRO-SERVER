import { Grid, makeStyles, Typography } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import colors from '../../../assets/colors'
import OutsideClickHandler from 'react-outside-click-handler';


interface FileViewProps {
    handleClose: () => void
}


const FileView: React.FC<FileViewProps> = (props) => {
    
    const classes = useStyles()
    
    const handleClose = () => {
        props.handleClose()
    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.innerWrapper}>
                <OutsideClickHandler onOutsideClick={handleClose}>
                    <div className={classes.titleWrapper}>
                        <Typography>
                            Media & Files
                        </Typography>
                        <Close onClick={handleClose}/>
                    </div>
                    <Grid container>
                        <Grid item xs={3} className={classes.imageWrapper}>
                            <img src={"https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__480.jpg"} className={classes.image}/>
                        </Grid>
                        <Grid item xs={3} className={classes.imageWrapper}>
                            <img src={"https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__480.jpg"} className={classes.image}/>
                        </Grid>
                        <Grid item xs={3} className={classes.imageWrapper}>
                            <img src={"https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__480.jpg"} className={classes.image}/>
                        </Grid>

                    </Grid>
                </OutsideClickHandler>
            </div>
        </div>
    )
}

export default FileView

const useStyles = makeStyles({
    wrapper: {
        background: `rgba(0, 0, 0, 0.6)`,
        position: 'absolute',
        top: 0,
        right: 0,
        height: '100%',
        zIndex: 2,
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end'
    },
    innerWrapper: {
        background: colors.white,
        width: 280,
        height: '100%',
        padding: 10
    },
    titleWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        height: 30
    },
    imageWrapper: {
        padding: 5
    },
    image: {
        width: '100%'
    }
})