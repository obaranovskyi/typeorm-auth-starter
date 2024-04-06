curl -X GET http://localhost:3333/api/auth/me          \
   -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik9sZWg1IiwiaWF0IjoxNzEyMzc1NjgwLCJleHAiOjE3MTIzNzkyODB9.AJ-Mkwpyf3fH1GmYezclPUqc_AX-YvvGiMoYHtsb-yo" \
   -H "Content-Type: application/json"                  \
   -d '{"username": "oleh5", "password": "password" }'
