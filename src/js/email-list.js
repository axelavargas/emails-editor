
const createEmailBlock = require('./email-block');

const removeEntryEmailById = (emailId, container, listDomElement, emails, onChange) => {
    const emailToDeleteDomElement = container.querySelector(`[data-email-id='${emailId}']`);
    if (emailToDeleteDomElement) {
        listDomElement.removeChild(emailToDeleteDomElement);
        _removeEmailEntry(emailId, emails, onChange);
    }
}

const _removeEmailEntry = (newEntryEmailId, emails, onChange) => {
    const index = emails.findIndex(email => email.id === newEntryEmailId);
    emails.splice(index, 1);

    if (onChange) {
        onChange(emails);
    }
}

const onAddEmailEntry = (newEntryEmail, emails, onChange) => {
    emails.push(newEntryEmail)
    if (onChange) {
        onChange(emails);
    }
}

const addNewEmailEntry = (emailFormInput, value, domListEmails, emails, onChange) => {
    // remove white spaces and split by commas
    const sanitizedEmailValues = value.trim().split(',');
    sanitizedEmailValues.forEach(newEmail => {
        const isDuplicated = emails.some(email => newEmail === email.value);
        if (newEmail && !isDuplicated) {
            const { newDomEmail, newEntryEmail } = createEmailBlock(newEmail, domListEmails);
            onAddEmailEntry(newEntryEmail, emails, onChange)
            domListEmails.insertBefore(newDomEmail, emailFormInput);
        }
    })
    emailFormInput.value = '';
}


module.exports = { removeEntryEmailById, addNewEmailEntry };