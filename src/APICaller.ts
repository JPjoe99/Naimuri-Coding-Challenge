import { Filter } from "./Filter";

class APICaller {
    private request: string;
    private headers: string;
    private method: string;
    private filter: Filter;
    constructor() {
        this.filter = new Filter();
    }
    getMethod(): string {
        return this.method;
    }
    setMethod(methodIn: string): void {
        this.method = methodIn;
    }
    getHeaders(): string {
        return this.headers;
    }
    setHeaders(headersIn: string): void {
        this.headers = headersIn;
    }
    sendREADMERequest(): any {
        let requestResult: Promise<any> = fetch(this.request, {
            method: "GET",
            headers: {
                "Accept": "application/vnd.github.html"
            }
        })
        .then(res => {
            return res.text();
        })
        .then(README => {
            return README;
        })
        .catch(error => {
            console.log(error);
        })
        return requestResult;
    }
    sendSearchRequest(): any {
        this.buildSearchRequest();
        console.log(this.filter);
        console.log(this.getRequest());
        let requestResult: Promise<any> = fetch(this.request, {
            method: "GET",
            headers: {
                "Accept": "application/vnd.github.v3+json"
            }
        })
        .then(res => {
            return res.json();
        })
        .then(repos => {
            return repos;
        })
        .catch(error => {
            console.log(error);
        })
        return requestResult;
    }
    getRequest(): string {
        return this.request;
    }
    setRequest(requestIn: string): void {
        this.request = requestIn;
    }
    getFilter(): Filter {
        return this.filter;
    }
    buildREADMERequest(): void {
    }
    buildSearchRequest(): void {
        this.setMethod("GET");
        let request: string = `https://api.github.com/search/repositories?q=`;
        let filterBlock: string = `user:${this.filter.getUser()}
                                  +language:${this.filter.getLanguage()}
                                  +${this.filter.getRepoName()}`;
        request += filterBlock;
        this.setRequest(request);
    }
}

export {APICaller};