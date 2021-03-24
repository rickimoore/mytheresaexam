const setCookie = (document, name, value, expire = 30) => {
    if(!name || !value) return 'missing name value'

    let date = new Date();
    date.setTime(date.getTime() + (expire*24*60*60*1000));
    let expires = "expires="+ date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";

    return document.cookie;
}

export default setCookie;