We'd like you to get some practice and have another look at building a server. In order to review what we have studied in the previous modules, we'd like you to create a new Express Server. In your  folder, make a folder called . Inside this folder, you will create the new server. Please refer to the Node Server - Server Setup module for a refresher on how to set up a server.

 

Submission
For this assignment, you will need to submit a GitHub repository for the server side. Make sure you are in the correct folder when creating the repository.

 

Rationale
You have been served up an enormous amount of material, and now you need practice working with it and repeating it. It will go faster the second time through, and iterative learning will take place. You will essentially be rebuilding what you just did with a few different endpoints.

 

Criteria
Just to be clear, there are some major criteria. Your server must do the following:

Have User Authentication
Follow an MVC pattern.
Persist data to Postgres.
Use all of the key concepts studied in the previous modules, including , , and .
You will build a client later, using React. You do not need a client for this. We will use this to teach client side Authentication with React.
Your endpoints must show signs of having been tested(screenshots of successful Postman request in a  file are always handy)
 

Required Endpoints
 

The project should have the following endpoints:
Endpoint	Verb	Description
/user/register	POST	Allows a new user to be created with a username and password.
/user/login	POST	Allows log in with an existing user.
/log/	POST	Allows users to create a workout log with descriptions, definitions, results, and owner properties.
/log/	GET	Gets all logs for an individual user.
/log/:id	GET	Gets individual logs by  for an individual user.
/log/:id	PUT	Allows individual logs to be updated by a user.
/log/:id	DELETE	Allows individual logs to be deleted by a user.
 

Data Models

In addition to the columns automatically generated by Sequelize, the  model requires the following columns and data-types:

Data Types
Property	Type
username	STRING
passwordhash	STRING
 


In addition to the columns automatically generated by Sequelize, the  model requires the following columns and data-types:

Data Types
Property	Type
description	STRING
definition	STRING
result	STRING
owner_id	INTEGER
 

Additional Information
The user should not provide the id associated with their user account. This value should come from the validateSession middleware function. 