import { ACTION_TYPE } from '../src/utils/constants';

export const addEvent = (action) => {
    return{
        type: ACTION_TYPE.ADD_EVENT,
        payload: action
    }
}

export const updateEventChange = (action) => {
    return {
        type: ACTION_TYPE.UPDATE_EVENT,
        payload: action
    }
}