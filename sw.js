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
    "revision": "6b9241b5dca0a3c64695d2fb3bbe75b5"
  },
  {
    "url": "basic/array/index.html",
    "revision": "be2d90e49616062213dbaa470bf3db4e"
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
    "revision": "132cc9891a60c6a8b84289108bc92606"
  },
  {
    "url": "basic/class/index.html",
    "revision": "ea459ed16ff2e3ae79f4ff3d3f5008ab"
  },
  {
    "url": "basic/comments/index.html",
    "revision": "37581c1fd83d5c438ac7a6087677d6fc"
  },
  {
    "url": "basic/condition/index.html",
    "revision": "684590e52aee8f803b9f10f5b23965c5"
  },
  {
    "url": "basic/data-type/index.html",
    "revision": "4769ef0732abb91f1e667f5596df5b2e"
  },
  {
    "url": "basic/date/index.html",
    "revision": "52d1b25143260bac1859a22b107545dc"
  },
  {
    "url": "basic/ecmascript/index.html",
    "revision": "33be8c64def4b71ba8c5a64e78e00479"
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
    "revision": "2a4e1b9c19de3cc372bc70c513b7e163"
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
    "revision": "98edcc3ac00bae04217e45fd2d672547"
  },
  {
    "url": "basic/function-scope/index.html",
    "revision": "975b5e2ec45df2d43de9c4685c4adbb8"
  },
  {
    "url": "basic/function-this/index.html",
    "revision": "5a03a865a17edf7ca41b6bf842a52a19"
  },
  {
    "url": "basic/implicit-coercion/img/JavaScript-Equality-Table.png",
    "revision": "249e75cfe1f22458bfa9fe71480a6c0d"
  },
  {
    "url": "basic/implicit-coercion/index.html",
    "revision": "88451d1b9a88762c46d50f2e22dda9e6"
  },
  {
    "url": "basic/index.html",
    "revision": "021086a14595801411d0b2e4a746e016"
  },
  {
    "url": "basic/introduction/img/javascript-ecmascript.png",
    "revision": "40a83bcf5b26783fc68b7caeb792d36d"
  },
  {
    "url": "basic/introduction/index.html",
    "revision": "0668eb39a248fdc2b6255a8f6a0febd4"
  },
  {
    "url": "basic/json/index.html",
    "revision": "eca349a2b7f32b062108a6367453ee77"
  },
  {
    "url": "basic/loop/index.html",
    "revision": "1be5a4d9b771fa2ec048ec53add1ebb9"
  },
  {
    "url": "basic/loop/public/index.html",
    "revision": "226c5a5e385446f7b048d1b990a8f603"
  },
  {
    "url": "basic/map-and-set/index.html",
    "revision": "529becbf44a32712b2e8d4a342792ae5"
  },
  {
    "url": "basic/math/index.html",
    "revision": "168757fd6451ec266ac15cf25d72a42a"
  },
  {
    "url": "basic/module/index.html",
    "revision": "5bb26d06f67a2c5d29d0d58daed86a45"
  },
  {
    "url": "basic/object/index.html",
    "revision": "b48e56e642757564e7f2e57374cb0e79"
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
    "revision": "16722f232aab75030586eaa218cfe1eb"
  },
  {
    "url": "basic/other-parts/index.html",
    "revision": "ff068dbd0bf7831ab0d4bc88f828d305"
  },
  {
    "url": "basic/prototype-object/img/object-prototype.png",
    "revision": "6bbe9c151a73ec89ed45606a0b42975f"
  },
  {
    "url": "basic/prototype-object/index.html",
    "revision": "47b29f622d819d94643090e0ba4406fe"
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
    "revision": "cb5707c55f1fb79ebd4d8a0811a461b8"
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
    "revision": "15991addf2ad85d50aec15ae2d127f25"
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
    "revision": "a9327b5a04b5457e24bcb18245a8b89d"
  },
  {
    "url": "basic/string/index.html",
    "revision": "3a5e428f56bcbe133a5989d3fb160a87"
  },
  {
    "url": "basic/variables/index.html",
    "revision": "331a343d6639a4d3602f53e613a37a4c"
  },
  {
    "url": "basic/wrapper-object/index.html",
    "revision": "05a3cfc98f314b187bad1f0ca7d198b9"
  },
  {
    "url": "cheatsheet/index.html",
    "revision": "ea3db75e17446740c8b654f9cf5e2bc2"
  },
  {
    "url": "cheetsheet/index.html",
    "revision": "c6c30c5f139f5c4b78ec9d79ad31ef41"
  },
  {
    "url": "gitbook/@honkit/honkit-plugin-highlight/ebook.css",
    "revision": "49282fd7a65a9a3e6eb6021e333bdab7"
  },
  {
    "url": "gitbook/@honkit/honkit-plugin-highlight/website.css",
    "revision": "637413aed3ac91940e57d22879ed68c2"
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
    "revision": "3a881b8d1f7abde533ae746669319b13"
  },
  {
    "url": "gitbook/honkit-plugin-sandpack/honkit-plugin-sandpack.js",
    "revision": "5cb7c7d98a6c9f87b41d072663890366"
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
    "revision": "009aa3b765bb34e141bec145c3ce6858"
  },
  {
    "url": "index.html",
    "revision": "e30c58dfb4c8e423467ae3705c7558f9"
  },
  {
    "url": "intro/authors/index.html",
    "revision": "9fd80634709f7fdf78e91fe1d15c7fb5"
  },
  {
    "url": "intro/feedback/index.html",
    "revision": "86c510e4214b392c9882a03387bac278"
  },
  {
    "url": "intro/index.html",
    "revision": "f29f8f4cbdb332d4c701adb27517e391"
  },
  {
    "url": "intro/preparation/index.html",
    "revision": "8532177c1b09d7eeefa944b29d3b087a"
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
    "revision": "0524eed19bc0858739c6c1c9293d193a"
  },
  {
    "url": "use-case/ajaxapp/display/img/fig-1.png",
    "revision": "15072f06aa7fd4d5fbce148bc2db975f"
  },
  {
    "url": "use-case/ajaxapp/display/index.html",
    "revision": "9e7f9d846a00c4b4422428ce52518572"
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
    "revision": "9ee178434c29a7c036e344227c3e66d6"
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
    "revision": "5ef6e885f3d1d5848a7b74918eea4cdc"
  },
  {
    "url": "use-case/ajaxapp/http/src/index.html",
    "revision": "20ac665f8c423183077d0c9d96046394"
  },
  {
    "url": "use-case/ajaxapp/index.html",
    "revision": "55e0dabe08ce0668d44bed51e33a96cb"
  },
  {
    "url": "use-case/ajaxapp/promise/img/fig-1.png",
    "revision": "0c29e65b2be0ef42cd63ab8c3166a5ad"
  },
  {
    "url": "use-case/ajaxapp/promise/index.html",
    "revision": "ae6ac29164e43f2d62eed2c3c39ce94f"
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
    "revision": "a8b7aaf3e41ee7fcd3688d5a72aac096"
  },
  {
    "url": "use-case/nodecli/argument-parse/index.html",
    "revision": "fb4be8ab91a1299769c013c9fbf77be5"
  },
  {
    "url": "use-case/nodecli/helloworld/index.html",
    "revision": "9be14a892fc75ba110dbca9d3fc08740"
  },
  {
    "url": "use-case/nodecli/index.html",
    "revision": "a7af392c43cce2ceff5c26b72eb4f2f1"
  },
  {
    "url": "use-case/nodecli/md-to-html/index.html",
    "revision": "1868b4b49d84ef175ef46564252a304f"
  },
  {
    "url": "use-case/nodecli/read-file/index.html",
    "revision": "5cb4468f37a59793ee30ec13e5444724"
  },
  {
    "url": "use-case/nodecli/refactor-and-unittest/index.html",
    "revision": "e288329b2eed6bd456a9d82510e39c06"
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
    "revision": "ff84437b889d16d497e5d122208232bb"
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
    "revision": "4f67ba6333fd5ab0efe230bdd6fe7e08"
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
    "revision": "366415ed22d848483e7426ced2f5cf27"
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
    "revision": "811b188c339c02c204fa9f9423e4663c"
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
    "revision": "458ea51bdb5f8ecf3d71b9478061465d"
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
    "revision": "e7db172753ad01bf52b4b5203e37b794"
  },
  {
    "url": "use-case/todoapp/form-event/prevent-event/index.html",
    "revision": "afa24f6d77a10024dec52934ca94e96a"
  },
  {
    "url": "use-case/todoapp/index.html",
    "revision": "1fc0d4aa5019e4c618ca71b458c6a407"
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
    "revision": "ebe7141f67078ca320f0a8ecae8c66dd"
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
