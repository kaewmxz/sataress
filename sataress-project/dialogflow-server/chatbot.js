const dialogflow = require("@google-cloud/dialogflow");

const dialogflowConfig = require("./config");
const uuid = require('uuid');
const projectId = dialogflowConfig.project_id;
const configuration = {
  credentials: {
    private_key: dialogflowConfig.private_key,
    client_email: dialogflowConfig.client_email
  }
};

const sessionId = uuid.v4();
const languageCode = "th";
const sessionClient = new dialogflow.SessionsClient(configuration);

const sessionPath = sessionClient.projectAgentSessionPath(
  projectId,
  sessionId
);

async function talkToChatbot(message) {
  console.log("message " + message);
  const botRequest = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode
      }
    }
  };

  const response = await sessionClient
    .detectIntent(botRequest)
    .then((responses) => {
      console.log(JSON.stringify(responses));
      const requiredResponse = responses[0].queryResult;
      return requiredResponse;
    })
    .catch((error) => {
      console.log("ERROR: " + error);
    });

  return response;
  // // Send request and log result
  // const responses = await sessionClient.detectIntent(botRequest);
  // console.log('Detected intent');
  // const result = responses[0].queryResult;
  // console.log(`  Query: ${result.queryText}`);
  // console.log(`  Response: ${result.fulfillmentMessages}`);
  // if (result.intent) {
  //   console.log(`  Intent: ${result.intent.displayName}`);
  // } else {
  //   console.log('  No intent matched.');
  // }
}

module.exports = talkToChatbot;