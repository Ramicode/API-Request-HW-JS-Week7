const repositoriesList = [];
const membersList = [];
const HYFReposApiEndPoint = `https://api.github.com/orgs/HackYourFuture/repos`;
const HYFMembersApiEndPoint = `https://api.github.com/orgs/HackYourFuture/members`;
function fetchAPI(url, cb) {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.onreadystatechange = () => {
            let isRequestDone = request.readyState === XMLHttpRequest.DONE;
            let isRequestSuccess = request.status === 200;
            if (isRequestDone && isRequestSuccess) {
                resolve(JSON.parse(request.responseText))
            } else if (isRequestDone && !isRequestSuccess) {
                reject({
                    rejectedStatus: this.status,
                    rejectedStatusText: request.statusText
                });
            }
        }
        request.open('GET', url);
        request.onerror = function () {
            reject({
                rejectedStatus: this.status,
                rejectedStatusText: request.statusText
            });
        };
        request.open('GET', url);
        request.send();
    }).then(cb)
}
function RenderRepoList(name, url) {
    const ul = document.getElementsByClassName("repos")[0];
    const li = document.createElement('li');
    const a = document.createElement("a");
    a.textContent = name;
    a.setAttribute('href', url);
    li.appendChild(a);
    ul.appendChild(li);
}
function RenderMembersList(name, url) {
    const ul = document.getElementsByClassName("members")[0];
    const li = document.createElement('li');
    const a = document.createElement('a');
    const img = document.createElement('img');
    img.setAttribute('src', url);
    img.setAttribute('width', 100);
    li.appendChild(img);
    a.setAttribute('href', url);
    a.textContent = name;
    li.appendChild(a);
    ul.appendChild(li);
}
function fetchRepoList(repositoriesList) {
    let list = repositoriesList.reduce((prev, current) => {
        RenderRepoList(current.name, current.url);
    }, '');
}
function fetchMemberList(membersList) {
    let list = membersList.reduce((prev, current) => {
        RenderMembersList(current.login, current.avatar_url);
    }, '');
}

fetchAPI(HYFReposApiEndPoint)
    .then(fetchRepoList)
    .catch(err => {
        RenderRepoList('Error is: ' + err.rejectedStatusText);
    });

fetchAPI(HYFMembersApiEndPoint)
    .then(fetchMemberList)
    .catch(err => {
        RenderMembersList('Error is: ' + err.rejectedStatusText);
    });
