require('../emails-editor-style.css');

/**
 * 
 */
const renderEditorComponent = (DomEmailEditorContainer) => {
    // It will render the list of emails
    DomEmailEditorContainer.classList.add('emailsEditor')

    const listEmails = document.createElement('div');
    listEmails.classList.add('emailsEditor__list');

    // Input to collect the emails
    const emailFormInput = document.createElement('input');
    emailFormInput.classList.add('emailsEditor__input');
    emailFormInput.autofocus = true;

    // create html structure
    listEmails.appendChild(emailFormInput);
    DomEmailEditorContainer.appendChild(listEmails);

    return {
        listDom: listEmails,
        inputDom: emailFormInput
    }
}


module.exports = { renderEditorComponent };