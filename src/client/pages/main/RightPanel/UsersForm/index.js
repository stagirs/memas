import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import './index.scss';
import moment from 'moment';
import { activateUser, deactivateUser } from '../../../../actions/';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import MoodIcon from '@material-ui/icons/Mood';
import {dateToString} from '../../../../utils';


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

function UsersForm(props) {
    const { users, active_users, activateUser, deactivateUser } = props;
    const [filter, setFilter] = useState('');
    const classes = useStyles();
    const now = moment();
    const yesterday = moment().subtract(1, "days");
    return (
        <div className="UsersForm">
            <div className={classes.root}>
                <div style={{margin: '1em'}}>
                    <h1>Выбор собеседников</h1>
                    <TextField label="Найти собеседника" variant="outlined" onChange={e => setFilter(e.target.value)}/>
                </div>
                <List>
                {
                    Object.values(users).filter(v => v.name.toLowerCase().includes(filter.toLowerCase())).map(v => {
                        const updatedAt = moment(v.updated_at);
                        return (
                            <ListItem key={v.id}>
                                <ListItemIcon>
                                    <Checkbox
                                      edge="start"
                                      checked={active_users.has(v.id)}
                                      tabIndex={-1}
                                      disableRipple
                                      onChange = {e => e.target.checked ? activateUser(v.id) : deactivateUser(v.id)}
                                    />
                                </ListItemIcon>
                                <ListItemAvatar>
                                  <Avatar>
                                    <MoodIcon />
                                  </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={v.name} secondary={dateToString(now, yesterday, updatedAt)} />
                            </ListItem>
                        );
                    })
                }
                </List>  
            </div>        
        </div>
    );
}

export default connect(
    store => ({ users : store.data.users, active_users: store.state.active_users}), 
    {activateUser, deactivateUser}
)(UsersForm)