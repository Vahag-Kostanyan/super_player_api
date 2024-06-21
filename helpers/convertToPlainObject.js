const convertToPlainObject = (obj) => {
    if (obj === null || obj === undefined) {
        return obj;
    }
    if (typeof obj !== 'object') {
        return obj;
    }
    if (Array.isArray(obj)) {
        // Flatten the array if it contains nested arrays
        return obj.reduce((acc, item) => {
            return acc.concat(Array.isArray(item) ? item : [convertToPlainObject(item)]);
        }, []);
    }
    if (obj instanceof Date) {
        return obj.toISOString();
    }
    const plainObject = {};
    for (const [key, value] of Object.entries(obj)) {
        plainObject[key] = convertToPlainObject(value);
    }
    return plainObject;
};

module.exports = {convertToPlainObject};