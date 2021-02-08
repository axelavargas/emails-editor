require('./emails-editor-style.css')

/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */
class EmailsEditor {
    // https://emailregex.com/
    EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    constructor(container) {
        this.container = container;
        this.init();
    }

    // Private
    _createNewEmailTag(newEmail, ListEmails) {
        const newEmailElement = document.createElement("span");

        // add visual error if email is not valid
        if (!newEmail.isValid) {
            newEmailElement.className = "error";
        } else {
            newEmailElement.className = "tag";
        }

        newEmailElement.innerText = newEmail.value;

        // add x next to the new email tag
        const closeXElement = document.createElement("span");
        closeXElement.innerText = "x";
        closeXElement.style.paddingLeft = "14px";

        newEmailElement.appendChild(closeXElement);

        // add event to allow deletion of the new email element
        closeXElement.addEventListener("click", (e) => {
            e.preventDefault();
            ListEmails.removeChild(newEmailElement);
            // TODO EDIT: allow email block
        });

        return newEmailElement;
    }

    _isValidEmail(value) {
        return this.EMAIL_REGEX.test(value)
    }

    _createEmailBlock(sanitizedEmailValue, ListEmails) {
        const newEmail = { value: sanitizedEmailValue };
        newEmail.isValid = this._isValidEmail(sanitizedEmailValue);
        return (
            this._createNewEmailTag(
                newEmail,
                ListEmails
            ));
    }

    _createEmailListTags(emailFormInput, EmailFormInputValue, listEmails) {
        // remove white spaces and split by commas
        const sanitizedEmailValues = EmailFormInputValue.trim().split(',');
        sanitizedEmailValues.forEach(email => {
            if (email) {
                const newEmailLi = this._createEmailBlock(email, listEmails);
                listEmails.insertBefore(newEmailLi, emailFormInput);
            }
        })
        emailFormInput.value = "";
    }

    addEvents(listEmails, emailFormInput) {
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
                this._createEmailListTags(emailFormInput, EmailFormInputValue, listEmails)
            }
        });
        emailFormInput.addEventListener('blur', (event) => {
            event.preventDefault();
            const EmailFormInputValue = emailFormInput.value;
            // do not allow empty values
            if (!EmailFormInputValue) return false;
            this._createEmailListTags(emailFormInput, EmailFormInputValue, listEmails)
        });
    }

    _generateRandomId(prefix) {
        return prefix + '-' + Math.random().toString(20).substr(2, 5)
    }

    // Public
    init() {
        this.container.className = "emails-input"

        // It will render the list of emails
        const listEmails = document.createElement("div");
        const listEmailId = this._generateRandomId("list-emails");
        listEmails.id = listEmailId;
        listEmails.className = "list-emails";

        // Input to collect the emails

        const emailFormInput = document.createElement("input");
        const inputEmailId = this._generateRandomId("email-input-form");
        emailFormInput.id = inputEmailId;
        emailFormInput.autofocus = true;

        // create html structure
        listEmails.appendChild(emailFormInput);
        this.container.appendChild(listEmails);

        // Add events to handle enter, commas, lose focus to generate email blocks
        this.addEvents(listEmails, emailFormInput);
    }
}


module.exports = EmailsEditor;