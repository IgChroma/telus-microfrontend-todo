import React from 'react'
import ReactDOM from 'react-dom/client'
import TodoList from "remote/TodoList";

import './index.css'

const App = () => (
  <div className="container">
    <TodoList/>
  </div>
)
const rootElement = document.getElementById('app')
if (!rootElement) throw new Error('Failed to find the root element')

const root = ReactDOM.createRoot(rootElement as HTMLElement)

root.render(<App />)
