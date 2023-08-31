#!/bin/bash
pipenv install
npm install --prefix client
export FLASK_APP=server/app.py
export FLASK_RUN_PORT=5555
pipenv run flask run & npm start --prefix client
exit 0