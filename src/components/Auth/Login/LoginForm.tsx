import { Typography, Button, FormControlLabel, Checkbox } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import { useHistory } from "react-router";
import assets from "../../../assets/assets";
import colors from "../../../assets/colors";
import TextField from "../../Utills/Inputs/TextField";

const LoginForm = () => {
  const classes = useStyles();
  const history = useHistory()
  const [checked, setChecked] = useState(true)

  return (
    <div className="form-container">
      <div className={classes.logoWrapper }>
        <img src={assets.logo} alt="ceibro-logo"/>
      </div>


      <div className={classes.loginForm}>
        <TextField 
          placeholder="Email" 
          className={classes.inputs}
          inputProps={{
            style: { height: 12 }
          }}
        />
        <TextField
          type="password"
          placeholder="Password"
          className={classes.inputs}
          inputProps={{
            style: { height: 12 }
          }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={checked}
              onChange={() => setChecked(!checked)}
              name="checkedB"
              color="primary"
            />
          }
          className={classes.remember}
          label={<Typography className={classes.remember}>Remember me</Typography>}
        />
        <div className={classes.actionWrapper}>
          <Button
            className={classes.loginButton}
            variant="contained"
            color="primary"
            onClick={() => {
              history.push('/dashboard')
            }}
          >
            Login
          </Button>
          <Typography
            className={`${classes.titles} ${classes.forget}`}
            variant="body1"
            gutterBottom
          >
            Forget Password?
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;



const useStyles = makeStyles({
  actionWrapper: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: 20
  },
  titles: {
    color: colors.textPrimary,
    fontFamily: 'Inter'
  },
  loginForm: {
    display: "flex",
    flexDirection: "column",
    marginTop: 20,
    padding: '70px 13%'
  },
  remember: {
    marginTop: 25 ,
    fontSize: 14
  },
  inputs: {
    marginTop: 40,
    height: 5
  },
  loginButton: {
  },
  forget: {
    marginTop: 5,
    weight: 500,
    fontSize: 14,
    paddingLeft: 30
  },
  logoWrapper: {
    paddingTop: '8%',
    paddingLeft: '6%'
  }
});
