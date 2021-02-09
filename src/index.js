
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

        emailFormInput.addEventListener("keyup", (event) => {
            //to avoid keyup events during IME composition on Firefox 65+
            if (event.isComposing || event.keyCode === 229) {
                return;
            }
            const EmailFormInputValue = emailFormInput.value;
            // do not allow empty values
            if (!EmailFormInputValue) return false;

            if (event.keyCode === 13 || event.keyCode === 188) {
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
    }
}

module.exports = EmailsEditor;
