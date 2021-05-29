import { Filter } from "./Filter";
import { Repository } from "./Repository";

class APICaller {
    private request: string;
    private headers: string;
    private method: string;
    private filter: Filter;
    constructor() {
        this.method = "GET";
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
    sendREADMERequest(repository: Repository): Promise<any> {
        this.buildREADMERequest(repository);
        let requestResult: Promise<any> = fetch(this.getRequest(), {
            method: "GET",
            headers: {
                "Accept": "application/vnd.github.html"
            }
        })
        .then(res => {
            return res.text();
        })
        .then(README => {
            try {
                if (JSON.parse(README)) {
                    console.log(JSON.parse(README));
                    README = `<h2 class="text-center">README is currently unavailable</h2>`;
                }
            }
            catch {
                return README;
            }
            return README;
        })
        .catch(error => {
            console.log(error);
        })
        return requestResult;
    }
    sendSearchRequest(): any {
        this.buildSearchRequest();
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
            for (let i: number = 0; i < repos.length; i++) {
                
            }
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
    buildREADMERequest(repository: Repository): void {
        let request: string = `https://api.github.com/repos/${repository.getAuthor()}/${repository.getName()}/readme`;
        this.setRequest(request);
    }
    buildSearchRequest(): void {
        this.setMethod("GET");
        let request: string = `https://api.github.com/search/repositories?q=`;
        let filterBlock: string = this.filter.buildFilterBlock();
        request += filterBlock;
        this.setRequest(request);
    }
}

export {APICaller};