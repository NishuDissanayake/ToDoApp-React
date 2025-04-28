import TaskList from "../components/TaskList";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <Link to="/add">Add New Task</Link>
      <TaskList />
    </div>
  )
}

export default Home