import React, { useEffect, useState } from "react";
import { Card, List, Box, CardActionArea, Grid, Button, Paper, Typography, TextField } from "@mui/material";
import "./MessagesPage.css";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { v4 as uuidv4 } from 'uuid';
import ChatMessagesPlaceholder from '../components/ChatMessagesPlaceHolder';
import SendMessagePlaceholder from '../components/SendMessagePlaceholder';
import UserAPI from "../apis/UserAPI";

const ENDPOINT = "http://localhost:8080/ws";

function MessagesPage(){

    const [stompClient, setStompClient] = useState();
    const [username, setUsername] = useState();
    const [messagesReceived, setMessagesReceived] = useState([]);
    const [recipient, setRecipient] = useState();
    const [message, setMessage] = useState();

    const users = ["Ante", "userTwo", "anotherUser", "userOne"]

    useEffect(()=>{
      setUsername(UserAPI.getCurrentUser());
    },[]);

    useEffect(() => {
      if(username){
        const socket = SockJS(ENDPOINT);
        const stompClient = Stomp.over(socket);
        stompClient.connect({}, () => {
          stompClient.subscribe(`/user/${username.replace(/['"]+/g, '')}/queue/inboxmessages`, (data) => {
            onMessageReceived(data);
            });
          });
        setStompClient(stompClient);
    }
      }, [username]);

      const sendMessage = () => {
        const payload = { 'id': uuidv4(), 'from': localStorage.getItem('user'), 'to': recipient, 'text': message };
        stompClient.send(`/user/${payload.to}/queue/inboxmessages`, {}, JSON.stringify(payload));
    }

      const onMessageReceived = (data) => {
        const message = JSON.parse(data.body);
        setMessagesReceived(messagesReceived => [...messagesReceived, message]);
        console.log(messagesReceived);
      };

      const renderMessages = () => {
        if(recipient){
        return (
          <Grid>
            <Paper style={messagesPaperStyle}>
              <Typography>{recipient}</Typography>
              {
              messagesReceived.filter(message => message.from !== recipient)
              .map(message => {
                return(
                  <Grid>
                    <Typography>{message.text}</Typography>
                  </Grid>
                )
              })
              }
            <TextField required label="message" onChange={(newValue)=>setMessage(newValue.target.value)} style={{margin:"10px", width:'80vh'}}></TextField>
            <Button variant="contained" onClick={() => {sendMessage()}}>Send</Button>
            </Paper>
          </Grid>  
        )}
      }

      const userCardStyle={margin:"10px", backgroundColor:"lightGreen", width:'20vh'}
      const messagesPaperStyle={height:'75vh', width:'90vh', marginTop:'5%', backgroundColor:'lightBlue'}

    return(
        <Box className="container">
          <Grid
          container
          direction="row"
          align="center">
        <List>
                {users.map((user, index) => {
                    return <li key={index}> 
                    <Card variant="outlined" style={userCardStyle}>
                        <CardActionArea onClick={()=>setRecipient(user)}>
                        <h1>{user}</h1>
                        </CardActionArea>
                    </Card> </li>

                })}
            </List>
                {renderMessages()}
      </Grid>
    </Box>

    )
}

export default MessagesPage;