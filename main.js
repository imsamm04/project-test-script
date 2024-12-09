// ランダムな文字列を生成する / Generate random string
function uuidV4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

// ランダムな整数を生成する / Generate random integer
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// ランダムな配列を生成する / Generate random array
function getRandomArray(max, length) {
    let array = [];
    for (let i = 0; i < length; i++) {
        array.push(getRandomInt(max));
    }
    return array
}

// ランダムな Json 文字列を生成する / Generate random json string
function getRandomJson(max, length) {
    let hash = {};
    for (let i = 0; i < length; i++) {
        hash[[`key${i}`]] = getRandomInt(max);
    }
    return JSON.stringify(hash)
}

// ランダムな日時を生成する / Generate random datetime
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

// ページ遷移時に line_id を 自動でクエリパラメータに付与する / Add line_id to query parameter when moving to another page.
function addLineIdToQueryParam() {
    const params = new Proxy(new URLSearchParams(window.location.search), { get: (searchParams, prop) => searchParams.get(prop) });
    const line_id = params.line_id;

    if (line_id === null) { // add
        return;
    }

    const query_parameter = 'line_id=' + line_id;

    const element = document.getElementById('add-line-id');
    let target_href = element.getAttribute('href');

    if (target_href.indexOf('?') !== -1) {
        target_href += '&' + query_parameter;
    } else {
        target_href += '?' + query_parameter;
    }
    element.setAttribute('href', target_href);
}
