import { NavigationActions } from 'react-navigation';

import AppNavigation from '../navigation/AppNavigation';

export default (state, action) => {
    return AppNavigation.router.getStateForAction(action, state);
};
