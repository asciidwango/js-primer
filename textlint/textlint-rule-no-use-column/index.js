const { wrapReportHandler } = require("textlint-rule-helper");
/**
 * 文中で"コラム"という表現を使わないルール
 * @see https://github.com/asciidwango/js-primer/issues/1076
 * @param context
 * @param options
 * @returns {{}}
 */
module.exports = (context, options = {}) => {
    const { Syntax, RuleError, getSource } = context;
    return wrapReportHandler(context, {
        // Headerは除外する
        ignoreNodeTypes: [Syntax.Header],
    }, (report) => {
        return {
            [Syntax.Str](node) {
                const value = getSource(node);
                const pattern = /コラム/g;
                let match;
                while ((match = pattern.exec(value)) !== null) {
                    const index = match.index || 0;
                    const matchString = match[0] || "";
                    const range = [index, index + matchString.length];
                    const plugOne = value.slice(range[0], range[1] + 1);
                    // [コラム]は除外
                    if (plugOne === "[コラム]") {
                        return;
                    }
                    report(node, new RuleError("「コラム」という表現は文中では使わわないでください", {
                        index
                    }));
                }
            }
        };
    });
};
