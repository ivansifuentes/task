import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_URL } from '../constants';
import { TaskSchedule } from './TaskScheduler';


function ScheduledTasks() {
    const [scheduled, setScheduled] = useState<Array<TaskSchedule>>([]);
    const [message, setMessage] = useState<string | undefined>();

    const fetchData = async () => {
        const res = await axios.get(API_URL + '/fetch-scheduled-tasks');
        const list: Array<TaskSchedule> = [];
        try {
            for (const taskEntry of res.data) {
                list.push(JSON.parse(taskEntry.value));
            }
        } catch (e: any) {
            console.log(e);
        }
        setScheduled(list);
    };

    useEffect(() => {
        fetchData();
        const intervalId = setInterval(fetchData, 5000);
    
        return () => clearInterval(intervalId);
      }, []);

    const deleteTask = async (taskId: string) => {
        setMessage(undefined);
        try {
            const res = await axios.post(API_URL + '/delete-task', { taskId });
            if (res.status === 200)
                setMessage('Task deleted successfully!');
        } catch (e: any) {
        }
    }

    return (
        <div className='full-width task-list-section'>
            {message && (
                <div className='message-div'>
                    {message}
                </div>
            )}
            <div className='task-list-header'>
                Scheduled Tasks
            </div>
            <div className='div-col scheduled-task-list'>
                <div className='div-row task-list-row task-header'>
                <div className='scheduled-task-column'>
                        Type
                    </div>
                    <div className='scheduled-task-column'>
                        Next at
                    </div>
                    <div className='scheduled-task-column'>
                        Schedule
                    </div>
                    <div className='scheduled-task-column'>                        
                        Action
                    </div>
                </div>
                <div className='task-list div-col'>
                    {scheduled.map((st, i) => (
                        <div key={`${st.taskId}-${i}`} className='div-row task-list-row'>
                            <div className='scheduled-task-column'>
                                {st.taskType}
                            </div>
                            <div className='scheduled-task-column'>
                                {new Date(st.at).toLocaleString()}
                            </div>
                            <div className='scheduled-task-column'>
                                {st.schedule}
                            </div>
                            <div className='scheduled-task-column'>                        
                                <input
                                    type="button"
                                    onClick={() => deleteTask(st.taskId)}
                                    value="Delete"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ScheduledTasks;
