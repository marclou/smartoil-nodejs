import axios from 'axios';

import realm from '../Realm';
import {
    LOAD_FAVORITES,
    ADD_FAVORITE,
    DELETE_FAVORITE,
    FAVORITE_STATION_FETCH,
    FAVORITE_STATION_FETCH_SUCCESS,
    FAVORITE_STATION_FETCH_ERROR
} from './type';
import { SERVER_URL } from '../Api';

/*
 * We have have to create a realm Object "favoriteStationslist" once the app is launched.
 * This object will store all the user favorite stations whithin the cache memory.
 */
const createRealmDB = () => {
    const favoriteStationsList = realm.objects('GasStationsList');

    if (favoriteStationsList.length < 1) {
        realm.write(() => {
            realm.create('GasStationsList', { name: 'Gas Stations List', creationDate: new Date() });
        });
    }
};

export const isSaved = (uid) => {
    const favoriteStationsList = realm.objects('GasStationsList');
    createRealmDB();
    const saved = favoriteStationsList[0].gasStations.filtered('uid = $0', uid);

    return saved.length !== 0;
};

export const loadFavorites = () => {
    const favoriteStationsList = realm.objects('GasStationsList');

    createRealmDB();
    const favoriteList = [];

    favoriteStationsList[0].gasStations.map((station) => {
        const favorite = {
            uid: null,
            latitude: null,
            longitude: null,
            name: null,
            address: null,
            brand: null
        };
        const obj = Object.assign(favorite, station);
        favoriteList.push(obj);
        return favoriteList;
    });
    return {
        type: LOAD_FAVORITES,
        payload: favoriteList
    };
};

export const addFavorite = ({ uniId, location, name, address, brand }) => {
    const favoriteStationsList = realm.objects('GasStationsList');
    const toBeSaved = {
        uid: uniId,
        latitude: location.latitude,
        longitude: location.longitude,
        name: name,
        address: address,
        brand: brand
    };

    realm.write(() => {
        favoriteStationsList[0].gasStations.push(toBeSaved);
    });
    return {
        type: ADD_FAVORITE,
        payload: toBeSaved
    };
};

export const deleteFavorite = (uid) => {
    const favoriteStationsList = realm.objects('GasStationsList');

    createRealmDB();
    const toBeDeleted = favoriteStationsList[0].gasStations.filtered('uid = $0', uid);

    realm.write(() => {
        realm.delete(toBeDeleted);
    });
    return {
        type: DELETE_FAVORITE,
        payload: uid
    };
};

export const fetchFavoriteStation = (latitude, longitude, gasType, uid) => {
    return (dispatch) => {
        dispatch({ type: FAVORITE_STATION_FETCH });
        const URL =
            (latitude !== null && longitude !== null) ?
            `${SERVER_URL}/gas_station/specific?lat=${latitude}&lng=${longitude}&type=${gasType}&id=${uid}` :
            `${SERVER_URL}/gas_station/specific?type=${gasType}&id=${uid}`;

        return axios.get(URL).then(
            response => {
                if (response.data) {
                    return dispatch(fetchFavoriteStationSuccess(response.data));
                }
                return dispatch(fetchFavoriteStationError(response.status));
            },
            error => {
                return dispatch(fetchFavoriteStationError(error.request.status));
            });
    };
};

const fetchFavoriteStationSuccess = data => {
    return {
        type: FAVORITE_STATION_FETCH_SUCCESS,
        payload: data
    };
};

const fetchFavoriteStationError = error => {
    return {
        type: FAVORITE_STATION_FETCH_ERROR,
        payload: error
    };
};
