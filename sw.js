// workbox init setting
importScripts(
    "https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js"
);
workbox.core.setCacheNameDetails({ prefix: "js-primer-v1" });
workbox.googleAnalytics.initialize();
// reload asap
workbox.skipWaiting();
workbox.clientsClaim();
// precache
workbox.precaching.precacheAndRoute([
  {
    "url": "404.html",
    "revision": "1ea4469e2ca182692a09f11d89535838"
  },
  {
    "url": "appendix/links/index.html",
    "revision": "a4a3455f92e125a854523b3ef4a38f5b"
  },
  {
    "url": "basic/array/index.html",
    "revision": "d0613e2ff2e6b7064299fcdf61602501"
  },
  {
    "url": "basic/async/img/promise-chain.png",
    "revision": "34b48836a6f476f1d57f197e121041c2"
  },
  {
    "url": "basic/async/img/then-rejected-promise.png",
    "revision": "c45405c987bb1a739850f71be6d010f0"
  },
  {
    "url": "basic/async/index.html",
    "revision": "6393beeab068037ec5b20e1cd5a25363"
  },
  {
    "url": "basic/class/index.html",
    "revision": "cbb27e380daae841c1c1031c8f955a27"
  },
  {
    "url": "basic/comments/index.html",
    "revision": "a96af3f767dcf40a4809322dc842b1b5"
  },
  {
    "url": "basic/condition/index.html",
    "revision": "b64f10797a78bde153bbadadf822e0e2"
  },
  {
    "url": "basic/data-type/index.html",
    "revision": "42c125bdb4003ea769b05003ba245506"
  },
  {
    "url": "basic/date/index.html",
    "revision": "bb7e92c658af1445ce6709638a8a5b62"
  },
  {
    "url": "basic/ecmascript/index.html",
    "revision": "98a9f2f89c1b77cb36226c61b776efb3"
  },
  {
    "url": "basic/error-try-catch/img/console.error.png",
    "revision": "5fa103e5189ff041370d915232f5770e"
  },
  {
    "url": "basic/error-try-catch/img/error.png",
    "revision": "dff0e4322cb06d42d699119b6f89428f"
  },
  {
    "url": "basic/error-try-catch/index.html",
    "revision": "6fb5dc782519f9b053705a079609a88d"
  },
  {
    "url": "basic/error-try-catch/src/console/index.html",
    "revision": "f1d5ff6a6b82e975f74ac1e3d877f723"
  },
  {
    "url": "basic/error-try-catch/src/error.html",
    "revision": "359cbe7900932fac79eb321c76e104b4"
  },
  {
    "url": "basic/function-declaration/index.html",
    "revision": "db2a6a9891432610ee1647f9b9884843"
  },
  {
    "url": "basic/function-scope/index.html",
    "revision": "0d20aae47bfef6181012242b63d4d898"
  },
  {
    "url": "basic/function-this/index.html",
    "revision": "b412b3e7f6011ed9252c54a14ad52a9f"
  },
  {
    "url": "basic/implicit-coercion/img/JavaScript-Equality-Table.png",
    "revision": "249e75cfe1f22458bfa9fe71480a6c0d"
  },
  {
    "url": "basic/implicit-coercion/index.html",
    "revision": "01b4ea82ded141d17177f04583b9a0e4"
  },
  {
    "url": "basic/index.html",
    "revision": "bbc435bbc67ef5da289532114c6fa1af"
  },
  {
    "url": "basic/introduction/img/javascript-ecmascript.png",
    "revision": "40a83bcf5b26783fc68b7caeb792d36d"
  },
  {
    "url": "basic/introduction/index.html",
    "revision": "f95129d6e31489bdcd1762d64d048601"
  },
  {
    "url": "basic/json/index.html",
    "revision": "18f36208c0ef0f212c262682ceff7dd7"
  },
  {
    "url": "basic/loop/index.html",
    "revision": "4aa128b0b9effeeeef5674b5f1bc4326"
  },
  {
    "url": "basic/loop/public/index.html",
    "revision": "226c5a5e385446f7b048d1b990a8f603"
  },
  {
    "url": "basic/map-and-set/index.html",
    "revision": "8255d90570e4318a4a12ad52c229dd75"
  },
  {
    "url": "basic/math/index.html",
    "revision": "d61d906d2cc875b903fc0bdafe984199"
  },
  {
    "url": "basic/module/index.html",
    "revision": "895fb77198b63a0ba892ee8c922d8caa"
  },
  {
    "url": "basic/object/index.html",
    "revision": "27af2f0d9a2e2f8c6a64c62a4317dc19"
  },
  {
    "url": "basic/operator/index.html",
    "revision": "5c9715bda1f0c7fbdf1a1c7031ae33b7"
  },
  {
    "url": "basic/other-parts/index.html",
    "revision": "fef728d7c01aa1746fd45138eb6ffac2"
  },
  {
    "url": "basic/prototype-object/img/object-prototype.png",
    "revision": "6bbe9c151a73ec89ed45606a0b42975f"
  },
  {
    "url": "basic/prototype-object/index.html",
    "revision": "5bf69141668d70818d56dcefb4b872bb"
  },
  {
    "url": "basic/read-eval-print/img/syntax-error.png",
    "revision": "889dfb7dec547bc8bde6fed9566d204f"
  },
  {
    "url": "basic/read-eval-print/img/web-console.png",
    "revision": "abfdb41b731d613c7898cfadbc849160"
  },
  {
    "url": "basic/read-eval-print/index.html",
    "revision": "e2fe271f2586c3fe6a70da3375a3e60c"
  },
  {
    "url": "basic/read-eval-print/src/empty/index.html",
    "revision": "5a2a8b11dda21e4b54164d24dd751dc4"
  },
  {
    "url": "basic/read-eval-print/src/example/index.html",
    "revision": "e6feacbd6b95841d9be147d6d820014f"
  },
  {
    "url": "basic/read-eval-print/src/invalid/syntax-error-typo/index.html",
    "revision": "e6feacbd6b95841d9be147d6d820014f"
  },
  {
    "url": "basic/read-eval-print/src/invalid/syntax-error/index.html",
    "revision": "e6feacbd6b95841d9be147d6d820014f"
  },
  {
    "url": "basic/read-eval-print/src/runtime-error/index.html",
    "revision": "e6feacbd6b95841d9be147d6d820014f"
  },
  {
    "url": "basic/statement-expression/index.html",
    "revision": "67af2f5ffcb3c150fadb5c8f02bfbc5f"
  },
  {
    "url": "basic/string-unicode/img/codeunit-codepoint-table.png",
    "revision": "7d065a8e65d944b1898b9de5e8d1e07e"
  },
  {
    "url": "basic/string-unicode/img/emoji-codeunit-codepoint-table.png",
    "revision": "6665ae16a9f3b2bfee3d28930988f382"
  },
  {
    "url": "basic/string-unicode/img/extenal-code-and-internal-code.png",
    "revision": "81bdae3abbfa82c8a14ce1d961bab2e5"
  },
  {
    "url": "basic/string-unicode/index.html",
    "revision": "6bf95951ce5a5cd16905835f26189471"
  },
  {
    "url": "basic/string/index.html",
    "revision": "3e333d149eb155defd736289b7261cd2"
  },
  {
    "url": "basic/variables/index.html",
    "revision": "652f2b04c8aee11a3bb074916c99569f"
  },
  {
    "url": "basic/wrapper-object/index.html",
    "revision": "6f24056d3963682889caadf462bef444"
  },
  {
    "url": "cheetsheet/index.html",
    "revision": "77ce5452e11e42aed79c9d2c0cc46b02"
  },
  {
    "url": "gitbook/fonts/fontawesome/fontawesome-webfont.eot",
    "revision": "25a32416abee198dd821b0b17a198a8f"
  },
  {
    "url": "gitbook/fonts/fontawesome/fontawesome-webfont.svg",
    "revision": "d7c639084f684d66a1bc66855d193ed8"
  },
  {
    "url": "gitbook/fonts/fontawesome/fontawesome-webfont.ttf",
    "revision": "1dc35d25e61d819a9c357074014867ab"
  },
  {
    "url": "gitbook/fonts/fontawesome/fontawesome-webfont.woff",
    "revision": "c8ddf1e5e5bf3682bc7bebf30f394148"
  },
  {
    "url": "gitbook/fonts/fontawesome/fontawesome-webfont.woff2",
    "revision": "e6cf7c6ec7c2d6f670ae9d762604cb0b"
  },
  {
    "url": "gitbook/fonts/fontawesome/FontAwesome.otf",
    "revision": "5dc41d8fe329a22fa1ee9225571c843e"
  },
  {
    "url": "gitbook/gitbook-plugin-anchors/plugin.css",
    "revision": "45deda85e7ceaacadb6a51c17248ad1c"
  },
  {
    "url": "gitbook/gitbook-plugin-fontsettings/fontsettings.js",
    "revision": "fab8f6412ce18bb367635b1bcae503ca"
  },
  {
    "url": "gitbook/gitbook-plugin-fontsettings/website.css",
    "revision": "056a6db3eef3553a78f3b7e02356b2e7"
  },
  {
    "url": "gitbook/gitbook-plugin-ga/plugin.js",
    "revision": "8b0d0bfffa07cfd2675fffb1b7b6e6f4"
  },
  {
    "url": "gitbook/gitbook-plugin-github-issue-feedback/plugin.js",
    "revision": "8e12063d49ae924cd3480aac1d58f7e9"
  },
  {
    "url": "gitbook/gitbook-plugin-highlight/ebook.css",
    "revision": "f01a597ac6345fdd56d21fbaff5ba2e8"
  },
  {
    "url": "gitbook/gitbook-plugin-highlight/website.css",
    "revision": "0fd021349d0ca60713e694df7d4d47a3"
  },
  {
    "url": "gitbook/gitbook-plugin-js-console/console-ui.js",
    "revision": "0ca768e48d364ee90d22664568902840"
  },
  {
    "url": "gitbook/gitbook-plugin-page-toc-button/plugin.css",
    "revision": "4e7efddf5df2ea927a186116ba2aee2b"
  },
  {
    "url": "gitbook/gitbook-plugin-page-toc-button/plugin.js",
    "revision": "834dad580dcb5926f3b090502550f60d"
  },
  {
    "url": "gitbook/gitbook.js",
    "revision": "6de6fe64cbf618eb1993392b6bfb0862"
  },
  {
    "url": "gitbook/icons/amazon-icon.png",
    "revision": "a52ae6aa63ba42a3dea1a5cd59ebf418"
  },
  {
    "url": "gitbook/icons/favicon.ico",
    "revision": "4724b6e29e34167169d6d9e14b8c853f"
  },
  {
    "url": "gitbook/icons/icon-128x128.png",
    "revision": "b91df37069569bafccc6936d1b2e1352"
  },
  {
    "url": "gitbook/icons/icon-144x144.png",
    "revision": "e744cdec12fa24a28b40fde9b52d7695"
  },
  {
    "url": "gitbook/icons/icon-152x152.png",
    "revision": "77dac1368e193743d56106145e1c04a9"
  },
  {
    "url": "gitbook/icons/icon-192x192.png",
    "revision": "e3682439a02773056ce1bd46e6085555"
  },
  {
    "url": "gitbook/icons/icon-384x384.png",
    "revision": "2814afaf288c99d08c584b39234d3e39"
  },
  {
    "url": "gitbook/icons/icon-512x512.png",
    "revision": "fd7a37b059ccac4d7256226883672bce"
  },
  {
    "url": "gitbook/icons/icon-72x72.png",
    "revision": "406eb5ae0057f1f40b2abf9b17cd12a4"
  },
  {
    "url": "gitbook/icons/icon-96x96.png",
    "revision": "7529c23361ebe1eaba84a6cd042a9565"
  },
  {
    "url": "gitbook/images/apple-touch-icon-precomposed-152.png",
    "revision": "77dac1368e193743d56106145e1c04a9"
  },
  {
    "url": "gitbook/images/favicon.ico",
    "revision": "4724b6e29e34167169d6d9e14b8c853f"
  },
  {
    "url": "gitbook/style.css",
    "revision": "c8d5357e5568e5a0f0625963fa89b2f5"
  },
  {
    "url": "gitbook/theme.js",
    "revision": "c33673cec2684abd55f06bdf2bed4f2c"
  },
  {
    "url": "index.html",
    "revision": "413f84a6b1393721ad3a6f7647a650f0"
  },
  {
    "url": "intro/authors/index.html",
    "revision": "e24fd87183863f68d6b4d4d864107cfe"
  },
  {
    "url": "intro/feedback/index.html",
    "revision": "fbddd90b614adea77ffb35d5c6dd6132"
  },
  {
    "url": "intro/index.html",
    "revision": "34848148c0d22d99f54cbc2bf3926638"
  },
  {
    "url": "intro/preparation/index.html",
    "revision": "33e0c1533c6fbec84a8d61e3235100c3"
  },
  {
    "url": "landing/css/style.css",
    "revision": "e656aaec25ec36b8987679f977e29c43"
  },
  {
    "url": "landing/img/js-primer.png",
    "revision": "19d98be248101b2685bb2a74d510890f"
  },
  {
    "url": "landing/img/repo-actions-watch.png",
    "revision": "4b4cd63c1bad3861502d3127c2a2d0a2"
  },
  {
    "url": "landing/index.html",
    "revision": "d52bb7c00c04fd792f7accb2d2ef121b"
  },
  {
    "url": "outro/index.html",
    "revision": "942f652931b138c11af74a26631dba31"
  },
  {
    "url": "use-case/ajaxapp/display/img/fig-1.png",
    "revision": "15072f06aa7fd4d5fbce148bc2db975f"
  },
  {
    "url": "use-case/ajaxapp/display/index.html",
    "revision": "233bc64d070debd8e2929bf3935fd798"
  },
  {
    "url": "use-case/ajaxapp/display/src/index.html",
    "revision": "cd7de9a39ea850bbf77185c30e925ddc"
  },
  {
    "url": "use-case/ajaxapp/entrypoint/img/fig-1.png",
    "revision": "eaa77b26666e9db49bc6cc41b21ae8fe"
  },
  {
    "url": "use-case/ajaxapp/entrypoint/index.html",
    "revision": "9f3085c5ebffc1a99b37dc178db823e2"
  },
  {
    "url": "use-case/ajaxapp/entrypoint/src/index.html",
    "revision": "59d564baee8b85ccee9e5e5eac419944"
  },
  {
    "url": "use-case/ajaxapp/http/img/fig-1.png",
    "revision": "77527b0eb6a46e1ba35e566b1a4d046f"
  },
  {
    "url": "use-case/ajaxapp/http/img/fig-2.png",
    "revision": "37168eab1ce7ca03de46134c15838a9f"
  },
  {
    "url": "use-case/ajaxapp/http/index.html",
    "revision": "a9157db19a94c2c180e1fa5d1c603a84"
  },
  {
    "url": "use-case/ajaxapp/http/src/index.html",
    "revision": "79838155e2a06a9e86a64804297f9a64"
  },
  {
    "url": "use-case/ajaxapp/index.html",
    "revision": "7dea5d5d2a84b7ce5f7acdda7a249546"
  },
  {
    "url": "use-case/ajaxapp/promise/img/fig-1.png",
    "revision": "0c29e65b2be0ef42cd63ab8c3166a5ad"
  },
  {
    "url": "use-case/ajaxapp/promise/index.html",
    "revision": "e1da4ed2391e98ec3f4ecc8dd7313a6e"
  },
  {
    "url": "use-case/ajaxapp/promise/src/index.html",
    "revision": "08f26d218b17fbc1aea4461f2a01df19"
  },
  {
    "url": "use-case/ajaxapp/src/index.html",
    "revision": "08f26d218b17fbc1aea4461f2a01df19"
  },
  {
    "url": "use-case/ajaxapp/xhr/index.html",
    "revision": "e2a798bbbb6e31bede0dcec28b833d63"
  },
  {
    "url": "use-case/index.html",
    "revision": "bd1f78f9f2a78c0a3939ec78b6f8ea53"
  },
  {
    "url": "use-case/nodecli/argument-parse/index.html",
    "revision": "221badfff852932e46d3e6f45e5cf8f5"
  },
  {
    "url": "use-case/nodecli/helloworld/index.html",
    "revision": "aec26483917556fbae084456ea3bd178"
  },
  {
    "url": "use-case/nodecli/index.html",
    "revision": "24c5961ca66751f7e56a7bfa7aa57e9a"
  },
  {
    "url": "use-case/nodecli/md-to-html/index.html",
    "revision": "e211b21d31b5a9c90d14f43007c7d62c"
  },
  {
    "url": "use-case/nodecli/read-file/index.html",
    "revision": "eaf7ccfac725d93f72908fbd935c5184"
  },
  {
    "url": "use-case/nodecli/refactor-and-unittest/index.html",
    "revision": "b7df31c773b1839a4e6453f439cfad4d"
  },
  {
    "url": "use-case/nodecli/refactor-and-unittest/src/test/fixtures/expected-gfm.html",
    "revision": "bab3ba2ded7964789458b79dea29b6b7"
  },
  {
    "url": "use-case/nodecli/refactor-and-unittest/src/test/fixtures/expected.html",
    "revision": "3fd11b8807a99394e85b39b332b5fa8b"
  },
  {
    "url": "use-case/setup-local-env/img/index.png",
    "revision": "8d5d71bc5560c6754ee0b6544c6ed191"
  },
  {
    "url": "use-case/setup-local-env/index.html",
    "revision": "2e2a85b4b7a840dc37cba7e6f2e27d8e"
  },
  {
    "url": "use-case/setup-local-env/src/index.html",
    "revision": "089aa360477e18de8c4044c4cadb0c41"
  },
  {
    "url": "use-case/todoapp/app-structure/img/todo-html.png",
    "revision": "617608b92877a311d2d6238f3c462e8b"
  },
  {
    "url": "use-case/todoapp/app-structure/index.html",
    "revision": "6797a73b3cd1990f6aae40ac1fad78bf"
  },
  {
    "url": "use-case/todoapp/app-structure/todo-html/index.html",
    "revision": "7982d73005aace941cf4c11764d8d601"
  },
  {
    "url": "use-case/todoapp/entrypoint/first-entry/index.html",
    "revision": "be5eee3981ec18c49a62181f3fa78987"
  },
  {
    "url": "use-case/todoapp/entrypoint/img/first-entry.png",
    "revision": "1196d54d6eb751294c8b3067bb9c4547"
  },
  {
    "url": "use-case/todoapp/entrypoint/index.html",
    "revision": "436fc9c5dfbecc79592d1a370adadc75"
  },
  {
    "url": "use-case/todoapp/entrypoint/module-entry/index.html",
    "revision": "be5eee3981ec18c49a62181f3fa78987"
  },
  {
    "url": "use-case/todoapp/entrypoint/module-scope/index.html",
    "revision": "32cab3b2ed950ab156f898fc679177c2"
  },
  {
    "url": "use-case/todoapp/event-model/event-emitter/index.html",
    "revision": "4b6e0d6f957ffad0659f2076151c97ca"
  },
  {
    "url": "use-case/todoapp/event-model/index.html",
    "revision": "7315e046445ff9f01015ae7d1e0c19cb"
  },
  {
    "url": "use-case/todoapp/final/create-view/index.html",
    "revision": "4b6e0d6f957ffad0659f2076151c97ca"
  },
  {
    "url": "use-case/todoapp/final/final/index.html",
    "revision": "9ffaa1daeb5dc9ad3021970002a5aa53"
  },
  {
    "url": "use-case/todoapp/final/index.html",
    "revision": "041a67ee29a0083d3b8d1e2e0c27337d"
  },
  {
    "url": "use-case/todoapp/final/more/index.html",
    "revision": "9ffaa1daeb5dc9ad3021970002a5aa53"
  },
  {
    "url": "use-case/todoapp/form-event/add-todo-item/index.html",
    "revision": "4b6e0d6f957ffad0659f2076151c97ca"
  },
  {
    "url": "use-case/todoapp/form-event/img/add-todo-item.png",
    "revision": "ceb101878994adb6e6902364144b16e6"
  },
  {
    "url": "use-case/todoapp/form-event/img/prevent-event.png",
    "revision": "93ec89f0b1054c94306a792fd68a377e"
  },
  {
    "url": "use-case/todoapp/form-event/index.html",
    "revision": "194d659c784fcba95b8b38a9cebf2978"
  },
  {
    "url": "use-case/todoapp/form-event/prevent-event/index.html",
    "revision": "4b6e0d6f957ffad0659f2076151c97ca"
  },
  {
    "url": "use-case/todoapp/index.html",
    "revision": "bee00085e6655fd02d9c46d3b740e0c0"
  },
  {
    "url": "use-case/todoapp/update-delete/add-checkbox/index.html",
    "revision": "4b6e0d6f957ffad0659f2076151c97ca"
  },
  {
    "url": "use-case/todoapp/update-delete/delete-feature/index.html",
    "revision": "4b6e0d6f957ffad0659f2076151c97ca"
  },
  {
    "url": "use-case/todoapp/update-delete/img/input-checkbox.png",
    "revision": "44920eba3f5737a49e9cc4c0893c44dd"
  },
  {
    "url": "use-case/todoapp/update-delete/index.html",
    "revision": "dfaa27803dfed80ee0441d93655272b5"
  },
  {
    "url": "use-case/todoapp/update-delete/input-checkbox/index.html",
    "revision": "9528b6b1e9c5c6c029843537ea4121f5"
  },
  {
    "url": "use-case/todoapp/update-delete/update-feature/index.html",
    "revision": "4b6e0d6f957ffad0659f2076151c97ca"
  }
]);
