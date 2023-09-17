const express = require("express");
const cors = require("cors");
const app = express();
const random = require("randomstring");

const port = 3000;

var session = "";

app.use(cors());

app.get("/auth", (req, res) => {
    session = generateRandomState();

    const options = {
      client_id: "test_client1234",
      scope: "openid",
      redirect_uri: "http://127.0.0.1:3000/state",
      state: session,
      nonce: "0394852-3190485-2490358",
    };

    let authentication_URI = `http://localhost:8080/realms/master/protocol/openid-connect/auth?response_type=code&client_id=${options.client_id}&scope=${options.scope}&redirect_uri=${options.redirect_uri}&state=${options.state}&nonce=${options.nonce}&prompt=login`;

    res.status(200).send(authentication_URI);
});

app.get("/state", (req, res) => {
  const receivedState = req.query.state;
  console.log('Memory:' + session + '==' + 'Recieved:' + req.query.state);
  if (receivedState === session) {
    res.status(200).send("State is valid.");
  } else {
    res.status(400).send("Invalid state value. Possible CSRF attack.");
  }
});

app.use((req, res) => {
  res.status(404).send("Not Found");
});

app.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}`);
});

function generateRandomState() {
  return random.generate(30);
}
