import { NavigationActions } from 'react-navigation';

import AppNavigation from '../navigation/AppNavigation';

//const INITIAL_STATE = AppNavigation.router.getStateForAction(NavigationActions.init());

export default (state, action) => {
    const nextState = AppNavigation.router.getStateForAction(action, state);

    return nextState || state;
};
