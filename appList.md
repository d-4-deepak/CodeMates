# CodeMates api

   ## authRouter
- POST /signup
- POST /login
- POST /logout

   ## profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

   ## connectionRequestRouter
- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId
- POST /request/review/accept/:requestId
- POST /request/review/reject/:requestId

   ## userRouter
- GET /user/connections
- GET /user/requests
- GET /user/feed -profiles of other user on platform
