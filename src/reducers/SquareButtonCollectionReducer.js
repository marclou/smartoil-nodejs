import uuidV1 from 'uuid';

import {
    SQUARE_BUTTON_FETCHING_SUCCESS
} from '../actions/type';

const INITIAL_STATE = [
    {
        id: 1,
        type: null,
        loading: true,
        title: null,
        icon: null
    },
    {
        id: 2,
        type: null,
        loading: true,
        title: null,
        icon: null
    },
    {
        id: 3,
        type: null,
        loading: true,
        title: null,
        icon: null
    }
];

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SQUARE_BUTTON_FETCHING_SUCCESS:
            return state.map((item) => {
                let obj = {
                    id: item.id,
                    type: 'ADD_LOCATION',
                    loading: false,
                    title: 'Add Location',
                    icon: 'add'
                };
                action.payload.forEach((payloadItem) => {
                    if (payloadItem.id === obj.id) {
                        obj = payloadItem;
                    }
                });
                return { ...obj };
            });
        default:
            return state;
    }
};