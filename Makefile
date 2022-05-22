flask:
	flask run

flask-newdb:
	rm -f backend/Cookbook.db
	flask run

flask-post:
	cd datasets && ./send_recipes.sh

react:
	cd frontend && npm start

react-build:
	cd frontend && npm run build