import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, MenuItem, Box } from '@mui/material';
import { toast } from 'react-toastify';

const ScheduleTask = () => {
    const [taskData, setTaskData] = useState({
        roomNumber: '',
        taskType: '',
    });
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await axios.get('https://hotel-management-backend-ruby.vercel.app/api/room');
                setRooms(response.data.data);
            } catch (error) {
                console.error('Error fetching rooms:', error);
            }
        };

        fetchRooms();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTaskData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://hotel-management-backend-ruby.vercel.app/api/task/scheduletask', taskData);
            toast.success('Task scheduled successfully!');
        } catch (error) {
            console.error('Error scheduling task:', error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom textAlign="center">
              Report Issue
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                <TextField
                    fullWidth
                    select
                    label="Room Number"
                    name="roomNumber"
                    value={taskData.roomNumber}
                    onChange={handleChange}
                    margin="normal"
                    required
                >
                    {rooms.map((room) => (
                        <MenuItem key={room._id} value={room.roomNumber}>
                            {room.roomNumber}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    fullWidth
                    select
                    label="Task Type"
                    name="taskType"
                    value={taskData.taskType}
                    onChange={handleChange}
                    margin="normal"
                    required
                >
                    <MenuItem value="cleaning">Cleaning</MenuItem>
                    <MenuItem value="maintenance">Maintenance</MenuItem>
                </TextField>
               
                <Button className='simple-btn' style={{ backgroundColor: "#B89146", color: "white", padding: 10, marginTop: 5 }}
 type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                 Report Issue
                </Button>
            </Box>
        </Container>
    );
};

export default ScheduleTask;
