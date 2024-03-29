curl -X POST http://localhost:3333/api/auth/login       \
   --verbose                                            \
   -H "Content-Type: application/json"                  \
   -d '{"username": "Oleh", "password": "password" }'
