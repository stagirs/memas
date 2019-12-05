import React from 'react';
import './index.scss';
import Messages from './Messages/';

export default class MiddlePanel extends React.Component {
    render(){
        return (
            <div className="MiddlePanel">
                <Messages/>
            </div>
        );
    }   
}
