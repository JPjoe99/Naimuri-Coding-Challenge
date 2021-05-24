let mainElement: HTMLElement = document.querySelector("#main");

let inputElement: HTMLElement = document.querySelector("#input");

let dropdownElement: HTMLElement = document.querySelector("#dropdown-button");

let submitElement: HTMLElement = document.querySelector("#submit");

//dropdownElement.addEventListener("click", showFilters);

function showFilters(e: Event) {
    console.log(e);
    //console.log(e.target.nextElementSibling);
    //let childNode: 
}




// inputElement.addEventListener("click", sendRequestToGitHubAPI);

submitElement.addEventListener("click", sendRequestToGitHubAPI);

function sendRequestToGitHubAPI(e: Event): void {
    let GitHubAPICall: string = `https://api.github.com/search/repositories?q=battleships`;
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
        console.log(data.items);
        for (let i: number = 0; i < data.items.length; i++) {
            outputToDocument(data.items[i]);
        }
    })
    .catch(error => {
        console.log(error);
    })
}

// function fetchForks

function constructRepoHTML(item: any): HTMLElement {
    let repoElement: HTMLElement = document.createElement("div");
    repoElement.className = "col-12 repo-card";
    let repoInnerHTML: string = ``;
    repoInnerHTML += `<h2>Repository: <a href="${item.html_url}" target="_blank">${item.name}</a></h2>
                      <h3>Author: <a href="${item.owner.html_url}" target="_blank">${item.owner.login}</a></h3>
                      <hr>
                      <h4>Key Details</h4>
                      <h5>Forks: ${item.forks}</h5>
                      <h5>Stars: </h5>
                      <h5>Issue counts: </h5>
                      `;
    repoElement.innerHTML = repoInnerHTML;
    return repoElement;
}

function outputToDocument(item: any): void {
    let repoElement: HTMLElement =  document.createElement("div");
    repoElement.className = "row";
    let repoCard: HTMLElement = document.createElement("div");
    repoCard.className = "col-12 repo-card";
    let constructedRepoElement: HTMLElement = constructRepoHTML(item);
    repoElement.appendChild(constructedRepoElement);
    mainElement.appendChild(repoElement);
}