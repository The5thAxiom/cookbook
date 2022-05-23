popos_venv_activate:
	source popos_venv/bin/activate

flask:
	flask run

flask-newdb:
	rm -f backend/Cookbook.db
	flask run

post:
	cd datasets/users && ./post_users.sh
	cd datasets/recipes && ./post_recipes.sh

react:
	cd frontend && npm start

react-build:
	cd frontend && npm run build