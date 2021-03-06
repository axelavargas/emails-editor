const { removeEntryEmailById, addNewEmailEntry } = require('./email-list');

const handleEmailListEvents = (event, container, listDomElement, emails, onChange) => {
    event.preventDefault();
    const targetDomElement = event.target;

    // Delete an email
    const closeButtonDomReference = targetDomElement?.dataset?.deleteIdentifierEmailId;
    if (closeButtonDomReference) {
        removeEntryEmailById(closeButtonDomReference, container, listDomElement, emails, onChange);
    }

    // Todo: Edit an email
    // const editActionDomReference = targetDomElement?.dataset?.emailId;
    // if (editActionDomReference) {
    //     const emailToEditDomElement = container.querySelector(`[data-email-id='${editActionDomReference}']`);
    //     if (emailToEditDomElement) {
    //         console.log('i am going to edit');
    //     }
    // }
};

const handleInputEnterEvents = (event, inputDomElement, listDomElement, emails, onChange) => {
    const value = inputDomElement.value;
    if (!value) return false;

    // add emails when enter or comma
    if (event.keyCode === 13 || event.keyCode === 188) {
        event.preventDefault();
        addNewEmailEntry(inputDomElement, value, listDomElement, emails, onChange)
    }
}
const handleInputPasteEvents = (event, inputDomElement, listDomElement, emails, onChange) => {
    let paste = (event.clipboardData || window.clipboardData).getData('Text');
    addNewEmailEntry(inputDomElement, paste, listDomElement, emails, onChange)
    event.preventDefault();
};

const handleInputBlurEvents = (event, inputDomElement, listDomElement, emails, onChange) => {
    event.preventDefault();
    const value = inputDomElement.value;
    if (!value) return false;
    addNewEmailEntry(inputDomElement, value, listDomElement, emails, onChange)
};


module.exports = { handleEmailListEvents, handleInputEnterEvents, handleInputBlurEvents, handleInputPasteEvents }