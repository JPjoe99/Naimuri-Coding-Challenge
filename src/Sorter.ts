class Sorter {
    private sortBy: string;
    private sortBlock: string;
    constructor() {
        this.sortBy = "";
    }
    getSortBy(): string {
        return this.sortBy;
    }
    setSortBy(sortBy: string): void {
        this.sortBy = sortBy;
    }
    buildSortBlock(): string {
        let sortBlock: string = `&`;
        if (this.sortBy != "") {
            sortBlock += `sort=${this.sortBy}&order=desc`;
            this.sortBlock = sortBlock;
        } 
        return sortBlock;
    }
    getSortBlock(): string {
        return this.sortBlock;
    }
}

export {Sorter};