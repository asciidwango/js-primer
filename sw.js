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
    "revision": "d6251be76700949401bd351a88cf1c8b"
  },
  {
    "url": "basic/array/index.html",
    "revision": "011b48fbbcd79696566048a3b23af344"
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
    "revision": "0dcae67187fbafc303e87608a405d941"
  },
  {
    "url": "basic/class/index.html",
    "revision": "75469e938b2ba8cf081c44d3ad3015bc"
  },
  {
    "url": "basic/comments/index.html",
    "revision": "1c81adb6c6354826607abab4406eb664"
  },
  {
    "url": "basic/condition/index.html",
    "revision": "4202e0bcdc81e3a221fc9cc28785ac72"
  },
  {
    "url": "basic/data-type/index.html",
    "revision": "039e5b1fd8df8e34432d5ae2a15ce42c"
  },
  {
    "url": "basic/date/index.html",
    "revision": "bb957035ea7d4c51be0fcc925a5a18cc"
  },
  {
    "url": "basic/ecmascript/index.html",
    "revision": "3f283ed820d648bb2fb1d606f0603733"
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
    "revision": "6eecef3156fe97027176fbaf82132dff"
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
    "revision": "ec8ab37150b5b2ccc92d588452c18686"
  },
  {
    "url": "basic/function-scope/index.html",
    "revision": "906c874246ac294581e6d76ad58b472f"
  },
  {
    "url": "basic/function-this/index.html",
    "revision": "8130eaf05780e4d8ac44c586135938c8"
  },
  {
    "url": "basic/implicit-coercion/img/JavaScript-Equality-Table.png",
    "revision": "2858951a885713a1786e9ce3ee1908a5"
  },
  {
    "url": "basic/implicit-coercion/index.html",
    "revision": "983b08d331f794c278e2999a24a23864"
  },
  {
    "url": "basic/index.html",
    "revision": "049ed3d3e67a0aa6661737f9a211232c"
  },
  {
    "url": "basic/introduction/img/javascript-ecmascript.png",
    "revision": "d1dd8f9b6e0e41d518e0c4114849b275"
  },
  {
    "url": "basic/introduction/index.html",
    "revision": "010ee3333bb6c0934307f8e0c811142a"
  },
  {
    "url": "basic/json/index.html",
    "revision": "4c02a90e5761dccdfdc3e475d9f62695"
  },
  {
    "url": "basic/loop/index.html",
    "revision": "7f01fa7de74165570cfd3e75edddb273"
  },
  {
    "url": "basic/loop/public/index.html",
    "revision": "226c5a5e385446f7b048d1b990a8f603"
  },
  {
    "url": "basic/map-and-set/index.html",
    "revision": "c0b6df7c9aa7dd9d340292d0a52e3629"
  },
  {
    "url": "basic/math/index.html",
    "revision": "d8e1bc2dd06be171c6b336f933124a86"
  },
  {
    "url": "basic/module/index.html",
    "revision": "d14ab14c2ce46a1a1b1c8e7e47485f84"
  },
  {
    "url": "basic/object/index.html",
    "revision": "fb82c219f33c980571df7ccd0e43da16"
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
    "revision": "b21df7b64afa04d7ce7e70e7f212951c"
  },
  {
    "url": "basic/other-parts/index.html",
    "revision": "5adc1eab26757d2ba72ae06690e23b52"
  },
  {
    "url": "basic/prototype-object/img/object-prototype.png",
    "revision": "07ba5046df791f17c71d281c2859ab8a"
  },
  {
    "url": "basic/prototype-object/index.html",
    "revision": "a686aca12787ae2eca5e2570625fd266"
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
    "revision": "a10f35c9e9797332d7e33881c6d84dca"
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
    "revision": "f1d8c9e235a1c10e4103578cad1315a4"
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
    "revision": "ca89e434c1478915b5b1a91eb2bb97c0"
  },
  {
    "url": "basic/string/index.html",
    "revision": "133793b223b6974c29b0584c2de4e9ee"
  },
  {
    "url": "basic/variables/index.html",
    "revision": "db1c406dfb72e0c9ed4280521bba9c01"
  },
  {
    "url": "basic/wrapper-object/index.html",
    "revision": "1264d6575cfcf88ff75ce4edf023b2cc"
  },
  {
    "url": "cheatsheet/index.html",
    "revision": "c3c64dcb9f95dd09f59fbb1f33faa579"
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
    "url": "gitbook/gitbook-plugin-ga/plugin.js",
    "revision": "8b0d0bfffa07cfd2675fffb1b7b6e6f4"
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
    "revision": "5cb7c7d98a6c9f87b41d072663890366"
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
    "revision": "a2af781cc145503f46e13f8fa2e8323c"
  },
  {
    "url": "intro/authors/index.html",
    "revision": "43e48eb2970b690baf5fd78559213e62"
  },
  {
    "url": "intro/feedback/index.html",
    "revision": "a97bf4cb32dc52ba0a34d0f038a384ca"
  },
  {
    "url": "intro/index.html",
    "revision": "1aed592865a709c13da76382536def39"
  },
  {
    "url": "intro/preparation/index.html",
    "revision": "a6e50539c4ef109e3a017967cc7ca290"
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
    "revision": "8a4a8e30d23e4793db014983c0d36d75"
  },
  {
    "url": "use-case/ajaxapp/display/img/fig-1.png",
    "revision": "58744761afe2ebe70c39ff2b4c61b5aa"
  },
  {
    "url": "use-case/ajaxapp/display/index.html",
    "revision": "9b1a44c42b804b709d4a8c42fd3d363f"
  },
  {
    "url": "use-case/ajaxapp/display/src/index.html",
    "revision": "d3966c68b57ff30ca7c7bd0960797fca"
  },
  {
    "url": "use-case/ajaxapp/entrypoint/img/fig-1.png",
    "revision": "c668039b6a80d3a7510d20385f101241"
  },
  {
    "url": "use-case/ajaxapp/entrypoint/index.html",
    "revision": "f3289b5206746209b5dd03a3da3baede"
  },
  {
    "url": "use-case/ajaxapp/entrypoint/src/index.html",
    "revision": "1763cb9bc16b6d860badb9583fef1f33"
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
    "revision": "372b1f79cd980a368826fb25d06db96a"
  },
  {
    "url": "use-case/ajaxapp/http/src/index.html",
    "revision": "20ac665f8c423183077d0c9d96046394"
  },
  {
    "url": "use-case/ajaxapp/index.html",
    "revision": "af13992f20cb58b47860855f5d0ebdfa"
  },
  {
    "url": "use-case/ajaxapp/promise/img/fig-1.png",
    "revision": "7efcd647fa24ac88363650c7ab4275d0"
  },
  {
    "url": "use-case/ajaxapp/promise/index.html",
    "revision": "5581a6503e92dc6ea6e89274488f58af"
  },
  {
    "url": "use-case/ajaxapp/promise/src/index.html",
    "revision": "8fabf08afa50f533922ee33519b1f5f8"
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
    "revision": "579e87b5d581196a4666fc26c9e176aa"
  },
  {
    "url": "use-case/nodecli/argument-parse/index.html",
    "revision": "5156838d3f96ecc343ab225b6fafb6ae"
  },
  {
    "url": "use-case/nodecli/helloworld/index.html",
    "revision": "99947cab7d435c5f17eb04e8ee3a8365"
  },
  {
    "url": "use-case/nodecli/index.html",
    "revision": "22d0d32ca3e1b7908cb1c5ca564c3b87"
  },
  {
    "url": "use-case/nodecli/md-to-html/index.html",
    "revision": "95fbdc8cfb3d31298b9bc7d54af0b3e2"
  },
  {
    "url": "use-case/nodecli/read-file/index.html",
    "revision": "2b668abb8e0a16e6e748b60a8674710b"
  },
  {
    "url": "use-case/nodecli/refactor-and-unittest/index.html",
    "revision": "3b04a0045ade361888aafe329f5665e1"
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
    "revision": "59d75529db8acffd083462b239c5ee61"
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
    "revision": "1fa7977128e0f276d6013d95a832a186"
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
    "revision": "8d699522e15510008bedc54eb2e1d2ea"
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
    "revision": "bbd7e9ead636ad41758d3995a499e8c6"
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
    "revision": "7e8f8de40b934a816a38b19ba7316a61"
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
    "revision": "08b4b9de5fecb8d5f0b29a8f8b769c43"
  },
  {
    "url": "use-case/todoapp/form-event/prevent-event/index.html",
    "revision": "afa24f6d77a10024dec52934ca94e96a"
  },
  {
    "url": "use-case/todoapp/index.html",
    "revision": "488410ab115017b1634a5ab1997538bc"
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
    "revision": "9cbce0044c3bd6fef257a88379e7928c"
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
