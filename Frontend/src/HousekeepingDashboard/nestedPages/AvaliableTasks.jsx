import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from '@mui/material';

const AvaliableTasks = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get('https://hotel-management-backend-ruby.vercel.app/api/task');
            setTasks(response.data.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const markAsCompleted = async (taskId) => {
        try {
            await axios.put(`https://hotel-management-backend-ruby.vercel.app/api/task/${taskId}`);
            setTasks(prevTasks =>
                prevTasks.map(task =>
                    task._id === taskId ? { ...task, status: 'completed' } : task
                )
            );
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Task Management</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Room Number</TableCell>
                            <TableCell>Task Type</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Scheduled At</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tasks.map((task) => (
                            <TableRow key={task._id}>
                                <TableCell>{task.roomNumber}</TableCell>
                                <TableCell>{task.taskType}</TableCell>
                                <TableCell>{task.status}</TableCell>
                                <TableCell>{new Date(task.scheduledAt).toLocaleString()}</TableCell>
                                <TableCell>
                                    {task.status !== 'completed' ? (
                                        // <Button
                                        // className="theme-btn"
                                        //     variant="contained"
                                        //     color="golden"
                                        //     onClick={() => markAsCompleted(task._id)}
                                        // >
                                        //     Mark as Completed
                                        // </Button>
<Button className="simple-btn" style={{ backgroundColor: "#B89146", color: "white", padding: 10, marginTop: 5 }}
 onClick={() => markAsCompleted(task._id)}
> Mark as Completed<i style={{ marginLeft: '5px' }}></i>
</Button>
                                    ) : (
                                        <Typography variant="body2" color="green">Completed</Typography>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default AvaliableTasks;
