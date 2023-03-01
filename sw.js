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
    "revision": "636ab4c68f308cbc4539fecb2e9e9329"
  },
  {
    "url": "appendix/links/index.html",
    "revision": "b0888660c24a80138d44ce2e97e6140c"
  },
  {
    "url": "basic/array/index.html",
    "revision": "2d24d6272390f2291268696f3ecaa407"
  },
  {
    "url": "basic/async/img/async-single-thread-tasks.png",
    "revision": "9fb884ff15abc45dfe46c52e70a1f5c6"
  },
  {
    "url": "basic/async/img/block--async-single-thread-tasks.png",
    "revision": "258c557335c93435dbe369c8b4eb148a"
  },
  {
    "url": "basic/async/img/promise-chain.png",
    "revision": "e4cec834ad9a6a99d63d91001dcaa650"
  },
  {
    "url": "basic/async/img/single-thread-tasks.png",
    "revision": "44331a644afe9a76e9ffff8c8dcb4844"
  },
  {
    "url": "basic/async/img/then-rejected-promise.png",
    "revision": "210afd18eefa172748da7be410597a2f"
  },
  {
    "url": "basic/async/index.html",
    "revision": "b32ee83295460ce5df961d13e56a5cbe"
  },
  {
    "url": "basic/class/index.html",
    "revision": "3ca92bae6178ca00293dc50448497c12"
  },
  {
    "url": "basic/comments/index.html",
    "revision": "0d5b9426de0e88b8482ef3b942eb7a84"
  },
  {
    "url": "basic/condition/index.html",
    "revision": "4e7cf3104b33f031123e8a1fe8efa88d"
  },
  {
    "url": "basic/data-type/index.html",
    "revision": "3158119f859c2087b8286f1e3004a29c"
  },
  {
    "url": "basic/date/index.html",
    "revision": "4cb36a3e210418c6c3ac5a9c3b530476"
  },
  {
    "url": "basic/ecmascript/index.html",
    "revision": "0af78d3cb6746161968ac08e020a4aa0"
  },
  {
    "url": "basic/error-try-catch/img/console.error.png",
    "revision": "d4739aedc8ca6045393bb676760474e1"
  },
  {
    "url": "basic/error-try-catch/img/error.png",
    "revision": "adb2c821a705e6ef2e554922ed1d0ac8"
  },
  {
    "url": "basic/error-try-catch/index.html",
    "revision": "fa99e64ad4a2381117be5998be2ecd5e"
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
    "revision": "865dbfdf61535c371c09ae2d39c39982"
  },
  {
    "url": "basic/function-scope/index.html",
    "revision": "a2c5368a09c5bcf2adc3885f674d290c"
  },
  {
    "url": "basic/function-this/index.html",
    "revision": "e919e584d69a80a61684763ccfcb06d3"
  },
  {
    "url": "basic/implicit-coercion/img/JavaScript-Equality-Table.png",
    "revision": "2858951a885713a1786e9ce3ee1908a5"
  },
  {
    "url": "basic/implicit-coercion/index.html",
    "revision": "77fc04f10260e093612925129c8d0582"
  },
  {
    "url": "basic/index.html",
    "revision": "5ffca8859928e08d01952f14ced416ce"
  },
  {
    "url": "basic/introduction/img/javascript-ecmascript.png",
    "revision": "d1dd8f9b6e0e41d518e0c4114849b275"
  },
  {
    "url": "basic/introduction/index.html",
    "revision": "cb9a54eb2f30fcaa2b58a5c8056dcd6b"
  },
  {
    "url": "basic/json/index.html",
    "revision": "60d0d5f3ad6a20cb7298d30d86de0a23"
  },
  {
    "url": "basic/loop/index.html",
    "revision": "d9d8cabc5ff84d8dd1a318489728ff10"
  },
  {
    "url": "basic/loop/public/index.html",
    "revision": "226c5a5e385446f7b048d1b990a8f603"
  },
  {
    "url": "basic/map-and-set/index.html",
    "revision": "f6d3167582d2da2d26e15b5bd832198a"
  },
  {
    "url": "basic/math/index.html",
    "revision": "acf3e008529e915391a7cf524b02dc67"
  },
  {
    "url": "basic/module/index.html",
    "revision": "2b2e8ec1239a6ca74d5fef7a0d4ff922"
  },
  {
    "url": "basic/object/index.html",
    "revision": "c1be73b0d786ac958e81b3f6efd766bb"
  },
  {
    "url": "basic/operator/img/0000_0000_0000_0000_0000_0000_0000_0001.png",
    "revision": "6b390264395ab291937db0329f5a8eec"
  },
  {
    "url": "basic/operator/img/1111_1111_1111_1111_1111_1111_1111_1111.png",
    "revision": "8610b114ac684d837756124da4e0f9fd"
  },
  {
    "url": "basic/operator/index.html",
    "revision": "e58a4ab7ec5e417c88990ec602af6d6a"
  },
  {
    "url": "basic/other-parts/index.html",
    "revision": "b2bcb37b7df9726c14cb37025bcb431d"
  },
  {
    "url": "basic/prototype-object/img/object-prototype.png",
    "revision": "07ba5046df791f17c71d281c2859ab8a"
  },
  {
    "url": "basic/prototype-object/index.html",
    "revision": "128fabd92604cc3bf39a321e7bdb987f"
  },
  {
    "url": "basic/read-eval-print/img/syntax-error.png",
    "revision": "d9e59e92e4da54e931d757a2eb36ce49"
  },
  {
    "url": "basic/read-eval-print/img/web-console.png",
    "revision": "222968a41f4a7d9556e7973e4370e951"
  },
  {
    "url": "basic/read-eval-print/index.html",
    "revision": "444abeb1b12544687158e7f7f4f67867"
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
    "revision": "7d50205d20d7e1e053aa43abc75a157d"
  },
  {
    "url": "basic/string-unicode/img/codeunit-codepoint-table.png",
    "revision": "13a2b195b242923f47d13f9d96f990b5"
  },
  {
    "url": "basic/string-unicode/img/emoji-codeunit-codepoint-table.png",
    "revision": "38e8c437c28e8999e3f91b57c799cec8"
  },
  {
    "url": "basic/string-unicode/img/extenal-code-and-internal-code.png",
    "revision": "eb6d5284b77b72a8faa2bafa0c18ba14"
  },
  {
    "url": "basic/string-unicode/index.html",
    "revision": "c0798af756e2f8c7ba61329f4eb47135"
  },
  {
    "url": "basic/string/index.html",
    "revision": "8f18883eebf5b7123d44f2c594f309bb"
  },
  {
    "url": "basic/variables/index.html",
    "revision": "9f83a72c646378444d4666db468bd5cb"
  },
  {
    "url": "basic/wrapper-object/index.html",
    "revision": "0f3d60f9a7fecf478d1d6b6a821b3e53"
  },
  {
    "url": "cheatsheet/index.html",
    "revision": "8ad3e0521d3ec3f2f93b763147d97231"
  },
  {
    "url": "cheetsheet/index.html",
    "revision": "c6c30c5f139f5c4b78ec9d79ad31ef41"
  },
  {
    "url": "gitbook/@honkit/honkit-plugin-highlight/ebook.css",
    "revision": "3d93295839caaf68d26b9621f28d3496"
  },
  {
    "url": "gitbook/@honkit/honkit-plugin-highlight/website.css",
    "revision": "892263a29b30cef7bb2cd8d8d4f1077c"
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
    "url": "gitbook/gitbook-plugin-github-issue-feedback/plugin.js",
    "revision": "8e12063d49ae924cd3480aac1d58f7e9"
  },
  {
    "url": "gitbook/gitbook-plugin-js-console/console-ui.js",
    "revision": "e67751e79ef4d4871dfb02c0a16fa1b4"
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
    "revision": "7ff979f8751490c334033120090a7fdc"
  },
  {
    "url": "gitbook/honkit-plugin-sandpack/honkit-plugin-sandpack.js",
    "revision": "aa3c93647f123948292eeea1e3b7e577"
  },
  {
    "url": "gitbook/icons/amazon-icon.png",
    "revision": "c6f689c33b509e5718c2fd1e784b28d1"
  },
  {
    "url": "gitbook/icons/favicon.ico",
    "revision": "4724b6e29e34167169d6d9e14b8c853f"
  },
  {
    "url": "gitbook/icons/icon-128x128.png",
    "revision": "eb8a1189f94bf89f92c5e3e6b0b49964"
  },
  {
    "url": "gitbook/icons/icon-144x144.png",
    "revision": "931315b259e37675797d3f48f80fa744"
  },
  {
    "url": "gitbook/icons/icon-152x152.png",
    "revision": "496c3f17c9e129b65dbf0b9a615a414b"
  },
  {
    "url": "gitbook/icons/icon-192x192.png",
    "revision": "edf553155f2da0d9bfbf5d7491ab341b"
  },
  {
    "url": "gitbook/icons/icon-384x384.png",
    "revision": "1119408dc608cc71f41b03e295183d81"
  },
  {
    "url": "gitbook/icons/icon-512x512.png",
    "revision": "fd7a37b059ccac4d7256226883672bce"
  },
  {
    "url": "gitbook/icons/icon-72x72.png",
    "revision": "7e86e9ee5b06f968f7739f2dfdcd03b3"
  },
  {
    "url": "gitbook/icons/icon-96x96.png",
    "revision": "2f00a83804b18c401b2afd0977113c0a"
  },
  {
    "url": "gitbook/images/apple-touch-icon-precomposed-152.png",
    "revision": "496c3f17c9e129b65dbf0b9a615a414b"
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
    "revision": "6af95515c7c4ede24ce249780a2cffa8"
  },
  {
    "url": "index.html",
    "revision": "402dc1a007256c8fb172eb485b0c2f63"
  },
  {
    "url": "intro/authors/index.html",
    "revision": "25596bc4d9fdbd1b9305eb4b3cd7f7f2"
  },
  {
    "url": "intro/feedback/index.html",
    "revision": "f317235a038e625074033ee1ab3cd68f"
  },
  {
    "url": "intro/index.html",
    "revision": "857b0c9184cd37f6b3a6d82d34019797"
  },
  {
    "url": "intro/preparation/index.html",
    "revision": "bcab8c47f734414f8723b0f26bf0286d"
  },
  {
    "url": "landing/css/style.css",
    "revision": "30232f49621b4afedbd4e2d1f0db2d3d"
  },
  {
    "url": "landing/img/js-primer.png",
    "revision": "8822a90ec70b645fb5055c20169e1df8"
  },
  {
    "url": "landing/img/repo-actions-watch.png",
    "revision": "6a830497c7f617a570db7246e0701495"
  },
  {
    "url": "landing/index.html",
    "revision": "d07910b0a047423b21aade637cb7e75d"
  },
  {
    "url": "outro/index.html",
    "revision": "dcdbc716a9d45bcc7ee97ec0fe918562"
  },
  {
    "url": "use-case/ajaxapp/display/example/index.html",
    "revision": "d3966c68b57ff30ca7c7bd0960797fca"
  },
  {
    "url": "use-case/ajaxapp/display/img/fig-1.png",
    "revision": "58744761afe2ebe70c39ff2b4c61b5aa"
  },
  {
    "url": "use-case/ajaxapp/display/index.html",
    "revision": "d3253aa1cc28a652f22a0cf051b10e10"
  },
  {
    "url": "use-case/ajaxapp/entrypoint/example/index.html",
    "revision": "1763cb9bc16b6d860badb9583fef1f33"
  },
  {
    "url": "use-case/ajaxapp/entrypoint/img/fig-1.png",
    "revision": "c668039b6a80d3a7510d20385f101241"
  },
  {
    "url": "use-case/ajaxapp/entrypoint/index.html",
    "revision": "d470700438e14ee176ca254c8c9826b9"
  },
  {
    "url": "use-case/ajaxapp/http/example/index.html",
    "revision": "20ac665f8c423183077d0c9d96046394"
  },
  {
    "url": "use-case/ajaxapp/http/img/fig-1.png",
    "revision": "13663ef2f4142627e67847647642e6d9"
  },
  {
    "url": "use-case/ajaxapp/http/img/fig-2.png",
    "revision": "c87b78972104eb082f3d939ec4bc243c"
  },
  {
    "url": "use-case/ajaxapp/http/index.html",
    "revision": "a5be58ede357c1972117fe4271fd2c5a"
  },
  {
    "url": "use-case/ajaxapp/index.html",
    "revision": "a2becec09418ebd6da012bbf543bdbac"
  },
  {
    "url": "use-case/ajaxapp/promise/example/index.html",
    "revision": "8fabf08afa50f533922ee33519b1f5f8"
  },
  {
    "url": "use-case/ajaxapp/promise/img/fig-1.png",
    "revision": "7efcd647fa24ac88363650c7ab4275d0"
  },
  {
    "url": "use-case/ajaxapp/promise/index.html",
    "revision": "988a3a25d4bc5fa1777d7437a75e7e56"
  },
  {
    "url": "use-case/ajaxapp/src/index.html",
    "revision": "8fabf08afa50f533922ee33519b1f5f8"
  },
  {
    "url": "use-case/ajaxapp/xhr/index.html",
    "revision": "651fa8730a67aa297192718fa96949dd"
  },
  {
    "url": "use-case/index.html",
    "revision": "ad78aa646a3fec19df7514d6c0dea811"
  },
  {
    "url": "use-case/nodecli/argument-parse/index.html",
    "revision": "bf56dda4f547feabac506d191ff2bc8b"
  },
  {
    "url": "use-case/nodecli/helloworld/index.html",
    "revision": "48616019fd4c82490b5571fc7e80e1e1"
  },
  {
    "url": "use-case/nodecli/index.html",
    "revision": "e5c499fb129b7a131d9b3ec83f706f14"
  },
  {
    "url": "use-case/nodecli/md-to-html/index.html",
    "revision": "dce5cbdc3e31ea2a213c5e2ccbfa5fdd"
  },
  {
    "url": "use-case/nodecli/read-file/index.html",
    "revision": "30d3208e2a29c70889550d726af952ba"
  },
  {
    "url": "use-case/nodecli/refactor-and-unittest/index.html",
    "revision": "874f49363db35f744e76791873f57704"
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
    "revision": "4d271148cb7c5fb1c549467b1bff5a27"
  },
  {
    "url": "use-case/setup-local-env/index.html",
    "revision": "7741e66945ad503a3f42645864f98235"
  },
  {
    "url": "use-case/setup-local-env/src/index.html",
    "revision": "cc9229dc8c7ec9ed2001348c1deac7fb"
  },
  {
    "url": "use-case/todoapp/app-structure/img/todo-html.png",
    "revision": "14eae7c1436054c7fe83d337ecac7d88"
  },
  {
    "url": "use-case/todoapp/app-structure/index.html",
    "revision": "ba283af56a767ef5b24039dd5a43c35f"
  },
  {
    "url": "use-case/todoapp/app-structure/todo-html/index.html",
    "revision": "38180327a5c28512e55afb67b8b2b64b"
  },
  {
    "url": "use-case/todoapp/entrypoint/first-entry/index.html",
    "revision": "3f18bd00b8e93877290057512e8eaf32"
  },
  {
    "url": "use-case/todoapp/entrypoint/img/first-entry.png",
    "revision": "be5eabf9913f6285ec7f4e3d1283553c"
  },
  {
    "url": "use-case/todoapp/entrypoint/index.html",
    "revision": "62dbcc9003bf9d8f896d6447089782b5"
  },
  {
    "url": "use-case/todoapp/entrypoint/module-entry/index.html",
    "revision": "3f18bd00b8e93877290057512e8eaf32"
  },
  {
    "url": "use-case/todoapp/entrypoint/module-scope/index.html",
    "revision": "32cab3b2ed950ab156f898fc679177c2"
  },
  {
    "url": "use-case/todoapp/event-model/event-emitter/index.html",
    "revision": "afa24f6d77a10024dec52934ca94e96a"
  },
  {
    "url": "use-case/todoapp/event-model/index.html",
    "revision": "72ae7189c374346a17f58710a089b1ca"
  },
  {
    "url": "use-case/todoapp/final/create-view/index.html",
    "revision": "afa24f6d77a10024dec52934ca94e96a"
  },
  {
    "url": "use-case/todoapp/final/final/index.html",
    "revision": "511ed06efb3f56bc2075f939912ddab2"
  },
  {
    "url": "use-case/todoapp/final/index.html",
    "revision": "71ed3bf4afacac75246f72c573e7eedf"
  },
  {
    "url": "use-case/todoapp/final/more/index.html",
    "revision": "511ed06efb3f56bc2075f939912ddab2"
  },
  {
    "url": "use-case/todoapp/form-event/add-todo-item/index.html",
    "revision": "afa24f6d77a10024dec52934ca94e96a"
  },
  {
    "url": "use-case/todoapp/form-event/img/add-todo-item.png",
    "revision": "9a3d7acd2267a108699033d0c2f9dc95"
  },
  {
    "url": "use-case/todoapp/form-event/img/prevent-event.png",
    "revision": "7b94710d7d89d0541cb9a6ac98026a0a"
  },
  {
    "url": "use-case/todoapp/form-event/index.html",
    "revision": "2608ef32cda6e250a8ae1f59cad04d25"
  },
  {
    "url": "use-case/todoapp/form-event/prevent-event/index.html",
    "revision": "afa24f6d77a10024dec52934ca94e96a"
  },
  {
    "url": "use-case/todoapp/index.html",
    "revision": "326845a974e9d3647ec3492be3f0c8f5"
  },
  {
    "url": "use-case/todoapp/update-delete/add-checkbox/index.html",
    "revision": "afa24f6d77a10024dec52934ca94e96a"
  },
  {
    "url": "use-case/todoapp/update-delete/delete-feature/index.html",
    "revision": "afa24f6d77a10024dec52934ca94e96a"
  },
  {
    "url": "use-case/todoapp/update-delete/img/input-checkbox.png",
    "revision": "716159606c130aa3813f6e1644960159"
  },
  {
    "url": "use-case/todoapp/update-delete/index.html",
    "revision": "781e03387e4241609ceea6cd693f2e83"
  },
  {
    "url": "use-case/todoapp/update-delete/input-checkbox/index.html",
    "revision": "c2402ea91d6e2872bd260a2629b275ae"
  },
  {
    "url": "use-case/todoapp/update-delete/update-feature/index.html",
    "revision": "afa24f6d77a10024dec52934ca94e96a"
  }
]);
