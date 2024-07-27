import React, { useState } from 'react';
import Button from './Button';

interface FormProps {
    onSubmit: (label: string, time: string, id: number) => void;
}

const Form: React.FC<FormProps> = ({ onSubmit }) => {
    const [label, setLabel] = React.useState<string>('');
    const [time, setTime] = React.useState<string>('');

    function generateId() {
        return Math.random();
    }

    return (
        <form className="form" style={{ height: '200px' }}>
            <div className="d-flex justify-content-center">
                <div
                    style={{
                        flexDirection: 'row',
                    }}
                >
                    <div className="mb-3 text-start">
                        <h6 className="mb-2 fsb">Label</h6>
                        <input
                            type="text"
                            placeholder="Task"
                            className="form-control w-100"
                            required
                            value={label}
                            onChange={(e) => setLabel(e.target.value)}
                        ></input>
                    </div>

                    <div className="mb-3 text-start">
                        <h6 className="mb-2 fsb">Time</h6>
                        <input
                            type="time"
                            placeholder="Task"
                            step="1"
                            className="form-control w-100"
                            required
                            name="time"
                            id="time"
                            min="00:00:00:00"
                            max="01:30:00:00"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                        ></input>
                    </div>
                    <div className="d-flex justify-content-center">
                        <Button
                            onClick={() => {
                                onSubmit(label, time, generateId());
                                setLabel('');
                                setTime('00:00:00:00');
                            }}
                            text="Add Task"
                            className="t"
                        />
                    </div>
                </div>
            </div>
        </form>
    );
};
export default Form;
