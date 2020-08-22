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
    "revision": "c2d13f9460e721f11aefc14295184792"
  },
  {
    "url": "basic/array/index.html",
    "revision": "9d7891ce079265aa701d8d5cb76fd839"
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
    "revision": "f66011f6d2912d7a82d70a2ad0b84ebd"
  },
  {
    "url": "basic/class/index.html",
    "revision": "1032ba0c609510fcad683533e2a85018"
  },
  {
    "url": "basic/comments/index.html",
    "revision": "1c2955f770d9f0fcea55c51b5d533b9b"
  },
  {
    "url": "basic/condition/index.html",
    "revision": "2687c30bde1a7b93d3fd554514579238"
  },
  {
    "url": "basic/data-type/index.html",
    "revision": "8f6324934ff7200533823480b5ef637f"
  },
  {
    "url": "basic/date/index.html",
    "revision": "1eb0b51c759b762abd7306094ebbfba9"
  },
  {
    "url": "basic/ecmascript/index.html",
    "revision": "fc0d0f6469f1f03575f39271350eb94f"
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
    "revision": "ba3c6ec3b2853fd54308f84675870ee5"
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
    "revision": "859b9a8334c34e0edc22b00af85cad06"
  },
  {
    "url": "basic/function-scope/index.html",
    "revision": "6cb8a44451d2bf2ac70b3bd709977bc0"
  },
  {
    "url": "basic/function-this/index.html",
    "revision": "9dc5d68099aa7ccd2712f6308e306549"
  },
  {
    "url": "basic/implicit-coercion/img/JavaScript-Equality-Table.png",
    "revision": "249e75cfe1f22458bfa9fe71480a6c0d"
  },
  {
    "url": "basic/implicit-coercion/index.html",
    "revision": "b9055c57109bb02ee10b3a1b7679e106"
  },
  {
    "url": "basic/index.html",
    "revision": "b57ab82f6b4a42fe80d32011181d7f59"
  },
  {
    "url": "basic/introduction/img/javascript-ecmascript.png",
    "revision": "40a83bcf5b26783fc68b7caeb792d36d"
  },
  {
    "url": "basic/introduction/index.html",
    "revision": "0610c25d447795c6857c9b344f2ea593"
  },
  {
    "url": "basic/json/index.html",
    "revision": "05564f1820c405a042a8b79c332acd10"
  },
  {
    "url": "basic/loop/index.html",
    "revision": "d4461155c6589cf413faf9a5cf96995c"
  },
  {
    "url": "basic/loop/public/index.html",
    "revision": "226c5a5e385446f7b048d1b990a8f603"
  },
  {
    "url": "basic/map-and-set/index.html",
    "revision": "d57c7b05cdff2a2b7151b0a3b944a324"
  },
  {
    "url": "basic/math/index.html",
    "revision": "a5e2c3f91c34f9e8f93d6ff7256474db"
  },
  {
    "url": "basic/module/index.html",
    "revision": "c6493974d2be788ad24076d65205cfe2"
  },
  {
    "url": "basic/object/index.html",
    "revision": "ec69a3c224c7a7c525a9fe9de9cb325f"
  },
  {
    "url": "basic/operator/index.html",
    "revision": "14c4c611b3090c0ee8d8ac23988133ce"
  },
  {
    "url": "basic/other-parts/index.html",
    "revision": "6d57b0ee3dff77fe776c8de52cfca687"
  },
  {
    "url": "basic/prototype-object/img/object-prototype.png",
    "revision": "6bbe9c151a73ec89ed45606a0b42975f"
  },
  {
    "url": "basic/prototype-object/index.html",
    "revision": "cdae94335e3cc192ca0f1c941c68dc82"
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
    "revision": "5dddb52e18311bb37ceefdcb71ec4011"
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
    "revision": "490f1a72067ef8c4857735ebb33b8ce0"
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
    "revision": "ad343d498a801140c188d700784a594b"
  },
  {
    "url": "basic/string/index.html",
    "revision": "c1e051a19ebda5e2c0b1bb38cc3b21d3"
  },
  {
    "url": "basic/variables/index.html",
    "revision": "942a3a2a1490d1b7dfcaa82b3c8bf240"
  },
  {
    "url": "basic/wrapper-object/index.html",
    "revision": "0c5c4a92c71db7302f767f674b837e80"
  },
  {
    "url": "cheetsheet/index.html",
    "revision": "588fe18bbf7607ee865c7c69ab72b14c"
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
    "revision": "9dc202f748f1bedb702cedda2a11a6dd"
  },
  {
    "url": "intro/authors/index.html",
    "revision": "b94f76fdf7d84a2ad22ae4df55347097"
  },
  {
    "url": "intro/feedback/index.html",
    "revision": "347aa973467206365853aa62a0519e64"
  },
  {
    "url": "intro/index.html",
    "revision": "2109251448a92f01e32acb8ef46d5003"
  },
  {
    "url": "intro/preparation/index.html",
    "revision": "0225ffab2d60fe0725e68d18da87d46d"
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
    "revision": "b9db8c80bb6def48ace42d8c936944c4"
  },
  {
    "url": "use-case/ajaxapp/display/img/fig-1.png",
    "revision": "15072f06aa7fd4d5fbce148bc2db975f"
  },
  {
    "url": "use-case/ajaxapp/display/index.html",
    "revision": "dfc5460f2d92fe6905d78ad9c57f1344"
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
    "revision": "e5618bd6c826cdae0510ec64cd4b8a3d"
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
    "revision": "b9b93add9f71b6aa8d11ebe001078208"
  },
  {
    "url": "use-case/ajaxapp/http/src/index.html",
    "revision": "79838155e2a06a9e86a64804297f9a64"
  },
  {
    "url": "use-case/ajaxapp/index.html",
    "revision": "90b72f5678e591643c4aa4f639eced65"
  },
  {
    "url": "use-case/ajaxapp/promise/img/fig-1.png",
    "revision": "0c29e65b2be0ef42cd63ab8c3166a5ad"
  },
  {
    "url": "use-case/ajaxapp/promise/index.html",
    "revision": "a17eb9cf98099a1171c90314b7492c84"
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
    "revision": "cf5a1e0e081033951398191a1ad097c1"
  },
  {
    "url": "use-case/nodecli/argument-parse/index.html",
    "revision": "d077dd4538e85c0501c4e0f340530e1f"
  },
  {
    "url": "use-case/nodecli/helloworld/index.html",
    "revision": "3fcf6ab8492c9b284eb966a1615065a7"
  },
  {
    "url": "use-case/nodecli/index.html",
    "revision": "7933e1d9410f753a737171d80ca8aee6"
  },
  {
    "url": "use-case/nodecli/md-to-html/index.html",
    "revision": "0cfcc8a6819210133588899d21938bb2"
  },
  {
    "url": "use-case/nodecli/read-file/index.html",
    "revision": "933c4d9377528a4e58b6c0eec3feb685"
  },
  {
    "url": "use-case/nodecli/refactor-and-unittest/index.html",
    "revision": "798657be9bc7cb1853423cd0273460a2"
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
    "revision": "fe2fbe2fe77c5280dd785df28723e830"
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
    "revision": "87088eaa68f58dda272af49c40489f7d"
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
    "revision": "77cf1f9f189d3433283323f319cda956"
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
    "revision": "178f3ef22cdf50b644a1d8558b5f061b"
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
    "revision": "0fdfb20784920873802ffd00f3d7443e"
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
    "revision": "87cf1c936f3d43b3a86570ae6df6cd18"
  },
  {
    "url": "use-case/todoapp/form-event/prevent-event/index.html",
    "revision": "4b6e0d6f957ffad0659f2076151c97ca"
  },
  {
    "url": "use-case/todoapp/index.html",
    "revision": "99d7db0cd4dc47684b221b60c2fa56bf"
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
    "revision": "8d9bcd9ddab7da9bb08c0c9caea81a8f"
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
