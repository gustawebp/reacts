import { useState } from 'react';
import Button from './components/Button';
import Form from './components/Form';
import Card from 'react-bootstrap/Card';
import List from './components/List';
import Clock from './components/Clock';

interface Task {
    label: string;
    time: string;
    id: number;
}

function App() {
    const [tasks, setTasks] = useState<Task[]>([]);

    return (
        <div>
            <div className="main-card card">
                <div className="card-header text-center">
                    <h3>
                        <Clock />
                    </h3>
                </div>
                <div
                    className="card-body"
                    style={{ display: 'flex', alignItems: 'center' }}
                >
                    <div className="col col-xl-6">
                        <Form
                            onSubmit={(
                                label: string,
                                time: string,
                                id: number,
                            ) => {
                                setTasks((prevTasks: Task[]) => [
                                    ...prevTasks,
                                    {
                                        label: label,
                                        time: time,
                                        id: id,
                                    },
                                ]);
                            }}
                        />
                    </div>

                    <div className="col col-xl-6">
                        <List tasks={tasks} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
