
const createEmailBlock = require('./email-block');

const removeEntryEmailById = (emailId, container, listDomElement) => {
    const emailToDeleteDomElement = container.querySelector(`[data-email-id='${emailId}']`);
    if (emailToDeleteDomElement) {
        listDomElement.removeChild(emailToDeleteDomElement);
        _removeEmailEntry(emailId);
    }
}

const _removeEmailEntry = (newEntryEmailId, onChange, emails) => {
    emails = emails.filter(email => email.id !== newEntryEmailId)
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
    sanitizedEmailValues.forEach(email => {
        if (email) {
            const { newDomEmail, newEntryEmail } = createEmailBlock(email, domListEmails);
            onAddEmailEntry(newEntryEmail, emails, onChange)
            domListEmails.insertBefore(newDomEmail, emailFormInput);
        }
    })
    emailFormInput.value = '';
}

module.exports = { removeEntryEmailById, addNewEmailEntry };