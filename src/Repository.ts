class Repository {
    private id: number;
    private name: string;
    private repoURL: string;
    private author: string;
    private authorURL: string;
    private forkNumber: number;
    private starNumber: number;
    private issueNumber: number;
    private README: HTMLDivElement;
    constructor(idIn: number, nameIn: string, repoURLIn: string, authorIn: string, authorURLIn: string, forkNumberIn: number, 
        starNumberIn: number, issueNumberIn: number) {
            this.id = idIn;
            this.name = nameIn;
            this.repoURL = repoURLIn;
            this.author = authorIn;
            this.authorURL = authorURLIn;
            this.forkNumber = forkNumberIn;
            this.starNumber = starNumberIn;
            this.issueNumber = issueNumberIn;
    }
    getID(): number {
        return this.id;
    }
    setID(idIn: number): void {
        this.id = idIn;
    }
    getName(): string {
        return this.name;
    }   
    setName(nameIn: string): void {
        this.name = nameIn;
    }
    getRepoURL(): string {
        return this.repoURL;
    }
    getAuthor(): string {
        return this.author;
    }
    setAuthor(authorIn: string): void {
        this.author = authorIn;
    }
    getAuthorURL(): string {
        return this.authorURL;
    }
    getForkNumber(): number {
        return this.forkNumber;
    }
    getStarNumber(): number {
        return this.starNumber;
    }
    getIssueNumber(): number {
        return this.issueNumber;
    }
    getREADME(): HTMLDivElement {
        return this.README;
    }
    setREADME(READMEIn: HTMLDivElement): void {
        this.README = READMEIn;
    }
}

export {Repository};