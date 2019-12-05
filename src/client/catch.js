import React, { Component } from 'react';

export default class Catch extends Component {
    constructor() {
        super();
        this.state = {
          hasError: false
        }
    }

    componentDidCatch() {
    this.setState({ hasError: true });
    }

    render() {
    if (this.state.hasError) {
        //Добавить нормальную обработку ошибок
        return <div>Error!</div>;
    }

    return this.props.children;
    }
}