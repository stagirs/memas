import React from 'react';
import { createStore } from 'redux'

        let windowStore = createStore(windowStoreRed, {switch : 0, form: {name: '', GlobalErrorText: 'Input Channel Name'}});

function windowStoreRed(state, action) {
    switch (action.type) {
        case 'ON':
            return {switch : 1, form: state.form}

        case 'OFF':
            return {switch : 0, form: state.form}

        case 'CHANGENAME':
            let STAT = state.form;
            STAT.name = action.text
            return {switch : state.switch, form: STAT}
        case 'CHANGEGLOBERROR':
            let STAT2 = state.form;
            STAT2.GlobalErrorText = action.text
            return {switch : state.switch, form: STAT2}
        default:
            return state
    }
}

export default windowStore