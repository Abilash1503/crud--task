import React, { useRef, useState } from 'react'
import './App.css'

function CRUD() {
    const list = [
        {
            id: 1, 
            name: "User1",
            Last: "o",
            Email:"User907@gmail.com"
        },
        {
            id: 2, 
            name: "User2",
            Last: "o",
            Email:"User907@gmail.com"
        },
        {
            id: 3, 
            name: "User3",
            Last: "o",
            Email:"User907@gmail.com"
        },
        {
            id: 4, 
            name: "User4",
            Last: "o",
            Email:"User907@gmail.com"
        },
        {
            id: 5, 
            name: "User5",
            Last: "o",
            Email:"User907@gmail.com"
        },
    ]
    const [lists, setList] = useState(list)
    const [updateState, setUpdateState] = useState(-1)
    return(
        
        <div className='crud'>
            
            <div>
                <h1>Student Data</h1>
            <AddList setList = {setList }/>
            <form onSubmit={handleSubmit}>
            <table>
                {
                    lists.map((current) => (
                        updateState === current.name ? <EditList current={current} lists={lists} setList={setList}/> :
                        <tr>
                            <td>{current.name}</td>
                            <td>{current.Last}</td>
                            <td>{current.Email}</td>
                            <td>
                                <button className='edit' onClick={() => handleEdit(current.name)}>Edit</button>
                                <button className='delete' type='button' onClick={() => handleDelete(current.name)}>Delete</button>
                            </td>
                        </tr>
                    ))
                }
            </table>
            </form>
            </div>
        </div>
    )

    function handleEdit(name) {
        setUpdateState(name)
    }
    function handleDelete(name) {
        const newlist = lists.filter((li) => li.name !== name)
        setList(newlist)
    }
    function handleSubmit(event) {
        event.preventDefault()
        const name = event.target.elements.name.value
        const Last = event.target.elements.Last.value
        const Email = event.target.elements.Email.value
        const newlist = lists.map((li) => (
            li.id === updateState ? {...li, name:name,Last:Last,Email:Email} : li
        ))

        setList(newlist)
        setUpdateState(-1)
    }
}

function EditList({current, lists, setList}) {
    function handInputname(event) {
        const value = event.target.value;
        const newlist = lists.map((li) => (
            li.id === current.id ? {...li, name :value} : li
        ))

        setList(newlist)
    }
    function handInputprice(event) {
        const value = event.target.value;
        const newlist = lists.map((li) => (
            li.id === current.id ? {...li, Last :value} : li
        ))

        setList(newlist)
    }
    return(
        <tr>
            <td><input type="text" onChange={handInputname} name='name' value={current.name}/></td>
            <td><input type="text" onChange={handInputprice} name='Last' value={current.Last}/></td>
            <td><input type="text" onChange={handInputprice} name='Email' value={current.Email}/></td>
            <td><button type='submit'>Update</button></td>
        </tr>
    )
}

function AddList({setList}) {
    const nameRef = useRef()
    const LastRef = useRef()
    const EmailRef = useRef()

    function handleSubmit(event) {
        event.preventDefault();
        const name = event.target.elements.name.value;
        const Last = event.target.elements.Last.value;
        const Email = event.target.elements.Email.value;
        const newlist = {
            id: 3,
            name,
            Last,
            Email
        }
        setList((prevList)=> {
            return prevList.concat(newlist)
        })
        nameRef.current.value = ""
        LastRef.current.value = ""
        EmailRef.current.value = ""
    }
    return(
        <form className='addForm' onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Enter Name" ref={nameRef}/>
            <input type="text" name="Last" placeholder="Last name" ref={LastRef}/>
            <input type="text" name="Email" placeholder="Email" ref={EmailRef}/>
            <button type="submit">Add</button>
        </form>
    )
}

export default CRUD;