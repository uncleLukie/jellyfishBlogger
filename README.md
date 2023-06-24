# jellyfishBlogger
A full-stack blog powered by React.js, Express.js, MongoDB, Firebase authentication, & 
Material-UI.

## What is it?
jellyfishBlogger is a full-stack web applicaton that allows verified users to create, edit,
and manage blog posts. Users can sign up, comment on articles, and post their own articles
(if they are permitted to). The backend is built using Express.js and MongoDB, while the
frontend is built using React.js and Material-UI for a responsive and intuitive user interface.
Also, Firebase authentication is used for secure user registration and login. 


## Under construction

jellyfishBlogger is currently in the development stage. Most of the core backend features 
have been implemented, including user registration, authentication, 
creating and updating posts, and adding comments. Future improvements and 
features are planned, such as more robust error handling and much improved 
frontend user experience.

## How to set it up

Docker is the method I use for my own dev environment, here's how to set it up:
1. Clone the repo.
2. Install the required dependencies in both the frontend and backend folders with `npm install`
3. Set up a Firebase project and enable Email/Password authentication. Obtain the Firebase configuration objeect for your app.
4. Use the .env-template file to create your own .env file, fill in each detail correctly.
5. Run the docker-compose in the root directory with `docker-compose up --build`
6. Access the Nginx proxy which serves the frontend and backend at http://localhost:80
7. ???
8. Profit

You can run it all locally if you prefer non-docker.

