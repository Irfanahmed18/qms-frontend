import './App.css';
import {Container} from "@mui/material";
import Header from "./components/Header";
import {useState} from "react";
import EmployeeForm from "./components/AuthForm";
import Popup from "./components/Popup";
import AuthForm from "./components/AuthForm";
import {MainPage} from "./components/MainPage";
import SignIn from "./signup/signin";
import SignUp from "./signup/signup";

const App = () => {
    const [user, setUser] = useState();
    const [openPopup, setOpenPopup] = useState(false)
    const [newUser, setNewUser] = useState(false);
    return (
        <>
            <Header user={user}/>
            {!user ? (newUser ? <SignUp setUser={setUser} setNewUser={setNewUser} newUser={newUser}/> :
                <SignIn setUser={(user) => setUser(user)} setNewUser={setNewUser} newUser={newUser}/>) : <MainPage user={user}/>}
        </>
    );
}

export default App;
