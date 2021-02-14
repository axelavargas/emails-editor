
//written in es5 to be compatible with IE11

function init() {
    var inputContainerNode = document.querySelector('#emails-input');
    var onChange = function (emails) {
        console.log('emails on example', emails);
    }
    // eslint-disable-next-line no-undef
    var inputEmails = EmailsEditor(inputContainerNode, onChange);
    var addEmailButton = document.querySelector('[data-on-add-email]');
    var getEmailCount = document.querySelector('[data-on-get-count]');

    addEmailButton.addEventListener('click', function (e) {
        e.preventDefault();
        var randomEmail = 'alexa1866@gmail.com';
        inputEmails.add(randomEmail);
    })

    getEmailCount.addEventListener('click', function (e) {
        e.preventDefault();
        var validEmails = inputEmails.getEmails()?.filter(function (email) { return email.isValid });
        alert('Valid emails count ' + validEmails.length);
    })
}

init();