const dialogflow = require("@google-cloud/dialogflow");

const dialogflowConfig = require("./configs/dialogflowConfig");
const uuid = require("uuid");
const projectId = dialogflowConfig.project_id;
const configuration = {
  credentials: {
    private_key: dialogflowConfig.private_key,
    client_email: dialogflowConfig.client_email,
  },
};

const sessionId = uuid.v4();
const languageCode = "th";
const sessionClient = new dialogflow.SessionsClient(configuration);

async function talkToChatbot(message, userId) {
  const sessionPath = sessionClient.projectAgentSessionPath(projectId, userId);

  console.log("text " + message);
  const botRequest = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode,
      },
    },
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

module.exports = talkToChatbot;
