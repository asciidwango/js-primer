import { marked } from "marked";

export function md2html(markdown, cliOptions) {
    return marked.parse(markdown, {
        gfm: cliOptions.gfm,
    });
};
