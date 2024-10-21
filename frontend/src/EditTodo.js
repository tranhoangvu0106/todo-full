import React, { useState } from 'react';

function EditTodo({ todo }) {
  const [text, setText] = useState(todo.text);

  const handleUpdateTodo = async () => {
    // Implement API call to update the ToDo item here
    if (!text) return; // Ngăn không cho cập nhật Todo rỗng

    try {
      const response = await fetch(`/api/todo/${todo._id}`, { // Đường dẫn API
        method: 'PUT', // Sử dụng PUT để cập nhật
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, completed: todo.completed }), // Gửi dữ liệu dưới dạng JSON
      });

      if (response.ok) {
        const updatedTodo = await response.json(); // Nhận Todo đã cập nhật
        console.log('Todo updated:', updatedTodo);
        onUpdate(updatedTodo); // Gọi hàm callback để cập nhật trạng thái trong component cha
      } else {
        console.error('Failed to update Todo');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleUpdateTodo}>Update</button>
    </div>
  );
}

export default EditTodo;