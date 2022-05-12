import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import {useNavigate} from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import MenuItem from '@mui/material/MenuItem';
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Container from "@mui/material/Container";
import api from "../apiUtil";



export default function AddQuestion() {
    const {useState, useEffect} = React

    const [topic_data, setTopics] = useState([]);
    const [topic, setTopic] = useState('');

    useEffect(  () => {
        const topics = (async () => {
            const data = await api.gettopics();
            setTopics([...data])
        })();
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const question_data = {
            'question': data.get('question'),
            'description': data.get('description'),
            'topic_id': data.get('topic'),
            'user_id': 2
        }
        api.add_question(question_data);
    };

    const style = {
        padding: '50px'
    };

    const handleSelect = (val) => {
        setTopic(val.target.value);
    }

    return (
        <React.Fragment>
            <div style={style}/>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Add a Question
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    id="topic"
                                    select
                                    label="Select"
                                    value={topic}
                                    name="topic"
                                    onChange={handleSelect}
                                    helperText="Please select your Topic"
                                >
                                    {topic_data.map(data => (
                                        <MenuItem key={data.id} value={data.id}>
                                            {data.topic_name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="question"
                                    label="Question"
                                    name="question"
                                    autoComplete="question"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    name="description"
                                    label="Description"
                                    type="description"
                                    id="description"
                                    autoComplete="description"
                                    multiline
                                    rows={3}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: 2, mb: 1 }}
                        >
                            Post Question
                        </Button>
                    </Box>
                </Box>
            </Container>
        </React.Fragment>
    );
}