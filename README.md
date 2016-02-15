#Levelup project

##Installation
composer install
php app/console doctrine:schema:create
php app/console hautelook_alice:doctrine:fixtures:load
php app/console server:run

##OAuth2
###Auth request example

Request:

POST /api/oauth/v2/token HTTP/1.1
Host: 127.0.0.1:8000
Cache-Control: no-cache
Content-Type: application/x-www-form-urlencoded

grant_type=password&client_id=1_web&client_secret=web&username=test&password=test

Response:

{
  "access_token": "ODNlZWFkNzI0OGEzOTQzYmQxOGM0ODU3NzcwYTczNmM3OTIyMDVkZDJlYWY3Y2ZjNzUyMTIxZWNjNmU0OWNjYw",
  "expires_in": 3600,
  "token_type": "bearer",
  "scope": null,
  "refresh_token": "NDVlZWIzNGZhNWRjZmVhMTE3YTQ5YTlmZDBmZDUzNjYyYzc5NmY1MDE1Y2Y5OTY2YzYxODAwY2YzNDM2ZWMwZA"
}

Then add access_token as "Authorization" header to API requests, like this:
Authorization: Bearer ODNlZWFkNzI0OGEzOTQzYmQxOGM0ODU3NzcwYTczNmM3OTIyMDVkZDJlYWY3Y2ZjNzUyMTIxZWNjNmU0OWNjYw
 