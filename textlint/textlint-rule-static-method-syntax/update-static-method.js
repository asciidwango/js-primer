import * as fs from "node:fs/promises";

/**
 * `obj` の static method を列挙する
 * @param obj
 * @returns [string, string][]
 * @example
 * ```js
 * const staticMethods = listStaticMethods(Array);
 * console.log(staticMethods); // ["from", "isArray", "of"]
 * ```
 */
const listStaticMethods = (obj) => {
    const propertyNames = Object.getOwnPropertyNames(obj);
    return propertyNames.filter(propName => {
        try {
            // obj[propName] が関数であり、かつ prototype プロパティを持たない
            // (クラスコンストラクタ自身を除外する意図だが、完全ではない)
            // または特定の既知のコンストラクタプロパティを除外する
            if (propName === "prototype" || propName === "length" || propName === "name") {
                return false;
            }
            return typeof obj[propName] === "function";
        } catch (e) {
            // セキュリティ上の理由などでアクセスできないプロパティもある
            return false;
        }
    });
};
const BUILTIN_OBJECTS = [
    "Array",
    "Boolean",
    "Date",
    "Error",
    "Function",
    "Map",
    "Math",
    "Number",
    "Object",
    "Promise",
    "Proxy",
    "Reflect",
    "RegExp",
    "Set",
    "String",
    "Symbol",
    "WeakMap",
    "WeakSet",
    "JSON",
    "Proxy",
    "Reflect"
];
const staticMethods = BUILTIN_OBJECTS.flatMap((objectName) => {
    const builtinObject = new Function(`return ${objectName};`)();
    return listStaticMethods(builtinObject).map(methodName => {
        return `${objectName}.${methodName}`;
    });
});
await fs.writeFile("static-methods.json", JSON.stringify(staticMethods, null, 4));
