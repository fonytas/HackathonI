import React, { Component } from 'react';
import { auth, db } from '../firebase';
import { withStyles } from 'material-ui/styles';

import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AccountCircle from '@material-ui/icons/AccountCircle';
import List, {
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
} from 'material-ui/List';
import {Menu, MenuItem, Typography} from "material-ui";


const styles = theme => ({
    root: {
        flexGrow: 1,

    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'left',
        color: theme.palette.text.secondary,


    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',



    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,

    },
    list: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        maxWidth: 360,
        maxHeight: 200,
        overflow: 'auto',
    },

    title: {
        // marginBottom: 16,
        // fontSize: 14,
        marginTop: 15,
        // marginLeft:10
    },
    avatar:{
        width: 35,
        height: 35,
    }

});


class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notes : [],
            current : "",
            anchorEl: null,
        };
        this.addNote = this.addNote.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {
        const uid = auth.currentUser.uid;
        let notesRef = db.ref('notes/' + uid).orderByKey().limitToLast(100);
        notesRef.on('child_added', snapshot => {
            let note = { text: snapshot.val(), id: snapshot.key };
            this.setState({ notes: [note].concat(this.state.notes) });
        })
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };


    addNote(e) {
        e.preventDefault();
        const uid = auth.currentUser.uid;
        db.ref('notes/' + uid).push(this.state.current);
        this.setState({ current : "" });
    }

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
        this.props.history.push('/account')

    };

   
    onRemoveItem= (note,index) => {

        console.log(note)
        console.log(note.id)
        console.log(note.text)


        // var count = index;
        //
        // var tempNotes = [];
        //
        //
        // this.state.notes.forEach(function (element) {
        //     if (count !== index){
        //         tempNotes.push(element)
        //     }
        //     count++;
        // })
        //
        // const uid = auth.currentUser.uid;
        // db.ref('notes/' + uid).remove()
        //
        //
        // tempNotes.forEach(function (input) {
        //     db.ref('notes/' + uid).push(input.text);
        // });
        // window.location.reload();

    }


    render() {
        const classes = this.props.classes;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);
        return (
            <Grid container className={classes.container} >
                <Grid item xs={12} >
                    <Paper className={classes.paper} >

                        <div style={{display: 'flex', flexDirection: 'row'}}>

                        <IconButton
                            aria-haspopup="true"
                            color={"secondary"}
                            onClick={this.handleMenu}>
                            <AccountCircle className={classes.avatar} />

                        </IconButton>

                        <Typography className={classes.title} color="textSecondary">
                            Hello, { auth.currentUser.email }
                        </Typography>
                        </div>

                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={open}
                            onClose={this.handleClose}
                        >
                            {/*<MenuItem onClick={this.handleClose}>Profile</MenuItem>*/}
                            <MenuItem onClick={this.handleClose}>My account</MenuItem>

                        </Menu>



                            <List className={classes.list} >
                                { /* Render the list of messages */
                                    this.state.notes.map( (note,index) =>
                                        <ListItem key={note.id}>
                                            <ListItemText primary={(index+1) + '. ' + note.text}/>
                                            <ListItemSecondaryAction>
                                              <IconButton aria-label="Delete">
                                                <DeleteIcon onClick={() => this.onRemoveItem(note,index)}/>
                                              </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem> )
                                }
                            </List>
                            <form onSubmit={this.addNote}>
                                <TextField
                                    id="note"
                                    label="Enter new note"
                                    className={classes.textField}
                                    value={this.state.current}
                                    onChange={this.handleChange('current')}
                                    margin="normal"
                                    />
                                <br />
                                <Button  variant="raised" color="secondary" type="submit">Add</Button>
                            </form>
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(Main);
