import AppNavigation from '../navigation/AppNavigation';

export default (state, action) => {
    const nextState = AppNavigation.router.getStateForAction(action, state);

    return nextState || state;
};
