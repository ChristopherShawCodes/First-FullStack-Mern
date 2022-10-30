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

`npm create-react-app client`

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

    `const PersonController = require('../controllers/person.controller') // Here we are importing logic from       controller file

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

`npm install cors`


add needed CORS code to SERVER.JS

`const cors = require('cors')`
`app.use(cors())`

------------------------------------------

run: `nodemon server.js`


------------------------------------------
------------------------------------------
------------------------------------------
------------------------------------------

Update Back-End

we need to configure the database

Navigate to the Config Folder

Create: `mongoose.config.js`

------------------------------------------

Add to mongoose.config.js file

    const mongoose = require('mongoose');
    //This will create a database named "person" if one doesn't already exist (no need for      mongo shell!):
    mongoose.connect("mongodb://localhost/person", { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    })
    .then(() => console.log("Established a connection to the database"))
    .catch(err => console.log("Something went wrong when connecting to the database",           err));
    
    
 ------------------------------------------
 Create Model File 
 
 Create Schema / Model
 
 Example: 
 
    const mongoose = require('mongoose')
 
    const PersonSchema = new mongoose.Schema({
    
    firstName: {type: String},
    
    lastName: {type: String}
    
    },
    
    {timestamps: true})
    
    module.exports = mongoose.model('Person', PersonSchema)
    
------------------------------------------

Now in the controller we can add a new method to handle the creation of Person

 ------------------------------------------
 
 server/controller/person.controller.js file
 
 Add:
 
     const Person = require('../models/person.model')
 
 
    module.exports.createPerson = (request, response) => {
    
    // Mongoose's "create" method is run using our Person model to add a new person to our db's person collection.
    
    // request.body will contain something like {firstName: "Billy", lastName: "Washington"} from the client
    
    Person.create(request.body) //This will use whatever the body of the client's request sends over
    
        .then(person => response.json(person))
        
        .catch(err => response.json(err));
        
    }

------------------------------------------

Update the routes

server/routes/person.routes.js

Add:

`app.post('/api/people', PersonController.createPerson)`

------------------------------------------

In order to process POST requests add code to Server.js File

server/server.js

`app.use(express.json())`

this allows json objects to be posted

`app.use(express.urlencoded({ extended: true}))`

this allows json objects with strings and arrays

`require(./config/mongoose.config')`

this imports the config file

------------------------------------------
------------------------------------------
------------------------------------------

Now Navigate to POSTMAN

From here we can input data

Settings:

POST localhost:8000/api/__________

Click : BODY

Change DROPDOWN :  x-www-form-urlencoded

Add KEYS and VALUES according to the schema created in the MODEL file.

------------------------------------------

Confirm BACK-END works ! 

------------------------------------------

UPDATE FRONT-END

Navigate to COMPONENTS Folder

Create a form to provide info to the back end

Example:

    import React, { useState } from 'react'
    
    import axios from 'axios';
    
    const PersonForm = () => {
    
    //keep track of what is being typed via useState hook
    
    const [firstName, setFirstName] = useState(""); 
    
    const [lastName, setLastName] = useState("");
    
    //handler when the form is submitted
    
    const onSubmitHandler = (e) => {
    
        //prevent default behavior of the submit
        
        e.preventDefault();
        
        //make a post request to create a new person
        
        axios.post('http://localhost:8000/api/people', {
        
            firstName,    // this is shortcut syntax for firstName: firstName,
            
            lastName      // this is shortcut syntax for lastName: lastName
            
        })
        
            .then(res=>{
            
                
                console.log(res); // always console log to get used to tracking your data!
                
                console.log(res.data);
                
            })
            
            .catch(err=>console.log(err))
            
    }
    
    return (
        <form onSubmit={onSubmitHandler}>
            <p>
                <label>First Name</label><br/>
                {/* When the user types in this input, our onChange synthetic event 
                    runs this arrow function, setting that event's target's (input) 
                    value (what's typed into the input) to our updated state   */}
                <input type="text" onChange = {(e)=>setFirstName(e.target.value)}/>
            </p>
            <p>
                <label>Last Name</label><br/>
                <input type="text" onChange = {(e)=>setLastName(e.target.value)}/>
            </p>
            <input type="submit"/>
        </form>
    )
    }
    export default PersonForm;`






