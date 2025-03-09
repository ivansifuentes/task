import './App.css';
import ExecutedTasks from './app/ExecutedTasks';
import ScheduledTasks from './app/ScheduledTasks';
import TaskScheduler from './app/TaskScheduler';
import TriggerCron from './app/TriggerCron';

function App() {
  return (
    <div className="div-col">
      <div>
        <TaskScheduler />
      </div>
      <div>
        <ScheduledTasks />
        <ExecutedTasks />
      </div>
      <TriggerCron />
    </div>
  );
}

export default App;
