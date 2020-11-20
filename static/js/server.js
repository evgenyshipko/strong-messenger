const express = require('express');
const app = express();
const PORT = 4000;

app.use(express.static(__dirname));
app.listen(PORT, function () {
  console.log(`Messenger app listen on port ${PORT}!`);
});
