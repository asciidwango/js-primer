module.exports = {
    globDirectory: "_book",
    globPatterns: [
        "**/*.{js,css,html,png,eot,svg,ttf,woff,woff2,otf,ico}",
    ],
    globIgnores: [
        "**/basic/**/*.{js,css}",
        "**/use-case/**/*.{js,css}",
    ],
    swSrc: "source/sw.js",
    swDest: "_book/sw.js",
};