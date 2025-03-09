import axios from 'axios';
import { useEffect } from 'react';
import { API_URL } from '../constants';

function TriggerCron() {
    const fetchData = async () => {
        const res = await axios.get(API_URL + '/scheduler-cron');
    };

    useEffect(() => {
        fetchData();
        const intervalId = setInterval(fetchData, 5000);
    
        return () => clearInterval(intervalId);
      }, []);

    return (
        <></>
    );
}

export default TriggerCron;
