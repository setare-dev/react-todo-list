import todoApi from '../../api/todoApi';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';

import { setTodos } from './../../store/slices/toDoSlice'
import { useDispatch } from 'react-redux'
import AddTodos from './addTodos'
import TodoItem from './todoItem'

const TodosSection = () => {
    const dispatch = useDispatch();

    const getTodods = async () => {
        try {
            const response = await todoApi.get('/to_do')
            if (response.status === 200) {
                dispatch(setTodos(response.data.data.reverse()));
            }

        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        getTodods()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const todos = useSelector(state => state.todos.list)
    console.log(todos);
    return (
        <>
            <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
                <div className="bg-white rounded shadow p-6 m-4 ">
                    <div className="mb-4">
                        <h1 className="text-grey-darkest font-bold ">Todo List</h1>
                        <AddTodos />
                    </div>
                    <div>
                        {todos.length > 0 && todos.map(todo => {
                            return (
                                <TodoItem todo={todo} key={todo.id} />
                            )
                        })}
                    </div>
                </div>
            </div>

        </>
    )
}

export default TodosSection