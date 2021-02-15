
//written in es5 to be compatible with IE11

function generateEmailEditor(inputContainerNode, prefix) {
    var onChange = function (emails) {
        console.log('emails example' + prefix, emails);
    }
    // eslint-disable-next-line no-undef
    var inputEmails = EmailsEditor(inputContainerNode, onChange);
    return inputEmails;
}


function init() {
    var inputContainer1 = document.querySelector('#emails-input');
    var inputContainer2 = document.querySelector('#emails-input-2');

    generateEmailEditor(inputContainer1, 'Editor 1');
    generateEmailEditor(inputContainer2, 'Editor 2');
}

init();