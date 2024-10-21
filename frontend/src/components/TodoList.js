import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

const TodoList = ({ todos, handleDelete, handleEdit }) => {
    return (
      <ListGroup>
        {todos.map((todo) => (
          <ListGroup.Item key={todo.id} className="d-flex justify-content-between align-items-center">
            <span>{todo.text}</span>
            <Button variant="warning" onClick={() => handleEdit(todo)}>Sửa</Button>
            <Button variant="danger" onClick={() => handleDelete(todo.id)}>
              Xóa
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    );
};
  
export default TodoList;