import React, { Component } from 'react';
import firebase ,{ auth } from '../firebase';
import { Link } from 'react-router-dom';


import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

const styles = theme => ({
    root: {
        flexGrow: 1,
      },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
    signInButton:{
        margin: theme.spacing.unit + 4,
        color: '#9ba09e',
        textColor:'#5f0000'

    }
});

class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email : "",
            password : ""
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();
        const { email, password } = this.state;

        auth.createUserWithEmailAndPassword(email, password)
        .then(authUser => {
            console.log(authUser);

            this.sendVerification();


        })
        .catch(authError => {
            alert(authError);
        })
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    sendVerification(){

        var user = firebase.auth().currentUser;

        user.sendEmailVerification().then(function() {

        }).catch(function(error) {
            // An error happened.
        });

    }

    render() {
        const { email, password } = this.state;
        const classes = this.props.classes;
        return (
            <div>
                <Grid container>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <h1>Sign up</h1>
                            <form onSubmit={this.onSubmit} autoComplete="off">
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
                                <Button variant="raised" color="secondary" type="submit">Sign up</Button>
                                <Button onClick={()=> this.props.history.push('/login')} className={classes.signInButton} variant="raised" type="submit">Log in</Button>
                                {/*<p>Already have an account ? <Link to="/login">Login</Link></p>*/}
                            </form>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(Signup);
