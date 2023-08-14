#!/usr/bin/env python3

# Remote library imports
from flask import request, make_response, session
from flask_restful import Resource

# Local imports
from config import app, db, api

# Model imports
from models import User, UserSchema, Schema, Table, Column, Relationship

@app.route("/")
def index():
    return "<h1>Phase 5 Project Server</h1>"

class Users(Resource):
    def get(self):
        return make_response([u.to_dict(only=('id','username','schemas.id', 'schemas.name')) for u in User.query.all()])

api.add_resource(Users, '/users')

class TablesById(Resource):
    def get(self, id):
        table = Table.query.filter_by(id=id).first()
        return make_response(table.to_dict(), 200)

api.add_resource(TablesById, '/tables/<int:id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)