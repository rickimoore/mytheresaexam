import getCookie from "./getCookie";
import document from "./fakeDocument";

describe('get cookie data', () => {
    it('returns cookie contents when found', () => {
        const docWithCookie = document;
        docWithCookie.cookie = "test=isfun";
        expect(getCookie('test', docWithCookie)).toEqual('isfun');
    });

    it('returns empty string when no cookie found', () => {
        expect(getCookie('fail', document)).toEqual('');
    });
});