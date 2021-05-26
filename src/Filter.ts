class Filter {
    private user: string;
    private repoName: string;
    private language: string;
    constructor() {
        this.user = "";
        this.repoName = "";
        this.language = "All";
    }
    getUser(): string {
        return this.user;
    }
    setUser(userIn: string): void {
        this.user = userIn;
    }
    getRepoName(): string {
        return this.repoName;
    }
    setRepoName(repoNameIn: string): void {
        this.repoName = repoNameIn;
    }
    getLanguage(): string {
        return this.language;
    }
    setLanguage(languageIn: string): void {
        this.language = languageIn;
    }
}

export {Filter};