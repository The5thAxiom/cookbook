#!/usr/bin/bash
for FILE in *.json;
do
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY1MzQxMTQ2MiwianRpIjoiZGI2ZjM4OGMtYjhmMy00MGYyLWEwZWItY2I0ZGZlZTczYjU5IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6InRoZTV0aGF4aW9tIiwibmJmIjoxNjUzNDExNDYyLCJleHAiOjE2NTM0MTg2NjJ9.66cXs06FZIyDRC8eDfHFIhJNtSALxBzH-2T3Hlp46Is" -d @$FILE http://localhost:5000/api/recipes;
done