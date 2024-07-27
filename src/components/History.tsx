import React from 'react';
import { MdOutlineTask } from 'react-icons/md';
import { MdOutlineCalendarToday } from 'react-icons/md';
import { FaCheck } from 'react-icons/fa';

interface Task {
    label: string;
    time: string; // Time in HH:MM:SS format
    id: number;
}

interface ListProps {
    tasks: Task[];
}

const History: React.FC<ListProps> = ({ tasks }) => {
    console.log('history', tasks);
    return (
        <div className="p-4">
            {tasks.map((task) => (
                <div className="border mb-2 p-2 item" key={task.id}>
                    <div
                        className="mb-3"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
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
                    </div>
                </div>
            ))}
        </div>
    );
};

export default History;
