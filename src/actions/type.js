/** Type for the userGlobalState Reducer **/
export const RECEIVE_LOCATION = 'receive_location';
export const ERROR_LOCATION = 'error_location';
export const FETCHING_LOCATION = 'fetching_location';
export const CHANGE_USER_ALLOW_LOCATION = 'change_user_allow_location';
export const RECEIVE_USER_FAVORITE_GAS = 'receive_user_favorite_gas';
export const RECEIVE_USER_TANK_CAPACITY = 'receive_user_tank_capacity';
export const RECEIVE_USER_FAVORITE_AREA = 'receive_user_favorite_area';

/** Type for the GasStationList Component **/
export const DATA_FETCHING = 'data_fetching';
export const DATA_FETCH_SUCCESS = 'data_fetch_success';
export const DATA_FETCH_ERROR = 'data_fetch_error';
export const SELECT_ID = 'select_id';
export const DESELECT_ID = 'deselect_id';
export const SELECT_FILTER = 'select_filter';

/** Type for Favorite gas stations list **/
export const LOAD_FAVORITES = 'load_favorites';
export const ADD_FAVORITE = 'add_favorite';
export const DELETE_FAVORITE = 'delete_favorite';
export const FAVORITE_STATION_FETCH = 'favorite_station_fetch';
export const FAVORITE_STATION_FETCH_SUCCESS = 'favorite_station_fetch_success';
export const FAVORITE_STATION_FETCH_ERROR = 'favorite_station_fetch_error';

/** Type for PricePrediction Component **/
export const PREDICTION_FETCHING = 'prediction_fetching';
export const PREDICTION_FETCH_SUCCESS = 'prediction_fetch_success';

/** Type for AreaList Component **/
export const SELECT_AREA = 'select_area';
export const SELECT_INDEX = 'select_index';
export const CLEAR_CACHE = 'clear_cache';
export const ERROR_NO_LOG = 'error_no_log';
