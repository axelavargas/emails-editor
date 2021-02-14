import createEmailBlock from './email-block'
describe("email tag tests", () => {

    it('should render a valid email block', () => {
        const element = createEmailBlock('test@test.com')
        expect(element.newEntryEmail.value).toBe('test@test.com')
        expect(element.newDomEmail.className).toBe('emailsEditor__email emailsEditor__email--tag')
    })

    it('should render an invalid email block', () => {
        const element = createEmailBlock('invalid')
        expect(element.newEntryEmail.isValid).toBe(false)
        expect(element.newDomEmail.className).toBe('emailsEditor__email emailsEditor__email--error')
    })
})