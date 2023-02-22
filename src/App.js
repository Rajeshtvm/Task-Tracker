import { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const taskFromServer = await fetchTasks()
      setTasks(taskFromServer);
    }
    getTasks()
  }, [])

  // fetch taks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    //console.log(data)
    return data
  }

  // Fetch Task for Update
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()
    //console.log(data)
    return data
  }
  //Add Task
  // const addTask = (task) => {
  //   //console.log(task);
  //   const id = Math.floor(Math.random() * 1000) + 1
  //   const newTask = { id, ...task }
  //   setTasks([...tasks, newTask])
  // }

  const addTask = async (task) => {
    //console.log(task);
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    const data = await res.json()
    setTasks([...tasks, data])
  }
  // Delete Task
  // const deleteTask = (id) => {

  //   setTasks(tasks.filter((task) => task.id !== id))
  // }

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })
    setTasks(tasks.filter((task) => task.id !== id))
  }
  // //Toggle Reminder
  // const toggleReminder = (id) => {
  //   setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: !task.reminder } : task))
  // }

  //Toggle Reminder for Update
  const toggleReminder = async (id) => {
    const taskToggle = await fetchTask(id)
    const updatedTask = { ...taskToggle, reminder: !taskToggle.reminder }
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    })
    const data = await res.json()
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task))
  }

  return (
    <BrowserRouter>
      <div className="container">
        <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
        {/* {showAddTask && <AddTask onAdd={addTask} />}
        {tasks.length > 0 ? <Tasks tasks={tasks}
          onDelete={deleteTask}
          onToggle={toggleReminder} /> : 'No Tasks To Show'} */}
        <Routes>
          <Route path='/' element ={
            <>
              {showAddTask && <AddTask onAdd={addTask} />}
              {tasks.length > 0 ? <Tasks tasks={tasks}
                onDelete={deleteTask}
                onToggle={toggleReminder} /> : 'No Tasks To Show'}
            </>
          } />
          <Route path="about" element={<About />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

//JSON Server
// npm run build => to build the app to publish
// npm i -g serve to deployee app in local 
//serve -s build -p 8000

//Mock Back end
// JSON Server npm install json-server
// In the script section of the package
//"server": "json-server --watch db.json --port 5000"
// To see the josn in port 500 => npm run server