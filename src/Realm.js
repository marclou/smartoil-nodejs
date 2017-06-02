import Realm from 'realm';

class GasStation extends Realm.Object {}
GasStation.schema = {
    name: 'GasStation',
    properties: {
        uid: 'string',
        latitude: 'double',
        longitude: 'double',
        name: 'string',
        address: 'string',
        brand: 'string',
    }
};

class GasStationsList extends Realm.Object {}
GasStationsList.schema = {
    name: 'GasStationsList',
    properties: {
        name: 'string',
        creationDate: 'date',
        gasStations: {
            type: 'list',
            objectType: 'GasStation'
        }
    }
};

export default new Realm({ schema: [GasStation, GasStationsList] });
