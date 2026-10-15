import assert from "node:assert/strict";
import vm from "node:vm";
import { describe, it } from "node:test";
import { test as powerDoctest } from "@power-doctest/tester";
import { parse } from "@power-doctest/markdown";
import { runTestCode, toTestCode, toUnreachableCode } from "./lib/testing-code.js";

describe("runTestCode", () => {
    it("runs valid code without reporting an error", () => {
        assert.doesNotThrow(() => runTestCode("const value = 1;", "valid.js"));
    });

    it("reports the error thrown by the sample", () => {
        assert.throws(() => runTestCode('throw new RangeError("sample error");', "runtime-invalid.js"), {
            name: "RangeError",
            message: "sample error"
        });
    });

    it("reports syntax errors with the sample filename", () => {
        assert.throws(() => runTestCode("const =", "syntax-invalid.js"), error => {
            assert.equal(error.name, "SyntaxError");
            assert.match(error.stack, /syntax-invalid.js/);
            return true;
        });
    });

    it("provides require in the execution context", () => {
        assert.doesNotThrow(() => runTestCode('require("node:assert").strictEqual(1 + 1, 2);', "require.js"));
    });
});

describe("unreachable code checks", () => {
    it("rejects a reached comment through the Markdown Doctest pipeline", async () => {
        const [parsedCode] = parse({
            filePath: "reached.md",
            content: "```js\nconst value = 1;\n// この行は実行されません\nconsole.log(value); // => 1\n```"
        });
        await assert.rejects(powerDoctest({
            ...parsedCode,
            code: toTestCode(parsedCode.code)
        }), /この行は実行されません/);
    });

    it("accepts an unreachable comment through the Markdown Doctest pipeline", async () => {
        const [parsedCode] = parse({
            filePath: "unreachable.md",
            content: "```js\nif (false) {\n    // この行は実行されません\n}\nconsole.log(1); // => 1\n```"
        });
        await assert.doesNotReject(powerDoctest({
            ...parsedCode,
            code: toTestCode(parsedCode.code)
        }));
    });

    it("detects a reached comment after the strict mode conversion", () => {
        const code = toTestCode("const value = 1;\n// この行は実行されません");
        assert.throws(() => vm.runInNewContext(code), /この行は実行されません/);
    });

    it("keeps unreachable branches executable", () => {
        const code = toTestCode("if (false) {\n    // この行は実行されません\n}");
        assert.doesNotThrow(() => vm.runInNewContext(code));
    });

    it("checks every matching line without changing line numbers", () => {
        const code = "if (false) {\n    // この行は実行されません\n}\n// この行は実行されません\n";
        const converted = toUnreachableCode(code);
        assert.equal(converted.split("\n").length, code.split("\n").length);
        assert.throws(() => vm.runInNewContext(converted), /この行は実行されません/);
    });

    it("supports explanatory text, quotes, and backslashes in comments", () => {
        const code = '// "value"や\\を含む説明のため、この行は実行されません';
        assert.throws(() => vm.runInNewContext(toUnreachableCode(code)), {
            name: "Error",
            message: ' "value"や\\を含む説明のため、この行は実行されません'
        });
    });

    it("supports CRLF and trailing whitespace", () => {
        const code = "const value = 1;\r\n\t// この行は実行されません  \r\n";
        assert.throws(() => vm.runInNewContext(toUnreachableCode(code)), /この行は実行されません/);
    });

    it("leaves inline comments and unrelated comments unchanged", () => {
        const code = 'const value = "// この行は実行されません";\nvalue; // この行は実行されません\n// この行は実行されます';
        assert.equal(toUnreachableCode(code), code);
    });
});
