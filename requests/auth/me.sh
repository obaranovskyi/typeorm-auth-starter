curl -X GET http://localhost:3333/api/auth/me          \
   -b "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik9sZWg5IiwiaWF0IjoxNzEyNjYwOTA1LCJleHAiOjE3MTI2NjQ1MDV9.RFBeqSoylPlmRQn9x7TrjHYHYOKF-hBtXmv3JrkWsbY" \
   -H "Content-Type: application/json"                  \
   -d '{"username": "oleh5", "password": "password" }'
