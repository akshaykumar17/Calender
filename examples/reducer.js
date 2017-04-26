import { combineReducers } from 'redux';
import { List, fromJS } from 'immutable';
import { ACTION_TYPE } from '../src/utils/constants';

const INITIAL_STATE = []


const eventReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ACTION_TYPE.ADD_EVENT:
            return [...state, ...action.payload]
        case ACTION_TYPE.UPDATE_EVENT:
            return action.payload;
        default:
            return state;
    }
}


const reducer = combineReducers({
    events: eventReducer
});

export default reducer;