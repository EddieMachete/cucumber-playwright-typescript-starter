import { Browser, BrowserContext, chromium, Page, } from 'playwright'
import { IWorldOptions, setWorldConstructor, World } from '@cucumber/cucumber'

// World is an isolated context for each scenario, exposed to the hooks and steps as `this`,
// enabling you to set and recall some state across the lifecycle of the _scenario_.
// This may not work when using _arrow functions_.
export class BrowserWorld extends World {
    public static browser: Browser;
    public browser: Browser;
    public static page: Page;
    public page: Page;

    constructor(options: IWorldOptions) {
        // needed so `attach`, `log` and `parameters` are properly set
        super(options);
        this.browser = BrowserWorld.browser;
        this.page = BrowserWorld.page;

        this.page.setViewportSize({width: 1440, height: 836});
    }
}

setWorldConstructor(BrowserWorld)