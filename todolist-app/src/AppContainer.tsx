import produce from "immer";
import React, { useState } from "react";
import App from "./components/App";

export type TodoListItemType = {
  no: number;
  todo: string;
  done: boolean;
};

const AppContainer = () => {
  const [todoList, setTodoList] = useState<Array<TodoListItemType>>([
    { no: 1, todo: "React학습1", done: false },
    { no: 2, todo: "React학습2", done: false },
    { no: 3, todo: "React학습3", done: true },
    { no: 4, todo: "React학습4", done: false },
  ]);

  const addTodo = (todoStr: string) => {
    let newTodoList = produce(todoList, (draft) => {
      draft.push({ no: new Date().getTime(), todo: todoStr, done: false });
    });
    setTodoList(newTodoList);
  };

  const deleteTodo = (noNum: number) => {
    let index = todoList.findIndex((todo) => todo.no === noNum);
    let newTodoList = produce(todoList, (draft) => {
      draft.splice(index, 1);
    });
    setTodoList(newTodoList);
  };
  const toggleDone = (noNum: number) => {
    let index = todoList.findIndex((todo) => todo.no === noNum);
    let newTodoList = produce(todoList, (draft) => {
      draft[index].done = !draft[index].done;
    });
    setTodoList(newTodoList);
  };

  return (
    <App
      todoList={todoList}
      addTodo={addTodo}
      deleteTodo={deleteTodo}
      toggleDone={toggleDone}
    />
  );
};

export default AppContainer;
