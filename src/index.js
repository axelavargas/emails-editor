
require('./emails-editor-style.css');
const { renderEditorComponent, renderEmailListBlocks } = require('./js/render');

function EmailsEditor(container, onChange) {
    let emails = [];

    const init = () => {
        // render email editor
        const { listEmails, emailFormInput } = renderEditorComponent(container);
        // Add events to handle enter, commas, lose focus to generate email blocks
        _addEmailsEditorEvents(listEmails, emailFormInput);
    }

    // Methods to handle email data state

    const _addEmailEntry = (newEntryEmail) => {
        emails.push(newEntryEmail)
        onChange(emails);
    }

    const _removeEmailEntry = (newEntryEmailId) => {
        emails = emails.filter(email => email.id !== newEntryEmailId)
        onChange(emails);
    }

    // Add emails to the dom

    const _addEmailsEditorEvents = (listEmails, emailFormInput) => {
        // Execute a function when the user releases a key on the keyboard
        emailFormInput.addEventListener("keydown", (event) => {
            if (event.code === 'Backspace') {
                const refEmails = container.querySelectorAll(`[data-email-id]`);
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
            const EmailFormInputValue = emailFormInput.value;
            // do not allow empty values
            if (!EmailFormInputValue) return false;

            // add emails when enter or comma
            if (event.code === 'Enter' || event.keyCode === 188) {
                event.preventDefault();
                renderEmailListBlocks(emailFormInput, EmailFormInputValue, listEmails, _addEmailEntry)
            }
        });

        emailFormInput.addEventListener('blur', (event) => {
            event.preventDefault();
            const EmailFormInputValue = emailFormInput.value;
            // do not allow empty values
            if (!EmailFormInputValue) return false;
            renderEmailListBlocks(emailFormInput, EmailFormInputValue, listEmails, _addEmailEntry)
        });

        // Email actions delete or edit
        listEmails.addEventListener('click', (event) => {
            event.preventDefault();
            const targetDomElement = event.target;

            // Delete an email
            const closeButtonDomReference = targetDomElement?.dataset?.deleteIdentifierEmailId;
            if (closeButtonDomReference) {
                const emailToDeleteDomElement = container.querySelector(`[data-email-id="${closeButtonDomReference}"]`);
                if (emailToDeleteDomElement) {
                    listEmails.removeChild(emailToDeleteDomElement);
                    _removeEmailEntry(closeButtonDomReference);
                }
            }

            // Edit an email
            const editActionDomReference = targetDomElement?.dataset?.emailId;
            if (editActionDomReference) {
                const emailToEditDomElement = container.querySelector(`[data-email-id="${editActionDomReference}"]`);
                if (emailToEditDomElement) {
                    console.log('i am going to edit');
                }
            }

        });
    }

    return init();
}

module.exports = EmailsEditor;
