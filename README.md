First Full Stack MERN/ JS Application

Startup Notes:

create main project folder
------------------------------------------
create server folder
------------------------------------------
create server.js file
------------------------------------------
run in terminal:

`npm init -y`

`npm install express`

`npm install mongoose`

------------------------------------------
Add to Server.js file:

`const express = require('express')`
`const app = express()`
`const port = 8000`

`app.listen(port, () => console.log(`Listening on port: ${port}`))`

------------------------------------------

Create 4 folders:

Config
Controllers
Models
Routes

------------------------------------------

Navigate to main folder
cd ..

------------------------------------------
Create React App

npm create-react-app client

------------------------------------------

Navigate to Controller Folder

Create Controller File ( Ex: person.controller.js )

Add Code/Setup:

`module.exports.index = (request,response) =>{ //Exporting a key:val pair of index:function
response.json({                      // this is where we're setting the API's response to the requesting client
message:"hello world"
})
}`

------------------------------------------

Navigate to Routes Folder

Create Route File ( Ex: person.routes.js )

Add Code/Setup:

`const PersonController = require('../controllers/person.controller') // Here we are importing logic from controller file

module.exports = (app) =>{
app.get('/api', PersonController.index)
}`

------------------------------------------

Link Routes To Server.js

`require('./routes/person.routes')(app)`

// These two lines are the long-hand notation of the code above. They better show what's going on.
    // const personRoutes = require("./routes/person.routes");  <-- assign the exported function to a const
    // personRoutes(app);     <-- invoke the function and pass in the express "app" server

------------------------------------------
------------------------------------------
------------------------------------------

Back-End Setup ! Moving To Front-End
------------------------------------------

Navigate To Client Folder In Terminal

cd client

------------------------------------------

Import Axios

`npm install axios`

------------------------------------------

Create COMPONENTS Folder ( Client -> SRC -> Components )

------------------------------------------

Create Components For Application

Example Person Component:

`import React, { useEffect, useState } from 'react'
import axios from 'axios';
const PersonForm= () => {
    const [ message, setMessage ] = useState("Loading...")
    useEffect(()=>{
        axios.get("http://localhost:8000/api")
            .then(res=>setMessage(res.data.message))
            .catch(err=>console.log(err))
    }, []);
    return (
        <div>
            <h2>Message from the backend: {message}</h2>
        </div>
    )
}
export default PersonForm;`

------------------------------------------

Navigate To App.Js and IMPORT the components

Example:

`import React from 'react';
import PersonForm from './components/PersonForm';
function App() {
  return (
    <div className="App">
      <PersonForm/>
    </div>
  );
}
export default App;`

------------------------------------------

START BACK-END SERVER

cd server folder

nodemon server.js 

------------------------------------------

START FRONT-END REACT APP

OPEN new terminal

cd client

npm run start

------------------------------------------

Install the ability to make cross-origin requests

stop the nodemon server.js server with CONTROL C

run:
npm install cors


add needed CORS code to SERVER.JS

const cors = require('cors')
app.use(cors())

------------------------------------------

run: nodemon server.js




