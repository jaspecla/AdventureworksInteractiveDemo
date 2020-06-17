import React, { useState } from "react";
import * as signalR from "@microsoft/signalr";
import axios from "axios";

function Chat() {
  const [userName, setUserName] = useState('anonymous');
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isReady, setIsReady] = useState(false);

  const signalRUrl = process.env.REACT_APP_SIGNALR_URL;

  if (!isReady) {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(signalRUrl)
      .configureLogging(signalR.LogLevel.Information)
      .build();

    connection.on('newMessage', onNewMessage);
    connection.onclose(() => {
      console.log('SignalR Disconnected.');
      setIsReady(false)
    });

    startSignalRConnection(connection);
  }

  async function startSignalRConnection(connection) {
    try {
      await connection.start();
      console.log('SignalR Connected');
      setIsReady(true);
    }
    catch (error) {
      console.log(error);
    }
  }
  
  function onNewMessage(message) {
    setMessages(messages => messages.concat(message));
  }

  function updateUserName(event) {
    setUserName(event.target.value);
  }

  function updateCurrentMessage(event) {
    setCurrentMessage(event.target.value);
  }

  async function sendMessage() {
    try {
      const response = await axios.post(`${signalRUrl}/messages`, {
        sender: userName,
        text: currentMessage
      });
      setCurrentMessage('');
    }
    catch(error) {
      console.log(error);
    }
  }

  return(
    <div>
      <div className="userNameEntry">
        <h2>Enter your username:</h2>
        <input type="text" value={userName} onChange={updateUserName} />
      </div>
      <div className="messageEntry">
        <h2>Enter a message:</h2>
        <input type="text" value={currentMessage} onChange={updateCurrentMessage} />
        <div className="sendButton">
          <button disabled={!isReady} onClick={() => { sendMessage() }}>Send Message</button>
        </div>
      </div>
      <div className="receivedMessages">
        {messages.map((message, i) => {
          return (
            <div key={i}>
              <b>{message.sender}</b> {message.text}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Chat;