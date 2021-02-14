
require('./emails-editor-style.css');
const { renderEditorComponent, renderEmailListBlocks } = require('./js/render');

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

    const handleNewEntryEmail = (value) => {
        renderEmailListBlocks(inputDomElement, value, listDomElement, _onAddEmailEntry)
    }

    const getEmails = () => {
        //clone to not expose internal state
        return emails.map(e => Object.assign({}, e));
    }

    const _removeEntryEmailById = (emailId) => {
        const emailToDeleteDomElement = container.querySelector(`[data-email-id='${emailId}']`);
        if (emailToDeleteDomElement) {
            listDomElement.removeChild(emailToDeleteDomElement);
            _removeEmailEntry(emailId);
        }
    }

    const _onAddEmailEntry = (newEntryEmail) => {
        emails.push(newEntryEmail)
        if (onChange) {
            onChange(emails);
        }
    }

    const _removeEmailEntry = (newEntryEmailId) => {
        emails = emails.filter(email => email.id !== newEntryEmailId)
        if (onChange) {
            onChange(emails);
        }
    }

    const _addEmailsEditorEvents = (listDomElement, inputDomElement) => {
        inputDomElement.addEventListener('keydown', (event) => {
            const value = inputDomElement.value;
            if (!value) return false;

            // add emails when enter or comma
            if (event.keyCode === 13 || event.keyCode === 188) {
                event.preventDefault();
                renderEmailListBlocks(inputDomElement, value, listDomElement, _onAddEmailEntry)
            }
        });

        inputDomElement.addEventListener('blur', (event) => {
            event.preventDefault();
            const value = inputDomElement.value;
            if (!value) return false;
            renderEmailListBlocks(inputDomElement, value, listDomElement, _onAddEmailEntry)
        });

        // Email actions delete or edit
        listDomElement.addEventListener('click', (event) => {
            event.preventDefault();
            const targetDomElement = event.target;

            // Delete an email
            const closeButtonDomReference = targetDomElement?.dataset?.deleteIdentifierEmailId;
            if (closeButtonDomReference) {
                _removeEntryEmailById(closeButtonDomReference);
            }

            // Todo: Edit an email
            // const editActionDomReference = targetDomElement?.dataset?.emailId;
            // if (editActionDomReference) {
            //     const emailToEditDomElement = container.querySelector(`[data-email-id='${editActionDomReference}']`);
            //     if (emailToEditDomElement) {
            //         console.log('i am going to edit');
            //     }
            // }

        });
    }

    init();

    return {
        add: handleNewEntryEmail,
        getEmails: getEmails
    }
}

module.exports = EmailsEditor;
