const setCookie = (name, value, expire) => {
    let date = new Date();
    date.setTime(date.getTime() + (expire*24*60*60*1000));
    let expires = "expires="+ date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

export default setCookie;