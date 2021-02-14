require('../emails-editor-style.css');
const { isValidEmail } = require('../utils/validations');
const { generateRandomId } = require('../utils/index');

const renderEmailTag = (newEmail, emailIdIdentifier) => {
    const newEmailElement = document.createElement("div");
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

function createEmailBlock(sanitizedEmailValue) {
    const emailIdIdentifier = generateRandomId();
    const newEntryEmail = { value: sanitizedEmailValue };
    newEntryEmail.isValid = isValidEmail(sanitizedEmailValue);
    newEntryEmail.id = emailIdIdentifier;

    const newDomEmail = renderEmailTag(
        newEntryEmail,
        emailIdIdentifier,
    );
    return { newEntryEmail, newDomEmail };
}

module.exports = createEmailBlock;