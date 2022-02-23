const dialogflow = require("@google-cloud/dialogflow");

const dassConfig = require("./configs/dassConfig");
const uuid = require('uuid');
const projectId = dassConfig.project_id;
const configuration = {
  credentials: {
    private_key: dassConfig.private_key,
    client_email: dassConfig.client_email
  }
};

const sessionId = uuid.v4();
const languageCode = "th";
const sessionClient = new dialogflow.SessionsClient(configuration);

const sessionPath = sessionClient.projectAgentSessionPath(
  projectId,
  sessionId
);

async function talkDASS(message) {
  console.log("text " + message);
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
}

module.exports = talkDASS;