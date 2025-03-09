import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_URL } from '../constants';
import { TaskSchedule } from './TaskScheduler';


function ExecutedTasks() {
    const [executed, setExecuted] = useState<Array<TaskSchedule>>([]);

    const fetchData = async () => {
        const res = await axios.get(API_URL + '/fetch-executed-tasks');
        const list: Array<TaskSchedule> = [];
        try {
            for (const task of res.data) {
                list.push(task);
            }
        } catch (e: any) {
            console.log(e);
        }
        setExecuted(list);
    };

    useEffect(() => {
        fetchData();
        const intervalId = setInterval(fetchData, 5000);
    
        return () => clearInterval(intervalId);
      }, []);

    return (
        <div className='full-width task-list-section'>
            <div className='task-list-header'>
                Executed Tasks
            </div>
            <div className='div-col executed-task-list'>
                <div className='div-row task-list-row task-header'>
                    <div className='executed-task-column'>
                        Scheduled at
                    </div>
                    <div className='executed-task-column'>
                        Schedule
                    </div>
                    <div className='executed-task-column'>
                        Executed at
                    </div>
                    <div className='executed-task-column'>                        
                        Type
                    </div>
                </div>
                <div className='task-list div-col'>
                    {executed.map((st, i) => (
                        <div key={`${st.taskId}-${i}`} className='div-row task-list-row'>
                            <div className='executed-task-column'>
                                {new Date(st.at).toLocaleString()}
                            </div>
                            <div className='executed-task-column'>
                                {st.schedule}
                            </div>
                            <div className='executed-task-column'>
                                {new Date(st.executedAt!).toLocaleString()}
                            </div>
                            <div className='executed-task-column'>
                                {st.taskType}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ExecutedTasks;
