export const displayLogo = (size, code) => {
    if (size === 'small') {
        switch (code) {
            case '서울 중구':
                return require('./icon/allttull.png');
            case 'GS칼텍스':
                return require('./icon/gs.png');
            case '현대오일뱅크':
                return require('./icon/hyundai.png');
            case 'SK에너지':
                return require('./icon/sk.png');
            default:
                return require('./icon/allttull.png');
        }
    }
    if (size === 'large') {
        switch (code) {
            case '서울 중구':
                return require('./iconLarge/allttullLarge.png');
            case 'GS칼텍스':
                return require('./iconLarge/gsLarge.png');
            case '현대오일뱅크':
                return require('./iconLarge/hyundaiLarge.png');
            case 'SK에너지':
                return require('./iconLarge/skLarge.png');
            default:
                return require('./iconLarge/allttullLarge.png');
        }
    }
};
