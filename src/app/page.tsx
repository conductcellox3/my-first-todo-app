'use client'

import { useState } from "react"

//GTD settings
type GTDStatus = 'Inbox' | 'NextAction' | 'Waiting' | 'Someday' | 'Completed';
type TodoItem = {
  id: number;
  text: string;
  status: GTDStatus;
};

export default function Home() {
  const [todos, setTodos] = useState<TodoItem[]>([])
  const [input, setInput] = useState('')

  //Add Todo item
  const addTodo = () => {
    if (!input.trim()) return;

    const newTodo: TodoItem = {
      id: Date.now(),//set simple ID from date info
      text: input,
      status: 'Inbox',
    };

    setTodos([...todos, newTodo]);
    setInput('');
  };

  //change GTD status
  const updateStatus = (id:number, newStatus: GTDStatus) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, status:newStatus} : todo
      )
    );
  };

  //Delete Todo item
  const deleteTodo = (index: number) => {
    setTodos(todos.filter(todo => todo.id !== index));
  };

  return (
    <div className="max-w-xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">
        シンプルなTODOアプリ
      </h1>

      {/*TODO入力フォーム*/}
      <div className="flex mb-4">
        <input
        className="flex-grow border border-gray-300 rounded-l-2xl px-4 py-2"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="新しいTODOを入力"
        />
        <button
        className="bg-blue-500 text-white px-4 py-2 rounded-r-xl"
        onClick={addTodo}>
          追加
        </button>
      </div>

      {/*TODOリスト*/}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className="flex items-center justify-between border-b py-2">
            <div>
              <p>{todo.text}</p>
              <select
              className="border rounded text-sm"
              value={todo.status}
              onChange={(e) => updateStatus(todo.id, e.target.value as GTDStatus)}>
                <option value="Inbox">Inbox</option>
                <option value="NextAction">Next Action</option>
                <option value="Waiting">Waiting</option>
                <option value="Someday">Sameday</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <button
            className="text-red-500"
            onClick={() => deleteTodo(todo.id)}>
              削除
            </button>

          </li>

        ))}
      </ul>
    </div>
  )
}