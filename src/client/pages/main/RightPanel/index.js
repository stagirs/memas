import React from 'react';
import './index.scss';
import { connect } from 'react-redux';
import DirectForm from './DirectForm/';
import UsersForm from './UsersForm/';

class RightPanel extends React.Component {
    render(){
        return (
            <div className="RightPanel">
            {   
                this.props.mode == 'users' ? <UsersForm/> : <DirectForm/>
            }   
            </div>
        );
    }   
}
export default connect(
    store => ({ mode: store.state.right_panel_mode})
)(RightPanel)