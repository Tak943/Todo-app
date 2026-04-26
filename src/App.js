//console.log("App.js: loaded");
import {element, render} from "./view/html-util.js";
import {TodoItemModel} from "./model/TodoItemModel.js";
import {TodoListModel} from "./model/TodoListModel.js";
import { TodoListView } from "./view/TodoListView.js";

export class App {
    //TodoListModelの初期化
    #todoListModel = new TodoListModel([]);
    #todoListView = new TodoListView();

    /**
     * Todoを追加するときに呼ばれるリスナー関数
     * @param {string} title
     */
    handleAdd(title) {
        this.#todoListModel.addTodo(new TodoItemModel({title, completed: false}));
    }

    /**
     * Todoの状態を更新した時に呼ばれるリスナー関数
     * @param {{id: number, completed: boolean}}
     */
    handleUpdate({id, completed}) {
        this.#todoListModel.updateTodo({id, completed});
    }

    /**
     * Todoを削除した時に呼ばれるリスナー関数
     * @param {{id: number}}
     */
    handleDelete({id}) {
        this.#todoListModel.deleteTodo({id});
    }

    mount() {
        const formElement = document.querySelector("#js-form");
        const inputElement = document.querySelector("#js-form-input");
        const containerElement = document.querySelector("#js-todo-list");
        const todoItemCountElement = document.querySelector("#js-todo-count");
        //TodoListModelの状態が更新されたら表示を更新する
        this.#todoListModel.onChange(() => {
            // それぞれのTodoItem要素をtodoListElement以下へ追加する
            const todoItems = this.#todoListModel.getTodoItems();
            // todoItemsに対応するTodoListViewを作成する
            const todoListElement = this.#todoListView.createElement(todoItems, {
                // Todoアイテムが更新イベントを発生したときに呼ばれるリスナー関数
                onUpdateTodo: ({id, completed}) => {
                    this.handleUpdate({id, completed});
                },
                // Todoアイテムが削除イベントを発生したときに呼ばれるリスナー関数
                onDeleteTodo: ({id}) => {
                    this.handleDelete({id});
                }
            });

            //コンテナ要素の中身をTodoリストをまとめるList要素で上書きする
            render(todoListElement, containerElement);
            //アイテム数の表示を更新
            todoItemCountElement.textContent = `Todoアイテム数: ${this.#todoListModel.getTotalCount()}`;
        });

        formElement.addEventListener("submit", (event) => {
            event.preventDefault();
            if (inputElement.value === "") {alert("An item is empty!");}
            //新しいTodoItemをTodoListへ追加する
            else {this.handleAdd(inputElement.value);}
            inputElement.value = "";
        });

        const saveElement = document.querySelector("#js-save");
        saveElement.addEventListener("click", () => { 
            localStorage.setItem();
            
            alert("Your TODO is saved!");
        });
    }
}