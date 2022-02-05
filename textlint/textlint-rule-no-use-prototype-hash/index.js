/**
 * 文中で"コラム"という表現を使わないルール
 * @see https://github.com/asciidwango/js-primer/issues/1368
 * @param context
 * @param options
 * @returns {{}}
 */
module.exports = (context, options = {}) => {
    const { Syntax, RuleError, report, getSource, fixer } = context;
    return {
        [Syntax.Code](node) {
            const text = getSource(node);
            const matches = text.matchAll(/^`(\w+)#(\w+)`$/g);
            for (const match of matches) {
                const index = match.index || 0;
                const parent = matches[1];
                const property = matches[2];
                const replacedText = "`" + `${parent}の\`${property}\`` + "`";
                report(node, new RuleError(`#をprototypeの短縮表記として使わないください。
                
Array#push は「Arrayの\`push\`メソッド」と表現します。
Private Fieldsは、「MyClassの\`#property\`フィールド」と表現します

`, {
                    index,
                    fix: fixer.replaceText(node, replacedText)
                }));
            }
        }
    };
};
