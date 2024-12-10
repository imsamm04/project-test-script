function showDate() {
    const now = new Date().toISOString();
    return now;
}

function uuidV4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getRandomArray(max, length) {
    let array = [];
    for (let i = 0; i < length; i++) {
        array.push(getRandomInt(max));
    }
    return array
}

function getRandomJson(max, length) {
    let hash = {};
    for (let i = 0; i < length; i++) {
        hash[[`key${i}`]] = getRandomInt(max);
    }
    return JSON.stringify(hash)
}

function getRandomDateTime(fromDate) {
    let d1 = new Date(fromDate);
    const d2 = Date.now();
    const c = (d2 - d1) / 86400000;
    const x = Math.floor(Math.random() * (c + 1));
    d1.setDate(d1.getDate() + x);

    const year = d1.getFullYear();
    const month = ('00' + (d1.getMonth() + 1)).slice(-2);
    const day = ('00' + d1.getDate()).slice(-2);
    const hour = ('00' + getRandomInt(23)).slice(-2);
    const minute = ('00' + getRandomInt(59)).slice(-2);
    const second = ('00' + getRandomInt(59)).slice(-2);
    return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
}

function getLineIdParam() {
    const params = new Proxy(new URLSearchParams(window.location.search), { get: (searchParams, prop) => searchParams.get(prop) });
    return params.line_id
}


function addLineIdToQueryParam() {
    const line_id = getLineIdParam();
    if (line_id) {
        let element = document.getElementById("require-line-id");
        let old_href = element.getAttribute("href");
        let new_href = old_href + `?` + new URLSearchParams({ line_id: line_id }).toString();
        element.setAttribute("href", new_href);
    }
}
