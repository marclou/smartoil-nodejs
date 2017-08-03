export const displayLogo = (size, code) => {
    if (size === 'small') {
        switch (code) {
            case 'NHO':
                return require('./icon/allttull.png');
            case 'GSC':
                return require('./icon/gs.png');
            case 'HDO':
                return require('./icon/hyundai.png');
            case 'SKE':
                return require('./icon/sk.png');
            case 'SOL':
                return require('./icon/soil.png');
            default:
                return require('./icon/allttull.png');
        }
    }
    if (size === 'large') {
        switch (code) {
            case 'NHO':
                return require('./iconLarge/allttullLarge.png');
            case 'GSC':
                return require('./iconLarge/gsLarge.png');
            case 'HDO':
                return require('./iconLarge/hyundaiLarge.png');
            case 'SKE':
                return require('./iconLarge/skLarge.png');
            case 'SOL':
                return require('./iconLarge/soilLarge.png');
            default:
                return require('./iconLarge/allttullLarge.png');
        }
    }
};
