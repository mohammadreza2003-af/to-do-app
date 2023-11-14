import { useState } from "react";
import "./index.css"; // Import the CSS file for styling

const initialTasks = [
  { num: 1, task: "Learning React", start: 1, end: 3 },
  { num: 2, task: "Learning Git", start: 3, end: 4 },
  { num: 3, task: "Learning JavaScript", start: 4, end: 5 },
];

export default function App() {
  const [tasks, setTasks] = useState(initialTasks);

  const handleDelete = (item) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.num !== item.num));
  };

  const onTaskAdd = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleReset = () => {
    setTasks([]);
  };

  return (
    <>
      <div className="app-container">
        <Navbar />
        <Main
          tasks={tasks}
          onDelete={handleDelete}
          onReset={handleReset}
          onTaskAdd={onTaskAdd}
        />
      </div>
      <Footer />
    </>
  );
}

function Navbar() {
  return (
    <nav className="nav-bar">
      <h1>{`{ TO-DO }`}</h1>
    </nav>
  );
}

function Main({ tasks, onDelete, onReset, onTaskAdd }) {
  const [addTask, setAddTask] = useState(false);

  const handleToAdd = (flag) => {
    setAddTask(flag);
  };

  return (
    <main className="main">
      <TaskBox
        tasks={tasks}
        onDelete={onDelete}
        onReset={onReset}
        onAdd={handleToAdd}
      />
      {addTask && (
        <TaskAddBox tasks={tasks} onTaskAdd={onTaskAdd} onAdd={handleToAdd} />
      )}
    </main>
  );
}

function TaskBox({ tasks, onDelete, onReset, onAdd }) {
  return (
    <div className="box">
      <TaskList tasks={tasks} onDelete={onDelete} />
      <div className="button-container">
        <button className="btn-add" onClick={() => onAdd(true)}>
          Add Task
        </button>
        {tasks.length > 0 && (
          <button className="btn-reset" onClick={onReset}>
            Reset
          </button>
        )}
      </div>
    </div>
  );
}

function TaskList({ tasks, onDelete }) {
  return (
    <ul className="list">
      <Task tasks={tasks} onDelete={onDelete} />
    </ul>
  );
}

function Task({ tasks, onDelete }) {
  return tasks.map((task) => (
    <li key={task.num}>
      <span className="li-num">{task.num}</span>
      <div className="span-task">
        <span>{task.task}: </span>
        <span>
          {convertTo12HourFormat(task.start)} to{" "}
          {convertTo12HourFormat(task.end)}
        </span>
        <span className="close" onClick={() => onDelete(task)}>
          ❌
        </span>
      </div>
    </li>
  ));
}

function convertTo12HourFormat(time24) {
  const numToS = time24.toString();
  const [hours] = numToS.split(":");

  let hoursNum = parseInt(hours, 10);

  const period = hoursNum >= 12 ? "PM" : "AM";

  hoursNum = hoursNum % 12 || 12;

  return `${hoursNum} ${period}`;
}

function Button({ children }) {
  return <button className="btn-submit">{children}</button>;
}

function TaskAddBox({ onTaskAdd, onAdd, tasks }) {
  const [addTask, setAddTask] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const handleAddTask = (e) => {
    e.preventDefault();

    const newTask = {
      task: addTask,
      start: start,
      end: end,
      num: tasks.length + 1,
    };

    onTaskAdd(newTask);
    onAdd(false);
  };

  return (
    <div className="box">
      <form className="task-box" onSubmit={handleAddTask}>
        <label className="label-task">Your Task: </label>
        <textarea
          type="text"
          value={addTask}
          onChange={(e) => setAddTask(e.target.value)}
        />
        {addTask.length > 0 && (
          <>
            <label className="label-task">Start: </label>
            <input
              type="text"
              value={start}
              placeholder="Should be between 1 to 24"
              onChange={(e) =>
                setStart(
                  +e.target.value > 0 && e.target.value <= 24
                    ? +e.target.value
                    : ""
                )
              }
            />
            {start > 0 && (
              <>
                <label className="label-task">End: </label>
                <input
                  placeholder="Should be between 1 to 24"
                  type="text"
                  value={end}
                  onChange={(e) => {
                    setEnd(
                      +e.target.value > 0 && e.target.value <= 24
                        ? +e.target.value
                        : ""
                    );
                  }}
                />
              </>
            )}
          </>
        )}
        <Button>Submit</Button>
      </form>
    </div>
  );
}
function Footer() {
  return (
    <footer>
      <p>Create by MohammadReza</p>
    </footer>
  );
}
