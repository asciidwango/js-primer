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
    "revision": "9621908ac0ce0eef7384b8faa13ef28d"
  },
  {
    "url": "basic/array/index.html",
    "revision": "2f6e861b13b08d446442493e8db81c1e"
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
    "revision": "a295d4a4b7de4d3791d4be85f5e66e79"
  },
  {
    "url": "basic/class/index.html",
    "revision": "01b5e114454129283aed7aaef27ae60b"
  },
  {
    "url": "basic/comments/index.html",
    "revision": "5996d9091d2af5da173909586737f813"
  },
  {
    "url": "basic/condition/index.html",
    "revision": "a97fc7c58260e02a954ce77f193153d1"
  },
  {
    "url": "basic/data-type/index.html",
    "revision": "0c5b55ff478a73556cc603b16ec5f73e"
  },
  {
    "url": "basic/date/index.html",
    "revision": "a0e2062a7d4bcbe62a33f27fe4a1ca03"
  },
  {
    "url": "basic/ecmascript/index.html",
    "revision": "dfc654f03858ca353028e3444c356dfd"
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
    "revision": "4ae7761bf167f0005c77796984b8e19e"
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
    "revision": "cfcc0b2141dd0a8b6ea65308089baacb"
  },
  {
    "url": "basic/function-scope/index.html",
    "revision": "fe002967c995f26920d52ddd642489d2"
  },
  {
    "url": "basic/function-this/index.html",
    "revision": "7c53aa91757d6b5982f4e98a27bb3b57"
  },
  {
    "url": "basic/implicit-coercion/img/JavaScript-Equality-Table.png",
    "revision": "249e75cfe1f22458bfa9fe71480a6c0d"
  },
  {
    "url": "basic/implicit-coercion/index.html",
    "revision": "447927c15a9a1ff111333524216c49ac"
  },
  {
    "url": "basic/index.html",
    "revision": "954c6226242d840efefe6a2a6e23f2eb"
  },
  {
    "url": "basic/introduction/img/javascript-ecmascript.png",
    "revision": "40a83bcf5b26783fc68b7caeb792d36d"
  },
  {
    "url": "basic/introduction/index.html",
    "revision": "83d97e49131fbf111fade8f047696830"
  },
  {
    "url": "basic/json/index.html",
    "revision": "3b5325cc6e475b4adeda5f1d9b7bd76b"
  },
  {
    "url": "basic/loop/index.html",
    "revision": "24f8dde7f19c5e54e0dd89d7f7aa6f05"
  },
  {
    "url": "basic/loop/public/index.html",
    "revision": "226c5a5e385446f7b048d1b990a8f603"
  },
  {
    "url": "basic/map-and-set/index.html",
    "revision": "2c4c6fae77f5ce21ee886bf6276bb251"
  },
  {
    "url": "basic/math/index.html",
    "revision": "7ec2b4c7cd5e13f32ea36b1b8285c145"
  },
  {
    "url": "basic/module/index.html",
    "revision": "ba40051259a90628146927baf4065cb9"
  },
  {
    "url": "basic/object/index.html",
    "revision": "b4a593b968a1855c3060c9d82118c9e8"
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
    "revision": "117ce4f4ad5bbd9d5340d30cd6521f38"
  },
  {
    "url": "basic/other-parts/index.html",
    "revision": "7ba2e89abaa7911a5150c64456150bb7"
  },
  {
    "url": "basic/prototype-object/img/object-prototype.png",
    "revision": "6bbe9c151a73ec89ed45606a0b42975f"
  },
  {
    "url": "basic/prototype-object/index.html",
    "revision": "1e18e2ac498d8bfa048f086002722d41"
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
    "revision": "3eae0ab43cad26f25aa97adcf4daecad"
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
    "revision": "d448c7971a5eb56de94ba638b53663ad"
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
    "revision": "66b8b1c62ab76289fb32e91a0e6f18f1"
  },
  {
    "url": "basic/string/index.html",
    "revision": "9039c2cdb0c4980b759cb8067fcbb586"
  },
  {
    "url": "basic/variables/index.html",
    "revision": "98a8c59c0eb25e27f08023c2e0b60342"
  },
  {
    "url": "basic/wrapper-object/index.html",
    "revision": "1e94d64ba12b81989ff46753408df1b2"
  },
  {
    "url": "cheatsheet/index.html",
    "revision": "5b737404e7f761d8356fb989db1d865a"
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
    "revision": "c8f7950873243cdd4c607450ec34ef06"
  },
  {
    "url": "intro/authors/index.html",
    "revision": "17f23c19eb3eb376ecf0562dfb3f23e0"
  },
  {
    "url": "intro/feedback/index.html",
    "revision": "8fe7bdc31b4f5725f3c2345ab5e27f5d"
  },
  {
    "url": "intro/index.html",
    "revision": "01fa03978d3119c57647b223995a4b42"
  },
  {
    "url": "intro/preparation/index.html",
    "revision": "f8562b438b587b74e4f7df54ad86de24"
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
    "revision": "a49e6a67dec99d3a04aac2d7a26cec9a"
  },
  {
    "url": "use-case/ajaxapp/display/img/fig-1.png",
    "revision": "15072f06aa7fd4d5fbce148bc2db975f"
  },
  {
    "url": "use-case/ajaxapp/display/index.html",
    "revision": "4cce5c90bebfa48cc89e7f912609b4a4"
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
    "revision": "03a5fa7eba05bab4c6120bf4060d9eaa"
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
    "revision": "ac0a258148d2b1ad4665d312c9ab8ed9"
  },
  {
    "url": "use-case/ajaxapp/http/src/index.html",
    "revision": "20ac665f8c423183077d0c9d96046394"
  },
  {
    "url": "use-case/ajaxapp/index.html",
    "revision": "b3d12710a73dd36174a7ab4e5ab65311"
  },
  {
    "url": "use-case/ajaxapp/promise/img/fig-1.png",
    "revision": "0c29e65b2be0ef42cd63ab8c3166a5ad"
  },
  {
    "url": "use-case/ajaxapp/promise/index.html",
    "revision": "0a406ed095a2ba7cc034a15e3ab35779"
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
    "revision": "fa258c4e027bfb2bbfe8242eb86b107e"
  },
  {
    "url": "use-case/nodecli/argument-parse/index.html",
    "revision": "c04e46ddf33db440b0e40e65fd25a48d"
  },
  {
    "url": "use-case/nodecli/helloworld/index.html",
    "revision": "f80d286e4f75494e74dc6eae82a5f962"
  },
  {
    "url": "use-case/nodecli/index.html",
    "revision": "a30332964322a63b9e6ad927be97db3e"
  },
  {
    "url": "use-case/nodecli/md-to-html/index.html",
    "revision": "d34a5a5ff815f53efda1c02c803c87ab"
  },
  {
    "url": "use-case/nodecli/read-file/index.html",
    "revision": "163e13fd66dd13760246bdbfd1d86758"
  },
  {
    "url": "use-case/nodecli/refactor-and-unittest/index.html",
    "revision": "953972134d70445fb16962d856b52ed4"
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
    "revision": "3ae0cddf1225c9e3925aa0f0f9b6b3db"
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
    "revision": "476e9905f84aec15b51e09e3ccb079fc"
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
    "revision": "3511e3ab2e21153e1f1032e2e585eab3"
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
    "revision": "772b3e1ff7f7d14e1ffe4b86edb48cbf"
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
    "revision": "85b77c864a9640087a73f95880cb62d0"
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
    "revision": "bacc8451741454bc5af1b1da2cac6e21"
  },
  {
    "url": "use-case/todoapp/form-event/prevent-event/index.html",
    "revision": "afa24f6d77a10024dec52934ca94e96a"
  },
  {
    "url": "use-case/todoapp/index.html",
    "revision": "81ba2c4d636063ebe34432a77853d83f"
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
    "revision": "269f7c160fcea28fa355c0923a868e37"
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
