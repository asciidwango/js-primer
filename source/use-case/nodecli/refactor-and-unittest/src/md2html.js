const marked = require("marked");

module.exports = (markdown, options = {}) => {
    const markedOptions = Object.assign({}, {
        gfm: true,
        sanitize: false
    }, options);

    return marked(markdown, {
        gfm: markedOptions.gfm,
        sanitize: markedOptions.sanitize
    });
};
