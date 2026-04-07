//console.log("App.js: loaded");
import {element, render} from "./view/html-util.js";
import {TodoItemModel} from "./model/TodoItemModel.js";
import {TodoListModel} from "./model/TodoListModel.js";

export class App {
    // constructor () {
    //     console.log("App initialized");
    // }
    mount() {
        const formElement = document.querySelector("#js-form");
        const inputElement = document.querySelector("#js-form-input");
        const containerElement = document.querySelector("#js-todo-list");
        const todoItemCountElement = document.querySelector("#js-todo-count");
        //TodoリストをまとめるList要素
        const todoListElement = element`<ul></ul>`;
        //Todoアイテム数
        let todoItemCount = 0;
        formElement.addEventListener("submit", (event) => {
             // submitイベントの本来の動作を止める
            event.preventDefault();
            /*console.log(`入力欄の値: ${inputElement.value}`);*/
            //追加するTodoアイテムの要素(li要素)を作成する            
            const todoItemElement = element`<li>${inputElement.value}</li>`;
            //TodoアイテムをtodoListElementに追加する
            todoListElement.appendChild(todoItemElement);
            //コンテナ要素の中身をTodoリストをまとめるList要素で上書きする
            render(todoListElement, containerElement);
            //Todoアイテム数を+1し、表示されているテキストを更新する
            todoItemCount += 1;
            todoItemCountElement.textContent = `Todoアイテム数: ${todoItemCount}`;
            //入力欄を空文字列にしてリセットする
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