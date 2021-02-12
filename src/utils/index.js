/**
 * Generates a random id based on a prefix
 * @param {String} prefix 
 */
export const generateRandomId = (prefix = null) => {
    return prefix ? prefix + '-' + Math.random().toString(20).substr(2, 5) : Math.random().toString(20).substr(2, 5)
}

