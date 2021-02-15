
require('./emails-editor-style.css');
const { renderEditorComponent } = require('./js/render');
const { addNewEmailEntry } = require('./js/email-list');

const { handleEmailListEvents, handleInputEnterEvents, handleInputBlurEvents, handleInputPasteEvents } = require('./js/events');


function EmailsEditor(container, onChange = null) {
    let emails = [];
    let listDomElement;
    let inputDomElement;

    const init = () => {
        // render email editor
        const { listDom, inputDom } = renderEditorComponent(container);
        listDomElement = listDom;
        inputDomElement = inputDom;
        // Add events to handle enter, commas, lose focus to generate email blocks
        _addEmailsEditorEvents(listDomElement, inputDomElement);
    }

    const handleAddNewEmail = (value) => {
        addNewEmailEntry(inputDomElement, value, listDomElement, emails, onChange);
    }

    const getEmails = () => {
        //clone to not expose internal state
        return JSON.parse(JSON.stringify(emails));
    }

    const _addEmailsEditorEvents = (listDomElement, inputDomElement) => {
        inputDomElement.addEventListener('keydown', (event) => handleInputEnterEvents(event, inputDomElement, listDomElement, emails, onChange));
        inputDomElement.addEventListener('blur', (event) => handleInputBlurEvents(event, inputDomElement, listDomElement, emails, onChange));
        inputDomElement.addEventListener('paste', (event) => handleInputPasteEvents(event, inputDomElement, listDomElement, emails, onChange));

        // Email actions delete or edit
        listDomElement.addEventListener('click', (event) => handleEmailListEvents(event, container, listDomElement, emails, onChange));
    }

    init();

    return {
        add: handleAddNewEmail,
        getEmails: getEmails
    }
}

module.exports = EmailsEditor;
