"use strict";
const express = require('express');
const path = require('path');
const app = express();
const PORT = 4002;
const dirname = path.join(__dirname, '../');
app.use('/', express.static(dirname));
app.get('*', (_req, res) => {
    res.sendFile(path.join(dirname, 'index.html'));
});
app.listen(PORT, function () {
    console.log(`Messenger app listen on port ${PORT}!`);
});
//# sourceMappingURL=server.js.map