import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from "./App";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App/>
    /*<Box sx={{flexGrow: 1}}>
        <AppBar position="static">
            <Toolbar sx={{display: "flex", justifyContent: "center"}}>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    sx={{mr: 2}}
                >
                    <BlurOnSharpIcon/>
                </IconButton>
                <Typography variant="h6" component="div">
                    Stack Overflow ++
                </Typography>
            </Toolbar>
        </AppBar>
    </Box>*/
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
