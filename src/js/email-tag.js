require('../emails-editor-style.css');
const { isValidEmail } = require('../utils/validations');
const { generateRandomId } = require('../utils/index');

const renderEmailTag = (newEmail, emailIdIdentifier) => {
    const newEmailElement = document.createElement('div');
    newEmailElement.classList.add('emailsEditor__email');
    newEmailElement.dataset.emailId = emailIdIdentifier;

    // add visual error if email is not valid
    if (!newEmail.isValid) {
        newEmailElement.classList.add('emailsEditor__email--error');
    } else {
        newEmailElement.classList.add('emailsEditor__email--tag');
    }

    newEmailElement.innerText = newEmail.value;

    // add x next to the new email tag
    const closeXElement = document.createElement('div');
    closeXElement.innerText = 'x';
    closeXElement.classList.add('emailsEditor__delete-button');
    closeXElement.dataset.deleteIdentifierEmailId = emailIdIdentifier;

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