const marked = require("marked");

module.exports = (markdown, cliOptions) => {
    return marked.parse(markdown, {
        gfm: cliOptions.gfm,
    });
};
