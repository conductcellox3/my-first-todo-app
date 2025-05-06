'use client'

import { useState } from "react"

export default function Home() {
  const [todos, setTodos] = useState<string[]>([])
  const [input, setInput] = useState('')

  //Add Todo item
  const addTodo = () => {
    if (!input.trim()) return
    setTodos([...todos, input])
    setInput('')
  }

  //Delete Todo item
  const deleteTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index))
  }

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
        {todos.map((todo, index) => (
          <li key={index} className="flex items-center justify-between border-b py-2">
            <span>{todo}</span>
            <button
            className="text-red-500"
            onClick={() => deleteTodo(index)}>
              削除
            </button>
          </li>

        ))}
      </ul>
    </div>
  )
}