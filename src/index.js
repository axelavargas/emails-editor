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
        closeXElement.style.padding = "10px";

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

    _createEmailBlock(EmailFormInput, ListEmails) {
        const emailValue = EmailFormInput.value;
        const newEmail = { value: emailValue };
        newEmail.isValid = this._isValidEmail(emailValue);
        return (
            this._createNewEmailTag(
                newEmail,
                ListEmails
            ));
    }

    addEvents(listEmails, emailFormInput) {
        // Execute a function when the user releases a key on the keyboard
        emailFormInput.addEventListener("keyup", (event) => {
            if (event.keyCode === 13) {
                event.preventDefault();
                const newEmailLi = this._createEmailBlock(emailFormInput, listEmails);
                listEmails.insertBefore(newEmailLi, emailFormInput);
                // reset value
                emailFormInput.value = "";
            }
        });
    }

    // Public
    init() {
        // It will render the list of emails
        const listEmails = document.createElement("div");
        listEmails.id = "list-emails";

        // Input to collect the emails
        const emailFormInput = document.createElement("input");
        emailFormInput.id = "email-form";

        // create html structure
        listEmails.appendChild(emailFormInput);
        this.container.appendChild(listEmails);

        // Add events to handle enter, commas, lose focus to generate email blocks
        this.addEvents(listEmails, emailFormInput);
    }
}

module.exports = EmailsEditor;