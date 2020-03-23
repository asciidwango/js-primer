// Chrome 72+ and Cypress 3.1.4 will not work correctly
// Workaround: https://github.com/cypress-io/cypress/issues/1872#issuecomment-450807452
module.exports = (on) => {
    on("before:browser:launch", (browser = {}, args) => {
        if (browser.name === "chrome") {
            // ^ make sure this is your browser name, you may
            // be using 'canary' or 'chromium' for example, so change it to match!
            args.push("--proxy-bypass-list=<-loopback>");
            return args;
        }
    });
};
