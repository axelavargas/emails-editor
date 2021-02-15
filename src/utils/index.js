/**
 * Generates a random id based on a prefix
 * @param {String} prefix 
 */
export const generateRandomId = (prefix = null) => {
    return prefix ? prefix + '-' + Math.random().toString(20).substr(2, 5) : Math.random().toString(20).substr(2, 5)
}

export const findEmailIndex = (emails, newEntryEmailId) => {
    if (typeof emails.findIndex !== 'function') {
        var index = -1;
        emails.some(function (email, i) {
            if (email.id == newEntryEmailId) {
                index = i;
                return true;
            }
        });
    } else {
        index = emails.findIndex(email => email.id === newEntryEmailId);
    }
    return index;
}