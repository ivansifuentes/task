import axios from 'axios';
import { useState } from 'react';
import { API_URL } from '../constants';

export enum TaskType {
    RECURRENT = 'RECURRENT',
    ONE_TIME = 'ONE_TIME',
}

export type Task = {
    id: string;
    type: TaskType;
    schedule: string;
}

export type TaskSchedule = {
    taskId: string;
    at: string; // Date ISO string
    schedule: string;
    taskType: TaskType;
    executedAt?: string;
}

function TaskScheduler() {
    const [oneTime, setOneTime] = useState<string | undefined>(new Date().toISOString());
    const [recurrent, setRecurrent] = useState<string | undefined>();
    const [error, setError] = useState<string | undefined>();
    const [message, setMessage] = useState<string | undefined>();

    const sendOneTime = async () => {
        try {
            if (!oneTime)
                return;

            setError(undefined);
            setMessage(undefined);
            const res = await axios.post(API_URL + '/add-one-time', { oneTime });
            if (res.status === 200)
                setMessage('One time task added successfully!');
        } catch (e: any) {
            setError(e.message ?? 'Something went wrong');
        }
    }

    const sendRecurrent = async () => {
        try {
            if (!recurrent)
                return;

            setError(undefined);
            setMessage(undefined);
            const res = await axios.post(API_URL + '/add-recurrent-task', { recurrent });
            if (res.status === 200)
                setMessage('Recurrent task added successfully!');
        } catch (e: any) {
            setError(e.message ?? 'Something went wrong');
        }
    }

    return (
        <div className='div-col full-width'>
            <div className='div-row'>
                <div className='input-card div-col half-width'>
                    <label className='card-header my-10'>Schedule a one time task</label>
                    <input
                        type="text"
                        className='my-10'
                        onChange={(e) => setOneTime(e.target.value)}
                        value={oneTime}
                    />
                    <input
                        type="button"
                        className='my-10'
                        value="Save"
                        onClick={() => sendOneTime()}
                    />
                </div>
                <div className='input-card div-col half-width'>
                    <label className='card-header my-10'>Schedule a recurrent task</label>
                    <input
                        type="text"
                        className='my-10'
                        onChange={(e) => setRecurrent(e.target.value)}
                        placeholder='Use crontab format'
                    />
                    <input
                        type="button"
                        className='my-10'
                        value="Save"
                        onClick={() => sendRecurrent()}
                    />
                </div>
            </div>
            {error && (
                <div className='error-div'>
                    {error}
                </div>
            )}
            {message && (
                <div className='message-div'>
                    {message}
                </div>
            )}
        </div>
    );
}

export default TaskScheduler;
