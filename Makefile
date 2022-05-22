flask:
	flask run

flask-newdb:
	rm backend/Cookbook.db
	./datasets/send_recipes.sh
	flask run

react:
	cd frontend && npm start

react-build:
	cd frontend && npm run build