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
    drawRepositoryCards(repositories: Array<Repository>) {
        this.clearMainBody();
        let repositoryCardsHTML: HTMLDivElement = document.createElement("div");
        repositoryCardsHTML.className = "row";
        for (let i: number = 0; i < repositories.length; i++) {
            repositoryCardsHTML.appendChild(this.drawRepositoryCard(repositories[i]));
        }
        this.getMainBody().appendChild(repositoryCardsHTML);
    }
    drawRepositoryCard(repository: Repository): HTMLDivElement {
        let repoElement: HTMLDivElement = document.createElement("div");
        repoElement.className = "col-12 repo-card";
        let repoInnerHTML: string = ``;
        repoInnerHTML += `<h2 class="text-center"><a id="repo-header" href="${repository.getRepoURL()}" target="_blank">${repository.getName()}</a></h2>
                        <h3 class="text-center">By <a id="repo-header" href="${repository.getAuthorURL()}" target="_blank">${repository.getAuthor()}</a></h3>
                        <hr>
                        <div class="row">
                            <div class="col-4">
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
                            <div class="col-8">
                                <div id =${repository.getName()}></div>
                            </div>
                        </div>
                        `;
        repoElement.innerHTML = repoInnerHTML;
        return repoElement;
    }
}

export {Output};