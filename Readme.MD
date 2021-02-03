# Interview task Password Health

## Setup

* clone project
* run `yarn`
* run `yarn start`. make sure required ports are available
* open `http://localhost:8080/`
* Enter your mocked user credentials
    
    *username:* `admin`

    *password:* `admin`

## Scripts

 `yarn start:server` - starts mocked backend.

 `yarn start:web` - starts dev server.
 
 `yarn start` - starts both dev server and mocked backend.
 
 `yarn test` - runs tests in project.


## Information

Don't forget that mocked backed server doesn't store your tokens in database they are stored in memory, so your tokens will be invalid after server restart.