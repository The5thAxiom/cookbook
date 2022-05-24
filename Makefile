flask:
	flask run

flask-newdb:
	rm -f backend/Cookbook.db
	flask run

post:
	cd test_datasets/users && ./post_users.sh
	cd test_datasets/user_logins && ./post_logins.sh
	cd test_datasets/recipes && ./post_recipes.sh

react:
	cd frontend && npm start

react-build:
	cd frontend && npm run build