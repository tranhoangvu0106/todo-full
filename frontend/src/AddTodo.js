import React, { useState } from 'react';
function AddTodo(){
    const [text, setText] = useState ('');
    const handleAddTodo = async () => {
        if (!text) return; // Ngăn không cho thêm Todo rỗng

        try {
          const response = await fetch('/api/todo', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text }), // Gửi dữ liệu dưới dạng JSON
          });
    
          if (response.ok) {
            const newTodo = await response.json();
            console.log('New Todo added:', newTodo);
            setText(''); // Xóa input sau khi thêm Todo thành công
          } else {
            console.error('Failed to add Todo');
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
            <button onClick={handleAddTodo}>Update</button>
        </div>
    )
};

export default AddTodo;

