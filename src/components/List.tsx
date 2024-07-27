import React, { useEffect, useState } from 'react';
import { MdOutlineTask } from 'react-icons/md';
import { MdOutlineCalendarToday } from 'react-icons/md';
import { BsClock } from 'react-icons/bs';

interface Task {
    label: string;
    time: string; // Time in HH:MM:SS format
    id: number;
}

interface ListProps {
    tasks: Task[];
}

const List: React.FC<ListProps> = ({ tasks }) => {
    const [remainingTimes, setRemainingTimes] = useState<{
        [key: number]: string;
    }>({});

    const parseTime = (timeString: string) => {
        if (!timeString) return 0; // Handle undefined or empty timeString
        const [hours, minutes, seconds] = timeString.split(':').map(Number);
        return hours * 3600 + minutes * 60 + seconds; // convert to seconds
    };

    const formatTime = (totalSeconds: number) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
            2,
            '0',
        )}:${String(seconds).padStart(2, '0')}`;
    };

    useEffect(() => {
        const newRemainingTimes: { [key: number]: string } = {};
        tasks.forEach((task) => {
            newRemainingTimes[task.id] = task.time;
        });
        setRemainingTimes(newRemainingTimes);

        const intervalId = setInterval(() => {
            setRemainingTimes((prevRemainingTimes) => {
                const updatedRemainingTimes: { [key: number]: string } = {};

                tasks.forEach((task) => {
                    const remainingTimeInSeconds = parseTime(
                        prevRemainingTimes[task.id],
                    );
                    if (remainingTimeInSeconds > 0) {
                        updatedRemainingTimes[task.id] = formatTime(
                            remainingTimeInSeconds - 1,
                        );
                    } else {
                        updatedRemainingTimes[task.id] = 'Time expired';
                    }
                });

                return updatedRemainingTimes;
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, [tasks]);

    if (!tasks || tasks.length === 0) {
        return <h6 className="text-center">No pending tasks</h6>;
    }

    const getClassBasedOnTime = (time: string) => {
        const remainingTimeInSeconds = parseTime(time);
        if (remainingTimeInSeconds < 300) {
            return 'text-danger'; // Red color for less than 5 minutes
        } else if (remainingTimeInSeconds < 600) {
            return 'text-warning'; // Yellow color for less than 10 minutes
        }
        return '';
    };

    return (
        <div className="" style={{ height: '200px' }}>
            <h4 className="text-center mb-2">Task List</h4>
            <div>
                {tasks.map((task) => (
                    <div className="border mb-2 p-2 item" key={task.id}>
                        <div className="mb-3">
                            <h5 className="mb-0 fb">
                                <span className="icon me-2">
                                    <MdOutlineTask />
                                </span>
                                {task.label}
                            </h5>
                        </div>

                        <div
                            className="text-end w-100"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <h6 className="fm">
                                <span className="icon me-2">
                                    <MdOutlineCalendarToday />
                                </span>
                                {task.time}
                            </h6>
                            <h6
                                className={getClassBasedOnTime(
                                    remainingTimes[task.id],
                                )}
                            >
                                <span className="icon me-2">
                                    <BsClock />
                                </span>
                                {remainingTimes[task.id]
                                    ? remainingTimes[task.id]
                                    : 'Calculating...'}
                            </h6>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default List;
