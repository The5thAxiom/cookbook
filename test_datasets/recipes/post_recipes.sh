#!/usr/bin/bash
for FILE in *.json;
do
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY1MzM3NDkwNywianRpIjoiYzEwMzcxZWEtNTQwYy00ZGMyLTllOWQtOWNlYTY2N2I5NDM2IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6InRoZTV0aGF4aW9tIiwibmJmIjoxNjUzMzc0OTA3LCJleHAiOjE2NTMzODIxMDd9.lUpZ4rV9mfQab4abHAwMKJO2Oi_i5gexsYMlQiLublk" -d @$FILE http://localhost:5000/api/recipes;
done