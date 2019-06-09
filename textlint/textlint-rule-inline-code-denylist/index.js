module.exports = (context, options = {}) => {
    const { Syntax, RuleError, report, getSource } = context;
    const denylist = options.denylist ? options.denylist : [];
    return {
        [Syntax.Code](node) {
            const value = node.value;
            const match = denylist.find(item => {
                return item === value || value.includes(`(${item}`) || value.includes(`${item}.`) || value.includes(`${item} =`);
            });
            if (match) {
                const rawString = getSource(node);
                report(node, new RuleError(`インラインコード: ${rawString} の利用を禁止しています。

詳細: https://github.com/asciidwango/js-primer/issues/804`));
            }
        }
    };
};
