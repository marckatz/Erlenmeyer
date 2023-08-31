#!/bin/bash
pipenv install
npm install --prefix client
pipenv run python server/app.py & npm start --prefix client
exit 0