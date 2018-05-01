import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';

import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email : "",
            password : "",
            isVerified : false,
            vertical: null,
            horizontal: null,
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


    state = {
        open: false,
        vertical: 'top',
        horizontal: 'center',
    };



    handleClose = () => {
        this.setState({ open: false });
    };

    onSubmit = state => (event) => {
        console.log("Submitted")

        event.preventDefault();
        const { email, password } = this.state;


        auth.signInWithEmailAndPassword(email, password)
        .then(authUser => {
            console.log(authUser);
            if (!authUser.emailVerified){
                console.log("Please verify first")
                this.setState({ open: true, ...state });
            }

        })
        .catch(authError => {
            alert(authError);
        })
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        const { email, password,vertical, horizontal,open } = this.state;
        const classes = this.props.classes;

        return (
            <Grid container>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <h1>Log in</h1>


                        <form onSubmit={this.onSubmit({ vertical: 'top', horizontal: 'center' })} autoComplete="off">
                            <TextField
                              id="email"
                              label="Email"
                              className={classes.textField}
                              value={email}
                              onChange={this.handleChange('email')}
                              margin="normal"
                              type="email"
                            />
                            <br />
                            <TextField
                              id="password"
                              label="Password"
                              className={classes.textField}
                              value={password}
                              onChange={this.handleChange('password')}
                              margin="normal"
                              type="password"
                            />

                            <br />
                            <Button variant="raised" color="secondary" type="submit">Log in</Button>

                            <Snackbar
                                anchorOrigin={{ vertical, horizontal }}
                                open={open}
                                onClose={this.handleClose}
                                autoHideDuration={1000}
                                SnackbarContentProps={{
                                    'aria-describedby': 'message-id',
                                }}
                                message={<span id="message-id">Please verify your email address first.</span>}
                            />


                        </form>
                        <p>Don't have an account? <Link to="/signup">Sign up here</Link></p>
                    </Paper>


                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(Login);
