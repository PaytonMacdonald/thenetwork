CodeWorks Vue Starter
=====================
API Endpoints

Account (the logged in user)
GET https://bcw-sandbox.herokuapp.com/account 
PUT https://bcw-sandbox.herokuapp.com/account (edit account???)

Profile
GET https://bcw-sandbox.herokuapp.com/api/profiles?query=
GET https://bcw-sandbox.herokuapp.com/api/profiles/:id
GET https://bcw-sandbox.herokuapp.com/api/profiles/:id/posts

Posts
GET https://bcw-sandbox.herokuapp.com/api/posts (getall)
GET https://bcw-sandbox.herokuapp.com/api/posts?query= (getsearch)
GET https://bcw-sandbox.herokuapp.com/api/posts?page= (getforpage?)
GET https://bcw-sandbox.herokuapp.com/api/posts/:id (getactiveprofileposts)
POST https://bcw-sandbox.herokuapp.com/api/posts (createpost)
POST https://bcw-sandbox.herokuapp.com/api/posts/:id/like (createlike)
PUT https://bcw-sandbox.herokuapp.com/api/posts/:id (editpost)

DELETE https://bcw-sandbox.herokuapp.com/api/posts/:id (deletepost)

Ads
GET https://bcw-sandbox.herokuapp.com/api/ads (getads THIS IS DONEZO)