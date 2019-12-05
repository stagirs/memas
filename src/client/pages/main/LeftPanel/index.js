import React from 'react';
import './index.scss';
import { connect } from 'react-redux';
import ChannelForm from './ChannelForm/';

class LeftPanel extends React.Component {
    render(){
        return (
            <div className="LeftPanel">
                <ChannelForm/>
            </div>
        );
    }   
}
const mapStateToProps = (store) => ({ nAr : store});
export default connect(mapStateToProps)(LeftPanel)