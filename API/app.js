const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const userRouter = require('./routers/user');
const contactRouter = require('./routers/contacts');
const app = express();
const port = process.env.PORT || 3000;
const bcrypt= require('bcryptjs');

app.use(bodyParser.json());
app.use(cors());


require('./db/mongoose');



app.use(express.json())
app.use(cors())
app.use(userRouter);
app.use(contactRouter);











// Start the server
app.listen(port, () => console.log(`Server listening on port ${port}`));
// ```

// // This code defines an Express.js app that listens on port 3000. It connects to a MongoDB database and defines two schemas: `Contact` and `User`. It also defines a middleware function `requireAuth` that checks for JWT authentication.

// // The API has several endpoints for creating, listing, editing, and deleting contacts. It also has endpoints for locking and unlocking contacts. Finally, it has an endpoint for authenticating users.

// // To run the server,