import assert from "node:assert";
import { describe, it } from "node:test";
import { EventEmitter } from "../src/EventEmitter.js";

describe("EventEmitter", function() {
    describe("#addEventListener", function() {
        it("should set event listener to the key", () => {
            return new Promise((resolve) => {
                const emitter = new EventEmitter();
                const key = "event-key";
                emitter.addEventListener(key, function() {
                    resolve();
                });
                emitter.emit(key);
            });
        });
    });
    describe("#emit", function() {
        it("should pass data to the listeners", () => {
            const emitter = new EventEmitter();
            const key = "event-key";
            let isListenerCalled = false;
            emitter.addEventListener(key, function() {
                isListenerCalled = true;
            });
            emitter.emit(key);
            assert.ok(isListenerCalled, "listener should be called");
        });
    });
    describe("#removeEventListener", () => {
        it("should unset event listener ", () => {
            return new Promise((resolve, reject) => {
                const emitter = new EventEmitter();
                const key = "event-key";
                const listener = function() {
                    reject(new Error("should not called"));
                };
                emitter.addEventListener(key, listener);
                emitter.removeEventListener(key, listener);
                emitter.emit(key);
                emitter.addEventListener(key, resolve);
                emitter.emit(key);
            });
        });
    });
});
