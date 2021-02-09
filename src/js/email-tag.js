require('../emails-editor-style.css');
const { isValidEmail } = require('../utils/validations');

const addEmailBlockEvents = (closeXElement, ListEmailsDomElement, newEmailElement) => {
    // add event to allow deletion of the new email element
    closeXElement.addEventListener("click", (e) => {
        e.preventDefault();
        ListEmailsDomElement.removeChild(newEmailElement);
        // TODO EDIT: allow email block
    });
}

const renderEmailTag = (newEmail, ListEmailsDomElement) => {
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

    addEmailBlockEvents(closeXElement, ListEmailsDomElement, newEmailElement);

    return newEmailElement;
}

function createEmailBlock(sanitizedEmailValue, ListEmailsDomElement) {
    const newEmail = { value: sanitizedEmailValue };
    newEmail.isValid = isValidEmail(sanitizedEmailValue);
    return (
        renderEmailTag(
            newEmail,
            ListEmailsDomElement
        ));

}

module.exports = createEmailBlock;