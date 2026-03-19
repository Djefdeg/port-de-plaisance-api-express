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