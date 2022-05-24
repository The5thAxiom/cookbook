#!/usr/bin/bash
for FILE in *.json;
do
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer " -d @$FILE http://localhost:5000/api/recipes;
done