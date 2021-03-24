import setCookie from "./setCookie";
import document from "./fakeDocument";

describe('set cookie data', () => {
    it('sets a cookie given proper data', () => {
        expect(setCookie( document, 'test', 'success', 30)).toMatch(/test=success;expires=/);
    });
    it('returns error if missing name value', () => {
        expect(setCookie( document, '', 'success', 30)).toEqual("missing name value");
    });
});