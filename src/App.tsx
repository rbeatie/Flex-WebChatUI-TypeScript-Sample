import React from 'react';
import logo from './logo.svg';
import * as FlexWebChat from '@twilio/flex-webchat-ui';
import { useEffect } from 'react';
import './App.css';

//  change the your AccountSid
const accountSid = 'AC#####';

// change to your Flex Flow SID
const flexFlowSid = 'FO######';

const appConfig: any = {
  accountSid,
  flexFlowSid,
  logLevel: 'error',
  startEngagementOnInit: true,
  disableLocalStorage: false
};

function App() {

  useEffect(() => {
      FlexWebChat.createWebChat(appConfig).then((webchat: FlexWebChat.FlexWebChat) => {

        const {manager} = webchat;

        //Posting question from preengagement form as users first chat message
        FlexWebChat.Actions.on("afterStartEngagement", (payload) => {
          const {question} = payload.formData;

          if (!question) return;

          const {channelSid} = manager.store.getState().flex.session;

          manager
              .chatClient.getChannelBySid(channelSid)
              .then(channel => channel.sendMessage(question));
        });

        // Changing the Welcome message
        manager.strings.WelcomeMessage = "New text for welcome message";

        // Render WebChat
        webchat.init();
      });

  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
