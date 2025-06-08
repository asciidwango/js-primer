import assert from "node:assert";
import { suite, test } from "node:test";
import { EventEmitter } from "../src/EventEmitter.js";

suite("EventEmitter", function() {
    suite("#addEventListener", function() {
        test("should set event listener to the key", () => {
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
    suite("#emit", function() {
        test("should pass data to the listeners", () => {
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
    suite("#removeEventListener", () => {
        test("should unset event listener ", () => {
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
