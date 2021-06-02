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
        let iconElement: HTMLElement = document.querySelector(".icon");
        let submitElement: HTMLElement = document.querySelector("#submit");
        let usernameElement: HTMLElement = document.querySelector("#username");
        let repoElement: HTMLElement = document.querySelector("#repo");
        let activeLanguageElements: NodeListOf<Element> = document.querySelectorAll("#lang");
        submitElement.addEventListener("click", this.retrieveRepositories);
        usernameElement.addEventListener("keyup", this.setUsernameFilter);
        repoElement.addEventListener("keyup", this.setRepositoryFilter);
        for (let i: number = 0; i < activeLanguageElements.length; i++) {
            activeLanguageElements[i].addEventListener("click", this.setLanguageFilter);
        }
        iconElement.addEventListener("click", this.setBurgerMenu);
    }
    private setBurgerMenu = (e: Event): void => {
        let element: HTMLElement = <HTMLElement>e.target;
        let navbarElement: HTMLElement = element.parentElement;
        if (navbarElement.classList.contains("responsive")) {
            navbarElement.classList.remove("responsive");
        }
        else {
            navbarElement.classList.add("responsive");
        }
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
    private retrieveRepositories = (e: Event): void => {
        this.output.clearMainBody();
        this.resetRepositories();
        let repos: Promise<any> = this.APICaller.sendSearchRequest();
        repos.then(repos => {
            try {
                if (repos.items.length > 0) {
                    for (let i: number = 0; i < repos.items.length; i++) {
                        let item = repos.items[i];
                        console.log(item.stargazers_count);
                        let repository = new Repository(item.id, item.name, item.html_url, item.owner.login,
                                                    item.owner.html_url, item.forks_count,
                                                    item.stargazers_count, item.open_issues_count);
                        this.repositories.push(repository);  
                        let repoREADMEResult: Promise<any> = this.APICaller.sendREADMERequest(repository);
                        repoREADMEResult.then(README => {
                            repository.setREADME(README);
                            this.output.drawRepositoryCard(repository);
                        })            
                        .catch(error => {
                            console.log(error);
                        })
                    }
                }
                else {
                    this.output.outputNoRepositoriesFound();
                }
            }
            catch {
                this.output.outputNoRepositoriesFound();
            }
             
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