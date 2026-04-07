# API Port de Plaisance

API REST développée avec Node.js, Express et MongoDB permettant de gérer les catways et leurs réservations.

## Installation

npm install

## Lancement

node app.js

## Routes principales

GET /catways  
GET /catways/:catwayNumber  
POST /catways  
PATCH /catways/:catwayNumber  
DELETE /catways/:catwayNumber  

GET /catways/reservations/all
GET /catways/:catwayNumber/reservations  
GET /catways/:catwayNumber/reservations/:reservationId  
POST /catways/:catwayNumber/reservations  
PUT /catways/:catwayNumber/reservations/:reservationId  
DELETE /catways/:catwayNumber/reservations/:reservationId  

GET /users  
GET /users/:email  
POST /users  
PATCH /users/:email  
DELETE /users/:email 


## Accès à l'application

Compte de test :

Email: eric@email.com  
Password: 12345678

## Accès à swagger
(/api-docs)