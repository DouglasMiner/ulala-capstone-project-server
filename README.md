# Ulala Guide Server
  * The server uses two endpoints: /Login and /UserBuilds
  * The base url for the server is: https://murmuring-hollows-51888.herokuapp.com

  * POST (Login)
    * Request: https://murmuring-hollows-51888.herokuapp.com/Login
    * Adds a user profile to the database
    * Response: 201. Returns a user object with the user id and user name{id: num, user_name: "string"}
    * Auth required: No

  * GET (UserBuilds)
    * Request: https://murmuring-hollows-51888.herokuapp.com/UserBuilds/:user_name
    * Gets the user profile from the database
    * Response: 200: {classes: "string of classes", user_name: "string with username"}
    * Auth required: Yes

  * DELETE (UserBuilds)
    * Request: https://murmuring-hollows-51888.herokuapp.com/UserBuilds/:user_name
    * Removes the selected class from the user profile
    * Response:  204
    * Auth required: Yes

  * PATCH (UserBuilds)
    * Request: https://murmuring-hollows-51888.herokuapp.com/UserBuilds/:user_name
    * Adds the selected class to the user profile
    * Response: 204
    * Auth required: Yes

  * On the /UserBuilds endpoint you can do a GET, a DELETE, and a PATCH request. A GET request will send back the users profile from the database. A DELETE request will remove a specified class from the user profile. A PATCH request will add a specified class to the user profile

  * On the /Login endpoint you can do a POST request. The POST resquest will add a user profile to the database.

# Team Members:
  * Douglas Miner

# Live Link:
  * https://ulala-guide.now.sh

# Tech Stack (Server):
  * JavaScript
  * Node.js
  * Express