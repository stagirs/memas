import React from 'react';
import './window.css';
import { connect } from 'react-redux'
import windowStore from '../AddChanel/windowStore.js'
import close from './close.png'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import leftpanel_store from '../LeftPanel/leftpanel_store.js'
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";


let GlobalSwitch = 0

function Clock(event) {
    if (windowStore.getState().switch) {
        windowStore.dispatch({type: 'OFF'})
    } else {
        windowStore.dispatch({type: 'ON'})
    }
    windowStore.dispatch({type: "CHANGENAME", text: ''})
    console.log('Help me')
}

function InputOne(e) {

    if (e.target.value.length >= 100) {
        GlobalSwitch = 1;
        windowStore.dispatch({type: 'CHANGEGLOBERROR', text: 'Too Much Symbol'})
    } else {
        GlobalSwitch = 0
        windowStore.dispatch({type: 'CHANGEGLOBERROR', text: 'Input Channel Name'})
    }

    if (e.target.value.length < 101) {
        windowStore.dispatch({type: "CHANGENAME", text: e.target.value})
    }

}

function ClickCLack(e) {
    leftpanel_store.getState().data.map((i) => {
        unsick({i})
    })
}

function unsick(props) {
    if (props.i.values !== "none") {
        props.i.values.map((i) => {
            unsick({i})
        })
    }
    if (props.i.name === windowStore.getState().form.name) {
        GlobalSwitch = 2
        windowStore.dispatch({type: 'CHANGEGLOBERROR', text: 'Name Already Used'})
        return
    }
}



function OpenWindow(props) {
    if (props.nAr.switch) {
        return(
                <div className='BackEnd' onClick={Clock}>
                    <div className='test' onClick={Clock} >
                        <img src={close} onClick={Clock} className='E_N_D'/>
                        <div className='OneText'>
                            <TextField id="filled-basic" label="Channel Name" variant="filled" helperText={ props.nAr.form.GlobalErrorText}
                                       fullWidth value={props.nAr.form.name} onChange={InputOne} error={ GlobalSwitch > 0} 
                                       />
                        </div>
                        <div className="DoneButton">
                            <Button variant="contained" color="primary" onClick={ClickCLack}>
                                Add Chanel
                            </Button>
                        </div>
                        <div className="YouChose">
                            MyChannel :
                        </div>
                        <div className="LocalFinder">	
                            <TextField id="standard-basic" label="Find" fullWidth helperText={ 'Input What You Wan\'T Find'}	
                                       InputProps={{
                                                       startAdornment: (
                                                <InputAdornment position="start">
                                             <SearchIcon />
                                         </InputAdornment>
                                                        ),
                                            }}/>
                        </div>
                    </div>
                </div>

                )
    } else {
        return null
    }
}

const mapStateToProps = (store) => ({nAr: store});
export default connect(mapStateToProps)(OpenWindow)
