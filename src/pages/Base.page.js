/* eslint-disable linebreak-style */
/* eslint-disable import/prefer-default-export */
export class BasePage {
    url = '';

    page;

    constructor(page) {
        this.page = page;
    }

    // async below added to show the function returns a promise
    async getUrl() { return this.page.url(); }

    async navigate() {
        await this.page.goto(this.url);
    }
}
