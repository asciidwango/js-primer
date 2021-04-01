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
    "revision": "120286fe6ddb94be6ac7c07781a1a0e6"
  },
  {
    "url": "basic/array/index.html",
    "revision": "2e3803a21866ac0e72b88135d706ebd3"
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
    "revision": "524e0de9704b73c627e96655efb79b76"
  },
  {
    "url": "basic/class/index.html",
    "revision": "f0fd1cec9790d50680c20bc3a7040264"
  },
  {
    "url": "basic/comments/index.html",
    "revision": "7d513087e4011221f387bd01d12c458e"
  },
  {
    "url": "basic/condition/index.html",
    "revision": "54f0887df547a4df69958ed98b72bb4b"
  },
  {
    "url": "basic/data-type/index.html",
    "revision": "7359670c0b0019fa7f4965b299e37011"
  },
  {
    "url": "basic/date/index.html",
    "revision": "c6e712b151a7926aa00786e7294b5c61"
  },
  {
    "url": "basic/ecmascript/index.html",
    "revision": "40ac482ebcd1070b597ca5800ed9cf19"
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
    "revision": "dc4095936d626113ba71a543d7c846e1"
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
    "revision": "ed9c8d5d50c7e4b7e33162ac5b2e90c1"
  },
  {
    "url": "basic/function-scope/index.html",
    "revision": "8803719c5f81a1ca01ed2ec2aa3a07f2"
  },
  {
    "url": "basic/function-this/index.html",
    "revision": "fed1bec31dc716baaffcc7edc5f539bc"
  },
  {
    "url": "basic/implicit-coercion/img/JavaScript-Equality-Table.png",
    "revision": "249e75cfe1f22458bfa9fe71480a6c0d"
  },
  {
    "url": "basic/implicit-coercion/index.html",
    "revision": "2efb2c508f2c9d04a7a81abf933958f2"
  },
  {
    "url": "basic/index.html",
    "revision": "0431f4757a62d76f4ba7118bd8f12801"
  },
  {
    "url": "basic/introduction/img/javascript-ecmascript.png",
    "revision": "40a83bcf5b26783fc68b7caeb792d36d"
  },
  {
    "url": "basic/introduction/index.html",
    "revision": "f74f2872ed9b47a0324701b02531d4ce"
  },
  {
    "url": "basic/json/index.html",
    "revision": "780f8fcbe4f82c7e2d876c4c9418aa8f"
  },
  {
    "url": "basic/loop/index.html",
    "revision": "f643b75c6b3222078090ba7f09eef5c9"
  },
  {
    "url": "basic/loop/public/index.html",
    "revision": "226c5a5e385446f7b048d1b990a8f603"
  },
  {
    "url": "basic/map-and-set/index.html",
    "revision": "86d6f0f9c49463d9dfec9b686e8c0202"
  },
  {
    "url": "basic/math/index.html",
    "revision": "c033bc4e15ffc726eb42633f6b08b352"
  },
  {
    "url": "basic/module/index.html",
    "revision": "4dd2c7412a3589d86898afd7702c612b"
  },
  {
    "url": "basic/object/index.html",
    "revision": "005001e1c21d8418ca984388da15484f"
  },
  {
    "url": "basic/operator/index.html",
    "revision": "12d661339beebbf04a745135d757312b"
  },
  {
    "url": "basic/other-parts/index.html",
    "revision": "48c598b10bd1edceb21f5ce938821b26"
  },
  {
    "url": "basic/prototype-object/img/object-prototype.png",
    "revision": "6bbe9c151a73ec89ed45606a0b42975f"
  },
  {
    "url": "basic/prototype-object/index.html",
    "revision": "11afa7f2ebd6d94e70b4a32e00f72b65"
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
    "revision": "cf3431971480e688ac13c39e97d22fa1"
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
    "revision": "c2b14bb5372b622d6b5c3b0371b07633"
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
    "revision": "fd64964967d22ab0aa3040955210b14d"
  },
  {
    "url": "basic/string/index.html",
    "revision": "da354f1dd33beb4d3bfe1361af2426a8"
  },
  {
    "url": "basic/variables/index.html",
    "revision": "6e7c25e54dd6d5e50c981e4ffd2a8375"
  },
  {
    "url": "basic/wrapper-object/index.html",
    "revision": "2e55cc8fb3d734a77f9b741db8751318"
  },
  {
    "url": "cheatsheet/index.html",
    "revision": "87fca683ac20998edb7b32674ae9ce05"
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
    "revision": "ab0cd99cd2cda741ec6ed845dca3b1f2"
  },
  {
    "url": "index.html",
    "revision": "89450d2f3c41d460d05ae1e2cfcf06d4"
  },
  {
    "url": "intro/authors/index.html",
    "revision": "a5ee3e7ab2afc655b59584fa36f58c44"
  },
  {
    "url": "intro/feedback/index.html",
    "revision": "c16cfa241e54c20c1a3768bd2fb21242"
  },
  {
    "url": "intro/index.html",
    "revision": "24fffaadba350d4cb4a91db729b89a5f"
  },
  {
    "url": "intro/preparation/index.html",
    "revision": "6389a1132bb0f1a7d38f55838aa72d6d"
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
    "revision": "0880c1555b1b5fc1c7f32580af7c7212"
  },
  {
    "url": "use-case/ajaxapp/display/img/fig-1.png",
    "revision": "15072f06aa7fd4d5fbce148bc2db975f"
  },
  {
    "url": "use-case/ajaxapp/display/index.html",
    "revision": "7145881111af511d41c777df39173e49"
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
    "revision": "3a797bfe8aec032153ba28744ac9a50e"
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
    "revision": "f1f92ac6f54f43a26613a57d8e110b69"
  },
  {
    "url": "use-case/ajaxapp/http/src/index.html",
    "revision": "79838155e2a06a9e86a64804297f9a64"
  },
  {
    "url": "use-case/ajaxapp/index.html",
    "revision": "c7b478f301140623c7eda11bbafdf8bc"
  },
  {
    "url": "use-case/ajaxapp/promise/img/fig-1.png",
    "revision": "0c29e65b2be0ef42cd63ab8c3166a5ad"
  },
  {
    "url": "use-case/ajaxapp/promise/index.html",
    "revision": "cd2e8119ca84a13991c919ca62feff28"
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
    "revision": "9c66b9d2604933dae688f927349483bc"
  },
  {
    "url": "use-case/nodecli/argument-parse/index.html",
    "revision": "51da9ee823d5999805160ec59d262558"
  },
  {
    "url": "use-case/nodecli/helloworld/index.html",
    "revision": "b508c70e7d531cfb605bc9f119289c41"
  },
  {
    "url": "use-case/nodecli/index.html",
    "revision": "15433a53077731e028511b5b63efffcc"
  },
  {
    "url": "use-case/nodecli/md-to-html/index.html",
    "revision": "897ed414748daca433d879495f01d281"
  },
  {
    "url": "use-case/nodecli/read-file/index.html",
    "revision": "d5604798fac78b1db4a12f331af5ceec"
  },
  {
    "url": "use-case/nodecli/refactor-and-unittest/index.html",
    "revision": "0161f1c09c34903af70266da39eef570"
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
    "revision": "16157b1a929ed6eaf6101466dc02359e"
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
    "revision": "12fa7e9ecc4f0f2594004aecc9864813"
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
    "revision": "87a3ccafde8b95ba665032b8ebc9cbd4"
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
    "revision": "1fdfb019d4013a7eca212c78e1714bf1"
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
    "revision": "c1d10e8943f4b99aa5d7a1a74b37c50e"
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
    "revision": "7dbfe03045629e0f1fd0b80059e928b0"
  },
  {
    "url": "use-case/todoapp/form-event/prevent-event/index.html",
    "revision": "4b6e0d6f957ffad0659f2076151c97ca"
  },
  {
    "url": "use-case/todoapp/index.html",
    "revision": "95733553765462d0f4695888f5b7a6c3"
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
    "revision": "87bfcefb53fbfff1072688dcc200b802"
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
