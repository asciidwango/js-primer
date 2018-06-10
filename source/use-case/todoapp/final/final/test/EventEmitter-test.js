const assert = require("assert");
import { EventEmitter } from "../src/EventEmitter.js";

describe("EventEmitter", function() {
    describe("#addEventLister", function() {
        it("should set event handler to the key", function(done) {
            const emitter = new EventEmitter();
            const key = "event-key";
            emitter.addEventLister(key, function() {
                done();
            });
            emitter.emit(key);
        });
    });
    describe("#emit", function() {
        it("should pass data to the handlers", function() {
            const emitter = new EventEmitter();
            const key = "event-key";
            let isHandlerCalled = false;
            emitter.addEventLister(key, function() {
                isHandlerCalled = true;
            });
            emitter.emit(key);
            assert.ok(isHandlerCalled, "handler should be called");
        });
    });
    describe("#removeEventLister", function() {
        it("should unset event handler ", function(done) {
            const emitter = new EventEmitter();
            const key = "event-key";
            const handler = function() {
                done(new Error("should not called"));
            };
            emitter.addEventLister(key, handler);
            emitter.removeEventLister(key, handler);
            emitter.emit(key);
            emitter.addEventLister(key, done);
            emitter.emit(key);
        });
    });
});
