/**
 * @see https://github.com/asciidwango/js-primer/issues/1368
 * @param context
 * @param options
 * @returns {{}}
 */
const report = (context, options = {}) => {
    const allow = options.allow || [];
    const { Syntax, RuleError, report, getSource, fixer } = context;
    return {
        [Syntax.Code](node) {
            const text = getSource(node);
            const isInHeader = node.parent.type === "Header";
            // `#property` Private Fieldsは除外される
            const matches = text.matchAll(/^`(?<parent>\w+)#(?<property>\w+)`$/gu);
            for (const match of matches) {
                const index = match.index || 0;
                const parent = match.groups.parent;
                const property = match.groups.property;
                if (allow.includes(`${parent}#${property}`)) {
                    return; // 例外は許可
                }
                const replacedText = isInHeader
                    ? `\`${parent}.prototype.${property}\``
                    : `${parent}の\`${property}\``;
                report(node, new RuleError(`#をprototypeの短縮表記として使わないください。
                
Array#push は「Arrayの\`push\`メソッド」と表現します。

See https://github.com/asciidwango/js-primer/issues/1368
`, {
                    index,
                    fix: fixer.replaceText(node, replacedText)
                }));
            }
        },
        [Syntax.CodeBlock](node) {
            const text = getSource(node);
            // `#property` Private Fieldsは除外される
            const matches = text.matchAll(/\/\/.*?(?<parent>\w+)#(?<property>\w+)/gu);
            for (const match of matches) {
                const index = match.index || 0;
                const parent = match.groups.parent;
                const property = match.groups.property;
                if (allow.includes(`${parent}#${property}`)) {
                    return; // 例外は許可
                }
                report(node, new RuleError(`#をprototypeの短縮表記として使わないください。
                
Array#push は「Arrayの\`push\`メソッド」と表現します。

See https://github.com/asciidwango/js-primer/issues/1368
`, {
                    index,
                }));
            }
        }

    };
};

module.exports = {
    linter: report,
    fixer: report
};
