let mainElement: HTMLElement = document.querySelector("#main");

let inputElement: HTMLElement = document.querySelector("#input");

let dropdownElement: HTMLElement = document.querySelector("#dropdown-button");

let submitElement: HTMLElement = document.querySelector("#submit");

let languages: HTMLCollection = document.querySelector(".dropdown-content").children;
for (let i: number = 0; i < languages.length; i++) {
    languages[i].addEventListener("click", setAsCurrentLanguage);
}

function setAsCurrentLanguage(e: Event): void {
    let currentLang = document.querySelector(".lang.active");
    currentLang.className = ".lang";
    let selectedElement = <HTMLElement>(e.target);
    selectedElement.className = "lang active";
}

submitElement.addEventListener("click", sendRequestToGitHubAPI);

function obtainFilters(): JSON {
    let userFilter: HTMLInputElement = document.querySelector("#user");
    let repoFilter: HTMLInputElement = document.querySelector("#repo");
    let languageFilter: string = document.querySelector(".lang.active").textContent;
    let filterJSON: any = {
        "repo": repoFilter.value,
        "user": userFilter.value,
        "language": languageFilter
    }
    return <JSON>filterJSON;
}

function clearCurrentRepos(): void {
    mainElement.innerHTML = "";
}

function constructGitHubAPIRequest(): string {
    let filterJSON: any = obtainFilters();
    console.log(filterJSON);
    let GitHubAPICall: string = `https://api.github.com/search/repositories?q=`;
    let repo = filterJSON.repo;
    GitHubAPICall += `${repo}`;
    if (filterJSON.user != ``) {
        GitHubAPICall += `+user:${filterJSON.user}`;
    }
    if (filterJSON.language != ``) {
        GitHubAPICall += `+language:${filterJSON.language}`;
    }
    return GitHubAPICall;
}

function sendRequestToGitHubAPI(e: Event): void {
    clearCurrentRepos();
    constructGitHubAPIRequest();
    let GitHubAPICall: string = constructGitHubAPIRequest();
    console.log(GitHubAPICall);
    fetch(GitHubAPICall, {
        method: "GET",
        headers: {
            "Accept": "application/vnd.github.v3+json"
        }
    })
    .then(res => {
        return res.json();
    })
    .then(data => {
        if (data.items.length == 0) {
            mainElement.innerHTML = `<h1 class="text-center">No repositories found!</h1>`;
        }
        console.log(data.items);
        outputToDocument(data.items);
    })
    .catch(error => {
        console.log(error);
    })
}

function getReadMe() {

}

function fetchReadMe(item: any): any {
    fetch(`https://api.github.com/repos/${item.owner.login}/${item.name}/readme`)
    .then(res => {
        return res.json();
    })
    .then(data => {
        //let readMe = atob(data.content);
        //console.log(readMe);
        console.log(data);
        return data.content;
    })
    .catch(error => {
        console.log(error);
    })
}

function constructRepoCardHTML(item: any): HTMLElement {
    let repoElement: HTMLElement = document.createElement("div");
    //fetchReadMe(item);
    repoElement.id = `${item.id}`;
    repoElement.className = "col-6 repo-card";
    let repoInnerHTML: string = ``;
    repoInnerHTML += `<h2 class="text-center"><a id="repo-header" href="${item.html_url}" target="_blank">${item.name}</a></h2>
                      <h3 class="text-center">By <a id="repo-header" href="${item.owner.html_url}" target="_blank">${item.owner.login}</a></h3>
                      <p class="text-center">${item.description}</p>
                      <hr>
                      <h3 class="text-center">Key Details</h3>
                      <div class="row">
                        <div class="col-4">
                          <h4 class="text-center">Forks</h4>
                          <h1 class="text-center">${item.forks_count}</h1>
                        </div>
                        <div class="col-4">
                          <h4 class="text-center">Stars</h4>
                          <h1 class="text-center">${item.stargazers_count}</h1>
                        </div>
                        <div class="col-4">
                          <h4 class="text-center">Issues</h4>
                          <h1 class="text-center">${item.open_issues_count}</h1>
                        </div>
                      </div>

                      <p>Read Me:</p>
                      `;
    repoElement.innerHTML = repoInnerHTML;
    return repoElement;
}




function outputToDocument(items: Array<any>): void {
    let repoElement: HTMLElement =  document.createElement("div");
    repoElement.className = "row";
    let constructedRepoElement: HTMLElement;
    for (let i: number = 0; i < items.length; i++) {
        constructedRepoElement = constructRepoCardHTML(items[i]);
        //constructedRepoElement = fetchRepositoryCardSnippet();
        //insertDataIntoCard(constructedRepoElement, items[i]);
        //console.log("repo element" + constructedRepoElement);
        repoElement.appendChild(constructedRepoElement);
    }
    mainElement.appendChild(repoElement);
}