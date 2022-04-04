import Header from "./components/Header/Header";
import AddTodo from "./components/AddTodo/AddTodo";
import Todos from "./components/Todos/Todos";
import { useSelector } from "react-redux";

function App() {
  const todos = useSelector((state) => state.todos.todos);
  return (
    <main data-testid="app-body">
      <Header title="Todo App" />
      <AddTodo />
      <Todos todos={todos} />
    </main>
  );
}

export default App;
