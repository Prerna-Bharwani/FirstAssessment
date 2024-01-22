I have created three separate folders:
1. Crud Api: The app.js file in this folder consist of Express web server to handle CRUD (Create, Read, Update, Delete) operations for a todo list.
   Also, it reads data from an Excel file named 'TodoList.xlsx'and parses the Excel sheet into a JavaScript array (todosArray).
   All the Crud Api end points are mentioned in this file as per the Assignment.
2. Login and Register: The server.js file consist of creates an in-memory array (users) to store user information. Also it defines routes for login, registration, and logout.
   The root route renders a view only if the user is authenticated.
   View folder consist of frontend ejs file of login, register and index.
   Pass-config.js consist main login of authentication of users.
3. Token Authetication: This consist of server.js file that includes main logic for generating JWT Tokens and then comparing tokens for authentication of the users.

Additional files contains dependencies, packages, modules installed etc that are required to compile and run the code.   
     
