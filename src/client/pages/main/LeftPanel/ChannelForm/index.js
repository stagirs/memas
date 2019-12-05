import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import './index.scss';
import moment from 'moment';
import { selectActiveChatId, showChannel, hideChannel, addChannel } from '../../../../actions/';
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

function ChannelForm(props) {
    const { channels, active_chat_id, selectActiveChatId, showChannel, hideChannel, addChannel } = props;
    const [open, setOpen] = React.useState(true);
    const [filter, setFilter] = useState('');
    const [channelNames, setChannelNames] = useState({});
    const classes = useStyles();
    const now = moment();
    const yesterday = moment().subtract(1, "days");
    const filteredChannelIds = new Set();
    Object.entries(channels)
            .filter(([k, v]) => v.name.toLowerCase().includes(filter.toLowerCase()))
            .forEach(([k, v]) => {
                filteredChannelIds.add(k);
                while(v.parent_id){
                    filteredChannelIds.add(v.parent_id);
                    v = channels[v.parent_id];
                }
            });
            
    function getList(channel_ids){
        const list = [];
        if(!channel_ids){
            return list;
        }
        channel_ids.forEach(id => {
            if(!filteredChannelIds.has(id)){
                return;
            }
            const v = channels[id];
            const updatedAt = moment(v.updated_at);
            list.push(
                 <ListItem onClick={e => selectActiveChatId(v.id)} key={v.id} button selected={active_chat_id == v.id}>
                    <ListItemAvatar>
                      <Avatar>
                        <MoodIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={<div style={{wordBreak: 'break-word'}}>{v.name}</div>} secondary={dateToString(now, yesterday, updatedAt)} />
                    <IconButton edge="end" onClick={e => {e.stopPropagation();}}>
                        <SettingsIcon /> 
                    </IconButton>
                    {
                        filteredChannelIds.size < Object.keys(channels).length ?
                        null
                        :
                        (
                            v.is_showed ?
                            <IconButton edge="end" onClick={e => {e.stopPropagation(); hideChannel(v.id)}}><ExpandLess /></IconButton>
                            :
                            <IconButton edge="end" onClick={e => {e.stopPropagation(); showChannel(v.id)}}><ExpandMore /></IconButton>        
                        )
                    }  
                </ListItem>
            );
    
            function addSubChannel(){
                if(channelNames[v.id]){
                    addChannel(channelNames[v.id], v.id, moment().toISOString()); 
                    setChannelNames({});
                }
            }
            list.push(
                <Collapse in={v.is_showed || filteredChannelIds.size < Object.keys(channels).length} timeout="auto" unmountOnExit key={v.id + 'Parent'}
                          style={{width: 'calc(100% - 2em)', float: 'right', position: 'relative'}}>
                    <List component="div" disablePadding>
                        <FormControl variant="outlined" style={{width: "calc(100% - 2em)", float: 'right', margin: '1em'}}>
                            <InputLabel htmlFor="outlined-channels-add">Подканал</InputLabel>
                            <OutlinedInput
                              id="outlined-channels-add"
                              type={'text'}
                              onChange={e => setChannelNames({... channelNames, [v.id]: e.target.value})}
                              value={!channelNames[v.id] ? '' : channelNames[v.id]}
                              onKeyPress={e => {
                                    if (e.key === 'Enter') {
                                        e.stopPropagation();
                                        addSubChannel();
                                    }
                              }}
                              endAdornment={
                                <InputAdornment position="end">
                                  <IconButton edge="end" onClick={addSubChannel}>
                                    <AddCircleOutlineIcon /> 
                                  </IconButton>
                                </InputAdornment>
                              }
                              labelWidth={80}
                            />
                        </FormControl>
                    {
                        getList(v.channel_ids)
                    }
                    </List>
                </Collapse>
            );  
        });
        list.push(
            <ListItem key="empty"></ListItem>
        );
        return list;
    }        
            
    return (
        <div className="ChannelForm">
            <div className={classes.root}>
                <div style={{margin: '1em'}}>
                    <h1>Каналы</h1>
                    <FormControl variant="outlined" style={{width: "100%"}}>
                        <InputLabel htmlFor="outlined-channels-search">Найти канал или добавить</InputLabel>
                        <OutlinedInput
                          id="outlined-channels-search"
                          onChange={e => setFilter(e.target.value)}
                          value={filter}
                          type={'text'}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton edge="end" onClick={e => {!channelName ? null : addChannel(filter, null, moment().toISOString()); setFilter('')}}>
                                <AddCircleOutlineIcon /> 
                              </IconButton>
                            </InputAdornment>
                          }
                          labelWidth={205}
                        />
                    </FormControl>
                </div>
                
                <List>
                {
                    getList(Object.values(channels).filter(v => !v.parent_id).map(v => v.id))
                }
                </List>  
            </div>        
        </div>
    );
}

export default connect(
    store => ({ channels : store.data.channels, active_chat_id: store.state.active_chat_id}), 
    {selectActiveChatId, showChannel, hideChannel, addChannel}
)(ChannelForm)