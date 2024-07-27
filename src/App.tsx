import { useState, useEffect } from 'react';
import Button from './components/Button';
import Form from './components/Form';
import Card from 'react-bootstrap/Card';
import List from './components/List';
import Clock from './components/Clock';
import History from './components/History';

interface Task {
    label: string;
    time: string;
    id: number;
}

function App() {
    const [tasks, setTasks] = useState<Task[]>(() => {
        // Carregar tarefas do localStorage ao inicializar
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

    const [showHistory, setShowHistory] = useState<Boolean>(false);

    useEffect(() => {
        // Salvar tarefas no localStorage sempre que forem adicionadas ou removidas
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    return (
        <div>
            <div className="main-card card">
                <div className="card-header text-center">
                    <h3>
                        <Clock />
                    </h3>
                </div>
                <div className="mb-3 p-3 d-flex justify-content-end">
                    {!showHistory ? (
                        <button
                            className="btn btn-one"
                            onClick={() => setShowHistory(true)}
                        >
                            History
                        </button>
                    ) : (
                        <button
                            className="btn btn-second"
                            onClick={() => setShowHistory(false)}
                        >
                            Voltar
                        </button>
                    )}
                </div>
                {!showHistory ? (
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
                                        { label, time, id },
                                    ]);
                                }}
                            />
                        </div>

                        <div className="col col-xl-6">
                            <List tasks={tasks} />
                        </div>
                    </div>
                ) : (
                    <History tasks={tasks} />
                )}
            </div>
        </div>
    );
}

export default App;
