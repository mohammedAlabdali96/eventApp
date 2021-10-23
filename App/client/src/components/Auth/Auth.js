import React, { useState } from 'react';
import {useHistory} from 'react-router-dom'
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useDispatch } from 'react-redux';
import useStyles from './styles';
import Input from './Input';
import Icon from './icon';

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = () => (
    console.log('ssss')
  );

  const handleChange = () => (
    console.log('sdfsd')
  );

  const handleShowPassword = () => (
    setShowPassword((prevShowPassword) => !prevShowPassword)
  );

  const switchMode = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
    handleShowPassword(false);
  };

  const googleFailure = () => {
    console.log('google sing in was unsuccessful');
  };

  const googleSuccess = async (res) => {
    console.log('google sing in was successful');
    console.log(res);
    const result = res?.profileObj;
    const token = res?.tokenId;
    try {
      dispatch({ type: 'AUTH', data: { result, token } });
      history.push('/')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h4">{isSignUp ? 'Sign Up' : 'Sign in'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {
                            isSignUp && (
                            <>
                              <Input autoFocus name="firstName" label="First Name" handleChange={handleChange} half />
                              <Input autoFocus={false} name="firstName" label="First Name" handleChange={handleChange} half />
                            </>
                            )
            }
            <Input name="email" label="email address" handleChange={handleChange} type="email" />
            <Input name="password" label="password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            {isSignUp && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
            <GoogleLogin
              clientId="130694600919-534sfrtsl4h2qspb0o66rf8f0l8vql5r.apps.googleusercontent.com"
              render={(renderProps) => (
                <Button
                  className={classes.googleButton}
                  color="primary"
                  fullWidth
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  startIcon={<Icon />}
                  variant="contained"
                >
                  Google Sign in
                </Button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy="single_host_origin"
            />
            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
              {isSignUp ? 'sign up' : 'sign in'}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button onClick={switchMode}>
                  {isSignUp ? 'Already have an account ? Sing in' : "Don't have an account? Sing up"}
                </Button>
              </Grid>
            </Grid>

          </Grid>

        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
