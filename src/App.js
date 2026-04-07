//console.log("App.js: loaded");
import {element, render} from "./view/html-util.js";
import {TodoItemModel} from "./model/TodoItemModel.js";
import {TodoListModel} from "./model/TodoListModel.js";

export class App {
    //TodoListModelの初期化
    #todoListModel = new TodoListModel();
    mount() {
        const formElement = document.querySelector("#js-form");
        const inputElement = document.querySelector("#js-form-input");
        const containerElement = document.querySelector("#js-todo-list");
        const todoItemCountElement = document.querySelector("#js-todo-count");
        //TodoListModelの状態が更新されたら表示を更新する
        this.#todoListModel.onChange(() => {
            //TodoリストをまとめるList要素
            const todoListElement = element`<ul></ul>`;
            // それぞれのTodoItem要素をtodoListElement以下へ追加する
            const todoItems = this.#todoListModel.getTodoItems();
            todoItems.forEach(item => {
                const todoItemElement = element`<li>${item.title}</li>`;
                todoListElement.appendChild(todoItemElement);
            });    
    
            //コンテナ要素の中身をTodoリストをまとめるList要素で上書きする
            render(todoListElement, containerElement);
            //アイテム数の表示を更新
            todoItemCountElement.textContent = `Todoアイテム数: ${this.#todoListModel.getTotalCount()}`;
        });

        formElement.addEventListener("submit", (event) => {
            event.preventDefault();
            //新しいTodoItemをTodoListへ追加する
            this.#todoListModel.addTodo(new TodoItemModel({
                title: inputElement.value,
                completed: false
            }));
            inputElement.value = "";
        });
    }
}

/*const item = new TodoItemModel({
    title: "未完了のTodoアイテム",
    completed: false
});
const completedItem = new TodoItemModel({
    title: "完了済みのアイテム",
    completed: true
});
console.log(item.id !== completedItem.id);
*/

/*
//新しいTodoリストを作成する
const todoListModel = new TodoListModel();
console.log(todoListModel.getTotalCount());
// Todoリストが変更されたら呼ばれるイベントリスナーを登録する
todoListModel.onChange(() => {
    console.log("TodoListの状態が変わりました");
});
//新しいTodoアイテムを追加
todoListModel.addTodo(new TodoItemModel({
    title: "新しいTodoアイテム",
    completed: false
}));
// Todoリストにアイテムが増える
console.log(todoListModel.getTotalCount()); // => 1
*/