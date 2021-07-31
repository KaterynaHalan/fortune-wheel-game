export const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
}

export const randomInteger = (min, max) => {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

export const selectRandomValue = (array) => {
    return array[randomInteger(0, array.length - 1)];
}

export const getAllIndexes = (array, value) => {
    return  array.reduce((list, num, index) => {
        if (num === value) {
            list.push(index);
        }
        return list;
    }, []);
}
