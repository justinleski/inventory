# inventory
### Purpose
This app was to learn and practice PostgreSQL, Express, and routing. It's fairly minimal and focuses much more on the concepts than the design or best practices; in fact I forgot to modularize controllers in this project.

### Demo
A live demo can be found [here on Render.com](https://inventory-5x7w.onrender.com/)

### Challenges Faced
- Deploying on Render requires setting up an instance of the DB and also a web service. Being my first time, I had trouble linking the two.
- Routers: I did not know the importance of controllers and how modularizing the code from the `app`, to a `routers/` and `controllers/` and what exactly each do. Now I can say with some confidence the routers are to direct `POST` and `GET` requests and processing using middleware functions via the modules imported from the controller (who talks to the database and controls where our next view is)
