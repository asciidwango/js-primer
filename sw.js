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
    "revision": "1e821653254a275760db95fc0a274ed6"
  },
  {
    "url": "basic/array/index.html",
    "revision": "bfd0bfebdf7d6c4acab5db7ef11fae7d"
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
    "revision": "9ddde3c46477d5d8c7e4f35f85d38d15"
  },
  {
    "url": "basic/class/index.html",
    "revision": "e6b446d41f0acdd800a7f93620444e92"
  },
  {
    "url": "basic/comments/index.html",
    "revision": "dfb642e5992e610bf85be56d85c5cf79"
  },
  {
    "url": "basic/condition/index.html",
    "revision": "ed33e70b6e0eb803e5b2d6952a2725ba"
  },
  {
    "url": "basic/data-type/index.html",
    "revision": "79fa755777f34f5af3505ff5063a4ee8"
  },
  {
    "url": "basic/date/index.html",
    "revision": "dcc2b8436fa5362ac0b0f1dfcdd54683"
  },
  {
    "url": "basic/ecmascript/index.html",
    "revision": "40b20fffde91b1665686a260fd38d21a"
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
    "revision": "0f90a1491f76c2d6973a49cf322b17ec"
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
    "revision": "3721d245bb55ef581b6b36ff4fca2798"
  },
  {
    "url": "basic/function-scope/index.html",
    "revision": "1bcbf37b3956762a780c8658fde3b11d"
  },
  {
    "url": "basic/function-this/index.html",
    "revision": "7baa5dfe31e16131e857e8899170684b"
  },
  {
    "url": "basic/implicit-coercion/img/JavaScript-Equality-Table.png",
    "revision": "249e75cfe1f22458bfa9fe71480a6c0d"
  },
  {
    "url": "basic/implicit-coercion/index.html",
    "revision": "db5c7d3d600b4016f1abbea4201e1168"
  },
  {
    "url": "basic/index.html",
    "revision": "2807ef3832c8fe8ae7fbe5f8fad22e10"
  },
  {
    "url": "basic/introduction/img/javascript-ecmascript.png",
    "revision": "40a83bcf5b26783fc68b7caeb792d36d"
  },
  {
    "url": "basic/introduction/index.html",
    "revision": "9a76fe1e5de0fe8407180b17e4ccd176"
  },
  {
    "url": "basic/json/index.html",
    "revision": "31d765c28458fc8f4df2bdfc423eac7f"
  },
  {
    "url": "basic/loop/index.html",
    "revision": "e5f24cb9419a896f30bef389b709fcf0"
  },
  {
    "url": "basic/loop/public/index.html",
    "revision": "226c5a5e385446f7b048d1b990a8f603"
  },
  {
    "url": "basic/map-and-set/index.html",
    "revision": "1aa9b85809496e3e8b618f4b42f919c1"
  },
  {
    "url": "basic/math/index.html",
    "revision": "7137630f8237e04974c9742d9bdea6c5"
  },
  {
    "url": "basic/module/index.html",
    "revision": "eb52dbd05ae8492171f16d00dc4842c8"
  },
  {
    "url": "basic/object/index.html",
    "revision": "0294af59a3c1c683ae888e8896232ba9"
  },
  {
    "url": "basic/operator/img/0000_0000_0000_0000_0000_0000_0000_0001.png",
    "revision": "580d8149815fb30e1eb1212a5b71dcad"
  },
  {
    "url": "basic/operator/img/1111_1111_1111_1111_1111_1111_1111_1111.png",
    "revision": "8610b114ac684d837756124da4e0f9fd"
  },
  {
    "url": "basic/operator/index.html",
    "revision": "43d19d70ef9f2eb40c1b9598369aa06a"
  },
  {
    "url": "basic/other-parts/index.html",
    "revision": "f781bafd134edd42dc6edc96dc876dcb"
  },
  {
    "url": "basic/prototype-object/img/object-prototype.png",
    "revision": "6bbe9c151a73ec89ed45606a0b42975f"
  },
  {
    "url": "basic/prototype-object/index.html",
    "revision": "c557af8cbaa28cdbbdbf8dfc47135c6b"
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
    "revision": "114dac24866f9bd6260bdb86d1a7e433"
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
    "revision": "83afe7e33d08815bc463c05a30bd75da"
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
    "revision": "352e38a4bd6573d7bb31de19ce30dad4"
  },
  {
    "url": "basic/string/index.html",
    "revision": "bebb18999f2a132b3da4f710cc85aa01"
  },
  {
    "url": "basic/variables/index.html",
    "revision": "82e47acb5110dff4be066d34aef60d24"
  },
  {
    "url": "basic/wrapper-object/index.html",
    "revision": "6daf9d89d160ba4a0d160be23e633c59"
  },
  {
    "url": "cheatsheet/index.html",
    "revision": "fe6b963f1647b89050a7246b296995f1"
  },
  {
    "url": "cheetsheet/index.html",
    "revision": "c6c30c5f139f5c4b78ec9d79ad31ef41"
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
    "revision": "49282fd7a65a9a3e6eb6021e333bdab7"
  },
  {
    "url": "gitbook/gitbook-plugin-highlight/website.css",
    "revision": "637413aed3ac91940e57d22879ed68c2"
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
    "revision": "4a8f3557c204c095df7ffe4a82def73b"
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
    "revision": "ab0cd99cd2cda741ec6ed845dca3b1f2"
  },
  {
    "url": "index.html",
    "revision": "c6092deb940456b92a438151d1a88aaa"
  },
  {
    "url": "intro/authors/index.html",
    "revision": "c5903dd1c155c3d265e4e0042ce56317"
  },
  {
    "url": "intro/feedback/index.html",
    "revision": "2ad4bee90f908cb5f646c8a8facbc593"
  },
  {
    "url": "intro/index.html",
    "revision": "9d158b6d7444e5d1794a63795b9a22d6"
  },
  {
    "url": "intro/preparation/index.html",
    "revision": "e4ba3e789619399c84274237be04e482"
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
    "revision": "d07910b0a047423b21aade637cb7e75d"
  },
  {
    "url": "outro/index.html",
    "revision": "c92f0db7e1baab364706025767eb6e4c"
  },
  {
    "url": "use-case/ajaxapp/display/img/fig-1.png",
    "revision": "15072f06aa7fd4d5fbce148bc2db975f"
  },
  {
    "url": "use-case/ajaxapp/display/index.html",
    "revision": "151dade5713e763e6636702c866e5d01"
  },
  {
    "url": "use-case/ajaxapp/display/src/index.html",
    "revision": "d3966c68b57ff30ca7c7bd0960797fca"
  },
  {
    "url": "use-case/ajaxapp/entrypoint/img/fig-1.png",
    "revision": "eaa77b26666e9db49bc6cc41b21ae8fe"
  },
  {
    "url": "use-case/ajaxapp/entrypoint/index.html",
    "revision": "a6a0eec09157c99f0cbd36bc8741e892"
  },
  {
    "url": "use-case/ajaxapp/entrypoint/src/index.html",
    "revision": "1763cb9bc16b6d860badb9583fef1f33"
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
    "revision": "59d9510c3c6d5ee407d6b431641aa1f9"
  },
  {
    "url": "use-case/ajaxapp/http/src/index.html",
    "revision": "20ac665f8c423183077d0c9d96046394"
  },
  {
    "url": "use-case/ajaxapp/index.html",
    "revision": "c1ebb5aad4ceeaf48807ec0fb14cf746"
  },
  {
    "url": "use-case/ajaxapp/promise/img/fig-1.png",
    "revision": "0c29e65b2be0ef42cd63ab8c3166a5ad"
  },
  {
    "url": "use-case/ajaxapp/promise/index.html",
    "revision": "01ffafa89ea53c9877df0162daee57ed"
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
    "revision": "8d2bf1988190c66c629907634e33da40"
  },
  {
    "url": "use-case/nodecli/argument-parse/index.html",
    "revision": "6bba244a3a8ba5f66854cb9b61d812a4"
  },
  {
    "url": "use-case/nodecli/helloworld/index.html",
    "revision": "4a6c6385b878c20a149e02a8732e0b50"
  },
  {
    "url": "use-case/nodecli/index.html",
    "revision": "5143b8265d843e6a166f7b41efd00583"
  },
  {
    "url": "use-case/nodecli/md-to-html/index.html",
    "revision": "d9ad02d823f2af2f255b8b6b00c25307"
  },
  {
    "url": "use-case/nodecli/read-file/index.html",
    "revision": "cadc0978660d5c1e50c7030e01c5c0e7"
  },
  {
    "url": "use-case/nodecli/refactor-and-unittest/index.html",
    "revision": "12e93eae2aed20706a70d171bd838e98"
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
    "revision": "f2384def4bf18b5565f2efdf7a849a7a"
  },
  {
    "url": "use-case/setup-local-env/src/index.html",
    "revision": "cc9229dc8c7ec9ed2001348c1deac7fb"
  },
  {
    "url": "use-case/todoapp/app-structure/img/todo-html.png",
    "revision": "1fb6dcbbdbfdd704327d60aa4e5d3e7c"
  },
  {
    "url": "use-case/todoapp/app-structure/index.html",
    "revision": "02f448f1653627f5b6163d3e62cd7fad"
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
    "revision": "c8755a0b82958a80a0d96cb7890253ed"
  },
  {
    "url": "use-case/todoapp/entrypoint/index.html",
    "revision": "8eb365cc353d8c8c3bb334e37a7839f6"
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
    "revision": "7f23f38bbbacf8a3e95e763c82a39bb3"
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
    "revision": "72a296629fd48d24e8918915002434f3"
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
    "revision": "77312d7b2c9b7a21e1cda1a06727ed57"
  },
  {
    "url": "use-case/todoapp/form-event/img/prevent-event.png",
    "revision": "217030daba4269a6bfb200f2e5e8ad34"
  },
  {
    "url": "use-case/todoapp/form-event/index.html",
    "revision": "beedf573d904b81b50ed980d43eb51f2"
  },
  {
    "url": "use-case/todoapp/form-event/prevent-event/index.html",
    "revision": "afa24f6d77a10024dec52934ca94e96a"
  },
  {
    "url": "use-case/todoapp/index.html",
    "revision": "93b44d8d1f6819f47212bea24a79206a"
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
    "revision": "44920eba3f5737a49e9cc4c0893c44dd"
  },
  {
    "url": "use-case/todoapp/update-delete/index.html",
    "revision": "038df6c157e6cff543e574c9525e6e96"
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
