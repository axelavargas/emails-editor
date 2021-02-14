
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

    const removeEntryEmailById = (emailId) => {
        const emailToDeleteDomElement = container.querySelector(`[data-email-id='${emailId}']`);
        if (emailToDeleteDomElement) {
            listDomElement.removeChild(emailToDeleteDomElement);
            _removeEmailEntry(emailId);
        }
    }

    // Methods to handle email data state

    const _onAddEmailEntry = (newEntryEmail) => {
        emails.push(newEntryEmail)
        if (onChange) {
            onChange(emails);
        }
    }

    const _removeEmailEntry = (newEntryEmailId) => {
        emails = emails.filter(email => email.id !== newEntryEmailId)
        onChange(emails);
    }

    // Add emails to the dom

    const _addEmailsEditorEvents = (listDomElement, inputDomElement) => {
        // Execute a function when the user releases a key on the keyboard
        inputDomElement.addEventListener('keydown', (event) => {
            if (event.code === 'Backspace') {
                const refEmails = container.querySelectorAll('[data-email-id]');
                const lastEmailAdded = refEmails[refEmails.length - 1];
                const emailToDeleteId = lastEmailAdded.dataset.emailId;
                if (lastEmailAdded) {
                    lastEmailAdded.remove();
                    _removeEmailEntry(emailToDeleteId);
                }
            }

            //to avoid keyup events during IME composition on Firefox 65+
            if (event.isComposing || event.keyCode === 229) {
                return;
            }
            const value = inputDomElement.value;
            // do not allow empty values
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
            // do not allow empty values
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
                removeEntryEmailById(closeButtonDomReference);
            }

            // Edit an email
            const editActionDomReference = targetDomElement?.dataset?.emailId;
            if (editActionDomReference) {
                const emailToEditDomElement = container.querySelector(`[data-email-id='${editActionDomReference}']`);
                if (emailToEditDomElement) {
                    console.log('i am going to edit');
                }
            }

        });
    }

    init();

    return {
        emails,
        add: handleNewEntryEmail,
        remove: removeEntryEmailById,
    }
}

module.exports = EmailsEditor;
