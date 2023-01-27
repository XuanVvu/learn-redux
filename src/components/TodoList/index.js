import { Col, Row, Input, Button, Select, Tag } from 'antd';
import Todo from '../Todo';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo } from '../../redux/actions';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { todoListSelector, searchTextSelector, todosRemainingSelector } from '../../redux/selectors';


export default function TodoList() {
  const dispatch = useDispatch();
  const [todoName, setTodoName] = useState('')
  const [priority, setPriority ] = useState('Medium')
  const [validationMsg, setVadidationMsg] = useState('')

  const todoList = useSelector(todosRemainingSelector)
  // const searchText = useSelector(searchTextSelector)
  
  const handleAddBtnClick = () => {
    if(todoName) {
        dispatch(addTodo({
          id: uuidv4(),
          name: todoName,
          priority:priority,
          completed: false
        }))

        setTodoName('')
        setPriority('Medium')
        setVadidationMsg('')

    } else {
      setVadidationMsg('Please enter your todo')
    }

  }


  const handleOnChangeInput = (e) =>{
      setTodoName(e.target.value)
      
  }

  const handlePriorityChange = (value) => {
      setPriority(value)
  }


  return (
    <Row style={{ height: 'calc(100% - 40px)' }}>
      <Col span={24} style={{ height: 'calc(100% - 40px)', overflowY: 'auto' }}>

        {
            todoList.map((item, key) => (
              <Todo key={item.id} id={item.id} name={item.name} prioriry={item.priority} completed={item.completed}/>
            ))
        }
        
      </Col>
      <Col span={24}>
        <Input.Group style={{ display: 'flex' }} compact>
          <Input onChange={(e) => handleOnChangeInput(e)} value={todoName}/>
          <Select defaultValue="Medium" value={priority} onChange={handlePriorityChange}>
            <Select.Option value='High' label='High'>
              <Tag color='red'>High</Tag>
            </Select.Option>
            <Select.Option value='Medium' label='Medium'>
              <Tag color='blue'>Medium</Tag>
            </Select.Option>
            <Select.Option value='Low' label='Low'>
              <Tag color='gray'>Low</Tag>
            </Select.Option>
          </Select>
          <Button type='primary' onClick={handleAddBtnClick}>
            Add
          </Button>
        </Input.Group>
      </Col>
      <p style={{color:'red'}}>{validationMsg}</p>
    </Row>
  );
}
