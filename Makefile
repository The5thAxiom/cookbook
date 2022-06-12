flask:
	flask run

db:
	python -c 'import run.py; db.create_all()'

react:
	cd frontend && npm start

react-build:
	cd frontend && npm run build