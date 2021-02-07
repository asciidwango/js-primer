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
    "revision": "cb2b75078d9287b50ceaa7cc4cc57c67"
  },
  {
    "url": "basic/array/index.html",
    "revision": "4bd08c4e2c65530dbc587f775fb422c8"
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
    "revision": "ef886044a7d635ec776bbcb010eee3dc"
  },
  {
    "url": "basic/class/index.html",
    "revision": "2ff8296cfb3445c728d25a44132ffed4"
  },
  {
    "url": "basic/comments/index.html",
    "revision": "3a59b0fc7671ecaac0949d27e3e956de"
  },
  {
    "url": "basic/condition/index.html",
    "revision": "55adb9c520d7d19dcf9ac3d334149a85"
  },
  {
    "url": "basic/data-type/index.html",
    "revision": "45edd9afabe99644310a693160b93259"
  },
  {
    "url": "basic/date/index.html",
    "revision": "667b684d4e13644c3b6663b3eedc468d"
  },
  {
    "url": "basic/ecmascript/index.html",
    "revision": "db847a59d95634ef247d261a641830b1"
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
    "revision": "fa5f290e047b954e38b141de1d3dabe0"
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
    "revision": "324370e7eee6951f34bdc2c067322db1"
  },
  {
    "url": "basic/function-scope/index.html",
    "revision": "dcdc732ebe8612f99395ff7dc6a0448f"
  },
  {
    "url": "basic/function-this/index.html",
    "revision": "d89914b79d181658088a1e0fba2884ec"
  },
  {
    "url": "basic/implicit-coercion/img/JavaScript-Equality-Table.png",
    "revision": "249e75cfe1f22458bfa9fe71480a6c0d"
  },
  {
    "url": "basic/implicit-coercion/index.html",
    "revision": "fd0bc347e091a918419d0b71a3db0481"
  },
  {
    "url": "basic/index.html",
    "revision": "ae28f703af74aa4b9e44afbaa3bd8433"
  },
  {
    "url": "basic/introduction/img/javascript-ecmascript.png",
    "revision": "40a83bcf5b26783fc68b7caeb792d36d"
  },
  {
    "url": "basic/introduction/index.html",
    "revision": "613d2b857699bec64deb96f40ce02eaf"
  },
  {
    "url": "basic/json/index.html",
    "revision": "4903275667d729271d56485ea8540a37"
  },
  {
    "url": "basic/loop/index.html",
    "revision": "c8e03c39a8eb0621d6ea76677bcdec9c"
  },
  {
    "url": "basic/loop/public/index.html",
    "revision": "226c5a5e385446f7b048d1b990a8f603"
  },
  {
    "url": "basic/map-and-set/index.html",
    "revision": "f8599597a6843d5d88417c8d6cc5306d"
  },
  {
    "url": "basic/math/index.html",
    "revision": "ddf98e81d2cbb3dd6a0f0f0fec16a968"
  },
  {
    "url": "basic/module/index.html",
    "revision": "0509c0990076d37eb287dab7b705ab2b"
  },
  {
    "url": "basic/object/index.html",
    "revision": "33186e0b58fe7f740b164d5c944ee17e"
  },
  {
    "url": "basic/operator/index.html",
    "revision": "113c88ee13ca52cdf937ae811f1bebdb"
  },
  {
    "url": "basic/other-parts/index.html",
    "revision": "67a0925a60c73d6304debaa57d1f3b39"
  },
  {
    "url": "basic/prototype-object/img/object-prototype.png",
    "revision": "6bbe9c151a73ec89ed45606a0b42975f"
  },
  {
    "url": "basic/prototype-object/index.html",
    "revision": "cd59488a6c1acef96a3d7516e725a2f7"
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
    "revision": "493510b540fc302a73690e498497676d"
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
    "revision": "241b96516c6fc1b950dc38f03ffe5f8e"
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
    "revision": "7dc9224459e142a3ca689050af469c01"
  },
  {
    "url": "basic/string/index.html",
    "revision": "b517c0345e6d361a2f66210c43266cd3"
  },
  {
    "url": "basic/variables/index.html",
    "revision": "00049ac75c3938ba95553192e529aaba"
  },
  {
    "url": "basic/wrapper-object/index.html",
    "revision": "f8ef0c24cc84a5d44659b688ed449e04"
  },
  {
    "url": "cheatsheet/index.html",
    "revision": "3fb3eed947902d695972bf430d082e5b"
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
    "revision": "750d499b86df0cc514b844fb1077664d"
  },
  {
    "url": "intro/authors/index.html",
    "revision": "58ebad8bdfc3d78cb704d85fc040dfdd"
  },
  {
    "url": "intro/feedback/index.html",
    "revision": "ccaf81f7cae9cb0a207fc373900280a5"
  },
  {
    "url": "intro/index.html",
    "revision": "c41854f4b0999afd176e74179f6be80b"
  },
  {
    "url": "intro/preparation/index.html",
    "revision": "9aa937690c9ac59ad9655a3b08795367"
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
    "revision": "6cfb58880c24da77838f4213e07a0132"
  },
  {
    "url": "use-case/ajaxapp/display/img/fig-1.png",
    "revision": "15072f06aa7fd4d5fbce148bc2db975f"
  },
  {
    "url": "use-case/ajaxapp/display/index.html",
    "revision": "3a46af97feec73064b31862b312d0f08"
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
    "revision": "30182c7d3222fcaa5719d1e5ffa278b4"
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
    "revision": "80303d2746cf02375d46244a0e66b588"
  },
  {
    "url": "use-case/ajaxapp/http/src/index.html",
    "revision": "79838155e2a06a9e86a64804297f9a64"
  },
  {
    "url": "use-case/ajaxapp/index.html",
    "revision": "10a4cdff9b7ef4c2022ba6253eecc642"
  },
  {
    "url": "use-case/ajaxapp/promise/img/fig-1.png",
    "revision": "0c29e65b2be0ef42cd63ab8c3166a5ad"
  },
  {
    "url": "use-case/ajaxapp/promise/index.html",
    "revision": "965ff582268071d092716db3aec98e79"
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
    "revision": "651fa8730a67aa297192718fa96949dd"
  },
  {
    "url": "use-case/index.html",
    "revision": "8fdea19b4ffd44189a503f3954b70f60"
  },
  {
    "url": "use-case/nodecli/argument-parse/index.html",
    "revision": "ee6373bae0745643b80c252d44604f1b"
  },
  {
    "url": "use-case/nodecli/helloworld/index.html",
    "revision": "ed7df17c994c4cd88a55801927a29a7b"
  },
  {
    "url": "use-case/nodecli/index.html",
    "revision": "cd3457c45e0c57c97a1b5a34cc4fff44"
  },
  {
    "url": "use-case/nodecli/md-to-html/index.html",
    "revision": "d4aa8dfb5758e87ef7171630aa23868b"
  },
  {
    "url": "use-case/nodecli/read-file/index.html",
    "revision": "d37071810e6085087b4e36682c30d60f"
  },
  {
    "url": "use-case/nodecli/refactor-and-unittest/index.html",
    "revision": "a93be99bf046a694c0c8ac29516f2a0b"
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
    "revision": "d2502b3fd4781447cd5aeeefe6521b46"
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
    "revision": "a8f8ce3e6aeb9dfacb5c9f4e9b20e792"
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
    "revision": "a53b994d46abbe411b086b5d808c9c35"
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
    "revision": "485470b0de60aff32ab70e91da45abeb"
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
    "revision": "f7ddb5c6e426720ac753a26ef28a015a"
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
    "revision": "c8a89967f72ee75d0785a8b1fc651407"
  },
  {
    "url": "use-case/todoapp/form-event/prevent-event/index.html",
    "revision": "4b6e0d6f957ffad0659f2076151c97ca"
  },
  {
    "url": "use-case/todoapp/index.html",
    "revision": "dee2fbafc31e479b3365e0ce109d6d19"
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
    "revision": "50f0cc2a5f389a35417c14c7b571cb9e"
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
