import StaticMethods from "./static-methods.json" with { type: "json" };

/**
 * 静的メソッドの表記を
 *
 * `Promise.resolve`静的メソッド
 *
 * のように `XXX`静的メソッド と表記するように統一するtextlintルール
 * @param context
 * @param options
 * @returns {import("@textlint/types").TextlintRuleModule}
 */
const report = (context, options = {}) => {
    const { Syntax, RuleError, report, getSource, fixer } = context;
    return {
        [Syntax.Code](node) {
            const text = node.value;
            const isStaticMethod = StaticMethods.includes(text);
            if (!isStaticMethod) {
                return;
            }
            const code = getSource(node, 0, 4);
            if (/メソッド$/.test(code)) {
                const originalCode = getSource(node);
                // 静的メソッドとするべき
                report(node, new RuleError(`"${code}"は、"${originalCode}静的メソッド"にしてください`, {
                    index: 0,
                    fix: fixer.insertTextAfter(node, "静的")
                }));
            }
        }
    };
};
export default {
    linter: report, fixer: report
};
