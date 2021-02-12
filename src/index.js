
require('./emails-editor-style.css');
const { renderEditorComponent, renderEmailListBlocks } = require('./js/render');

/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */
class EmailsEditor {
    constructor(container) {
        this.container = container;
        this.init();
    }

    // Public
    init() {
        // render email editor
        const { listEmails, emailFormInput } = renderEditorComponent(this.container);
        // Add events to handle enter, commas, lose focus to generate email blocks
        this._addEmailsEditorEvents(listEmails, emailFormInput);
    }

    _addEmailsEditorEvents(listEmails, emailFormInput) {
        // Execute a function when the user releases a key on the keyboard

        emailFormInput.addEventListener("keydown", (event) => {
            if (event.code === 'Backspace') {
                const refEmails = document.querySelectorAll(`[data-email-id]`);
                const lastEmailAdded = refEmails[refEmails.length - 1];
                if (lastEmailAdded) {
                    lastEmailAdded.remove();
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
                renderEmailListBlocks(emailFormInput, EmailFormInputValue, listEmails)
            }
        });

        emailFormInput.addEventListener('blur', (event) => {
            event.preventDefault();
            const EmailFormInputValue = emailFormInput.value;
            // do not allow empty values
            if (!EmailFormInputValue) return false;
            renderEmailListBlocks(emailFormInput, EmailFormInputValue, listEmails)
        });

        // Email actions delete or edit
        listEmails.addEventListener('click', (event) => {
            event.preventDefault();
            const targetDomElement = event.target;

            // Delete an email
            const closeButtonDomReference = targetDomElement?.dataset?.deleteIdentifierEmailId;
            if (closeButtonDomReference) {
                const emailToDeleteDomElement = document.querySelector(`[data-email-id="${closeButtonDomReference}"]`);
                if (emailToDeleteDomElement) {
                    listEmails.removeChild(emailToDeleteDomElement);
                }
            }

            // Edit an email
            const editActionDomReference = targetDomElement?.dataset?.emailId;
            if (editActionDomReference) {
                const emailToEditDomElement = document.querySelector(`[data-email-id="${editActionDomReference}"]`);
                if (emailToEditDomElement) {
                    console.log('i am going to edit');
                }
            }

        });


    }
}

module.exports = EmailsEditor;
