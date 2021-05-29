class Filter {
    private user: string;
    private repoName: string;
    private language: string;
    private filterBlock: string;
    constructor() {
        this.user = "";
        this.repoName = "";
        this.language = "";
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
        if (languageIn == "All") {
            this.language = "";
        }
        else {
            this.language = languageIn;
        }
    }
    buildFilterBlock(): string {
        let filterBlock: string = ``;
        if (this.language == "" && this.user == "" && this.repoName == "") {
            filterBlock += `user:`;
            this.filterBlock = filterBlock;
            return filterBlock;
        }
        if (this.language != "") {
            filterBlock += `language:${this.language}+`;
        }
        if (this.user != "") {  
            filterBlock += `user:${this.user}+`;
        }
        if (this.repoName != "") {
            filterBlock += `${this.repoName}`;
        }
        this.filterBlock = filterBlock;
        return filterBlock;
    }
    getFilterBlock(): string {
        return this.filterBlock;
    }
}

export {Filter};