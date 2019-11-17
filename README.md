# esp-game

Built using

### server

1. Node js
2. Typescript
3. postres SQL
4. sequlie ORM

### client

1. React js
2. Typescript
3. bootstrap

### how to deploy

1. Set up postresSQL db
2. Add database config vars (db_name, db_password, user) to config file in server folder
3. Install nodejs v 10+ and npm 
3. run command `npm intalll`
4. run command `npm start`


### features

1. Added game play as given in assignment
2. Added auth using Json web tokens 


### assumptions
1. Game is not real time i.e first one user plays then second user
2. 4 secondary images for each primary image
3. user can select as many options

### what can be improved
1. Real time gaming through sockets
2. Password encryption in db
3. More info about user
4. Better UI


Deployed on heroku
link: https://esp-game.herokuapp.com/game
