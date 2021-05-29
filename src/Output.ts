import { Repository } from "./Repository";

class Output {
    private mainBody: HTMLElement;
    constructor() {
        this.mainBody = document.querySelector("#main"); 
    }
    getMainBody(): HTMLElement {
        return this.mainBody;
    }
    clearMainBody(): void {
        this.mainBody.innerHTML = "";
    }
    drawRepositoryCard(repository: Repository): void {
        let repoElement: HTMLDivElement = document.createElement("div");
        repoElement.className = "col-12 repo-card";
        let repoInnerHTML: string = ``;
        repoInnerHTML += `<h2 class="text-center"><a id="repo-header" href="${repository.getRepoURL()}" target="_blank">${repository.getName()}</a></h2>
                        <h3 class="text-center">By <a id="repo-header" href="${repository.getAuthorURL()}" target="_blank">${repository.getAuthor()}</a></h3>
                        <hr>
                        <div class="row">
                            <div class="col-4 col-s-12">
                                <h3 class="text-center">Key Details</h3>
                                <div class="row">
                                    <div class="col-4">
                                        <h4 class="text-center">Forks</h4>
                                        <h1 class="text-center">${repository.getForkNumber()}</h1>
                                    </div>
                                    <div class="col-4">
                                        <h4 class="text-center">Stars</h4>
                                        <h1 class="text-center">${repository.getStarNumber()}</h1>
                                    </div>
                                    <div class="col-4">
                                        <h4 class="text-center">Issues</h4>
                                        <h1 class="text-center">${repository.getIssueNumber()}</h1>
                                    </div>
                                </div>
                            </div>
                            <div class="col-8 col-s-12">
                                <div id="README">${repository.getREADME()}</div>
                            </div>
                        </div>
                        `;
        repoElement.innerHTML = repoInnerHTML;
        this.getMainBody().appendChild(repoElement);
    }
    outputNoRepositoriesFound(): void {
        let noReposFoundElement: HTMLDivElement = document.createElement("div");
        noReposFoundElement.innerHTML = `<h2 class="text-center">No repositories found under these filters</h2>`;
        this.getMainBody().appendChild(noReposFoundElement);
    }
}

export {Output};