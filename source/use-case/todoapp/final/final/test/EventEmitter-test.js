// LICENSE : MIT
"use strict";
const assert = require("assert");
import { EventEmitter } from "../src/EventEmitter.js";

describe("EventEmitter", function() {
    let emitter;
    beforeEach(function() {
        emitter = new EventEmitter();
    });
    describe("#on", function() {
        it("should set event handler to the key", function(done) {
            const key = "event-key";
            emitter.on(key, function() {
                done();
            });
            emitter.emit(key);
        });
    });
    describe("#emit", function() {
        it("should pass data to the handlers", function(done) {
            const key = "event-key";
            const passingData = { "key": "value" };
            emitter.on(key, function(data) {
                assert.deepEqual(data, passingData);
                done();
            });
            emitter.emit(key, passingData);
        });
    });
    describe("#off", function() {
        it("should unset event handler ", function(done) {
            const key = "event-key";
            const handler = function() {
                done(new Error("should not called"));
            };
            emitter.on(key, handler);
            emitter.off(key, handler);
            emitter.emit(key);
            emitter.on(key, done);
            emitter.emit(key);
        });
    });
});
