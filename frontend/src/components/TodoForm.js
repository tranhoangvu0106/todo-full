// todoform.js
import React from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

/*const TodoForm = ({ handleSubmit, setTodo, todo }) => {
    return (
      <Form onSubmit={handleSubmit}>
        <InputGroup className='mb-3'>
          <FormControl
            placeholder='Nhập công việc...'
            aria-label='Todo'
            onChange={(event) => {
              setTodo(event.target.value);
            }}
            value={todo}
          />
          <Button variant='outline-primary' type='submit'>
            Thêm Todo
          </Button>
        </InputGroup>
      </Form>
    );
  };*/
  const TodoForm = ({ handleSubmit, setTodo, todo, editingId }) => {
    return (
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicTodo">
          <Form.Label>Công việc</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập công việc"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {editingId ? 'Cập nhật' : 'Thêm'}
        </Button>
      </Form>
    );
  };
  
export default TodoForm;