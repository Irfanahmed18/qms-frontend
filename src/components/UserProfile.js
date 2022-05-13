import React, {useEffect, useState} from "react";
import apiUtil from "../apiUtil";
import {Card, CardContent, Paper, Typography, Grid, Container} from "@mui/material";
import {QuestionAnswers} from "./QuestionAnswers";

export const UserProfile = ({user}) => {
    const [userData, setUserData] = useState();
    useEffect(() => {
        (async () => {
            let res = await apiUtil.get_user_details({user_id: user.id});
            console.log(res);
            setUserData(res);
        })();
    }, [])

    return (
        <Container sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <br/>
            <br/>
            <Card>
                <CardContent>
                    <Grid container>
                        <Grid item xs={6}>
                            <Typography variant='body1'>FirstName: {userData?.first_name}</Typography>
                            <Typography variant='body1'>LastName: {userData?.last_name}</Typography>
                            <Typography variant='body1'>DateOfBirth: {userData?.date_of_birth}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant='body1'>Country: {userData?.country}</Typography>
                            <Typography variant='body1'>State: {userData?.state}</Typography>
                            <Typography variant='body1'>City: {userData?.city}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant='body1'> Email: {userData?.email}</Typography>
                            <Typography variant='body1'>Status : {userData?.status}</Typography>
                            <Typography variant='body1'>Description: {userData?.profile}</Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Container>

    )
};