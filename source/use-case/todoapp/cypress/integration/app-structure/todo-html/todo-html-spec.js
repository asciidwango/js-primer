const URL = "/app-structure/todo-html";
describe(URL, function() {
    it(".todoappにスタイルが適応されている", function() {
        cy.visit(URL).then((win) => {
            const position = win.getComputedStyle(win.document.querySelector(".todoapp")).position;
            expect(position).to.equal("relative");
        });
    });
});
