import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { addMessage } from '../../../../actions/';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import TuneIcon from '@material-ui/icons/Tune';
import MoodIcon from '@material-ui/icons/Mood';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import SettingsIcon from '@material-ui/icons/Settings';
import {dateToString} from '../../../../utils';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  }
}));

function Messages(props) {
    const { user, users, channels, active_chat_id, addMessage } = props;
    const [open, setOpen] = React.useState(true);
    const [filter, setFilter] = useState('');
    const active = user;
    if(channels[active_chat_id]){
        messages = channels[active_chat_id];
    }
    if(users[active_chat_id]){
        messages = users[active_chat_id];
    }
    const classes = useStyles();
    const now = moment();
    const yesterday = moment().subtract(1, "days");
     
            
    return (
        <div className="Messages" style={{height: '100%'}}>
            <div className={classes.root} style={{display: 'table', height: '100%'}}>
                <div style={{margin: '1em', display: 'table-row', height: 'min-content'}}>
                    <h1>Сообщения {active.name}</h1>
                </div>
                <div style={{margin: '1em', display: 'table-row'}}>
                    <List>
                    </List>  
                </div>
                <div style={{margin: '1em', display: 'table-row', height: 'min-content'}}>
                    <TextField
                        label="Введите сообщение"
                        placeholder="Введите сообщение"
                        multiline
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        style={{width: "100%"}}
                      /> 
                </div>
            </div>        
        </div>
    );
}

export default connect(
    store => ({ channels : store.data.channels, user: store.data.user, users : store.data.users, active_chat_id: store.state.active_chat_id}), 
    {addMessage}
)(Messages)