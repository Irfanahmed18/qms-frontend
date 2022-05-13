import {AppBar, Box, Container, Paper, Tab, Tabs, Toolbar} from "@mui/material";
import React, {useEffect, useState} from "react";
import {AllActivity} from "./AllActivity";
import {UserActivity} from "./UserActivity";
import ActionButton from "./controls/ActionButton";
import AddIcon from '@mui/icons-material/Add';
import Popup from "./Popup";
import {AddQuestionForm} from "./AddQuestionForm";
import apiUtil from "../apiUtil";
import {UserProfile} from "./UserProfile";

export const MainPage = ({user}) => {
    const [value, setValue] = React.useState(0);
    const [openPopup, setOpenPopup] = React.useState(false);
    const [updateQues, setUpdateQues] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [userQuestions, setUserQuestions] = useState([]);
    const [likes, setLikes] = useState([]);
    const [filterClause, setFilterClause] = useState('');
    const [categories, setCategories] = useState([]);

    useEffect( () => {
        (async () => {
            let topics = await apiUtil.gettopics();
            topics.push({id: 999, topic_name: 'None'});
            setCategories(topics);
        })();
    }, []);

    const groupQuestionsAndAnswers = (questions, likes) => {
        let uniqueQuestions = {};
        let uniqueAnswers = {};
        likes.forEach(i => {
            uniqueAnswers[i.answer_id] = true;
        });
        questions.forEach(i => {
            if (i.id_question in uniqueQuestions) {

            }
            else {
                uniqueQuestions[i.id_question] = {...i, answers: []};
            }
            if (i.answer_text) {
                uniqueQuestions[i.id_question].answers.push({answerText: i.answer_text, answeredBy: i.answer_posted_by_first_name + " " + i.answer_posted_by_last_name, answerDate: i.date_answered, votes: i.votes_count, isBestAnswer: i.is_best_answer, answerId: i.id, vote: i.id in uniqueAnswers});
            }
        });
        let uniqueQuestionsArray = [];
        Object.keys(uniqueQuestions).forEach(i => {
            uniqueQuestionsArray.push(uniqueQuestions[i]);
        });
        return uniqueQuestionsArray;
    };

    useEffect( () => {
        (async () => {
            let res = await apiUtil.get_likes({user_id: user.id});
            setLikes(res);
            let tmpLikes = [...res];
            if (filterClause != '') {
                res = await apiUtil.get_filtered_ques({term: filterClause});
                let tmp = groupQuestionsAndAnswers(res, tmpLikes);
                setQuestions([...tmp]);
            }
            else {
                res = await apiUtil.get_all_ques();
                let tmp = groupQuestionsAndAnswers(res, tmpLikes);
                setQuestions([...tmp]);
            }
            res = await apiUtil.get_user_ques({user_id: user.id});
            setUserQuestions([...groupQuestionsAndAnswers(res, tmpLikes)]);
            setUpdateQues(false);
        })();
    }, []);
    useEffect( () => {
        if (updateQues) {
            (async () => {
                let res = await apiUtil.get_likes({user_id: user.id});
                setLikes(res);
                let tmpLikes = [...res];
                if (filterClause != '') {
                    res = await apiUtil.get_filtered_ques({term: filterClause});
                    let tmp = groupQuestionsAndAnswers(res, tmpLikes);
                    setQuestions([...tmp]);
                }
                else {
                    res = await apiUtil.get_all_ques();
                    let tmp = groupQuestionsAndAnswers(res, tmpLikes);
                    setQuestions([...tmp]);
                }
                res = await apiUtil.get_user_ques({user_id: user.id});
                setUserQuestions([...groupQuestionsAndAnswers(res, tmpLikes)]);
                setUpdateQues(false);
            })();
        }
    }, [updateQues]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <>
            <AppBar sx={{backgroundColor: 'white', height: '6vh'}} position="static">
                <Toolbar>
                    <Box sx={{width: '100%', bgcolor: 'background.paper'}}>
                        <Tabs value={value} onChange={handleChange} centered>
                            <Tab label="All Activity"/>
                            <Tab label="My Activity"/>
                            <Tab label="My Account"/>
                        </Tabs>
                    </Box>
                </Toolbar>
            </AppBar>
            <Container sx={{height: '85vh', marginTop: '2vh', maxWidth: '100vw !important'}}>
                <Paper sx={{
                    height: '100%',
                    width: '100%',
                    backgroundColor: '#28272e',
                    overflowY: "scroll"
                }}>
                    {
                        value === 0 && <AllActivity questions={questions} updateQues={updateQues} user={user} setUpdateQues={setUpdateQues} categories={categories} setFilterClause={setFilterClause}/>
                    }
                    {value === 1 && (<UserActivity questions={userQuestions} updateQues={updateQues} user={user} setUpdateQues={setUpdateQues} user={user}/>)}
                    {value === 2 && (<UserProfile user={user}/>)}
                </Paper>
            </Container>
            {(value == 1 || value == 0) &&
            <ActionButton sx={{position: 'fixed', bottom: '4vh', right: '4vw'}} onClick={() => {
                setOpenPopup(true);
            }}>
                <AddIcon sx={{backgroundColor: 'orange', borderRadius: '50%', fontSize: '5vw', color: 'white'}}/>
            </ActionButton>}
            <Popup
                title="Add Question"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <AddQuestionForm user={user} setOpenPopup={setOpenPopup} onHandleSubmit={async (values) => {
                    let res = await apiUtil.add_question({
                        user_id: user.id,
                        question: values.title,
                        description: values.body,
                        topic_id: values.category
                    });
                    setOpenPopup(false);
                    setUpdateQues(true);
                }}/>
            </Popup>
        </>
    )
};