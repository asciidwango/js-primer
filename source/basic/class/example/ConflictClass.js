class ConflictClass {
    constructor() {
        this.method = () => {
            console.log("インスタンスのメソッド");
        };
    }

    method() {
        console.log("プロトタイプメソッド");
    }
}

const conflict = new ConflictClass();
conflict.method(); // "インスタンスのメソッド"
