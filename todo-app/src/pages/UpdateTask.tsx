import TaskForm from "../components/TaskForm";
import { useParams } from "react-router-dom";

function UpdateTask() {
  const { id } = useParams<{ id: string }>();
  return (
    <div>
      <h2>Edit Task</h2>
      <TaskForm mode="edit" taskId={Number(id)} />
    </div>
  );
}

export default UpdateTask;
