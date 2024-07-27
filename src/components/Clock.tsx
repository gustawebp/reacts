import React, { useEffect, useState } from 'react';

const Clock = () => {
    const [realTime, setRealTime] = useState<string>('');

    useEffect(() => {
        const intervalId = setInterval(() => {
            let date = new Date();
            let now = date.toLocaleString();
            setRealTime(now);
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return <h4>{realTime || '...'}</h4>;
};

export default Clock;
