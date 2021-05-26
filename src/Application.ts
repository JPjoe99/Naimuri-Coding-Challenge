import {Repository} from "./Repository";
import {APICaller} from "./APICaller";
import {Output} from "./Output";

class Application {
    private repositories: Array<Repository>;
    private APICaller: APICaller;
    private output: Output;
    constructor() {
        this.APICaller = new APICaller;
        this.output = new Output;
        this.repositories = new Array;
    }
    start(): void {
        let submitElement: HTMLElement = document.querySelector("#submit");
        let usernameElement: HTMLElement = document.querySelector("#username");
        let repoElement: HTMLElement = document.querySelector("#repo");
        let activeLanguageElements: NodeListOf<Element> = document.querySelectorAll("#lang");
        submitElement.addEventListener("click", this.sendSearchRequestToAPI);
        usernameElement.addEventListener("keyup", this.setUsernameFilter);
        repoElement.addEventListener("keyup", this.setRepositoryFilter);
        for (let i: number = 0; i < activeLanguageElements.length; i++) {
            activeLanguageElements[i].addEventListener("click", this.setLanguageFilter);
        }

    }
    run(): void {

    }
    private setLanguageFilter = (e: Event): void => {
        let languageElement: HTMLLinkElement = <HTMLLinkElement>e.target;
        let languageValue: string = languageElement.textContent;
        this.APICaller.getFilter().setLanguage(languageValue);
    }
    private setRepositoryFilter = (e: Event): void => {
        let repoElement: HTMLInputElement = <HTMLInputElement>e.target;
        let repoValue: string = repoElement.value;
        this.APICaller.getFilter().setRepoName(repoValue);
    }
    private setUsernameFilter = (e: Event): void => {
        let usernameElement: HTMLInputElement = <HTMLInputElement>e.target;
        let usernameValue: string = usernameElement.value;
        this.APICaller.getFilter().setUser(usernameValue);
    }
    private sendSearchRequestToAPI = (e: Event): void => {
        this.resetRepositories();
        let repos: Promise<any> = this.APICaller.sendSearchRequest();
        repos.then(repos => {
            for (let i: number = 0; i < repos.items.length; i++) {
                let item = repos.items[i];
                let repository = new Repository(item.id, item.name, item.html_url, item.owner.login,
                                            item.owner.html_url, item.forks_count,
                                            item.stargazers_count, item.open_issues_count);
                this.repositories.push(repository);
            }
            this.output.drawRepositoryCards(this.getRepositories());
        })
        .catch(error => {
            console.log(error);
        })
    }
    getRepositories(): Array<Repository> {
        return this.repositories;
    }
    setRepositories(repositories: Array<Repository>): void {
        this.repositories = repositories;
    }
    resetRepositories(): void {
        this.repositories = new Array;
    }
}

export {Application};