/*import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}*/
import {useState, useEffect} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './components/Layout';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

const App = () => {
  const [todos, setTodos] = useState([]); // Danh sách công việc
  const [todo, setTodo] = useState(''); // Công việc nhập vào
  const [editingId, setEditingId] = useState(null);

  // Hàm xử lý khi thêm công việc mới
  /*const handleSubmit = async (event) => {
    event.preventDefault();
    if (todo.trim()) {
      try {
        // Gửi công việc mới đến backend
        const response = await axios.post('http://localhost:5000/api/todos', { text: todo });
        setTodos([...todos, response.data]); // Cập nhật danh sách công việc
        setTodo(''); // Xóa nội dung input sau khi thêm
      } catch (error) {
        console.error('Lỗi khi thêm công việc:', error);
      }
    }
  };*/
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (todo.trim()) {
        if (editingId) {
            // Cập nhật công việc
            try {
                await axios.put(`http://192.168.48.152:5000/api/todos/${editingId}`, { text: todo, completed: false });
                setTodos(todos.map((t) => (t.id === editingId ? { ...t, text: todo } : t))); // Cập nhật công việc trong danh sách
                setEditingId(null); // Đặt lại trạng thái chỉnh sửa
            } catch (error) {
                console.error('Lỗi khi cập nhật công việc:', error);
            }
        } else {
            // Thêm công việc mới
            try {
                const response = await axios.post('http://192.168.48.152:5000/api/todos', { text: todo });
                setTodos([...todos, response.data]); // Cập nhật danh sách công việc
            } catch (error) {
                console.error('Lỗi khi thêm công việc:', error);
            }
        }
        setTodo(''); // Xóa input sau khi thêm hoặc cập nhật
    }
};

  // Hàm xử lý khi xóa công việc
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://192.168.48.152:5000/api/todos/${id}`); // Xóa công việc từ backend
      const updatedTodos = todos.filter((todo) => todo.id !== id); // Cập nhật danh sách công việc
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Lỗi khi xóa công việc:', error);
    }
  };
  const handleEdit = (todo) => {
    setTodo(todo.text); // Đặt giá trị công việc vào input
    setEditingId(todo.id); // Lưu ID công việc đang chỉnh sửa
  };
  // Hàm để lấy danh sách công việc từ backend khi ứng dụng khởi động
  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://192.168.48.152:5000/api/todos');
      setTodos(response.data); // Cập nhật danh sách công việc
    } catch (error) {
      console.error('Lỗi khi lấy danh sách công việc:', error);
    }
  };

  useEffect(() => {
    fetchTodos(); // Gọi hàm khi ứng dụng khởi động
  }, []);

  /*return (
      <div className="App">
          <h1>Danh sách công việc</h1>
          <TodoForm handleSubmit={handleSubmit} setTodo={setTodo} todo={todo} />
          <TodoList todos={todos} setTodos={setTodos} handleDelete={handleDelete} />
      </div>
  );*/
  return (
    <div className="App">
      <h1>Danh sách công việc</h1>
      <TodoForm handleSubmit={handleSubmit} setTodo={setTodo} todo={todo} editingId={editingId} />
      <TodoList todos={todos} handleDelete={handleDelete} handleEdit={handleEdit} />
    </div>
  );
};


export default App;
