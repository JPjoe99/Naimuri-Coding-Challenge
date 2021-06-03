function getMainElement(): HTMLElement {
    let mainElement: HTMLElement = document.querySelector("#main");
    return mainElement;
}

//Grab submit element and add sendRequestToGitHubAPI function when
//clicked on

let submitElement: HTMLElement = document.querySelector("#submit");
submitElement.addEventListener("click", sendRequestToGitHubAPI);

//Collecting available language filters and adding functions so that
//the language that's been clicked becomes the language to filter by

let languages: HTMLCollection = document.querySelector(".dropdown-content").children;
for (let i: number = 0; i < languages.length; i++) {
    languages[i].addEventListener("click", setAsCurrentLanguage);
}

//Function that manages the change of the language filter

function setAsCurrentLanguage(e: Event): void {
    let currentLang = document.querySelector(".lang.active");
    currentLang.className = "lang";
    let selectedElement = <HTMLElement>(e.target);
    selectedElement.className = "lang active";
}


//Function to find the user's chosen filters and return them as a JSON object

function obtainFilters(): JSON {
    let userFilter: HTMLInputElement = document.querySelector("#user");
    let repositoryFilter: HTMLInputElement = document.querySelector("#repo");
    let languageFilter: string = document.querySelector(".lang.active").textContent;
    let filters: any = {
        "repository": repositoryFilter.value,
        "user": userFilter.value,
        "language": languageFilter
    }
    return <JSON>filters;
}

function clearCurrentRepositories(): void {
    getMainElement().innerHTML = "";
}

//Function to constructor the API call based on the user's selected filters

function constructGitHubAPIRequest(): string {
    let filters: any = obtainFilters();
    let GitHubAPICall: string = `https://api.github.com/search/repositories?q=`;
    GitHubAPICall += `${filters.repository}`;
    //checking to see if filters have been selected or not
    if (filters.language != ``) {
        //change language filter addition to the APICall depending on if no language
        //filter has been chosen
        if (filters.language == "All" && filters.user == "" && filters.repository == "") {
            GitHubAPICall += `+language:`;
        }
        else {
            GitHubAPICall += `+language:${filters.language}`;
        }
    }
    if (filters.user != ``) {
        GitHubAPICall += `+user:${filters.user}`;
    }
    return GitHubAPICall;
}

//Function to send request to GitHub API using selected filters by the user

function sendRequestToGitHubAPI(e: Event): void {
    //Clear the current repositories on the screen and create the new API call
    clearCurrentRepositories();
    constructGitHubAPIRequest();
    let GitHubAPICall: string = constructGitHubAPIRequest();
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
        //Checks to see if any repositories match the user's filters
        if (data.items.length == 0) {
            getMainElement().innerHTML = `<h1 class="text-center">No repositories found!</h1>`;
        }
        outputRepositoriesToDocument(data.items);
    })
    .catch(error => {
        console.log(error);
    })
}

//Function to fetch the README of a given repository

function fetchReadMe(item: any): void {
    fetch(`https://api.github.com/repos/${item.owner.login}/${item.name}/readme`, {
        method: "GET",
        headers: {
            //Accept is set like this to return the README as rendered HTML
            "Accept": "application/vnd.github.html"
        }
    })
    .then(res => {
        //Check to see if the API rate limit has been exceeded
        if (res.status == 403) {
            return;
        }
        else {
            return res.text();
        }
    })
    .then(html => {
        //Append the README to the main body of the document
        let readMeElement: HTMLDivElement = document.createElement("div");
        readMeElement.className = "text-center";
        if (html == undefined) {
            readMeElement.innerHTML = `<h2>No ReadMe found</h2>
                                       <h4>API rate limit has been exceeded<h4>
                                      `;
        }
        else {
            readMeElement.innerHTML = html;
        }
        let repository: HTMLElement = document.querySelector(`#${item.name}`);
        repository.appendChild(readMeElement);
    })
    .catch(error => {
        console.log(error);
    })
}

//Function to construct the HTML to display the data of each repository returned from
//the search

function constructRepositoryHTML(item: any): HTMLElement {
    let repoElement: HTMLElement = document.createElement("div");
    repoElement.id = `${item.id}`;
    repoElement.className = "col-12 repo-card";
    let repoInnerHTML: string = ``;
    repoInnerHTML += `<h2 class="text-center"><a id="repo-header" href="${item.html_url}" target="_blank">${item.name}</a></h2>
                      <h3 class="text-center">By <a id="repo-header" href="${item.owner.html_url}" target="_blank">${item.owner.login}</a></h3>
                      <hr>
                      <div class="row">
                          <div class="col-4">
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
                          </div>
                          <div class="col-8">
                              <div id =${item.name}></div>
                          </div>
                      </div>
                      `;
    repoElement.innerHTML = repoInnerHTML;
    //Fetch the README of the repository and append to the above HTML
    fetchReadMe(item)
    return repoElement;
}

//Function that iterates through each repository that's been returned and construct
//its HTML using the constructRepoCardHTML function and appends to the main document

function outputRepositoriesToDocument(items: Array<any>): void {
    let repoElement: HTMLElement =  document.createElement("div");
    repoElement.className = "row";
    let constructedRepoElement: HTMLElement;
    for (let i: number = 0; i < items.length; i++) {
        constructedRepoElement = constructRepositoryHTML(items[i]);
        repoElement.appendChild(constructedRepoElement);
    }
    getMainElement().appendChild(repoElement);
}