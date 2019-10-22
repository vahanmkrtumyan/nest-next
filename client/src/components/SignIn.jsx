import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import useStyles from './SigInStyle';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export default function SignIn(props) {
  const classes = useStyles();

  const [username, setUsername] = useState('');
  const [password, setPassWord] = useState('');
  let history = useHistory();

  const handleSubmit = e => {
    let user = username.trim();
    let pass = password.trim();

    e.preventDefault();
    if (props.register) {
      axios({
        method: 'post',
        url: `http://localhost:4000/register`,
        data: { username: user, password: pass },
        crossDomain: true,
      })
        .then(function(response) {
          console.log(response.data);
          localStorage.setItem(
            'token',
            JSON.stringify(response.data.access_token),
          );
          history.push('/products');
        })
        .catch(function(error) {
          console.log(error);
        });
    } else {
      axios({
        method: 'post',
        url: `http://localhost:4000/auth/login`,
        data: { username: user, password: pass },
        crossDomain: true,
      })
        .then(function(response) {
          console.log(response.data);
          localStorage.setItem(
            'token',
            JSON.stringify(response.data.access_token),
          );
          history.push('/products');
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {props.register ? 'Sign up' : 'Sign in'}
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={e => setPassWord(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            {props.register ? 'Sign up' : 'Sign in'}
          </Button>
          {props.register ? (
            <Link to="/">{'Have an account? Sign in'}</Link>
          ) : (
            <Link to="/register">{"Don't have an account? Sign Up"}</Link>
          )}
        </form>
      </div>
    </Container>
  );
}
