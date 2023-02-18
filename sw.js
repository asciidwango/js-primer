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
    "revision": "6e2e43e7f39206022a3802676d1ccd6c"
  },
  {
    "url": "basic/array/index.html",
    "revision": "429818c667efe138994790767a086d21"
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
    "revision": "43c5398580d03711d47d8cf531bc1bde"
  },
  {
    "url": "basic/class/index.html",
    "revision": "f85ad149b1c053f3108759b574660ad3"
  },
  {
    "url": "basic/comments/index.html",
    "revision": "781a8aff0da78593446e9de865ce6f61"
  },
  {
    "url": "basic/condition/index.html",
    "revision": "ef76937b75594ef6ac157f12e996efbe"
  },
  {
    "url": "basic/data-type/index.html",
    "revision": "9d67095d8e67b5610e986b90ced68e0a"
  },
  {
    "url": "basic/date/index.html",
    "revision": "695e4e0ccda8df332a6b0019967032b3"
  },
  {
    "url": "basic/ecmascript/index.html",
    "revision": "956c6a66cc34f2efa3b0e27429989762"
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
    "revision": "dc700d9333776f96033e5341ec9ade1e"
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
    "revision": "33c9d72f4c02bba615cbbbaae4aff069"
  },
  {
    "url": "basic/function-scope/index.html",
    "revision": "d4df644598e79f9e7b15ab5609269e9e"
  },
  {
    "url": "basic/function-this/index.html",
    "revision": "a6c51c138448ec177d213d7f7798defe"
  },
  {
    "url": "basic/implicit-coercion/img/JavaScript-Equality-Table.png",
    "revision": "2858951a885713a1786e9ce3ee1908a5"
  },
  {
    "url": "basic/implicit-coercion/index.html",
    "revision": "c3a7ad52552bcbc345a4b0efe0554701"
  },
  {
    "url": "basic/index.html",
    "revision": "e68188725b0ba4f2cc30e2fae76cee0e"
  },
  {
    "url": "basic/introduction/img/javascript-ecmascript.png",
    "revision": "d1dd8f9b6e0e41d518e0c4114849b275"
  },
  {
    "url": "basic/introduction/index.html",
    "revision": "7ca5417e07748871dfa98acb7d3b5c4c"
  },
  {
    "url": "basic/json/index.html",
    "revision": "7201a18cad3db4ff3d0da106fb628a21"
  },
  {
    "url": "basic/loop/index.html",
    "revision": "e592885361105200cdb03aec6657d346"
  },
  {
    "url": "basic/loop/public/index.html",
    "revision": "226c5a5e385446f7b048d1b990a8f603"
  },
  {
    "url": "basic/map-and-set/index.html",
    "revision": "e2e996c528fc98354b4d19bd6a2b527e"
  },
  {
    "url": "basic/math/index.html",
    "revision": "664c124231a21188c4b138c1749a661c"
  },
  {
    "url": "basic/module/index.html",
    "revision": "b93d191483be6e55d89136056c8de458"
  },
  {
    "url": "basic/object/index.html",
    "revision": "8a44773513d72005b3222b585e4b6d77"
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
    "revision": "c5b582d572f942c57c07465d45cec623"
  },
  {
    "url": "basic/other-parts/index.html",
    "revision": "439d6f9bd86f74212efaef38f23c856f"
  },
  {
    "url": "basic/prototype-object/img/object-prototype.png",
    "revision": "07ba5046df791f17c71d281c2859ab8a"
  },
  {
    "url": "basic/prototype-object/index.html",
    "revision": "4e0f31ca97aa2c665022ec4d6c0853dd"
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
    "revision": "fc8e95a189c1e4cc8e9c06b7767de77a"
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
    "revision": "627b155a47b522ee4b7949e330ac3df7"
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
    "revision": "fbcc9a7100666675d09eedd7ed50a242"
  },
  {
    "url": "basic/string/index.html",
    "revision": "faca5037a52d847b1ef7face4d32a21f"
  },
  {
    "url": "basic/variables/index.html",
    "revision": "453f207d6fbe139fa5c44df474ada55b"
  },
  {
    "url": "basic/wrapper-object/index.html",
    "revision": "aee0c84de9fab65c7e2140cc81fff220"
  },
  {
    "url": "cheatsheet/index.html",
    "revision": "91c4e1608ed9199ae7e2e187c157e68a"
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
    "revision": "b6a60383e5c4a1eee75ff2c634b26d70"
  },
  {
    "url": "intro/authors/index.html",
    "revision": "794c98325801d0096d7d901462f6c90c"
  },
  {
    "url": "intro/feedback/index.html",
    "revision": "3d785189092f1886dc0aefdb32584d19"
  },
  {
    "url": "intro/index.html",
    "revision": "d1333029d212140adffc6021fab51d81"
  },
  {
    "url": "intro/preparation/index.html",
    "revision": "dd1616f4ed7277437c6b2baa8ac83b18"
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
    "revision": "931566e3e6d41bb0c8587dbfe9add1fe"
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
    "revision": "8fc1e1eeccadb05fabd2410d710d2ce8"
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
    "revision": "7e084670452ff295f419244cc1d9b4ab"
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
    "revision": "9f36327bd3caba0da7387f4405f04753"
  },
  {
    "url": "use-case/ajaxapp/index.html",
    "revision": "e93a7326ea646711121a6e6b4d55533d"
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
    "revision": "b62f8cb8e5b04ca0aa8edc7b0e6a1d6e"
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
    "revision": "c2996e1a344d730881029b234a0835cb"
  },
  {
    "url": "use-case/nodecli/argument-parse/index.html",
    "revision": "71a0c916e9236b770298d1bd1de65bc2"
  },
  {
    "url": "use-case/nodecli/helloworld/index.html",
    "revision": "05935d3e34de26efe9dbce82b3993648"
  },
  {
    "url": "use-case/nodecli/index.html",
    "revision": "e3c1f2d1d597b4eb3558706bf6d60d5b"
  },
  {
    "url": "use-case/nodecli/md-to-html/index.html",
    "revision": "6c7b140afe79884eb526d95d3ac9d993"
  },
  {
    "url": "use-case/nodecli/read-file/index.html",
    "revision": "a67d757fb0f472de0a4e82c8c64aea01"
  },
  {
    "url": "use-case/nodecli/refactor-and-unittest/index.html",
    "revision": "c8e2ede260067731555f90d9cbd4b268"
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
    "revision": "bbf481109dfdcb4104ec0f40435a912c"
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
    "revision": "5b403ad4e2b64a7e6c47562f7e9e3cfe"
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
    "revision": "f92cdc72dd08e5a7e419efbc9a01e556"
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
    "revision": "4f852ac0f22059f16fec7d289b7727ea"
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
    "revision": "1a376402aa5be88d5677a2b93df74090"
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
    "revision": "e9ffa88e2c3c0b9dfb924c3ee946892a"
  },
  {
    "url": "use-case/todoapp/form-event/prevent-event/index.html",
    "revision": "afa24f6d77a10024dec52934ca94e96a"
  },
  {
    "url": "use-case/todoapp/index.html",
    "revision": "c31d5dcb5e9d60652276062bb49a4484"
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
    "revision": "71bafc1b6e8b1fde4953fade4a5449d0"
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
