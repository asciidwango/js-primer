function fetch(url) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    return new Promise((resolve, reject) => {
        xhr.addEventListener('load', (evt) => {
            resolve(evt.target.response);
        });
        xhr.addEventListener('error', (evt) => {
            reject(evt.target.error);
        });
        xhr.send();
    });
}

function escapeHTML(str) {
    return str.replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function sanitizeHtml(strings, ...values) {
    return strings.map((part, i) => {
        let arg = values[i];
        if (arg) {
            if (typeof arg === 'string') {
                return part + escapeHTML(arg);
            } else {
                return part + `${arg}`;
            }
        } else {
            return part;
        }
    }).join('');
}

function buildUserInfoView(userInfo) {
    const view = document.createElement('div');
    view.innerHTML = sanitizeHtml`
    <h4>${userInfo.name} (@${userInfo.login})</h4>
    <img src="${userInfo.avatar_url}" alt="${userInfo.login}" height="100">
    <dl>
        <dt>Location</dt>
        <dd>${userInfo.location}</dd>
        <dt>Repositries</dt>
        <dd>${userInfo.public_repos}</dd>
    </dl>
    `;
    return view;
}

function renderUserInfoView(view) {
    const target = document.getElementById('result');
    target.innerHTML = null;
    target.appendChild(view);
}

function fetchInfo() {
    const userId = document.getElementById('userId').value;
    if (!userId.trim()) {
        return;
    }

    fetch(`https://api.github.com/users/${userId}`)
        .then(response => JSON.parse(response))
        .then(data => {
            const view = buildUserInfoView(data);
            renderUserInfoView(view);
        })
        .catch(error => {
            console.error(error);
        });
}
