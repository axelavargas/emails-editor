import EmailsEditor from './index'

describe("Emails editor", () => {
    let input;

    beforeEach(() => {
        input = document.createElement('div');
        document.body.appendChild(input);
    })

    afterEach(() => {
        document.body.removeChild(input);
    })

    it("should initialize the container", () => {
        EmailsEditor(input);
        expect(input).toMatchSnapshot()
    })

    it('should allow to add and return the stored emails', () => {
        const editor = EmailsEditor(input);
        editor.add('testinvalid');
        editor.add('testinvalid2');
        editor.add('test@testme.com');
        editor.add('test2@testme.com');
        expect(editor.getEmails().length).toBe(4)
    })

    it('should mark valid emails with tag', () => {
        const editor = EmailsEditor(input);
        editor.add('test@testme.com');
        expect(editor.getEmails().filter(e => !!e.isValid).length).toBe(1);

    })
    it('should mark invalid emails', () => {
        const editor = EmailsEditor(input);
        editor.add('testinvalid');
        expect(editor.getEmails().filter(e => !!e.isValid).length).toBe(0);
    })

    it('should mix valid and invalid emails', () => {
        const editor = EmailsEditor(input);
        editor.add('testinvalid');
        editor.add('testinvalid2');
        editor.add('test@testme.com');
        editor.add('test2@testme.com');
        expect(editor.getEmails().filter(e => !!e.isValid).length).toBe(2);
        expect(editor.getEmails().filter(e => !e.isValid).length).toBe(2);
    })
})