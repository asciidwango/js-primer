#!/usr/bin/env node

import { parseArgs } from "node:util";

const HELP = `
コラボレーターの請求額を計算するツール

Usage: ./calc-contribute-expense.js --point <number>

Options:
    
    --point, -p <number>  計算したいポイント数
    --help, -h            ヘルプを表示

`;
const cli = parseArgs({
    options: {
        point: {
            type: "string",
            alias: "p",
        },
        help: {
            type: "boolean",
            alias: "h",
        }
    }
});
if (cli.values.help) {
    console.log(HELP);
    process.exit(0);
}

const point = cli.values.point ? parseInt(cli.values.point, 10) : null;
if (!point) {
    console.error("--point <number> を指定してください");
    process.exit(1);
}
const query = `query account($slug: String) {
  account(slug: $slug) {
    name
    slug
    stats{
      yearlyBudget {
        currency
        value
        valueInCents
      }
    }
  }
}`;
const slug = "jsprimer";
const response = await fetch("https://api.opencollective.com/graphql/v2", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        query,
        variables: { slug },
    }),
});
const { data } = await response.json();
const yearlyBudgetCents = data.account.stats.yearlyBudget.valueInCents;
const yearlyWorkloadPoints = 60; // 1年間のPoints
const onePointCostCents = yearlyBudgetCents / yearlyWorkloadPoints;
const costCents = onePointCostCents * point;
console.log(`コラボレーターの請求額: $${costCents / 100}`);
console.table({
    "1年間の予算": `$${yearlyBudgetCents / 100}`,
    "1年間のWorkload Points": yearlyWorkloadPoints,
    "1ポイントあたりのコスト": `$${onePointCostCents / 100}`,
    "請求額": `$${costCents / 100}`,
});
