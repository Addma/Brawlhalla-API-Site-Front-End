export function setCookie(cookieName, expDate, cookieValue) {
    let cookieStr = document.cookie;
    cookieStr += `${cookieName}=${cookieValue}; expires=${expDate};path=/`;
    console.log("COOKIESTR", cookieStr)
    document.cookie = cookieStr;
}

export function deleteCookie(cookieName) {
    
}

export function clearCookies() {
    document.cookie = "";
}
export function getCookie(cookieName) {
    let cookies = document.cookie.split(";");
     
    return 
}