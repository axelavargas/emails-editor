require('../emails-editor-style.css');
const createEmailBlock = require('./email-tag');
const { generateRandomId } = require('../utils');

/**
 * 
 */
const renderEditorComponent = (DomEmailEditorContainer) => {
    // It will render the list of emails
    DomEmailEditorContainer.className = "emails-input"

    const listEmails = document.createElement("div");
    const listEmailId = generateRandomId("list-emails");
    listEmails.id = listEmailId;
    listEmails.className = "list-emails";

    // Input to collect the emails
    const emailFormInput = document.createElement("input");
    const inputEmailId = generateRandomId("email-input-form");
    emailFormInput.id = inputEmailId;
    emailFormInput.autofocus = true;

    // create html structure
    listEmails.appendChild(emailFormInput);
    DomEmailEditorContainer.appendChild(listEmails);

    return {
        listEmails,
        emailFormInput
    }
}

const renderEmailListBlocks = (emailFormInput, EmailFormInputValue, domListEmails, addNewEmailEntry) => {
    // remove white spaces and split by commas
    const sanitizedEmailValues = EmailFormInputValue.trim().split(',');
    sanitizedEmailValues.forEach(email => {
        if (email) {
            const { newDomEmail, newEntryEmail } = createEmailBlock(email, domListEmails);
            addNewEmailEntry(newEntryEmail)
            domListEmails.insertBefore(newDomEmail, emailFormInput);
        }
    })
    emailFormInput.value = "";
}


module.exports = { renderEditorComponent, renderEmailListBlocks };