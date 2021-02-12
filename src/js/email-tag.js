require('../emails-editor-style.css');
const { isValidEmail } = require('../utils/validations');
const { generateRandomId } = require('../utils/index');

const renderEmailTag = (newEmail) => {
    const newEmailElement = document.createElement("div");

    const emailIdIdentifier = generateRandomId();
    newEmailElement.dataset.emailId = emailIdIdentifier;

    // add visual error if email is not valid
    if (!newEmail.isValid) {
        newEmailElement.className = "error";
    } else {
        newEmailElement.className = "tag";
    }

    newEmailElement.innerText = newEmail.value;

    // add x next to the new email tag
    const closeXElement = document.createElement("div");
    closeXElement.innerText = "x";
    closeXElement.classList = "delete-button";
    closeXElement.dataset.deleteIdentifierEmailId = emailIdIdentifier;
    closeXElement.style.paddingLeft = "14px";

    newEmailElement.appendChild(closeXElement);

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