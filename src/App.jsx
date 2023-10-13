
import { useEffect, useState } from 'react'
import './App.css'


function App() {
  const [users, setUser] = useState([]);

  console.log(users)
  useEffect(() => {
    fetch('http://localhost:5000/user')
      .then(res => res.json())
      .then(data => setUser(data))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = {name,email}
    console.log(user)
    fetch('http://localhost:5000/user', {
      method: 'POST',
      headers:{
        'content-type':'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res=> res.json())
    .then(data =>{
      console.log(data);
      const newUser = [...users, data];
      setUser(newUser) ;
    })
  }

  return (
    <>

      <h1>User Management system</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" id="" />
        <br />
        <input type="email" name="email" id="" />
        <br />
        <input type="submit" name="submit" id="" />
      </form>
      <h3>User Management system: {users.length} </h3>

      {
        users.map(user => <p key={user.id}>{user.id}: {user.name}: {user.email} </p>)
      }
    </>
  )
}

export default App
