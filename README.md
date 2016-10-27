# Out Tonight

## Overview

This app allows you to search for bars/night activities in an area and RSVP. 
The features of this app includes:
```
1. As an unauthenticated user, I can view all bars in my area.
2. As an authenticated user, I can add myself to a bar to indicate I am going there tonight.
3. As an authenticated user, I can remove myself from a bar if I no longer want to go there.
4. As an unauthenticated user, when I login I should not have to search again.
```
## Prerequisites
```
NPM
Node.js
Express
Express-session
Mongoose
Passport
Passport-github
Dotenv
Git
```
## Setup Twitter Authentication

Register at (https://apps.twitter.com) and get API credentials (`consumer key`, `consumer secret`, `token` and `token secret`).

## Setup Local Environment Variables

Create a file with the name of '.env' in the root directory. And list the following local environment variables:
```
TWITTER_KEY=your-twitter-key-here
TWITTER_SECRET=your-twitter-secret-here
YELP_CONSUMER_KEY=your-yelp-consumer-key
YELP_CONSUMER_SECRET=your-yelp-consumer-secret
YELP_TOKEN=your-yelp-token
YELP_TOKEN_SECRET=your-yelp-token-secret
MONGO_URI=mongodb://localhost:27017/out-tonight
APP_URL=https://out-tonight-app-qzhou1607.c9users.io/
```

## Start the App

`cd` to the project directory and run `node server.js` in the terminal.




