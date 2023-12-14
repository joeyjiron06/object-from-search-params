
function tryParse(value) {
    try {
        return JSON.parse(value);
    } catch (error) {
        return value;
    }
}

module.exports = function tinyQueryParamParser(queryParams) {
    const searchParams = new URLSearchParams(queryParams);

    const result = {};

    searchParams.forEach((value, key) => {
        if (!result.hasOwnProperty(key)) {
            result[key] = tryParse(value)
        } else if (Array.isArray(result[key])) {
            result[key].push(tryParse(value))
        } else {
            result[key] = [result[key], tryParse(value)]
        }
    });


    return result;
}