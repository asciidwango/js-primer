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
    "revision": "a5406163a038cfc3dd6f2e62879f3ffc"
  },
  {
    "url": "basic/array/index.html",
    "revision": "9fc89c7379306cad4e863fb5ff40b18d"
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
    "revision": "d02592321f259dd7ccd2b59aa31d8b96"
  },
  {
    "url": "basic/class/index.html",
    "revision": "98384f90d396eb2ce4795b1ac1fedf6c"
  },
  {
    "url": "basic/comments/index.html",
    "revision": "18682ec63891a4a552e9af828267b69f"
  },
  {
    "url": "basic/condition/index.html",
    "revision": "45a9a575ecf4c985250b4fb57a2f430c"
  },
  {
    "url": "basic/data-type/index.html",
    "revision": "f5dbb6f844510ad466a09f32783861e2"
  },
  {
    "url": "basic/date/index.html",
    "revision": "a5113624d8b6d343a89ab94039b20ebc"
  },
  {
    "url": "basic/ecmascript/index.html",
    "revision": "2213650fde75112c7d47e40366e75df5"
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
    "revision": "f8519bc424373a2c1d8d4105b37cc86e"
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
    "revision": "3497cc9a613c55fa7f94e61d7fe874ac"
  },
  {
    "url": "basic/function-scope/index.html",
    "revision": "09f022bdf49c308eb82cc965cacf7238"
  },
  {
    "url": "basic/function-this/index.html",
    "revision": "2d2a83b0e35ba76dfd25f618cd255421"
  },
  {
    "url": "basic/implicit-coercion/img/JavaScript-Equality-Table.png",
    "revision": "249e75cfe1f22458bfa9fe71480a6c0d"
  },
  {
    "url": "basic/implicit-coercion/index.html",
    "revision": "2f695ffb7b271dd4130e3c49072aac46"
  },
  {
    "url": "basic/index.html",
    "revision": "24194eb4cc4da698fb74eba49d9e6d1e"
  },
  {
    "url": "basic/introduction/img/javascript-ecmascript.png",
    "revision": "40a83bcf5b26783fc68b7caeb792d36d"
  },
  {
    "url": "basic/introduction/index.html",
    "revision": "bca9ced03e70c8c17cdb2672e671d02e"
  },
  {
    "url": "basic/json/index.html",
    "revision": "d3f18160886bfd9bc2081a5df35aed42"
  },
  {
    "url": "basic/loop/index.html",
    "revision": "d1afb1f119caf87514ff1a635d9b2578"
  },
  {
    "url": "basic/loop/public/index.html",
    "revision": "226c5a5e385446f7b048d1b990a8f603"
  },
  {
    "url": "basic/map-and-set/index.html",
    "revision": "51ee6e2da20d4e0870ea9f485b80907b"
  },
  {
    "url": "basic/math/index.html",
    "revision": "9c2d5800ddb5c4e1fd36f9b78a102094"
  },
  {
    "url": "basic/module/index.html",
    "revision": "80253f8e308653ce75852d836c02a0a5"
  },
  {
    "url": "basic/object/index.html",
    "revision": "24ee87ebd7fe94f1834e245bbbb63577"
  },
  {
    "url": "basic/operator/index.html",
    "revision": "738e7b8f6e3a37385be7c74e2877543e"
  },
  {
    "url": "basic/other-parts/index.html",
    "revision": "511b8ae0e67927357c82b12ff1b59e4f"
  },
  {
    "url": "basic/prototype-object/img/object-prototype.png",
    "revision": "6bbe9c151a73ec89ed45606a0b42975f"
  },
  {
    "url": "basic/prototype-object/index.html",
    "revision": "ad983f6d0866ecedbd1e136afd529b62"
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
    "revision": "6c99193a5240b3db08314ef1aba191ca"
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
    "revision": "717b1f4d7fb641a554399c852c830194"
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
    "revision": "377e89ec352f7fc9c574193b77854cf0"
  },
  {
    "url": "basic/string/index.html",
    "revision": "9b355a715b8ae1d5ecf5df6f177c80b0"
  },
  {
    "url": "basic/variables/index.html",
    "revision": "46fd96973c494791f58917de6da94887"
  },
  {
    "url": "basic/wrapper-object/index.html",
    "revision": "71a0025a88a8893a2fd26807c9bcaac3"
  },
  {
    "url": "cheetsheet/index.html",
    "revision": "42f29d624ce102289b9992e4d04e2aa9"
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
    "revision": "21e7a2d19bc0572e8569e38fa99307c5"
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
    "revision": "6d72a59f07e54cc60663a3c397cba063"
  },
  {
    "url": "gitbook/theme.js",
    "revision": "cb8cb71a086d79dd6ab8e1283bf40339"
  },
  {
    "url": "index.html",
    "revision": "0543fda6e1d3ba19f2f073a5d0ec90b0"
  },
  {
    "url": "intro/authors/index.html",
    "revision": "ceece55ab21db31e319cea826d95cc26"
  },
  {
    "url": "intro/feedback/index.html",
    "revision": "a04dfcf3417a22a32c189bec404fdf74"
  },
  {
    "url": "intro/index.html",
    "revision": "b7af6372e6e065dd4fe40570237ea849"
  },
  {
    "url": "intro/preparation/index.html",
    "revision": "a65257872c6fa5521acc87aa47ae390f"
  },
  {
    "url": "landing/css/style.css",
    "revision": "30232f49621b4afedbd4e2d1f0db2d3d"
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
    "revision": "a7676e9ff3dfab0f364b65b67caa318f"
  },
  {
    "url": "outro/index.html",
    "revision": "96225a06f3d63a0e9de6003703680744"
  },
  {
    "url": "use-case/ajaxapp/display/img/fig-1.png",
    "revision": "15072f06aa7fd4d5fbce148bc2db975f"
  },
  {
    "url": "use-case/ajaxapp/display/index.html",
    "revision": "4a62dd88731bc39e13097716dbf964f0"
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
    "revision": "2b4c578ef2cf5ec04c286f7fcaab131a"
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
    "revision": "744c313c2245225989c935cdb51aa820"
  },
  {
    "url": "use-case/ajaxapp/http/src/index.html",
    "revision": "79838155e2a06a9e86a64804297f9a64"
  },
  {
    "url": "use-case/ajaxapp/index.html",
    "revision": "ebd274fb92a7b061cbf43ca78dc62bdf"
  },
  {
    "url": "use-case/ajaxapp/promise/img/fig-1.png",
    "revision": "0c29e65b2be0ef42cd63ab8c3166a5ad"
  },
  {
    "url": "use-case/ajaxapp/promise/index.html",
    "revision": "04d0111bd7a959b7fa40369ad672abe1"
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
    "revision": "52d07e2aa393b9815471563e0ba7847e"
  },
  {
    "url": "use-case/nodecli/argument-parse/index.html",
    "revision": "fd14d974083e886f0fea437f148674ea"
  },
  {
    "url": "use-case/nodecli/helloworld/index.html",
    "revision": "d6b101758a859ba92cf534517c917da7"
  },
  {
    "url": "use-case/nodecli/index.html",
    "revision": "49e2a95fbb3e0863b6c8a755265f38d6"
  },
  {
    "url": "use-case/nodecli/md-to-html/index.html",
    "revision": "c29767b6d67dd3c78e1b2fb550f8c8c5"
  },
  {
    "url": "use-case/nodecli/read-file/index.html",
    "revision": "45d75a280365f66629ba1da3e4bbe1d0"
  },
  {
    "url": "use-case/nodecli/refactor-and-unittest/index.html",
    "revision": "8254616db2182e04230cf6ddc5500eb4"
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
    "revision": "830386a79a343b3ba3a39831151f0061"
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
    "revision": "f59147efd81c2e1df895c2e36d0d44e6"
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
    "revision": "e74d25c4c906cbafdaf2488b591121bc"
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
    "revision": "28fb14f2670efb70e16904b354adfa05"
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
    "revision": "56eff150c9f15fac6023d1c995ec5ef3"
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
    "revision": "dece97ee7d6b6256c8bc7f6db6d6df80"
  },
  {
    "url": "use-case/todoapp/form-event/prevent-event/index.html",
    "revision": "4b6e0d6f957ffad0659f2076151c97ca"
  },
  {
    "url": "use-case/todoapp/index.html",
    "revision": "edd79f1706bae82e5e46162c71e14d58"
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
    "revision": "3f1e4a7ec50175fffd1cc5f6a229ccb3"
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
