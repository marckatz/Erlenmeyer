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

class SchemasById(Resource):
    def get(self, id):
        schema = Schema.query.filter_by(id=id).first()
        if schema:
            return make_response(schema.to_dict(), 200)
        else:
            return make_response({'error':'Schema not found'}, 404)

api.add_resource(SchemasById, '/schemas/<int:id>')

class Tables(Resource):
    def post(self):
        data = request.get_json()
        new_table = Table(name=data['name'], schema_id=data['schema_id'])
        db.session.add(new_table)
        db.session.commit()
        return make_response(new_table.to_dict(), 201)
    
api.add_resource(Tables, '/tables')

class TablesById(Resource):
    def get(self, id):
        table = Table.query.filter_by(id=id).first()
        return make_response(table.to_dict(), 200)

api.add_resource(TablesById, '/tables/<int:id>')

class Columns(Resource):
    def post(self):
        data = request.get_json()
        new_column = Column(
            name=data['name'],
            column_type=data['column_type'],
            is_pk=data['is_pk'],
            in_repr=data['in_repr'],
            table_id=data['table_id']
        )
        db.session.add(new_column)
        db.session.commit()
        return make_response(new_column.to_dict(), 201)

api.add_resource(Columns, '/columns')

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data['username']
    password = data['password']
    user = User.query.filter_by(username=username).first()
    if not user:
        return make_response({'error': 'User not found'}, 404)
    if user.authenticate(password):
        session['user_id'] = user.id
        return make_response(user.to_dict(only=('id','username','schemas.id', 'schemas.name')), 200)
    else:
        return make_response({'error': 'Incorrect password'}, 401)

@app.route('/logout', methods=['DELETE'])
def logout():
    session['user_id'] = None
    return make_response({'message': 'Logged out successfully'}, 204)

@app.route('/check_session')
def check_session ():
    user = User.query.filter(User.id == session.get('user_id')).first()
    if user:
        return make_response(user.to_dict(only=('id','username','schemas.id', 'schemas.name')), 200)
    else:
        return make_response({'error': 'User not in session'}, 401)


if __name__ == '__main__':
    app.run(port=5555, debug=True)