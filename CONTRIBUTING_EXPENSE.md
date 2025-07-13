# Contributing Expenses Policy

JavaScript Primer(jsprimer)はOpen Collectiveを通じて資金を募っています。
この資金は、jsprimerへContributeしてくれた方々に対して、費用を支払うために使われます。

- [JavaScript Primer - Open Collective](https://opencollective.com/jsprimer)
- [JavaScript Primerスポンサー · JavaScript Primer #jsprimer](https://jsprimer.net/intro/sponsors/)

このガイドでは、jsprimerへのContributeした場合の費用をOpen Collectiveで請求する方法について説明します。

## 費用の計算方法

jsprimerへのContributeしたタスクに対してPointを設定し、そのPointに基づいて金額を計算します。

### タスクに対するPoint

作業量に対する基準としてフィボナッチ数列のPointを設定します。
Pointの決定は、jsprimerの[Project Member](https://github.com/asciidwango/js-primer?tab=readme-ov-file#project-member)が行います。

| Point | Description           |
|-------|-----------------------|
| 0     | 些細な変更                 |
| 1     | 2 よりは簡単               |
| 2     | 大体1日分やると終わる想定         |
| 3     | 2 よりは難しい              |
| 5     | かなり難しい                |
| 8     | 難易度がとても高いので、できる人は限られる |

Issueが適切に分割されていれば、5や8はほとんど出てこない想定です。
5以降はブレが大きいので、参考程度のPointとして扱います。

📝 元ネタはLinearの[Estimates – Linear Docs](https://linear.app/docs/estimates)

### Pointの例

Pointはやや主観的になってしまいますが、既存のIssueと比較してどの程度のPointになるかを[Project Member](https://github.com/asciidwango/js-primer?tab=readme-ov-file#project-member)が判断します。

- Point 1:
    - [fix(nodecli): update to marked@14 by azu · Pull Request #1760 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/pull/1760)
        - ほとんど置換で終わるような変更
    - [fix: Node.js v18.12.0 LTSにアップデート by azu · Pull Request #1496 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/pull/1496)
        - やり方がだいたい定型化されてる変更
- Point 2:
    - [feat(ecmascript): Stage 2.7を追加 by azu · Pull Request #1743 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/pull/1743)
        - 文章自体はほとんどないが、多少調べる必要がある
    - [mocha を`node:test`に変更する by windchime-yk · Pull Request #1737 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/pull/1737)
        - 1 つのセクションを書き直すような変更
    - [feat(map-and-set): `Map.groupBy`静的メソッドの追加 by azu · Pull Request #1751 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/pull/1751)
        - 1 つのセクションを追加する変更
    - [feat: ErrorCause への対応 by himanoa · Pull Request #1732 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/pull/1732)
        - 1 つのセクションを追加する変更
- Point 3:
    - [feat(array): Change Array by copy の対応 by azu · Pull Request #1679 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/pull/1679)
        - 複数のセクションにまたがる変更
- Point 5:
    - [fix(nodecli): commander パッケージ を `node:util` の `parseArg` に変更 by azu · Pull Request #1757 · asciidwango/js-primer](https://github.com/asciidwango/js-primer/pull/1757)
        - 章全体にまたがる変更
        - かなり影響範囲が広く、書き直しも多い変更

### 金額の計算方法

金額は次のツールで計算できます。

```bash
$ node ./tools/calc-contribute-expense.mjs --point <number>
```

e.g. 合計のPointが2の場合

```bash
$ node ./tools/calc-contribute-expense.mjs --point 2
```

#### 金額の計算式

jsprimerの年間更新コストは、だいたい30日分の作業量になるように設定しています。

- [JavaScript Primer 改訂2版をリリースしました！/JavaScript Primerはなぜ更新され続けるのか？ | Web Scratch](https://efcl.info/2023/06/09/jsprimer-v2/)

Pointに直すと、年間の作業量のPointは60 Point程度になります。

年間の予算はOpen Collectiveの"推定年間予算(Estimated annual budget)"を参照します

- [JavaScript Primer - Open Collective](https://opencollective.com/jsprimer)

1 Pointあたりの金額は次の計算式で求めます。

```js
const yearlyEstimatedBudget = _; // Open Collectiveの推定年間予算($ドル)
const yearlyWorkloadPoints = 60; // 1年間のPoints
const onePointCost = yearlyEstimatedBudget / yearlyWorkloadPoints;
console.log({ onePointCost }); // => 1 Pointあたりの金額($ドル)
const taskPoint = _; /// タスクのPoint
const cost = onePointCost * taskPoint;
console.log({ cost }); // => タスクの金額($ドル)
```

Example: 推定年間予算が $2,367 で、タスクが 2 Points の場合

```js

const yearlyEstimatedBudget = 2_367; // Open Collectiveの推定年間予算($ドル)
const yearlyWorkloadPoints = 60; // 1年間のPoints
const onePointCost = yearlyEstimatedBudget / yearlyWorkloadPoints;
console.log({ onePointCost }); // => $39.45

const costOfPoint = 2; /// 2 Points
const cost = onePointCost * costOfPoint;
console.log({ cost }); // => $78.9
```

### 金額を確定するタイミング

作業が終わったタイミングで計算して、その月のコストをまとめて申請します。
Open Collectiveからの支払いは2週間ごとに行われるため、月ごとにまとめて請求します。

## 支払い方法の選択

ContributorはPointに基づいた金額を、次の2つの方法から選択できます。

### 1. 経費申請して受け取る

計算式に基づいた金額を自分で受け取る場合は、「費用の請求方法」に従って経費申請を行います。

### 2. 指定されたCollectiveに寄付する

受け取る代わりに、他のCollectiveに寄付することも可能です。
jsprimerから直接、指定されたCollectiveへ同じ金額を寄付します。

寄付先の例：
- [Babel](https://opencollective.com/babel)
- その他、Open Collective上の任意のCollective

寄付を希望する場合は、IssueまたはPull Requestで寄付先のCollectiveを指定してください。

## 費用の請求方法

計算式に基づいた金額をOpen Collectiveで請求する手順

1. <https://opencollective.com/jsprimer/expenses/new> にアクセス
2. "Invoice"を選択
3. 請求者の情報と支払い先(銀行口座またはPayPal)を入力
4. "Next"をクリック
5. 請求書の画面で "Expense title" に `Development and maintenance (YYYY-DD)` と入力
6. 請求書の画面で "Set invoice details"の "Description" に `Contribute to jsprimer (YYYY-DD)` と入力
7. 請求書の画面で "Date" には 今日の日付を入力
8. 請求書の画面で "Amount" は USD を選択し、計算した金額を入力
    - 自動的にExpense Currencyで選択したJPYに変換された金額が表示されます
9. "Next"をクリック
10. Add notesに次の内容を入力
   ```
   Contribute to jsprimer 
   - Commits: https://github.com/asciidwango/js-primer/commits?author=<GitHubアカウント>&since=月の初めの日&until=月の最終日
   ```
   例
   ```
   Contribute to jsprimer 
   - Commits: https://github.com/asciidwango/js-primer/commits?author=azu&since=2024-08-01&until=2024-08-31
   ```
11. 確認して "Submit expense"をクリック

あとは管理者がApproveするまで待つと、その後Open Collectiveから支払われます。

Note:

- 入力した個人情報は公開されません
- 公開されるのは、Expense titleとDescriptionとOpen Collectiveのアカウント情報のみです
