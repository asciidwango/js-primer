"use strict";
import assert from "power-assert";
import helloWorld from "../src/hello-world";
describe("hello-world", function () {
    it("should return string contain name", function () {
        var result = helloWorld("Ken");
        assert(/Ken/.test(result));
    });
});