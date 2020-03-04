var express = require('express');
var router = express.Router();
const fetch = require('cross-fetch');

/* GET home page. */
router.get('/', function(req, res, next) {

  var modelId = req.query.modelId;
  if(!modelId) {
      modelId = "empty model id...";
      //TODO should return an error here...
  }
  var bodkin = {
      modelName:modelId,
  }   
  fetch(`https://fcmfunctions.azurewebsites.net/api/getfcm?code=TX5lYn5vCBB5XW4aIOOpjJdkYkzNPqJtNazrqaKF8R8pQ5lywpfbzg==`, {
      method: 'POST',
      body: JSON.stringify(bodkin),
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
      }
      })
      .then(response => {
          return response.json();
      })
      .then(elements => {
          var nodeString = JSON.stringify(elements.elements.nodes);
          var connectionsString = JSON.stringify(elements.elements.edges);
          console.log(nodeString);
          console.log(connectionsString);

          res.render('index', { elements: elements.elements, nodeString: nodeString, connectionsString, connectionsString, modelId: modelId });
      })
      .catch(err => {
          console.log("ERROR");
          console.log(err);
      });
});

module.exports = router;
