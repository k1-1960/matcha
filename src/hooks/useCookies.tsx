function getCookie(name: string) {
    let itemGetter = localStorage.getItem(name);
    if (itemGetter) {
        return itemGetter;
    }
    return null;
}

function setCookie(name: string, value: string, expires_in: string) {
    localStorage.setItem(name, value);
    localStorage.setItem(
        "expires",
        Number(Date.now() + Number(expires_in)).toString()
    );
    window.location.reload();
}

function eraseCookie(name: string) {
    localStorage.removeItem(name);
    localStorage.removeItem("expires");
    window.location.reload();
}

export { getCookie, setCookie, eraseCookie };
