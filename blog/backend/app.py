from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from flask_pymongo import PyMongo
from flask_session import Session
from flask import Flask, session
from uuid import uuid4  # Import uuid4 function from uuid module
from werkzeug.security import generate_password_hash, check_password_hash
from flask import request
from bson import ObjectId, json_util

app = Flask(__name__)
CORS(app, supports_credentials=True)  # Enable CORS with credentials support

app.config['MONGO_URI'] = 'mongodb://localhost:27017/mydatabase'  # Update with your MongoDB URI
mongo = PyMongo(app)
db = mongo.db
login_collection = db["Login"]
comments_collection = db["comments"]
news_collection = db['2News']  # MongoDB collection for news posts
cel_collection = db['2Celebrities']
travel_collection = db['2travel']
kd_collection = db['1Anime']
ch_collection = db['1Movie']
ja_collection = db['1japan-drama']
tw_collection = db['1taiwan-drama']
th_collection = db['1thai-drama']
ot_collection = db['1other-drama']


app.secret_key = os.urandom(24)  # Set a secret key for session management
app.config['SESSION_TYPE'] = 'filesystem'  # Choose a session storage type
Session(app)

# Update the existing route to handle PUT requests for updating Korean drama title

@app.route('/api/ot/<kd_id>', methods=['PUT'])
def update_ot_title(kd_id):
    try:
        data = request.json
        new_title = data.get('title')
        new_date = data.get('date')

        # Log received data
        print("Received data:", data)
        
        result = ot_collection.update_one(
            {'_id': ObjectId(kd_id)},
            {'$set': {'title': new_title, 'date': new_date}}  # Merge both updates into a single $set
        )
        
        if result.modified_count == 1:
            return jsonify({'message': 'Korean drama title updated successfully'}), 200
        else:
            return jsonify({'error': 'Failed to update Korean drama title'}), 400
    except Exception as e:
        # Log any errors that occur during the update process
        print("Error updating Korean drama title:", e)
        return jsonify({'error': f'Failed to update Korean drama title: {str(e)}'}), 500


@app.route('/api/ot', methods=['POST'])
def create_ot():
    try:
        data = request.json
        data['id'] = str(ObjectId())  # Generate a new ObjectId for the post
        result = ot_collection.insert_one(data)
        
        # Include the generated ObjectId in the response
        response_data = {'message': 'Korean drama post created successfully', 'id': data['id']}
        
        # Automatically copy _id to id_data
        # kd_collection.update_one({'_id': result.inserted_id})
        ot_collection.update_one({'_id': result.inserted_id}, {'$set': {'id_data': str(result.inserted_id)}})

        return jsonify(response_data), 201
    except Exception as e:
        return jsonify({'error': f'Failed to create Korean drama post: {str(e)}'}), 400
    

@app.route('/api/ot', methods=['GET'])
def get_ot():
    try:
        title_to_search = request.args.get('title')
        if title_to_search:
            kd = ot_collection.find_one({'title': title_to_search}, {'_id': 0})
            if not kd:
                return jsonify({'error': 'Korean drama with the provided title not found'}), 404
            # Convert ObjectId to string for serialization
            kd = json_util.loads(json_util.dumps(kd))
            return jsonify(kd), 200
        else:
            kd = list(ot_collection.find({}, {'_id': 0}))
            return jsonify(kd), 200
    except Exception as e:
        return jsonify({'error': f'Failed to fetch Korean drama: {str(e)}'}), 500



@app.route('/api/ot/id_data', methods=['GET'])
def get_ot_id_data():
    try:
        id_data_list = ot_collection.distinct('id_data')  # Fetch unique id_data values
        return jsonify(id_data_list), 200
    except Exception as e:
        return jsonify({'error': f'Failed to fetch id_data: {str(e)}'}), 500



@app.route('/api/th/<kd_id>', methods=['PUT'])
def update_th_title(kd_id):
    try:
        data = request.json
        new_title = data.get('title')
        new_date = data.get('date')

        # Log received data
        print("Received data:", data)
        
        result = th_collection.update_one(
            {'_id': ObjectId(kd_id)},
            {'$set': {'title': new_title, 'date': new_date}}  # Merge both updates into a single $set
        )
        
        if result.modified_count == 1:
            return jsonify({'message': 'Korean drama title updated successfully'}), 200
        else:
            return jsonify({'error': 'Failed to update Korean drama title'}), 400
    except Exception as e:
        # Log any errors that occur during the update process
        print("Error updating Korean drama title:", e)
        return jsonify({'error': f'Failed to update Korean drama title: {str(e)}'}), 500


@app.route('/api/th', methods=['POST'])
def create_th():
    try:
        data = request.json
        data['id'] = str(ObjectId())  # Generate a new ObjectId for the post
        result = th_collection.insert_one(data)
        
        # Include the generated ObjectId in the response
        response_data = {'message': 'Korean drama post created successfully', 'id': data['id']}
        
        # Automatically copy _id to id_data
        # kd_collection.update_one({'_id': result.inserted_id})
        th_collection.update_one({'_id': result.inserted_id}, {'$set': {'id_data': str(result.inserted_id)}})

        return jsonify(response_data), 201
    except Exception as e:
        return jsonify({'error': f'Failed to create Korean drama post: {str(e)}'}), 400
    

@app.route('/api/th', methods=['GET'])
def get_th():
    try:
        title_to_search = request.args.get('title')
        if title_to_search:
            kd = th_collection.find_one({'title': title_to_search}, {'_id': 0})
            if not kd:
                return jsonify({'error': 'Korean drama with the provided title not found'}), 404
            # Convert ObjectId to string for serialization
            kd = json_util.loads(json_util.dumps(kd))
            return jsonify(kd), 200
        else:
            kd = list(th_collection.find({}, {'_id': 0}))
            return jsonify(kd), 200
    except Exception as e:
        return jsonify({'error': f'Failed to fetch Korean drama: {str(e)}'}), 500



@app.route('/api/th/id_data', methods=['GET'])
def get_th_id_data():
    try:
        id_data_list = th_collection.distinct('id_data')  # Fetch unique id_data values
        return jsonify(id_data_list), 200
    except Exception as e:
        return jsonify({'error': f'Failed to fetch id_data: {str(e)}'}), 500





@app.route('/api/tw/<kd_id>', methods=['PUT'])
def update_tw_title(kd_id):
    try:
        data = request.json
        new_title = data.get('title')
        new_date = data.get('date')

        # Log received data
        print("Received data:", data)
        
        result = tw_collection.update_one(
            {'_id': ObjectId(kd_id)},
            {'$set': {'title': new_title, 'date': new_date}}  # Merge both updates into a single $set
        )
        
        if result.modified_count == 1:
            return jsonify({'message': 'Korean drama title updated successfully'}), 200
        else:
            return jsonify({'error': 'Failed to update Korean drama title'}), 400
    except Exception as e:
        # Log any errors that occur during the update process
        print("Error updating Korean drama title:", e)
        return jsonify({'error': f'Failed to update Korean drama title: {str(e)}'}), 500


@app.route('/api/tw', methods=['POST'])
def create_tw():
    try:
        data = request.json
        data['id'] = str(ObjectId())  # Generate a new ObjectId for the post
        result = tw_collection.insert_one(data)
        
        # Include the generated ObjectId in the response
        response_data = {'message': 'Korean drama post created successfully', 'id': data['id']}
        
        # Automatically copy _id to id_data
        # kd_collection.update_one({'_id': result.inserted_id})
        tw_collection.update_one({'_id': result.inserted_id}, {'$set': {'id_data': str(result.inserted_id)}})

        return jsonify(response_data), 201
    except Exception as e:
        return jsonify({'error': f'Failed to create Korean drama post: {str(e)}'}), 400
    

@app.route('/api/tw', methods=['GET'])
def get_tw():
    try:
        title_to_search = request.args.get('title')
        if title_to_search:
            kd = tw_collection.find_one({'title': title_to_search}, {'_id': 0})
            if not kd:
                return jsonify({'error': 'Korean drama with the provided title not found'}), 404
            # Convert ObjectId to string for serialization
            kd = json_util.loads(json_util.dumps(kd))
            return jsonify(kd), 200
        else:
            kd = list(tw_collection.find({}, {'_id': 0}))
            return jsonify(kd), 200
    except Exception as e:
        return jsonify({'error': f'Failed to fetch Korean drama: {str(e)}'}), 500



@app.route('/api/tw/id_data', methods=['GET'])
def get_tw_id_data():
    try:
        id_data_list = tw_collection.distinct('id_data')  # Fetch unique id_data values
        return jsonify(id_data_list), 200
    except Exception as e:
        return jsonify({'error': f'Failed to fetch id_data: {str(e)}'}), 500




@app.route('/api/ja/<kd_id>', methods=['PUT'])
def update_ja_title(kd_id):
    try:
        data = request.json
        new_title = data.get('title')
        new_date = data.get('date')

        # Log received data
        print("Received data:", data)
        
        result = ja_collection.update_one(
            {'_id': ObjectId(kd_id)},
            {'$set': {'title': new_title, 'date': new_date}}  # Merge both updates into a single $set
        )
        
        if result.modified_count == 1:
            return jsonify({'message': 'Korean drama title updated successfully'}), 200
        else:
            return jsonify({'error': 'Failed to update Korean drama title'}), 400
    except Exception as e:
        # Log any errors that occur during the update process
        print("Error updating Korean drama title:", e)
        return jsonify({'error': f'Failed to update Korean drama title: {str(e)}'}), 500


@app.route('/api/ja', methods=['POST'])
def create_ja():
    try:
        data = request.json
        data['id'] = str(ObjectId())  # Generate a new ObjectId for the post
        result = ja_collection.insert_one(data)
        
        # Include the generated ObjectId in the response
        response_data = {'message': 'Korean drama post created successfully', 'id': data['id']}
        
        # Automatically copy _id to id_data
        # kd_collection.update_one({'_id': result.inserted_id})
        ja_collection.update_one({'_id': result.inserted_id}, {'$set': {'id_data': str(result.inserted_id)}})

        return jsonify(response_data), 201
    except Exception as e:
        return jsonify({'error': f'Failed to create Korean drama post: {str(e)}'}), 400
    

@app.route('/api/ja', methods=['GET'])
def get_ja():
    try:
        title_to_search = request.args.get('title')
        if title_to_search:
            kd = ja_collection.find_one({'title': title_to_search}, {'_id': 0})
            if not kd:
                return jsonify({'error': 'Korean drama with the provided title not found'}), 404
            # Convert ObjectId to string for serialization
            kd = json_util.loads(json_util.dumps(kd))
            return jsonify(kd), 200
        else:
            kd = list(ja_collection.find({}, {'_id': 0}))
            return jsonify(kd), 200
    except Exception as e:
        return jsonify({'error': f'Failed to fetch Korean drama: {str(e)}'}), 500



@app.route('/api/ja/id_data', methods=['GET'])
def get_ja_id_data():
    try:
        id_data_list = ja_collection.distinct('id_data')  # Fetch unique id_data values
        return jsonify(id_data_list), 200
    except Exception as e:
        return jsonify({'error': f'Failed to fetch id_data: {str(e)}'}), 500
    


@app.route('/api/ch/<kd_id>', methods=['PUT'])
def update_ch_title(kd_id):
    try:
        data = request.json
        new_title = data.get('title')
        new_date = data.get('date')

        # Log received data
        print("Received data:", data)
        
        result = ch_collection.update_one(
            {'_id': ObjectId(kd_id)},
            {'$set': {'title': new_title, 'date': new_date}}  # Merge both updates into a single $set
        )
        
        if result.modified_count == 1:
            return jsonify({'message': 'Korean drama title updated successfully'}), 200
        else:
            return jsonify({'error': 'Failed to update Korean drama title'}), 400
    except Exception as e:
        # Log any errors that occur during the update process
        print("Error updating Korean drama title:", e)
        return jsonify({'error': f'Failed to update Korean drama title: {str(e)}'}), 500


@app.route('/api/ch', methods=['POST'])
def create_ch():
    try:
        data = request.json
        data['id'] = str(ObjectId())  # Generate a new ObjectId for the post
        result = ch_collection.insert_one(data)
        
        # Include the generated ObjectId in the response
        response_data = {'message': 'Korean drama post created successfully', 'id': data['id']}
        
        # Automatically copy _id to id_data
        # kd_collection.update_one({'_id': result.inserted_id})
        ch_collection.update_one({'_id': result.inserted_id}, {'$set': {'id_data': str(result.inserted_id)}})

        return jsonify(response_data), 201
    except Exception as e:
        return jsonify({'error': f'Failed to create Korean drama post: {str(e)}'}), 400
    

@app.route('/api/ch', methods=['GET'])
def get_ch():
    try:
        title_to_search = request.args.get('title')
        if title_to_search:
            kd = ch_collection.find_one({'title': title_to_search}, {'_id': 0})
            if not kd:
                return jsonify({'error': 'Korean drama with the provided title not found'}), 404
            # Convert ObjectId to string for serialization
            kd = json_util.loads(json_util.dumps(kd))
            return jsonify(kd), 200
        else:
            kd = list(ch_collection.find({}, {'_id': 0}))
            return jsonify(kd), 200
    except Exception as e:
        return jsonify({'error': f'Failed to fetch Korean drama: {str(e)}'}), 500



@app.route('/api/ch/id_data', methods=['GET'])
def get_ch_id_data():
    try:
        id_data_list = ch_collection.distinct('id_data')  # Fetch unique id_data values
        return jsonify(id_data_list), 200
    except Exception as e:
        return jsonify({'error': f'Failed to fetch id_data: {str(e)}'}), 500

@app.route('/api/kd/<kd_id>', methods=['PUT'])
def update_kd_title(kd_id):
    try:
        data = request.json
        new_title = data.get('title')
        new_date = data.get('date')
        new_episode = data.get('episode')

        # Log received data
        print("Received data:", data)
        
        result = kd_collection.update_one(
            {'_id': ObjectId(kd_id)},
            {'$set': {'title': new_title, 'date': new_date,'episode': new_episode }}  # Merge both updates into a single $set
        )
        
        if result.modified_count == 1:
            return jsonify({'message': 'Korean drama title updated successfully'}), 200
        else:
            return jsonify({'error': 'Failed to update Korean drama title'}), 400
    except Exception as e:
        # Log any errors that occur during the update process
        print("Error updating Korean drama title:", e)
        return jsonify({'error': f'Failed to update Korean drama title: {str(e)}'}), 500


@app.route('/api/kd', methods=['POST'])
def create_kd():
    try:
        data = request.json
        data['id'] = str(ObjectId())  # Generate a new ObjectId for the post
        result = kd_collection.insert_one(data)
        
        # Include the generated ObjectId in the response
        response_data = {'message': 'Korean drama post created successfully', 'id': data['id']}
        
        # Automatically copy _id to id_data
        # kd_collection.update_one({'_id': result.inserted_id})
        kd_collection.update_one({'_id': result.inserted_id}, {'$set': {'id_data': str(result.inserted_id)}})

        return jsonify(response_data), 201
    except Exception as e:
        return jsonify({'error': f'Failed to create Korean drama post: {str(e)}'}), 400
    

@app.route('/api/kd', methods=['GET'])
def get_kd():
    try:
        title_to_search = request.args.get('title')
        if title_to_search:
            kd = kd_collection.find_one({'title': title_to_search}, {'_id': 0})
            if not kd:
                return jsonify({'error': 'Korean drama with the provided title not found'}), 404
            # Convert ObjectId to string for serialization
            kd = json_util.loads(json_util.dumps(kd))
            return jsonify(kd), 200
        else:
            kd = list(kd_collection.find({}, {'_id': 0}))
            return jsonify(kd), 200
    except Exception as e:
        return jsonify({'error': f'Failed to fetch Korean drama: {str(e)}'}), 500



@app.route('/api/kd/id_data', methods=['GET'])
def get_kd_id_data():
    try:
        id_data_list = kd_collection.distinct('id_data')  # Fetch unique id_data values
        return jsonify(id_data_list), 200
    except Exception as e:
        return jsonify({'error': f'Failed to fetch id_data: {str(e)}'}), 500

@app.route('/api/get-id', methods=['GET', 'PUT'])
def get_id_date():
    if request.method == 'PUT':
        try:
            _id = request.json['_id']
            date = request.json['date']
            kd = kd_collection.find_one({'_id': ObjectId(_id)})
            if kd is None:
                return jsonify({'message': 'Korean drama not found'}), 404
            kd_collection.update_one({'_id': ObjectId(_id)}, {'$set': {'date': date}})
            return jsonify({'message': 'Date updated successfully'}), 200
        except Exception as e:
            return jsonify({'message': str(e)}), 500
    elif request.method == 'GET':
        try:
            kd_ids = [str(doc['_id']) for doc in kd_collection.find({}, {'_id': 1})]
            return jsonify({'kd_ids': kd_ids}), 200
        except Exception as e:
            return jsonify({'error': f'Failed to fetch Korean drama IDs: {str(e)}'}), 500


# @app.route('/api/get-id', methods=['PUT'])
# def get_id_date():
#     try:
#         _id = request.json['_id']
#         date = request.json['date']
#         kd = kd_collection.find_one({'_id': ObjectId(_id)})
#         if kd is None:
#             return jsonify({'message': 'Korean drama not found'}), 404
#         kd_collection.update_one({'_id': ObjectId(_id)}, {'$set': {'date': date}})
#         return jsonify({'message': 'Date updated successfully'}), 200
#     except Exception as e:
#         return jsonify({'message': str(e)}), 500


# @app.route('/api/get-id', methods=['GET'])
# def get_kd_ids():
#     try:
#         kd_ids = [str(doc['_id']) for doc in kd_collection.find({}, {'_id': 1})]
#         return jsonify({'kd_ids': kd_ids}), 200
#     except Exception as e:
#         return jsonify({'error': f'Failed to fetch Korean drama IDs: {str(e)}'}), 500


# @app.route('/api/kd', methods=['POST'])
# def create_kd():
#     try:
#         data = request.json
#         data['id'] = str(ObjectId())  # Generate a new ObjectId for the post
#         kd_collection.insert_one(data)
#         return jsonify({'message': 'Korean drama post created successfully'}), 201
#     except Exception as e:
#         return jsonify({'error': f'Failed to create Korean drama post: {str(e)}'}), 400


# @app.route('/api/kd', methods=['GET'])
# def get_kd():
#     kd = list(kd_collection.find({}, {'_id': 0}))
#     return jsonify(kd)


@app.route('/api/travel', methods=['POST'])
def create_travel():
    try:
        data = request.json
        # Assign a unique id to the news post
        data['id'] = str(uuid4())  # Use uuid4 function to generate a unique ID
        travel_collection.insert_one(data)
        return jsonify({'message': 'News post created successfully', 'id': data['id']}), 201
    except Exception as e:
        return jsonify({'error': f'Failed to create news post: {str(e)}'}), 400

@app.route('/api/travel', methods=['GET'])
def get_travel():
    travel = list(travel_collection.find({}, {'_id': 0}))
    return jsonify(travel)



@app.route('/api/comments/<page_id>', methods=['GET'])
def get_comments(page_id):
    comments = list(comments_collection.find({'page_id': page_id}, {'_id': 0}))  # Exclude _id field from response
    return jsonify({'comments': comments})


# API route for saving comments for a specific page
@app.route('/api/comments/<page_id>', methods=['POST'])
def save_comment(page_id):
    data = request.json
    text = data.get('text')
    user_name = data.get('user_name')  # Get the user's name from the request data
    if text and user_name:
        comment = {'text': text, 'page_id': page_id, 'user_name': user_name}
        comments_collection.insert_one(comment)
        return jsonify({'message': 'Comment saved successfully', 'user_name': user_name}), 200
    else:
        return jsonify({'error': 'Text and user_name fields are required'}), 400



@app.route('/logout', methods=['POST'])
def logout():
    try:
        session.clear()  # Clear the user session
        return jsonify({'message': 'Logout successful'}), 200
    except Exception as e:
        print("Error occurred during logout:", e)
        return jsonify({'message': 'Internal Server Error'}), 500




# Login route
@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.json
        print("Received login data:", data)

        if not data:
            return jsonify({'message': 'Missing JSON data in the request'}), 400
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return jsonify({'message': 'Email or password is missing'}), 400

        # Check if user exists
        user = login_collection.find_one({'email': email})

        if user and check_password_hash(user['password_hash'], password):  # Checking against hashed password

            session['user'] = str(user['_id'])  # Convert ObjectId to string
            session_token = str(uuid4())  # Generate session token

            # Return user's name and session token along with success message
            return jsonify({
                'message': 'Login successful',
                'name': user['name'],
                'email': user['email'],
                'sessionToken': session_token
            }), 200
        else:
            return jsonify({'message': 'Invalid email or password'}), 401
    except Exception as e:
        print("Error occurred during login:", e)
        return jsonify({'message': 'Internal Server Error'}), 500



@app.route('/login', methods=['GET'])
def get_login():
    login = list(login_collection.find({}, {'_id': 0}))
    return jsonify(login)


# Registration route
@app.route('/register', methods=['POST'])
def register():
    try:
        data = request.json
        print("Received data:", data)

        if not data:
            return jsonify({'message': 'Missing JSON data in the request'}), 400

        name = data.get('name')
        email = data.get('email')
        password = data.get('password')

        if not name or not email or not password:
            return jsonify({'message': 'Name, email, or password is missing'}), 400

        # Check if user already exists
        existing_user = login_collection.find_one({'email': email})
        if existing_user:
            return jsonify({'message': 'User already exists'}), 400

        # Hash the password
        hashed_password = generate_password_hash(password)

        # Create a new user document
        new_user = {
            'name': name,
            'email': email,
            'password': password,
            'password_hash': hashed_password,
            'is_admin': False  # Assuming all newly registered users are not admin
        }

        # Insert the new user document into the collection
        login_collection.insert_one(new_user)

        # Generate session token
        session_token = str(uuid4())

        # Store session token in user's session data
        session['user'] = str(new_user['_id'])

        # Return user data and session token
        return jsonify({
            'message': 'User registered successfully',
            'name': new_user['name'],
            'email': new_user['email'],
            'sessionToken': session_token
        }), 201
    except Exception as e:
        print("Error occurred during registration:", e)
        return jsonify({'message': 'Internal Server Error'}), 500





@app.route('/api/search', methods=['POST'])
def search():
    try:
        query = request.json.get('query', '').strip()  # Get the search query from the request
        if not query:
            return jsonify({'error': 'Search query is empty'}), 400

        # Search in each collection for matching titles
        collections = [news_collection, cel_collection, kd_collection, ch_collection, ja_collection, tw_collection, th_collection, ot_collection]
        search_results = []

        for collection in collections:
            results = collection.find({'title': {'$regex': query, '$options': 'i'}}, {'_id': 0})  # Case-insensitive regex search for titles
            for result in results:
                search_results.append(result)

        return jsonify(search_results), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500



# @app.route('/api/ot', methods=['POST'])
# def create_ot():
#     try:
#         data = request.json
#         data['id'] = str(uuid4())
#         # Ensure that 'cel_collection' is properly initialized
#         ot_collection.insert_one(data)
#         return jsonify({'message': 'cel post created successfully'}), 201
#     except Exception as e:
#         return jsonify({'error': f'Failed to create cel post: {str(e)}'}), 400


# @app.route('/api/ot', methods=['GET'])
# def get_ot():
#     ot = list(ot_collection.find({}, {'_id': 0}))
#     return jsonify(ot)


# @app.route('/api/th', methods=['POST'])
# def create_th():
#     try:
#         data = request.json
#         data['id'] = str(uuid4())
#         # Ensure that 'cel_collection' is properly initialized
#         th_collection.insert_one(data)
#         return jsonify({'message': 'cel post created successfully'}), 201
#     except Exception as e:
#         return jsonify({'error': f'Failed to create cel post: {str(e)}'}), 400


# @app.route('/api/th', methods=['GET'])
# def get_th():
#     th = list(th_collection.find({}, {'_id': 0}))
#     return jsonify(th)


# @app.route('/api/tw', methods=['POST'])
# def create_tw():
#     try:
#         data = request.json
#         data['id'] = str(uuid4())
#         # Ensure that 'cel_collection' is properly initialized
#         tw_collection.insert_one(data)
#         return jsonify({'message': 'cel post created successfully'}), 201
#     except Exception as e:
#         return jsonify({'error': f'Failed to create cel post: {str(e)}'}), 400


# @app.route('/api/tw', methods=['GET'])
# def get_tw():
#     tw = list(tw_collection.find({}, {'_id': 0}))
#     return jsonify(tw)


# @app.route('/api/ja', methods=['POST'])
# def create_ja():
#     try:
#         data = request.json
#         data['id'] = str(uuid4())
#         # Ensure that 'cel_collection' is properly initialized
#         ja_collection.insert_one(data)
#         return jsonify({'message': 'cel post created successfully'}), 201
#     except Exception as e:
#         return jsonify({'error': f'Failed to create cel post: {str(e)}'}), 400

# @app.route('/api/ja', methods=['GET'])
# def get_ja():
#     ja = list(ja_collection.find({}, {'_id': 0}))
#     return jsonify(ja)


# @app.route('/api/ch', methods=['POST'])
# def create_ch():
#     try:
#         data = request.json
#         data['id'] = str(uuid4())
#         # Ensure that 'cel_collection' is properly initialized
#         ch_collection.insert_one(data)
#         return jsonify({'message': 'cel post created successfully'}), 201
#     except Exception as e:
#         return jsonify({'error': f'Failed to create cel post: {str(e)}'}), 400


# @app.route('/api/ch', methods=['GET'])
# def get_ch():
#     ch = list(ch_collection.find({}, {'_id': 0}))
#     return jsonify(ch)


# @app.route('/api/kd', methods=['POST'])
# def create_kd():
#     try:
#         data = request.json
#         data['id'] = str(uuid4())
#         # Ensure that 'cel_collection' is properly initialized
#         kd_collection.insert_one(data)
#         return jsonify({'message': 'cel post created successfully'}), 201
#     except Exception as e:
#         return jsonify({'error': f'Failed to create cel post: {str(e)}'}), 400


# @app.route('/api/kd', methods=['GET'])
# def get_kd():
#     kd = list(kd_collection.find({}, {'_id': 0}))
#     return jsonify(kd)


@app.route('/api/news', methods=['POST'])
def create_news():
    try:
        data = request.json
        # Assign a unique id to the news post
        data['id'] = str(uuid4())  # Use uuid4 function to generate a unique ID
        news_collection.insert_one(data)
        return jsonify({'message': 'News post created successfully', 'id': data['id']}), 201
    except Exception as e:
        return jsonify({'error': f'Failed to create news post: {str(e)}'}), 400

@app.route('/api/news', methods=['GET'])
def get_news():
    news = list(news_collection.find({}, {'_id': 0}))
    return jsonify(news)


@app.route('/api/cel', methods=['POST'])
def create_cel():
    try:
        data = request.json
        data['id'] = str(uuid4())
        # Ensure that 'cel_collection' is properly initialized
        cel_collection.insert_one(data)
        return jsonify({'message': 'cel post created successfully'}), 201
    except Exception as e:
        return jsonify({'error': f'Failed to create cel post: {str(e)}'}), 400


@app.route('/api/cel', methods=['GET'])
def get_cel():
    cel = list(cel_collection.find({}, {'_id': 0}))
    return jsonify(cel)



@app.route('/reset-password', methods=['POST'])
def reset_password():
    try:
        data = request.json
        email = data.get('email')
        current_password = data.get('current_password')
        new_password = data.get('new_password')
        confirm_password = data.get('confirm_password')

        # Check if all required fields are present
        if not (email and current_password and new_password and confirm_password):
            return jsonify({'message': 'Please provide email, current_password, new_password, and confirm_password'}), 400

        # Check if user exists
        user = login_collection.find_one({'email': email})

        if not user:
            return jsonify({'message': 'User not found'}), 404

        # Check if current password matches
        if not check_password_hash(user.get('password_hash'), current_password):
            return jsonify({'message': 'Invalid current password'}), 401

        # Check if new password matches confirm password
        if new_password != confirm_password:
            return jsonify({'message': 'New password and confirm password do not match'}), 400

        # Update user's plain-text password
        result = login_collection.update_one({'email': email}, {'$set': {'password': new_password}})
        
        # Hash the new password and update user's password hash
        hashed_password = generate_password_hash(new_password)
        result_hash = login_collection.update_one({'email': email}, {'$set': {'password_hash': hashed_password}})
        
        if result.modified_count == 1 and result_hash.modified_count == 1:
            app.logger.info(f"Password updated successfully for user with email: {email}")
            return jsonify({'message': 'Password updated successfully'}), 200
        else:
            app.logger.error(f"Password update failed for user with email: {email}. No documents modified")
            return jsonify({'message': 'Password update failed. No documents modified'}), 500
    except Exception as e:
        app.logger.exception("Error occurred during password reset:")
        return jsonify({'message': 'Internal Server Error'}), 500




# @app.route('/api/user/updateAdmin', methods=['POST'])
# def update_admin():
#     try:
#         data = request.json
#         user_id = data.get('user_id')
#         is_admin = data.get('is_admin')

#         if not user_id or not is_admin:
#             return jsonify({'message': 'User ID or isAdmin data is missing'}), 400

#         # Convert user_id string to ObjectId
#         user_id = ObjectId(user_id)

#         # Update the user's is_admin field in the database
#         result = login_collection.update_one({'_id': user_id}, {'$set': {'is_admin': is_admin}})

#         if result.modified_count > 0:
#             return jsonify({'message': 'User admin status updated successfully'}), 200
#         else:
#             return jsonify({'message': 'User not found or admin status not updated'}), 404
#     except Exception as e:
#         print("Error updating user admin status:", e)
#         return jsonify({'message': 'Internal Server Error'}), 500



# @app.route('/login', methods=['POST'])
# def login():
#     try:
#         data = request.json
#         print("Received login data:", data)

#         if not data:
#             return jsonify({'message': 'Missing JSON data in the request'}), 400
#         email = data.get('email')
#         password = data.get('password')

#         if not email or not password:
#             return jsonify({'message': 'Email or password is missing'}), 400

#         # Check if user exists
#         user = login_collection.find_one({'email': email})

#         if user and check_password_hash(user['password_hash'], password):  # Checking against hashed password

#             session['user'] = str(user['_id'])  # Convert ObjectId to string
#             # Return user's name along with success message
#             return jsonify({'message': 'Login successful', 'name': user['name'], 'email': user['email']}), 200
#         else:
#             return jsonify({'message': 'Invalid email or password'}), 401
#     except Exception as e:
#         print("Error occurred during login:", e)
#         return jsonify({'message': 'Internal Server Error'}), 500


# @app.route('/login', methods=['GET'])
# def get_login():
#     login = list(login_collection.find({}, {'_id': 0}))
#     return jsonify(login)


# @app.route('/register', methods=['POST'])
# def register():
#     try:
#         data = request.json
#         print("Received data:", data)

#         if not data:
#             return jsonify({'message': 'Missing JSON data in the request'}), 400

#         name = data.get('name')
#         email = data.get('email')
#         password = data.get('password')

#         if not name or not email or not password:
#             return jsonify({'message': 'Name, email, or password is missing'}), 400

#         # Check if user already exists
#         existing_user = login_collection.find_one({'email': email})
#         if existing_user:
#             return jsonify({'message': 'User already exists'}), 400

#         # Hash the password
#         hashed_password = generate_password_hash(password)

#         # Create a new user document
#         new_user = {'name': name, 'email': email, 'password': password, 'password_hash': hashed_password}

#         # Insert the new user document into the collection
#         login_collection.insert_one(new_user)

#         return jsonify({'message': 'User registered successfully'}), 201
#     except Exception as e:
#         print("Error occurred during registration:", e)
#         return jsonify({'message': 'Internal Server Error'}), 500



@app.route('/check-email', methods=['POST'])
def check_email():
    try:
        data = request.json
        print("Received data:", data)

        # Check if JSON data is present in the request
        if not data:
            return jsonify({'message': 'Missing JSON data in the request'}), 400

        email = data.get('email')

        # Check if email is provided
        if not email:
            return jsonify({'message': 'Email is missing'}), 400

        # Check if email already exists in the database
        existing_user = login_collection.find_one({'email': email})

        if existing_user:
            return jsonify({'message': 'Email already registered'}), 200
        else:
            return jsonify({'message': 'Email available for registration'}), 200
    except Exception as e:
        print("Error occurred while checking email:", e)
        return jsonify({'message': 'Internal Server Error'}), 500



# @app.route('/logout', methods=['POST'])
# def logout():
#     try:
#         # Clear the session
#         session.clear()
#         return jsonify({'message': 'Logout successful'}), 200
#     except Exception as e:
#         print("Error occurred during logout:", e)
#         return jsonify({'message': 'Internal Server Error'}), 500
    

@app.route('/profile', methods=['GET'])
def profile():
    # Check if the user is logged in
    if 'user' not in session:
        return jsonify({'message': 'Unauthorized'}), 401

    # Return user information from the session
    user = session['user']
    return jsonify({'name': user['name'], 'email': user['email']}), 200



# @app.route('/api/ot', methods=['POST'])
# def create_ot():
#     try:
#         data = request.json
#         data['id'] = str(uuid4())
#         # Ensure that 'cel_collection' is properly initialized
#         ot_collection.insert_one(data)
#         return jsonify({'message': 'cel post created successfully'}), 201
#     except Exception as e:
#         return jsonify({'error': f'Failed to create cel post: {str(e)}'}), 400


# @app.route('/api/ot', methods=['GET'])
# def get_ot():
#     ot = list(ot_collection.find({}, {'_id': 0}))
#     return jsonify(ot)


# @app.route('/api/th', methods=['POST'])
# def create_th():
#     try:
#         data = request.json
#         data['id'] = str(uuid4())
#         # Ensure that 'cel_collection' is properly initialized
#         th_collection.insert_one(data)
#         return jsonify({'message': 'cel post created successfully'}), 201
#     except Exception as e:
#         return jsonify({'error': f'Failed to create cel post: {str(e)}'}), 400


# @app.route('/api/th', methods=['GET'])
# def get_th():
#     th = list(th_collection.find({}, {'_id': 0}))
#     return jsonify(th)


# @app.route('/api/tw', methods=['POST'])
# def create_tw():
#     try:
#         data = request.json
#         data['id'] = str(uuid4())
#         # Ensure that 'cel_collection' is properly initialized
#         tw_collection.insert_one(data)
#         return jsonify({'message': 'cel post created successfully'}), 201
#     except Exception as e:
#         return jsonify({'error': f'Failed to create cel post: {str(e)}'}), 400


# @app.route('/api/tw', methods=['GET'])
# def get_tw():
#     tw = list(tw_collection.find({}, {'_id': 0}))
#     return jsonify(tw)


# @app.route('/api/ja', methods=['POST'])
# def create_ja():
#     try:
#         data = request.json
#         data['id'] = str(uuid4())
#         # Ensure that 'cel_collection' is properly initialized
#         ja_collection.insert_one(data)
#         return jsonify({'message': 'cel post created successfully'}), 201
#     except Exception as e:
#         return jsonify({'error': f'Failed to create cel post: {str(e)}'}), 400


# @app.route('/api/ja', methods=['GET'])
# def get_ja():
#     ja = list(ja_collection.find({}, {'_id': 0}))
#     return jsonify(ja)



# @app.route('/api/ch', methods=['POST'])
# def create_ch():
#     try:
#         data = request.json
#         data['id'] = str(uuid4())
#         # Ensure that 'cel_collection' is properly initialized
#         ch_collection.insert_one(data)
#         return jsonify({'message': 'cel post created successfully'}), 201
#     except Exception as e:
#         return jsonify({'error': f'Failed to create cel post: {str(e)}'}), 400


# @app.route('/api/ch', methods=['GET'])
# def get_ch():
#     ch = list(ch_collection.find({}, {'_id': 0}))
#     return jsonify(ch)



# @app.route('/api/kd', methods=['POST'])
# def create_kd():
#     try:
#         data = request.json
#         data['id'] = str(uuid4())
#         # Ensure that 'cel_collection' is properly initialized
#         kd_collection.insert_one(data)
#         return jsonify({'message': 'cel post created successfully'}), 201
#     except Exception as e:
#         return jsonify({'error': f'Failed to create cel post: {str(e)}'}), 400


# @app.route('/api/kd', methods=['GET'])
# def get_kd():
#     kd = list(kd_collection.find({}, {'_id': 0}))
#     return jsonify(kd)






# @app.route('/api/news', methods=['POST'])
# def create_news():
#     try:
#         data = request.json
#         # Assign a unique id to the news post
#         data['id'] = str(uuid4())  # Use uuid4 function to generate a unique ID
#         news_collection.insert_one(data)
#         return jsonify({'message': 'News post created successfully', 'id': data['id']}), 201
#     except Exception as e:
#         return jsonify({'error': f'Failed to create news post: {str(e)}'}), 400

# @app.route('/api/news', methods=['GET'])
# def get_news():
#     news = list(news_collection.find({}, {'_id': 0}))
#     return jsonify(news)




# @app.route('/api/cel', methods=['POST'])
# def create_cel():
#     try:
#         data = request.json
#         data['id'] = str(uuid4())
#         # Ensure that 'cel_collection' is properly initialized
#         cel_collection.insert_one(data)
#         return jsonify({'message': 'cel post created successfully'}), 201
#     except Exception as e:
#         return jsonify({'error': f'Failed to create cel post: {str(e)}'}), 400




# @app.route('/api/cel', methods=['GET'])
# def get_cel():
#     cel = list(cel_collection.find({}, {'_id': 0}))
#     return jsonify(cel)



# @app.route('/api/comments/<page_id>', methods=['GET'])
# def get_comments(page_id):
#     comments = list(comments_collection.find({'page_id': page_id}, {'_id': 0}))  # Exclude _id field from response
#     return jsonify({'comments': comments})

# # API route for saving comments for a specific page
# @app.route('/api/comments/<page_id>', methods=['POST'])
# def save_comment(page_id):
#     data = request.json
#     text = data.get('text')
#     if text:
#         comment = {'text': text, 'page_id': page_id}
#         comments_collection.insert_one(comment)
#         return jsonify({'message': 'Comment saved successfully'}), 200
#     else:
#         return jsonify({'error': 'Text field is required'}), 400

# Backend Changes (Flask)
@app.route('/api/korenaMovie/<page_id>', methods=['POST'])
def save_korena_movie(page_id):
    try:
        request_data = request.json
        urls = request_data.get('urls', [])

        # Access the desired collection using the page_id from the URL
        collection = db[page_id]

        # Replace existing document or insert a new one
        collection.replace_one({}, {'urls': urls}, upsert=True)

        return jsonify({'success': True, 'message': 'Data saved successfully'}), 200
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500



@app.route('/api/follow/<string:page_id>', methods=['POST'])
def handle_follow(page_id):
    try:
        ip_address = request.remote_addr  # Get IP address from request
        if not db.followed_ips.find_one({'ip_address': ip_address, 'page_id': page_id}):
            db.followed_ips.insert_one({'ip_address': ip_address, 'page_id': page_id})
            follower_count = db.followed_ips.count_documents({'page_id': page_id})
            db.pages.update_one({'_id': page_id}, {'$set': {'followerCount': follower_count}})
            return jsonify({'isFollowing': True, 'followerCount': follower_count}), 200
    except Exception as e:
        print('Error:', e)
        return jsonify({'error': 'Internal Server Error'}), 500

@app.route('/api/follower-count/<string:page_id>', methods=['GET'])
def get_follower_count(page_id):
    if page_id is None or page_id == 'undefined':
        return jsonify({'error': 'Invalid page_id'}), 400

    try:
        follower_count = db.followed_ips.count_documents({'page_id': page_id})
        ip_address = request.remote_addr
        is_following = bool(db.followed_ips.find_one({'ip_address': ip_address, 'page_id': page_id}))
        return jsonify({'followerCount': follower_count, 'isFollowing': is_following}), 200
    except Exception as e:
        print('Error:', e)
        return jsonify({'error': 'Internal Server Error'}), 500




# API endpoint to save image data to MongoDB
@app.route('/api/saveImageData', methods=['POST'])
def save_image_data():
    try:
        # Get image data and user name from the request
        request_data = request.json
        image_data = request_data.get('imageData', [])
        image_imagesnews = request_data.get('imagesnews', [])

        user_name = request_data.get('userName', 'unknown')  # Default user name if not provided
        user_namenews = request_data.get('userNamenews', 'unknown')  # Default user name if not provided

        # Drop existing collection to replace with new data (optional)
        db[user_name].drop()
        db[user_namenews].drop()

        # Insert image data into MongoDB under the specified user name
        db[user_name].insert_many(image_data )
        db[user_namenews].insert_many(image_imagesnews )

        return jsonify({'success': True, 'message': 'Image data saved successfully'}), 200
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500



# Directory path where JavaScript files will be created
directory_new = r'C:\Users\acquy\OneDrive\blog-web\blog\client\src\components\News'
directory_path = r'C:\Users\acquy\OneDrive\blog-web\blog\client\src\components\Celebrities'

@app.route('/generate-jsx', methods=['POST'])
def generate_jsx():
    # Receive form data from frontend
    form_data = request.json
    print('Received form data:', form_data)  # Log the received data
    
    # Extract form data
    name_url = form_data.get('name_url')
    name = form_data.get('title')
    nickname = form_data.get('nickname')
    birthdate = form_data.get('birthdate')
    country = form_data.get('country')
    image_url = form_data.get('imageUrl')  # Assuming imageUrl is the key for the image URL

    imageshow_url = form_data.get('imageshowUrl')  # Assuming imageUrl is the key for the image URL
    show_url = form_data.get('showurl')
    show_title = form_data.get('showtitle')

    imageshow_url1 = form_data.get('imageshowUrl1')
    show_url1 = form_data.get('showurl1')
    show_title1 = form_data.get('showtitle1')
    imageshow_url2 = form_data.get('imageshowUrl2')
    show_url2 = form_data.get('showurl2')
    show_title2 = form_data.get('showtitle2')
    imageshow_url3 = form_data.get('imageshowUrl3')
    show_url3 = form_data.get('showurl3')
    show_title3 = form_data.get('showtitle3')
    imageshow_url4 = form_data.get('imageshowUrl4')
    show_url4 = form_data.get('showurl4')
    show_title4 = form_data.get('showtitle4')
    imageshow_url5 = form_data.get('imageshowUrl5')
    show_url5 = form_data.get('showurl5')
    show_title5 = form_data.get('showtitle5')
    imageshow_url6 = form_data.get('imageshowUrl6')
    show_url6 = form_data.get('showurl6')
    show_title6 = form_data.get('showtitle6')
    imageshow_url7 = form_data.get('imageshowUrl7')
    show_url7 = form_data.get('showurl7')
    show_title7 = form_data.get('showtitle7')
    imageshow_url8 = form_data.get('imageshowUrl8')
    show_url8 = form_data.get('showurl8')
    show_title8 = form_data.get('showtitle8')
    imageshow_url9 = form_data.get('imageshowUrl9')
    show_url9 = form_data.get('showurl9')
    show_title9 = form_data.get('showtitle9')
    imageshow_url10 = form_data.get('imageshowUrl10')
    show_url10 = form_data.get('showurl10')
    show_title10 = form_data.get('showtitle10')
    imageshow_url11 = form_data.get('imageshowUrl11')
    show_url11 = form_data.get('showurl11')
    show_title11 = form_data.get('showtitle11')
    imageshow_url12 = form_data.get('imageshowUrl12')
    show_url12 = form_data.get('showurl12')
    show_title12 = form_data.get('showtitle12')
    imageshow_url13 = form_data.get('imageshowUrl13')
    show_url13 = form_data.get('showurl13')
    show_title13 = form_data.get('showtitle13')
    imageshow_url14 = form_data.get('imageshowUrl14')
    show_url14 = form_data.get('showurl14')
    show_title14 = form_data.get('showtitle14')
    imageshow_url15 = form_data.get('imageshowUrl15')
    show_url15 = form_data.get('showurl15')
    show_title15 = form_data.get('showtitle15')
    imageshow_url16 = form_data.get('imageshowUrl16')
    show_url16 = form_data.get('showurl16')
    show_title16 = form_data.get('showtitle16')
    imageshow_url17 = form_data.get('imageshowUrl17')
    show_url17 = form_data.get('showurl17')
    show_title17 = form_data.get('showtitle17')
    imageshow_url18 = form_data.get('imageshowUrl18')
    show_url18 = form_data.get('showurl18')
    show_title18 = form_data.get('showtitle18')
    imageshow_url19 = form_data.get('imageshowUrl19')
    show_url19 = form_data.get('showurl19')
    show_title19 = form_data.get('showtitle19')
    imageshow_url20 = form_data.get('imageshowUrl20')
    show_url20 = form_data.get('showurl20')
    show_title20 = form_data.get('showtitle20')


    imagenews_url = form_data.get('imagenewsUrl')  # Assuming imageUrl is the key for the image URL
    news_url = form_data.get('newsurl')
    new_title = form_data.get('newstitle')
    imagenews_url1 = form_data.get('imagenewsUrl1')
    news_url1 = form_data.get('newsurl1')
    new_title1 = form_data.get('newstitle1')
    imagenews_url2 = form_data.get('imagenewsUrl2')
    news_url2 = form_data.get('newsurl2')
    new_title2 = form_data.get('newstitle2')
    imagenews_url3 = form_data.get('imagenewsUrl3')
    news_url3 = form_data.get('newsurl3')
    new_title3 = form_data.get('newstitle3')
    imagenews_url4 = form_data.get('imagenewsUrl4')
    news_url4 = form_data.get('newsurl4')
    new_title4 = form_data.get('newstitle4')
    imagenews_url5 = form_data.get('imagenewsUrl5')
    news_url5 = form_data.get('newsurl5')
    new_title5 = form_data.get('newstitle5')
    imagenews_url6 = form_data.get('imagenewsUrl6')
    news_url6 = form_data.get('newsurl6')
    new_title6 = form_data.get('newstitle6')
    imagenews_url7 = form_data.get('imagenewsUrl7')
    news_url7 = form_data.get('newsurl7')
    new_title7 = form_data.get('newstitle7')
    imagenews_url8 = form_data.get('imagenewsUrl8')
    news_url8 = form_data.get('newsurl8')
    new_title8 = form_data.get('newstitle8')
    imagenews_url9 = form_data.get('imagenewsUrl9')
    news_url9 = form_data.get('newsurl9')
    new_title9 = form_data.get('newstitle9')
    imagenews_url10 = form_data.get('imagenewsUrl10')
    news_url10 = form_data.get('newsurl10')
    new_title10 = form_data.get('newstitle10')
    imagenews_url11 = form_data.get('imagenewsUrl11')
    news_url11 = form_data.get('newsurl11')
    new_title11 = form_data.get('newstitle11')
    imagenews_url12 = form_data.get('imagenewsUrl12')
    news_url12 = form_data.get('newsurl12')
    new_title12 = form_data.get('newstitle12')
    imagenews_url13 = form_data.get('imagenewsUrl13')
    news_url13 = form_data.get('newsurl13')
    new_title13 = form_data.get('newstitle13')
    imagenews_url14 = form_data.get('imagenewsUrl14')
    news_url14 = form_data.get('newsurl14')
    new_title14 = form_data.get('newstitle14')
    imagenews_url15 = form_data.get('imagenewsUrl15')
    news_url15 = form_data.get('newsurl15')
    new_title15 = form_data.get('newstitle15')
    imagenews_url16 = form_data.get('imagenewsUrl16')
    news_url16 = form_data.get('newsurl16')
    new_title16 = form_data.get('newstitle16')
    imagenews_url17 = form_data.get('imagenewsUrl17')
    news_url17 = form_data.get('newsurl17')
    new_title17 = form_data.get('newstitle17')
    imagenews_url18 = form_data.get('imagenewsUrl18')
    news_url18 = form_data.get('newsurl18')
    new_title18 = form_data.get('newstitle18')
    imagenews_url19 = form_data.get('imagenewsUrl19')
    news_url19 = form_data.get('newsurl19')
    new_title19 = form_data.get('newstitle19')
    imagenews_url20 = form_data.get('imagenewsUrl20')
    news_url20 = form_data.get('newsurl20')
    new_title20 = form_data.get('newstitle20')


    describle = form_data.get('describle')

    Libra = form_data.get('libra')
    Tall = form_data.get('tall')
    Nationality = form_data.get('nationality')
    Instagram  = form_data.get('instagram')
    Name_instagram = form_data.get('nameinstagram')
    Youtube = form_data.get('youtube')
    Name_youtube = form_data.get('nameyoutube')


    if name_url and image_url:
        # Create a new JavaScript file with the name in the specified directory
        file_path = os.path.join(directory_path, f'{name_url}.js')
        with open(file_path, 'w', encoding='utf-8') as file:
            # Write JSX content to the new file
            file.write(
                f"""
                import React, {{ useState, useEffect }} from 'react';
                import Editable from '../Editable';
                import '../../styles/Celebrities-form.css';
                import axios from 'axios';
                import {{ useParams }} from 'react-router-dom';

                import '@fortawesome/fontawesome-free/css/all.css';
                const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

                function {name_url.replace(' ', '')}() {{
                    const {{ pageId }} = useParams(); // Get the pageId from the route parameter

                    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
                    const [birthdated, setBirthdate] = useState('{birthdate}'); // Set initial birthdate
                
                    const toggleDropdown = () => {{
                        setIsDropdownOpen(!isDropdownOpen);
                    }};
                    const shareOptions = ['Copy Link', 'Facebook', 'Twitter', 'Messenger'];
                    const shareUrl = '/{name}';

                    const handleShareOptionClick = async (option) => {{
                        try {{
                            switch (option) {{
                                case 'Copy Link':
                                    await navigator.clipboard.writeText(shareUrl);
                                    console.log('Link copied to clipboard:', shareUrl);
                                    // Optionally show a notification or update UI to indicate success
                                    break;
                                case 'Facebook':
                                    shareOnFacebook();
                                    break;
                                case 'Twitter':
                                    // Implement share on Twitter functionality
                                    break;
                                default:
                                    break;
                            }}
                        }} catch (error) {{
                            console.error('Failed to copy or share:', error);
                            // Optionally show a notification or update UI to indicate failure
                        }}
                    }};
                
                    const shareOnFacebook = () => {{
                        // Implement sharing on Facebook using Facebook SDK
                        // Ensure the Facebook SDK is loaded before using FB object
                        window.FB.ui({{
                            method: 'share',
                            href: 'https://example.com', // Replace with your URL
                        }}, function(response){{}});
                    }};



                      function toggleSection(sectionId) {{
                    const sections = document.querySelectorAll('.section');
                        sections.forEach(section => {{
                            if (section.id === sectionId) {{
                                section.style.display = 'block';
                            }} else {{
                                section.style.display = 'none';
                            }}
                        }});
                    }}
                    const [age, setAge] = useState(calculateAge());

                    useEffect(() => {{
                        const intervalId = setInterval(() => {{
                            setAge(calculateAge());
                        }}, 60000); // Update every minute (adjust as needed)
                
                        return () => clearInterval(intervalId); // Clean up interval on unmount
                    }}, []);
                
                    useEffect(() => {{
                        // Update age whenever birthdate changes
                        setAge(calculateAge());
                    }}, [birthdated]);
                
                    function calculateAge() {{
                        const today = new Date();
                        const birthYear = parseInt(birthdated.slice(0, 4)); // Extract year from birthdate
                        const birthDate = new Date(birthYear, 7, 18); // Assuming month and day are fixed
                        let age = today.getFullYear() - birthDate.getFullYear();
                        const monthDiff = today.getMonth() - birthDate.getMonth();
                        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {{
                            age--;
                        }}
                        return age;
                    }}

                        // const imagesshows = [
                        //     {{ url: "{show_url1}", title: "{show_title1}", img: "{imageshow_url1}" }},
                        //     {{ url: "{show_url2}", title: "{show_title2}", img: "{imageshow_url2}" }},
                        //     {{ url: "{show_url3}", title: "{show_title3}", img: "{imageshow_url3}" }},
                        //     {{ url: "{show_url4}", title: "{show_title4}", img: "{imageshow_url4}" }},
                        //     {{ url: "{show_url5}", title: "{show_title5}", img: "{imageshow_url5}" }},
                        //     {{ url: "{show_url6}", title: "{show_title6}", img: "{imageshow_url6}" }},
                        //     {{ url: "{show_url7}", title: "{show_title7}", img: "{imageshow_url7}" }},
                        //     {{ url: "{show_url8}", title: "{show_title8}", img: "{imageshow_url8}" }},
                        //     {{ url: "{show_url9}", title: "{show_title9}", img: "{imageshow_url9}" }},
                        //     {{ url: "{show_url10}", title: "{show_title10}", img: "{imageshow_url10}" }},
                        //     {{ url: "{show_url11}", title: "{show_title11}", img: "{imageshow_url11}" }},
                        //     {{ url: "{show_url12}", title: "{show_title12}", img: "{imageshow_url12}" }},
                        //     {{ url: "{show_url13}", title: "{show_title13}", img: "{imageshow_url13}" }},
                        //     {{ url: "{show_url14}", title: "{show_title14}", img: "{imageshow_url14}" }},
                        //     {{ url: "{show_url15}", title: "{show_title15}", img: "{imageshow_url15}" }},
                        //     {{ url: "{show_url16}", title: "{show_title16}", img: "{imageshow_url16}" }},
                        //     {{ url: "{show_url17}", title: "{show_title17}", img: "{imageshow_url17}" }},
                        //     {{ url: "{show_url18}", title: "{show_title18}", img: "{imageshow_url18}" }},
                        //     {{ url: "{show_url19}", title: "{show_title19}", img: "{imageshow_url19}" }},
                        //     {{ url: "{show_url20}", title: "{show_title20}", img: "{imageshow_url20}" }}

                        // ];
                        
                        // const imagesnews = [
                        //     {{ url: "{news_url1}", title: "{new_title1}", img: "{imagenews_url1}" }},
                        //     {{ url: "{news_url2}", title: "{new_title2}", img: "{imagenews_url2}" }},
                        //     {{ url: "{news_url3}", title: "{new_title3}", img: "{imagenews_url3}" }},
                        //     {{ url: "{news_url4}", title: "{new_title4}", img: "{imagenews_url4}" }},
                        //     {{ url: "{news_url5}", title: "{new_title5}", img: "{imagenews_url5}" }},
                        //     {{ url: "{news_url6}", title: "{new_title6}", img: "{imagenews_url6}" }},
                        //     {{ url: "{news_url7}", title: "{new_title7}", img: "{imagenews_url7}" }},
                        //     {{ url: "{news_url8}", title: "{new_title8}", img: "{imagenews_url8}" }},
                        //     {{ url: "{news_url9}", title: "{new_title9}", img: "{imagenews_url9}" }},
                        //     {{ url: "{news_url10}", title: "{new_title10}", img: "{imagenews_url10}" }},
                        //     {{ url: "{news_url11}", title: "{new_title11}", img: "{imagenews_url11}" }},
                        //     {{ url: "{news_url12}", title: "{new_title12}", img: "{imagenews_url12}" }},
                        //     {{ url: "{news_url13}", title: "{new_title13}", img: "{imagenews_url13}" }},
                        //     {{ url: "{news_url14}", title: "{new_title14}", img: "{imagenews_url14}" }},
                        //     {{ url: "{news_url15}", title: "{new_title15}", img: "{imagenews_url15}" }},
                        //     {{ url: "{news_url16}", title: "{new_title16}", img: "{imagenews_url16}" }},
                        //     {{ url: "{news_url17}", title: "{new_title17}", img: "{imagenews_url17}" }},
                        //     {{ url: "{news_url18}", title: "{new_title18}", img: "{imagenews_url18}" }},
                        //     {{ url: "{news_url19}", title: "{new_title19}", img: "{imagenews_url19}" }},
                        //     {{ url: "{news_url20}", title: "{new_title20}", img: "{imagenews_url20}" }}

                        // ];

                        const [isFollowing, setIsFollowing] = useState(false);
                            const [followerCount, setFollowerCount] = useState(0);

                            useEffect(() => {{
                                fetchFollowerCount();
                            }}, [pageId]);

                            const fetchFollowerCount = async () => {{
                                try {{
                                    const response = await axios.get(`${{API_BASE_URL}}/api/follower-count/${{pageId}}`);
                                    const {{ followerCount, isFollowing }} = response.data;
                                    setFollowerCount(followerCount);
                                    setIsFollowing(isFollowing);
                                }} catch (error) {{
                                    console.error('Error fetching follower count:', error);
                                }}
                            }};

                            const handleFollow = async () => {{
                                try {{
                                    const response = await axios.post(`${{API_BASE_URL}}/api/follow/${{pageId}}`);
                                    const {{ followerCount, isFollowing }} = response.data;
                                    setFollowerCount(followerCount);
                                    setIsFollowing(isFollowing);
                                }} catch (error) {{
                                    console.error('Error following:', error);
                                }}
                            }};


                        const [name, setName] = useState(localStorage.getItem(window.location.href + '-name') || '{name}');

                        useEffect(() => {{
                            localStorage.setItem(window.location.href + '-name', name);
                        }}, [name]); // Run this effect whenever the name changes

                        const handleNameChange = (newName) => {{
                            setName(newName);
                        }};


                        const userName = '{name}-shows'; // Define the userName variable
                        const userNamenews = '{name}-news'; // Define the userName variable
                        const saveImageDataToMongoDB = async (imageData, userName,userNamenews, imagesnews) => {{
                            try {{
                                const response = await fetch(`${{API_BASE_URL}}/api/saveImageData`, {{
                                    method: 'POST',
                                    headers: {{
                                        'Content-Type': 'application/json'
                                    }},
                                    body: JSON.stringify({{ imageData, userName}},{{userNamenews,imagesnews}}), // Include imageImagesNews in the request body

                                }});
                                const data = await response.json();
                                if (data.success) {{
                                    console.log('Image data saved to MongoDB successfully');
                                }} else {{
                                    console.error('Error saving image data:', data.error);
                                }}
                            }} catch (error) {{
                                console.error('Error saving image data:', error);
                            }}
                        }};
                        const [imagesnews, setimagesnews] = useState(() => {{
                            const storedimagesnews = localStorage.getItem('imagesnews');
                            return storedimagesnews ? JSON.parse(storedimagesnews) : [
                                {{ url: "{news_url1}", title: "{new_title1}", img: "{imagenews_url1}" }},
                                {{ url: "{news_url2}", title: "{new_title2}", img: "{imagenews_url2}" }},
                                {{ url: "{news_url3}", title: "{new_title3}", img: "{imagenews_url3}" }},
                                {{ url: "{news_url4}", title: "{new_title4}", img: "{imagenews_url4}" }},
                                {{ url: "{news_url5}", title: "{new_title5}", img: "{imagenews_url5}" }},
                                {{ url: "{news_url6}", title: "{new_title6}", img: "{imagenews_url6}" }},
                                {{ url: "{news_url7}", title: "{new_title7}", img: "{imagenews_url7}" }},
                                {{ url: "{news_url8}", title: "{new_title8}", img: "{imagenews_url8}" }},
                                {{ url: "{news_url9}", title: "{new_title9}", img: "{imagenews_url9}" }},
                                {{ url: "{news_url10}", title: "{new_title10}", img: "{imagenews_url10}" }},
                                {{ url: "{news_url11}", title: "{new_title11}", img: "{imagenews_url11}" }},
                                {{ url: "{news_url12}", title: "{new_title12}", img: "{imagenews_url12}" }},
                                {{ url: "{news_url13}", title: "{new_title13}", img: "{imagenews_url13}" }},
                                {{ url: "{news_url14}", title: "{new_title14}", img: "{imagenews_url14}" }},
                                {{ url: "{news_url15}", title: "{new_title15}", img: "{imagenews_url15}" }},
                                {{ url: "{news_url16}", title: "{new_title16}", img: "{imagenews_url16}" }},
                                {{ url: "{news_url17}", title: "{new_title17}", img: "{imagenews_url17}" }},
                                {{ url: "{news_url18}", title: "{new_title18}", img: "{imagenews_url18}" }},
                                {{ url: "{news_url19}", title: "{new_title19}", img: "{imagenews_url19}" }},
                                {{ url: "{news_url20}", title: "{new_title20}", img: "{imagenews_url20}" }}
                                ];
                        }});
                        useEffect(() => {{
                            localStorage.setItem('imageData', JSON.stringify(imagesnews));
                        }}, [imagesnews]);
                        
                        const handleImageDataChanged = (index, field, value) => {{
                            const updatedImageData = [...imagesnews];
                            updatedImageData[index][field] = value;
                            setimagesnews(updatedImageData);
                        }};

                        const handleAddImaged = () => {{
                            const userNamenews = '{name}';

                            setimagesnews([{{ url: "", title: "", img: "", userNamenews }}, ...imagesnews]);
                            setInputVisible(true);
                        }};
                    
                        const handleDeleteImaged = (index) => {{
                            const updatedImageData = imagesnews.filter((_, i) => i !== index);
                            setimagesnews(updatedImageData);
                        }};

                        const [imageData, setImageData] = useState(() => {{
                            const storedImageData = localStorage.getItem('imageData');
                            return storedImageData ? JSON.parse(storedImageData) : [
                                {{ url: "{show_url1}", title: "{show_title1}", img: "{imageshow_url1}" }},
                                {{ url: "{show_url2}", title: "{show_title2}", img: "{imageshow_url2}" }},
                                {{ url: "{show_url3}", title: "{show_title3}", img: "{imageshow_url3}" }},
                                {{ url: "{show_url4}", title: "{show_title4}", img: "{imageshow_url4}" }},
                                {{ url: "{show_url5}", title: "{show_title5}", img: "{imageshow_url5}" }},
                                {{ url: "{show_url6}", title: "{show_title6}", img: "{imageshow_url6}" }},
                                {{ url: "{show_url7}", title: "{show_title7}", img: "{imageshow_url7}" }},
                                {{ url: "{show_url8}", title: "{show_title8}", img: "{imageshow_url8}" }},
                                {{ url: "{show_url9}", title: "{show_title9}", img: "{imageshow_url9}" }},
                                {{ url: "{show_url10}", title: "{show_title10}", img: "{imageshow_url10}" }},
                                {{ url: "{show_url11}", title: "{show_title11}", img: "{imageshow_url11}" }},
                                {{ url: "{show_url12}", title: "{show_title12}", img: "{imageshow_url12}" }},
                                {{ url: "{show_url13}", title: "{show_title13}", img: "{imageshow_url13}" }},
                                {{ url: "{show_url14}", title: "{show_title14}", img: "{imageshow_url14}" }},
                                {{ url: "{show_url15}", title: "{show_title15}", img: "{imageshow_url15}" }},
                                {{ url: "{show_url16}", title: "{show_title16}", img: "{imageshow_url16}" }},
                                {{ url: "{show_url17}", title: "{show_title17}", img: "{imageshow_url17}" }},
                                {{ url: "{show_url18}", title: "{show_title18}", img: "{imageshow_url18}" }},
                                {{ url: "{show_url19}", title: "{show_title19}", img: "{imageshow_url19}" }},
                                {{ url: "{show_url20}", title: "{show_title20}", img: "{imageshow_url20}" }}
                                ];
                        }});
                        useEffect(() => {{
                            localStorage.setItem('imageData', JSON.stringify(imageData));
                        }}, [imageData]);
                        
                        const handleImageDataChange = (index, field, value) => {{
                            const updatedImageData = [...imageData];
                            updatedImageData[index][field] = value;
                            setImageData(updatedImageData);
                        }};

                        const handleAddImage = () => {{
                            const userName = '{name}';

                            setImageData([{{ url: "", title: "", img: "", userName }}, ...imageData]);
                            setInputVisible(true);

                        }};
                    
                        const handleDeleteImage = (index) => {{
                            const updatedImageData = imageData.filter((_, i) => i !== index);
                            setImageData(updatedImageData);
                        }};

                        // Define state variable for admin status
                       
                        
                            const [user, setUser] = useState({{
                            name: '', // Initialize name as empty string
                            email: '',
                            is_admin: false,

                            // Add more fields as needed
                          }});

                          // Define fetchUserData function
                          const fetchUserData = async () => {{
                            try {{
                              const loggedInUserEmail = sessionStorage.getItem('loggedInUserEmail') || localStorage.getItem('loggedInUserEmail');

                            const sessionToken = sessionStorage.getItem('sessionToken') || localStorage.getItem('sessionToken');

                            if (!loggedInUserEmail || !sessionToken) {{
                              setUser(null);
                              console.log('User not logged in. Clearing user state.');
                              return;
                            }}


                              const response = await fetch(`${{API_BASE_URL}}/login?email=${{loggedInUserEmail}}`, {{
                                method: 'GET',
                                headers: {{
                                  'Content-Type': 'application/json',
                                  'Authorization': `Bearer ${{sessionToken}}`
                                }},
                              }});

                              if (response.ok) {{
                                const userDataArray = await response.json();
                                const loggedInUser = userDataArray.find(user => user.email === loggedInUserEmail);
                                if (loggedInUser) {{
                                  setUser(loggedInUser);
                                  console.log('User data:', loggedInUser);
                                }} else {{
                                  console.error('Logged-in user not found in response');
                                  setUser(null); // Reset user state if user not found
                                }}
                              }} else {{
                                console.error('Failed to fetch user data');
                                setUser(null); // Reset user state if fetch failed
                              }}
                            }} catch (error) {{
                              console.error('Error occurred while fetching user data:', error);
                              setUser(null);
                            }}
                          }};


                          useEffect(() => {{
                            fetchUserData();
                          }}, []);


                        const [isInputVisible, setInputVisible] = useState(false);

                        const handleEnter = (e) => {{
                            if (e.key === 'Enter' || e.target.id === 'saveButton') {{
                                setInputVisible(false);
                            }}
                        }};

                    return (
                        <div className="profile-container-header">
                            <div className="profile-container">
                                <div className="profile-border">
                                    <div className="profile-content">
                                        <div className="profile-info">
                                            {{user && user.is_admin ? (
                                            <p><Editable initialValue={{name}} onSave={{handleNameChange}} /></p>
                                            ) : (
                                            <p>{{name}}</p>
                                            )}}
                                            <p>{nickname}</p>
                                            <p>{country}</p>
                                            <p>{{birthdated}} (age {{age}})</p>

                                            <button onClick={{handleFollow}} className="follow">
                                                {{isFollowing ? (
                                                <span style={{{{ marginRight: '6px' }}}}>
                                                    <i className="fa-solid fa-heart" style={{{{ color: 'red' }}}}></i> Following
                                                </span>
                                            ) : (
                                                <span>
                                                    <i className="fa-regular fa-heart"></i> Follow
                                                </span>
                                             )}}({{followerCount}})
                                            </button>
                                            <button className="share-button" onClick={{toggleDropdown}}>
                                                <i className="fa-solid fa-share-nodes"></i> Share {{'▼'}}
                                                {{isDropdownOpen && (
                                                    <div className="dropdown">
                                                        {{shareOptions.map((option, index) => (
                                                            <div key={{index}} className="dropdown-option" onClick={{() => handleShareOptionClick(option)}}>
                                                                {{option}}
                                                            </div>
                                                        ))}}
                                                    </div>
                                                )}}
                                            </button>
                                        </div>
                                        <div className="profile-image">
                                            <div className="profile-img">
                                            <img src="{image_url}" alt="{name}" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                         <div className='tittle'>
                            <a href="#shows" onClick={{() => toggleSection('shows')}}><span>Shows</span></a>
                            <a href="#about" onClick={{() => toggleSection('about')}}><span>About</span></a>
                            <a href="#discussion" onClick={{() => toggleSection('discussion')}}><span>News</span></a>
                        </div>
                        <div className="section" id="shows">
                            <div className="shows">
                                <div className="shows-container">
                                    <p> <span style={{{{fontSize:'16px', color:'rgb(13, 104, 241)'}}}}>{{'\u25B6'}}</span>Shows </p>
                                    <span>A list of all movies, series and dramas starring Yoon Shi Yoon, all in one place.</span>
                                </div>
                                {{user && user.is_admin && (
                                    <>
                                        <button onClick={{handleAddImage}}>Add Image</button>
                                        <button id="saveButton" onClick={{(e) => {{ handleEnter(e); saveImageDataToMongoDB(imageData, userName); }}}}>Save</button>
                                    </>
                                )}}
                            <div className="news">
                                    {{imageData.map((info, index) => (
                                        <div key={{index}} className="image-container">
                                            <a href={{info.url}} target="_blank" rel="noopener noreferrer">
                                            <img src={{info.img}} alt={{`Image ${{index}}`}} />
                                            </a>
                                            {{user && user.is_admin ? (
                                                // Admin view
                                                (isInputVisible && (
                                                <div>
                                                    <input
                                                        type="text"
                                                        value={{info.title}}
                                                        onKeyDown={{handleEnter}}
                                                        onChange={{(e) => handleImageDataChange(index, 'title', e.target.value)}}
                                                        placeholder="Enter new title"
                                                    />
                                                    <input
                                                        type="text"
                                                        value={{info.url}}
                                                        onKeyDown={{handleEnter}}
                                                        onChange={{(e) => handleImageDataChange(index, 'url', e.target.value)}}
                                                        placeholder="Enter new URL"
                                                    />
                                                    <input
                                                        type="text"
                                                        value={{info.img}}
                                                        onKeyDown={{handleEnter}}
                                                        onChange={{(e) => handleImageDataChange(index, 'img', e.target.value)}}
                                                        placeholder="Enter new image URL"
                                                    />
                                                    <button onClick={{() => handleDeleteImage(index)}}>Delete</button>
                                                </div>
                                            ))) : (
                                                // User view
                                                <div>
                                                    <p className="image-title">{{info.title}}</p>
                                                </div>
                                            )}}
                                        </div>
                                    ))}}
                                </div>
                            </div>
                        </div>
                        <div className="section" id="about" style={{{{display: 'none'}}}}>
                            <div className="shows">
                                <div className="shows-container">
                                    <p> <span style={{{{fontSize:'16px', color:'rgb(13, 104, 241)'}}}}>
                                        {{'\u25B6'}}</span>About </p>
                                    <span>
                                    {describle}
                                    </span>
                    
                                    <div className='more-detail'>
                                        <div className="detail">
                                            <p><span style={{{{fontSize:'16px', color:'rgb(13, 104, 241)'}}}}>{{'\u25B6'}}</span> More Details:</p>
                                            <span><i className="fa-regular fa-star" style={{{{color:'white'}}}}></i> Zodiac: {Libra}</span>
                                            <br /><span><i className="fa-solid fa-up-long" style={{{{color:'white'}}}}></i> Tall: {Tall}</span>
                                            <br /><span><i className="fa-brands fa-font-awesome" style={{{{color:'white'}}}}></i> Nationality: {Nationality}</span>
                                            <br /><a href="{Instagram}" ><span><i className="fa-brands fa-instagram" style={{{{color:'white'}}}}></i> {Name_instagram}'s instagram</span></a>
                                            <br /><a href="{Youtube}" 
                                            target="_blank" ><span><i className="fa-brands fa-youtube" style={{{{color:'white'}}}}></i> {Name_youtube}'s youtube</span></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="section" id="discussion" style={{{{display: 'none'}}}}>
                            <div className="shows">
                                <div className="shows-container">
                                    <p> <span style={{{{fontSize:'16px', color:'rgb(13, 104, 241)'}}}}>{{'\u25B6'}}</span>News </p>
                                </div>
                                {{user && user.is_admin && (
                                    <>
                                        <button onClick={{handleAddImaged}}>Add Image</button>
                                        <button id="saveButton" onClick={{(e) => {{ handleEnter(e); saveImageDataToMongoDB(imagesnews, userNamenews); }}}}>Save</button>
                                    </>
                                )}}

                                <div className="news">
                                    {{imagesnews.map((infos, indexs) => (
                                        <div key={{indexs}} className="image-container">
                                            <a href={{infos.url}} target="_blank" rel="noopener noreferrer">
                                            <img src={{infos.img}} alt={{`Image ${{indexs}}`}} />
                                            </a>
                                            {{user && user.is_admin ? (
                                                // Admin view
                                                (isInputVisible && (
                                                <div>
                                                    <input
                                                        type="text"
                                                        value={{infos.title}}
                                                        onKeyDown={{handleEnter}}
                                                        onChange={{(e) => handleImageDataChanged(indexs, 'title', e.target.value)}}
                                                        placeholder="Enter new title"
                                                    />
                                                    <input
                                                        type="text"
                                                        value={{infos.url}}
                                                        onKeyDown={{handleEnter}}
                                                        onChange={{(e) => handleImageDataChanged(indexs, 'url', e.target.value)}}
                                                        placeholder="Enter new URL"
                                                    />
                                                    <input
                                                        type="text"
                                                        value={{infos.img}}
                                                        onKeyDown={{handleEnter}}
                                                        onChange={{(e) => handleImageDataChanged(indexs, 'img', e.target.value)}}
                                                        placeholder="Enter new image URL"
                                                    />
                                                    <button onClick={{() => handleDeleteImaged(indexs)}}>Delete</button>
                                                </div>
                                            ))) : (
                                                // User view
                                                <div>
                                                    <p className="image-title">{{infos.title}}</p>
                                                </div>
                                            )}}
                                        </div>
                                    ))}}
                                </div>
                            </div>

                        </div>



                    </div>
                );
            }};
                
            export default {name_url.replace(' ', '')};
            """
            )
        
        # Modify App.js to include import statement for the newly created file
        app_js_path = r'C:\Users\acquy\OneDrive\blog-web\blog\client\src\App.js'
        with open(app_js_path, 'r') as app_js_file:
            lines = app_js_file.readlines()
        
        # Find the line number of the closing tag </Routes>
        route_index = [i for i, line in enumerate(lines) if '</Routes>' in line][0]

        # Insert the import statement for the newly created file at the top of the file
        lines.insert(0, f"import Celebrities_{name_url.replace(' ', '')} from './components/Celebrities/{name_url}';\n")

        # Insert the Route component just before the closing tag </Routes>
        lines.insert(route_index, f'          <Route path="/Celebrities/{name_url}/:pageId" element={{<Celebrities_{name_url.replace(" ", "")} />}} />\n')

        # Write the modified content back to the file
        with open(app_js_path, 'w') as app_js_file:
            app_js_file.writelines(lines)

        return jsonify({'message': 'JavaScript file created successfully', 'jsFileName': f"{name_url}.js"}), 200
    else:
        return jsonify({'error': 'Name or image URL not provided in form data'}), 400




directory_new = r'C:\Users\acquy\OneDrive\blog-web\blog\client\src\components\News'

@app.route('/news-jsx', methods=['POST'])
def new_jsx():
    # Receive form data from frontend
    form_data = request.json
    print('Received form data:', form_data)  # Log the received data
    
    # Extract form data
    title = form_data.get('title')
    title_url= form_data.get('title_url')
    author = form_data.get('author')
    date = form_data.get('date')
    imageUrlnews = form_data.get('imageUrlnews')
    imageUrltitle = form_data.get('imageUrltitle')  # Assuming imageUrl is the key for the image URL
    summarytext = form_data.get('summarytext')
    fulldetail = form_data.get('fulldetail')
    provide = form_data.get('provide')
    genres = form_data.get('genres')  # Assuming imageUrl is the key for the image URL


    if title_url and imageUrlnews:
        # Create a new JavaScript file with the name in the specified directory
        file_path = os.path.join(directory_new, f'{title_url}.js')
        with open(file_path, 'w', encoding='utf-8') as file:
            # Write JSX content to the new file
            file.write(
                f"""
                import React, {{ useState, useEffect }} from 'react';
                import axios from 'axios';
                import {{ useParams }} from 'react-router-dom';

                import Editable from '../Editable';
                import '../../styles/News.css';
                import '@fortawesome/fontawesome-free/css/all.css';
                const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';


                function {title_url.replace(' ', '')}() {{
                    const {{ pageId }} = useParams(); // Get the pageId from the route parameter

                    const [comments, setComments] = useState([]);
                    const [newComment, setNewComment] = useState('');

                    useEffect(() => {{
                        fetchComments();
                    }}, [pageId]);

                    const fetchComments = async () => {{
                        try {{
                            const response = await axios.get(`${{API_BASE_URL}}/api/comments/${{pageId}}`);
                            setComments(response.data.comments.reverse()); // Reverse the comments array
                        }} catch (error) {{
                            console.error('Error fetching comments:', error);
                        }}
                    }};

                    const handleCommentSubmit = async (e) => {{
                        e.preventDefault(); // Prevent form submission default behavior
                        try {{
                            const response = await axios.post(`${{API_BASE_URL}}/api/comments/${{pageId}}`, {{
                                text: newComment
                            }});
                            console.log('Comment submitted:', response.data);
                            setNewComment('');
                            fetchComments(); // Fetch updated comments after submission
                        }}catch (error) {{
                            console.error('Error submitting comment:', error);
                        }}
                    }};

                    const [news, setNews] = useState([]);

                    useEffect(() => {{
                        fetchNews();
                    }}, []);

                    const fetchNews = async () => {{
                        try {{
                            const response = await axios.get('${{API_BASE_URL}}/api/news'); // Update with your backend URL
                            setNews(response.data);
                        }} catch (error) {{
                            console.error('Error fetching news:', error);
                        }}
                    }};

                    const [summarytext, setName] = useState(localStorage.getItem(window.location.href + '-summarytext') ||
                      
                     
                    `
                    
                        {summarytext}
                    
                `);

                    useEffect(() => {{
                        localStorage.setItem(window.location.href + '-summarytext', summarytext);
                    }}, [summarytext]); // Run this effect whenever the name changes

                    const handleNameChange = (newName) => {{
                        setName(newName);
                    }};
                    const [fulldetail, setNamefulldetail] = useState(localStorage.getItem(window.location.href + '-fulldetail') || 
                    `
                    
                        {fulldetail}
                    
                `);
                   

                    useEffect(() => {{
                        localStorage.setItem(window.location.href + '-fulldetail', fulldetail);
                    }}, [fulldetail]); // Run this effect whenever the name changes

                    const handleNameChangefulldetail = (newNamed) => {{
                        setNamefulldetail(newNamed);
                    }};
                    const [isAdmin, setIsAdmin] = useState(false);
                                    
                    // Effect to check if user is admin
                    useEffect(() => {{
                        // Logic to check if user is admin
                        // For example, you might check if the user is logged in and has admin privileges
                        const userIsAdmin = checkIfUserIsAdmin(); // You need to implement this function
                        setIsAdmin(userIsAdmin);
                    }}, []);

                    // Effect to save the name to localStorage whenever it changes
                    

                    // Function to check if user is admin (you need to implement this)
                    const checkIfUserIsAdmin = () => {{
                        // Logic to determine if user is admin
                        // For example, you might check if the user is logged in and has admin privileges
                        // Return true if user is admin, false otherwise
                        const isLoggedIn = true; // Example: You would replace this with your actual authentication logic
                        const isAdmin = true; // Example: You would replace this with your actual admin check logic
                        return isLoggedIn && isAdmin;
                    }};
                    const [posts, setPosts] = useState([]);
                    const [error, setError] = useState(null);

                    useEffect(() => {{
                        fetchPosts();
                    }}, [pageId]);

                    const fetchPosts = async () => {{
                        try {{
                            const response = await axios.get(`${{API_BASE_URL}}/api/news`);      
                            console.log('Response:', response.data); // Log the response data        
                            setPosts(response.data);
                            setError(null); // Reset error state if request is successful
                        }} catch (error) {{
                            console.error('Error fetching posts:', error);
                            setError('Error fetching posts. Please try again.'); // Set error message
                        }}
                    }};
                        const [user, setUser] = useState({{
                        name: '', // Initialize name as empty string
                        email: '',
                        is_admin: false,

                        // Add more fields as needed
                      }});

                      // Define fetchUserData function
                      const fetchUserData = async () => {{
                        try {{
                          const loggedInUserEmail = sessionStorage.getItem('loggedInUserEmail') || localStorage.getItem('loggedInUserEmail');

                        const sessionToken = sessionStorage.getItem('sessionToken') || localStorage.getItem('sessionToken');

                        if (!loggedInUserEmail || !sessionToken) {{
                          setUser(null);
                          console.log('User not logged in. Clearing user state.');
                          return;
                        }}


                          const response = await fetch(`${{API_BASE_URL}}/login?email=${{loggedInUserEmail}}`, {{
                            method: 'GET',
                            headers: {{
                              'Content-Type': 'application/json',
                              'Authorization': `Bearer ${{sessionToken}}`
                            }},
                          }});

                          if (response.ok) {{
                            const userDataArray = await response.json();
                            const loggedInUser = userDataArray.find(user => user.email === loggedInUserEmail);
                            if (loggedInUser) {{
                              setUser(loggedInUser);
                              console.log('User data:', loggedInUser);
                            }} else {{
                              console.error('Logged-in user not found in response');
                              setUser(null); // Reset user state if user not found
                            }}
                          }} else {{
                            console.error('Failed to fetch user data');
                            setUser(null); // Reset user state if fetch failed
                          }}
                        }} catch (error) {{
                          console.error('Error occurred while fetching user data:', error);
                          setUser(null);
                        }}
                      }};


                      useEffect(() => {{
                        fetchUserData();
                      }}, []);


                    if (error) {{
                        return <div>Error: {{error}}</div>;
                    }}

                    if (!posts || !posts.length) {{
                        return <div>No posts available</div>;
                    }}

                return (
                    <div className='News'>
                    <div className='News-header'>
                        <div className='news-center'>
                        <div className="news-main-post">
                            <div className="news-tittle">
                                <h1>{title}</h1>
                            </div>
                            <div className="news-author">
                                <p>{author}</p>
                                <p>{date}</p>
                                <p>{genres}</p>
                                                           

                            </div>
            <div className="news-image">
                <img src="{imageUrlnews}" alt="" style={{{{height:'450px', width:'500px'}}}} />
                <br/><span >{imageUrltitle}</span>
            </div>
            <div className="news-summary">
                <p style={{{{fontWeight: 'bold', fontSize:'19px'}}}}>Summary: </p> 
                {{user && user.is_admin ? (
                 <p><Editable initialValue={{summarytext}} onSave={{handleNameChange}} /></p>
                ) : (
                 <p>{{summarytext}}</p>
                )}}

            </div>
            <div className="news-ads">
                {{/* -ADS */}}
            </div>

            <div className="news-details">
            <p style={{{{fontWeight: 'bold', fontSize:'19px'}}}}>Full Details: </p>
                {{user && user.is_admin ? (
                     <p><Editable initialValue={{fulldetail}} onSave={{handleNameChangefulldetail}} /></p>
                ) : (
                    // Render non-editable version for regular users
                    <p>{{fulldetail}}</p>
                )}}
            </div>
            <div className="news-provide">
                <p>Provided by: <a href="{provide}"> Link </a> </p>
            </div>
        </div>
        <div className="new-side">

            <div className="news-top-pick">
                    {{posts.slice().reverse().map((post, index) => (
                        <div key={{index}} className='news-top-side-img'>
                            <div className="image-container-new">
                                <img src={{post.imageUrlnews}} alt={{post.title}} style={{{{ height: '150px', width: '125px', borderRadius: '10px' }}}}/>
                            </div>
                            <div className="text-container">
                                <p>{{post.title}}</p>
                                <a href={{post.url_page}}>Read more</a>
                            </div>
                        </div>
                    ))}}

                {{/* <div className='news-top-side-img' >
                    <img src="https://as2.ftcdn.net/v2/jpg/03/53/74/91/1000_F_353749142_LZnJlgaPH7DUJZnZfwpr8bzwTIWzQGzc.jpg"
                    alt="news-top-pick"
                    style={{{{ height: '125px', width: '125px', borderRadius: '10px' }}}} />
                </div>
                <span className='news-top-pick-tittle'>Love you title</span>  */}}
             </div>
                {{/* NEWS-SIDE-ADS */}}
            <div className="news-side-ads">
            <p>love you</p>
            </div>

            <div className="news-comment">
                {{comments.map((comment, index) => (
                    <div key={{index}} className="text-comment">
                        <div className="text-comment-user">
                            <img src="https://pics.craiyon.com/2023-10-09/586a631238574c7ead38a04260976ce8.webp" alt="User" style={{{{ height: '50px', width: '50px', borderRadius: '50%' }}}} />
                           {{user && (
                                <span>{{comment.user_name}}</span> 
                            )}}
                        </div>
                        <p>{{comment.text}}</p>
                    </div>
                ))}}
            </div>
            <div className="news-enter-comment">
                {{user && (
                <form onSubmit={{handleCommentSubmit}}>
                    <input
                    type="text"
                    name="inputcomment"
                    placeholder="Enter your comment..."
                    value={{newComment}}
                    onChange={{(e) => setNewComment(e.target.value)}}
                    />
                </form>
                )}}
            </div>
        </div>
        </div>
    </div>
</div>
                );
            }};
                
            export default {title_url.replace(' ', '')};
            """
            )
        
        # Modify App.js to include import statement for the newly created file
        app_js_path = r'C:\Users\acquy\OneDrive\blog-web\blog\client\src\App.js'
        with open(app_js_path, 'r') as app_js_file:
            lines = app_js_file.readlines()
        
        # Find the line number of the closing tag </Routes>
        route_index = [i for i, line in enumerate(lines) if '</Routes>' in line][0]

        # Insert the import statement for the newly created file at the top of the file
        lines.insert(0, f"import News_{title_url.replace(' ', '')} from './components/News/{title_url}';\n")

        # Insert the Route component just before the closing tag </Routes>
        lines.insert(route_index, f'          <Route path="/News/{title_url}/:pageId" element={{<News_{title_url.replace(" ", "")} />}} />\n')

        # Write the modified content back to the file
        with open(app_js_path, 'w') as app_js_file:
            app_js_file.writelines(lines)

        return jsonify({'message': 'JavaScript file created successfully', 'jsFileName': f"{title_url}.js"}), 200
    else:
        return jsonify({'error': 'Name or image URL not provided in form data'}), 400








directory_anime = r'C:\Users\acquy\OneDrive\blog-web\blog\client\src\components\Anime'
directory_movie = r'C:\Users\acquy\OneDrive\blog-web\blog\client\src\components\Movie'

directory_korean = r'C:\Users\acquy\OneDrive\blog-web\blog\client\src\components\Korean'
directory_china = r'C:\Users\acquy\OneDrive\blog-web\blog\client\src\components\China'
directory_japan = r'C:\Users\acquy\OneDrive\blog-web\blog\client\src\components\Japan'
directory_taiwan = r'C:\Users\acquy\OneDrive\blog-web\blog\client\src\components\Taiwan'
directory_other = r'C:\Users\acquy\OneDrive\blog-web\blog\client\src\components\Other'
directory_thailand = r'C:\Users\acquy\OneDrive\blog-web\blog\client\src\components\Thailand'


@app.route('/korean-drama', methods=['POST'])
def korean_jsx():
    # Receive form data from frontend
    form_data = request.json
    print('Received form data:', form_data)  # Log the received data
    
    # Extract form data
    title_korean_url = form_data.get('title_korean_url')
    title_chinese_url = form_data.get('title_chinese_url')
    title_japan_url = form_data.get('title_japan_url')
    title_taiwan_url = form_data.get('title_taiwan_url')
    title_thailand_url = form_data.get('title_thailand_url')
    title_other_url = form_data.get('title_other_url')
    genres = form_data.get('genres')  # Assuming imageUrl is the key for the image URL
    episode = form_data.get('episode')
    fulldetail = form_data.get('fulldetail')

    title = form_data.get('title')
    date = form_data.get('date')
    img = form_data.get('img')
    imageshow_url1 = form_data.get('imageshowUrl1')
    show_url1 = form_data.get('showurl1')
    show_title1 = form_data.get('showtitle1')
    imageshow_url2 = form_data.get('imageshowUrl2')
    show_url2 = form_data.get('showurl2')
    show_title2 = form_data.get('showtitle2')
    imageshow_url3 = form_data.get('imageshowUrl3')
    show_url3 = form_data.get('showurl3')
    show_title3 = form_data.get('showtitle3')

    
    

    ep1 = form_data.get('ep1')
    ep2 = form_data.get('ep2')
    ep3 = form_data.get('ep3')
    ep4 = form_data.get('ep4')
    ep5 = form_data.get('ep5')

    summarytext = form_data.get('summarytext')

    if title_other_url and title:
        file_path = os.path.join(directory_other, f'{title_other_url}.js')
        with open(file_path, 'w', encoding='utf-8') as file:
            # Write JSX content to the new file
           file.write(
                f"""
                
                import React, {{ useState, useEffect }} from 'react';
                import '../../styles/Drama.css';
                import '@fortawesome/fontawesome-free/css/all.css';
                import Editable from '../Editable';
                import axios from 'axios';
                import {{ useParams }} from 'react-router-dom';
                import {{ useLocation }} from 'react-router-dom';
                const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';


                function {title_other_url.replace(' ', '')}() {{
                    const {{ pageId }} = useParams(); // Get the pageId from the route parameter

    const [isFollowing, setIsFollowing] = useState(false);
    const [followerCount, setFollowerCount] = useState(0);

    useEffect(() => {{
        fetchFollowerCount();
    }}, [pageId]);

    const fetchFollowerCount = async () => {{
        try {{
            const response = await axios.get(`${{API_BASE_URL}}/api/follower-count/${{pageId}}`);
            const {{ followerCount, isFollowing }} = response.data;
            setFollowerCount(followerCount);
            setIsFollowing(isFollowing);
        }} catch (error) {{
            console.error('Error fetching follower count:', error);
        }}
    }};

    const handleFollow = async () => {{
        try {{
            const response = await axios.post(`${{API_BASE_URL}}/api/follow/${{pageId}}`);
            const {{ followerCount, isFollowing }} = response.data;
            setFollowerCount(followerCount);
            setIsFollowing(isFollowing);
        }} catch (error) {{
            console.error('Error following:', error);
        }}
    }};

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [birthdated, setBirthdate] = useState('1986-09-26'); // Set initial birthdate


    const toggleDropdown = () => {{
        setIsDropdownOpen(!isDropdownOpen);
    }};
    const shareOptions = ['Copy Link', 'Facebook', 'Twitter', 'Messenger'];


    const today = new Date();
    const uploadDate = new Date('{date}'); // '2024-04-02' represents April 2, 2024

    const timeDifference = Math.abs(today.getTime() - uploadDate.getTime());
    const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

        // Define state variable for admin status

        const [showAd, setShowAd] = useState(true); // Initially show the ad
        const [adClicked, setAdClicked] = useState(false);
        const handleStartVideoClick = () => {{
            // Open the ad in a new tab
            window.open("https://example.com", "_blank");
            // Hide the ad
            setShowAd(false);
            setAdClicked(true);
            // Set timeout to show the ad again after 5 minutes
            setTimeout(() => {{
                setShowAd(true);
                setAdClicked(false);
            }}, 300000); // 5 minutes in milliseconds
        }};







        const [isInputVisible, setInputVisible] = useState(false);
        const [isAdmin, setIsAdmin] = useState(false);
        const [currentUrlIndex, setCurrentUrlIndex] = useState(0); // Initialize with default index

        useEffect(() => {{
            const userIsAdmin = checkIfUserIsAdmin();
            setIsAdmin(userIsAdmin);
        }}, []);

        const checkIfUserIsAdmin = () => {{
            // Example: Replace this logic with your actual admin check logic
            // For simplicity, returning true always in this example
            return true; // Return true if user is admin, false otherwise
        }};

                        const [icons, setIcons] = useState(() => {{
            const storedIcons = localStorage.getItem('{title_other_url}_icons');
            return storedIcons ? JSON.parse(storedIcons) : [
               {{ url: "{ep1}"}},
                {{ url: "{ep2}"}},
                {{ url: "{ep3}"}},

            ];
            }});


    useEffect(() => {{
        const storedIcons = localStorage.getItem('{title_other_url}_icons');
        if (storedIcons) {{
            setIcons(JSON.parse(storedIcons));
        }}
    }}, []);


    useEffect(() => {{
        // Save icons state to localStorage whenever it changes
        localStorage.setItem('{title_other_url}_icons', JSON.stringify(icons));
    }}, [icons]);

    const handleAddIcon = () => {{
        const newIcon = {{ url: "" }};
        setIcons([...icons, newIcon]);
    }};

    const handleDeleteIcon = (index) => {{
        const newIcons = [...icons];
        newIcons.splice(index, 1);
        setIcons(newIcons);
    }};

    const handleUrlChange = (index, value) => {{
        const newIcons = [...icons];
        newIcons[index].url = value;
        setIcons(newIcons);
    }};

    const saveToMongoDB = async (icons, pageId) => {{
                try {{
                    const urls = icons.map(icon => icon.url); // Extract urls from icons
                    const response = await fetch(`${{API_BASE_URL}}/api/korenaMovie/${{pageId}}`, {{    
                        method: 'POST',
                        headers: {{
                            'Content-Type': 'application/json'
                        }},
                        body: JSON.stringify({{ urls }}), // Pass urls to the backend
                    }});

                    const responseData = await response.json();
                    console.log(responseData);
            
                    const debugInfo = document.getElementById('debug-info');
                    debugInfo.innerHTML = `Page ID: ${{pageId}}<br />Saved Data: ${{JSON.stringify(urls)}}`;
            
                    console.log('Data saved successfully to MongoDB');
                }} catch (error) {{
                    console.error('Error saving data to MongoDB:', error);
                }}
            }};



        const location = useLocation();
        useEffect(() => {{
            const hash = location.hash;
            if (hash) {{
                toggleSection(hash.substring(1));
            }} else {{
                toggleSection('shows');
            }}
        }}, [location]);



        function toggleSection(sectionId) {{
            const sections = document.querySelectorAll('.section');
            sections.forEach(section => {{
                section.style.display = section.id === sectionId ? 'block' : 'none';
            }});
        }}




 







        const handleEnter = (e) => {{
            if (e.key === 'Enter' || e.target.id === 'saveButton') {{
                setInputVisible(false);
            }}
        }};



        






        // Function to handle clicking on an icon
        const handleIconClick = (index) => {{
            setCurrentUrlIndex(index);
            setSelectedIndex(index);
        }};



        const userName = '{title_other_url}-epdisode';
        const userName2 = '{title_other_url}-image';





    const [isVisible, setIsVisible] = useState(true);

    const handleClose = () => {{
        setIsVisible(false);
        setTimeout(() => {{
          setIsVisible(true);
        }}, 20 * 60 * 1000); // 30 minutes in milliseconds
      }};



                    const [imageData, setImageData] = useState(() => {{
                    const storedImageData = localStorage.getItem('{title_other_url}-image');
                    return storedImageData ? JSON.parse(storedImageData) : [
                        {{ url: "{show_url1}",
                          title: "{show_title1}",
                            img: "{imageshow_url1}" }},
                        {{ url: "{show_url2}",
                          title: "{show_title2}",
                            img: "{imageshow_url2}" }},
                        {{ url: "{show_url3}",
                          title: "{show_title3}",
                            img: "{imageshow_url3}" }},
                        {{ url: "{show_url4}",
                          title: "{show_title4}",
                            img: "{imageshow_url4}" }},
                        {{ url: "{show_url5}",
                          title: "{show_title5}",
                            img: "{imageshow_url5}" }},
                        ];
                }});
                
                    useEffect(() => {{
                    const storedImageData = localStorage.getItem('{title_other_url}-image');
                    if (storedImageData) {{
                        setImageData(JSON.parse(storedImageData));
                    }}
                }}, []);

                useEffect(() => {{
                    // Save icons state to localStorage whenever it changes
                    localStorage.setItem('{title_other_url}-image', JSON.stringify(imageData));
                }}, [imageData]);

                const handleImageDataChange = (index, field, value) => {{
                    const updatedImageData = [...imageData];
                    updatedImageData[index][field] = value;
                    setImageData(updatedImageData);
                }};

                const handleAddImage = () => {{
                    const userName2 = 'Leo_DN';

                    setImageData([{{ url: "", title: "", img: "", userName2 }}, ...imageData]);
                    setInputVisible(true);

                }};

                const handleDeleteImage = (index) => {{
                    const updatedImageData = imageData.filter((_, i) => i !== index);
                    setImageData(updatedImageData);
                }};

                const [selectedIndex, setSelectedIndex] = useState(null);

                // const handleIconClickd = (index) => {{
                //     setSelectedIndex(index);
                // }};

                const [user, setUser] = useState({{
                    name: '', // Initialize name as empty string
                    email: '',
                    is_admin: false,

                    // Add more fields as needed
                }});

                // Define fetchUserData function
                const fetchUserData = async () => {{
                    try {{
                    const loggedInUserEmail = sessionStorage.getItem('loggedInUserEmail') || localStorage.getItem('loggedInUserEmail');
                    console.log('Logged In User Email:', loggedInUserEmail);

                    const sessionToken = sessionStorage.getItem('sessionToken') || localStorage.getItem('sessionToken');
                    console.log('Session Token:', sessionToken);

                    if (!loggedInUserEmail || !sessionToken) {{
                    setUser(null);
                    console.log('User not logged in. Clearing user state.');
                    return;
                    }}


                    const response = await fetch(`${{API_BASE_URL}}/login?email=${{loggedInUserEmail}}`, {{
                        method: 'GET',
                        headers: {{
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${{sessionToken}}`
                        }},
                    }});

                    if (response.ok) {{
                        const userDataArray = await response.json();
                        const loggedInUser = userDataArray.find(user => user.email === loggedInUserEmail);
                        if (loggedInUser) {{
                        setUser(loggedInUser);
                        console.log('User data:', loggedInUser);
                        }} else {{
                        console.error('Logged-in user not found in response');
                        setUser(null); // Reset user state if user not found
                        }}
                    }} else {{
                        console.error('Failed to fetch user data');
                        setUser(null); // Reset user state if fetch failed
                    }}
                    }} catch (error) {{
                    console.error('Error occurred while fetching user data:', error);
                    setUser(null);
                    }}
                }};


                useEffect(() => {{
                    fetchUserData();
                }}, []);

                const [searchTitle, setSearchTitle] = useState('');
                    const [searchResult, setSearchResult] = useState(null);
                    const [editedTitle, setEditedTitle] = useState('');
                    const [editeddate, setEditeddate] = useState('');

                    const [error, setError] = useState('');

                    const handleSearch = async () => {{
                        try {{
                            const response = await axios.get(`${{API_BASE_URL}}/api/ot?title=${{searchTitle}}`);
                            setSearchResult(response.data);
                            setEditedTitle(response.data.title); // Initialize editedTitle with the retrieved title
                            setEditeddate(response.data.date); // Initialize editedTitle with the retrieved title

                            setError('');
                        }} catch (error) {{
                            if (error.response && error.response.data) {{
                                setError(error.response.data.error);
                            }} else {{
                                setError('Failed to search for Korean drama.');
                            }}
                            setSearchResult(null);
                        }}
                    }};

                    const handleEditTitleChange = (e) => {{
                        setEditedTitle(e.target.value);
                    }};
                    const handleEditdate = (e) => {{
                    setEditeddate(e.target.value);
                    }};

                    const handleUpdateTitle = async () => {{
                        try {{
                            // Assuming `searchResult.id_data` contains the correct `id_data` value
                            const response = await axios.put(`${{API_BASE_URL}}/api/ot/${{searchResult.id_data}}`, {{
                                title: editedTitle.trim(), // Trim any leading or trailing whitespace
                                date: editeddate.trim() // Trim any leading or trailing whitespace

                            }});
                            alert(response.data.message); // Display success message
                        }} catch (error) {{
                            console.error('Failed to update title:', error);
                            alert('Failed to update title. Please try again.'); // Display error message
                        }}
                    }};



                    useEffect(() => {{
                        if (searchTitle) {{
                            handleSearch();
                        }}
                    }}, [searchTitle]);

                    console.log("searchResult", searchResult)

  return (
    <div className="profile-container-headerd">
        <div className="profile-containerd">
            <div className="profile-containerd-korean">
                <div className='korean-title'>
                    <i className="fa-solid fa-film"> </i> <span>{title}</span>
                    <div className="border-test">
                        <p>
                            <span style={{{{fontSize:"15px"}}}}>Genre:{genres}</span>
                            <span>{{daysDifference}} days ago</span>
                        </p>
                        {{user && user.is_admin &&(
                        
                        <div>
                            {{/* Your JSX code here */}}
                            {{/* Input field for searching Korean dramas by title */}}
                            <input type="text" value={{searchTitle}} onChange={{(e) => setSearchTitle(e.target.value)}} />
                            <button onClick={{handleSearch}}>Search</button>
                            {{error && <p>{{error}}</p>}}
                            {{searchResult && (
                                <div>
                                    {{/* Input field for editing the title */}}
                                    <input type="text" value={{editedTitle}} onChange={{handleEditTitleChange}} />
                                    <input type="date" value={{editeddate}} onChange={{handleEditdate}} />

                                    <button onClick={{handleUpdateTitle}}>Update Title</button>
                                </div>
                            )}}
                        </div>
                        )}}
                    </div>
                </div>
            </div>
            <div className="profile-borderd">
                <div className="video-left">
                    <div className="vide-left-ads">
                        <div>
                            {{/* <p>h2</p>
                            <p>h2</p>
                            <p>h2</p>
                            <p>h2</p>
                            <p>h2</p>
                            <p>h2</p>
                            <p>h2</p> */}}
                        </div>
                    </div>
                </div>

                <div className="video">
                    {{showAd && !adClicked && (
                        <button className="ad-overlay" onClick={{handleStartVideoClick}}></button>
                    )}}
                    {{currentUrlIndex !== null && (
                        <iframe width="100%" height="100%" src={{icons[currentUrlIndex].url}} scrolling="no" frameborder="0" allowtransparency="true" allowfullscreen="true"
                        style={{{{border:"none", overflow:"hidden"}}}}
                        ></iframe>
                    )}}
                </div>

                <div className="video-right">
                    <div className="vide-right-ads">
                        {{/* <p>h2</p>
                            <p>h2</p>
                            <p>h2</p>
                            <p>h2</p>
                            <p>h2</p>
                            <p>h2</p>
                            <p>h2</p> */}}
                    </div>
                </div>
            </div>
        </div>
        <div className='tittled'>
            <a href="#shows" onClick={{() => toggleSection('shows')}}><span>Episode</span></a>
            {{/* <a href="#cast" onClick={{() => toggleSection('cast')}}><span>Cast</span></a> */}}
            <a href="#summary" onClick={{() => toggleSection('summary')}}><span>Summary</span></a>

            <span>
                <button onClick={{handleFollow}} className="followd">
                    {{isFollowing ?
                    <span style={{{{marginRight:'6px'}}}}>
                        <i className="fa-solid fa-heart" style={{{{color:'red', marginLeft:'-1rem'}}}}></i> Love
                    </span>
                    :
                    <span>
                        <i className="fa-regular fa-heart" ></i> Like
                    </span>
                    }}
                    {{isFollowing ? <span style={{{{margin: '-5px 0px', marginRight:'5px'}}}}>{{followerCount}}</span> : null}}
                </button>
            </span>
        </div>

        <div className="section" id="shows">
            <div className="episode-video">
                <div className="nav-epdisode">
                    <div className="icon-container">
                        <div style={{{{ display: 'flex', flexWrap: 'wrap' }}}}>
                        {{icons.map((icon, index) => (
    <div key={{index}} style={{{{ margin: '4px' }}}}>
        {{isInputVisible && index === icons.length - 1 && ( // Only show input for the last added icon
            <input
                type="text"
                value={{icon.url}}
                onChange={{(e) => handleUrlChange(index, e.target.value)}}
                onKeyDown={{handleEnter}}
                style={{{{ width: '100%', boxSizing: 'border-box' }}}}
            />
        )}}
        <div
            className={{`icon ${{selectedIndex === index ? 'selected' : ''}}`}}
            onClick={{() => handleIconClick(index)}}
        >
            {{index + 1}}
        </div>
        {{user && user.is_admin &&(
            <button onClick={{() => handleDeleteIcon(index)}}>Delete</button>
        )}}
    </div>
))}}
<div style={{{{ margin: '5px' }}}}>
    {{user && user.is_admin &&(

        <>
            <button onClick={{() => {{ handleAddIcon(); setInputVisible(true); }}}}>Add Icon</button>
            <button id="saveButton" onClick={{(e) => {{ handleEnter(e); saveToMongoDB(icons, userName); setInputVisible(false); }}}}>Save</button>
        </>
    )}}
</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="section" id="cast">
            <div className="shows">
                <div className="shows-container">
                    <p> <span style={{{{fontSize:'16px', color:'rgb(13, 104, 241)'}}}}>{{'▶'}}</span>Cast: </p>
                </div>
                {{user && user.is_admin &&(

                    <>
                        <button onClick={{handleAddImage}}>Add Image</button>
                        <button id="saveButton" onClick={{(e) => {{ handleEnter(e); saveToMongoDB(imageData, userName2); }}}}>Save</button>
                    </>
                )}}
                <div className="news">
                    {{imageData.map((info, index) => (
                        <div key={{index}} className="image-container">
                            <a href={{info.url}} target="_blank" rel="noopener noreferrer">
                                <img src={{info.img}} alt={{`Image ${{index}}`}} />
                            </a>
                            {{user && user.is_admin ?(

                                (isInputVisible && (
                                    <div>
                                        <input
                                            type="text"
                                            value={{info.title}}
                                            onKeyDown={{handleEnter}}
                                            onChange={{(e) => handleImageDataChange(index, 'title', e.target.value)}}
                                            placeholder="Enter new title"
                                        />
                                        <input
                                            type="text"
                                            value={{info.url}}
                                            onKeyDown={{handleEnter}}
                                            onChange={{(e) => handleImageDataChange(index, 'url', e.target.value)}}
                                            placeholder="Enter new URL"
                                        />
                                        <input
                                            type="text"
                                            value={{info.img}}
                                            onKeyDown={{handleEnter}}
                                            onChange={{(e) => handleImageDataChange(index, 'img', e.target.value)}}
                                            placeholder="Enter new image URL"
                                        />
                                        <button onClick={{() => handleDeleteImage(index)}}>Delete</button>
                                    </div>
                                ))) : (
                                    // User view
                                    <div>
                                        <p className="image-title">{{info.title}}</p>
                                    </div>
                                )
                            }}
                        </div>
                    ))}}
                </div>
            </div>
        </div>
         <div className="section" id="summary">
            <div className="summary-main">
                    <div className="summary-nav">
                        <div className="summary-first">
                            <img src="{img}" alt=""
                             style={{{{width:"230px", height:"230px"}}}}/>
                        </div>
   
                        <div className="summary-second">
                                <p>Detail:</p>
                                <p> {summarytext}</p>
                        </div>
                    </div>
            </div>
             <div className="summary-seconds">
                        <p>Summary:</p>
                                <p> {fulldetail}</p>
                    </div>
        </div>
        {{isVisible && (
            <div className="outside-drama-ads">
                <div className="drama-bottom-ads">
                </div>
                <span className="close-btn" onClick={{handleClose}}>X</span>
            </div>
        )}}
    </div>
);
}};
                
            
            export default {title_other_url.replace(' ', '')};
            """
            )
        
        # Modify App.js to include import statement for the newly created file
        app_js_path = r'C:\Users\acquy\OneDrive\blog-web\blog\client\src\App.js'
        with open(app_js_path, 'r') as app_js_file:
            lines = app_js_file.readlines()
        
        # Find the line number of the closing tag </Routes>
        route_index = [i for i, line in enumerate(lines) if '</Routes>' in line][0]

        # Insert the import statement for the newly created file at the top of the file
        lines.insert(0, f"import Other_{title_other_url.replace(' ', '')} from './components/Other/{title_other_url}';\n")

        # Insert the Route component just before the closing tag </Routes>
        lines.insert(route_index, f'          <Route path="/Other/{title_other_url}/:pageId" element={{<Other_{title_other_url.replace(" ", "")} />}} />\n')

        # Write the modified content back to the file
        with open(app_js_path, 'w') as app_js_file:
            app_js_file.writelines(lines)

        return jsonify({'message': 'JavaScript file created successfully', 'jsFileName': f"{title_other_url}.js"}), 200

    elif title_thailand_url and title:
        file_path = os.path.join(directory_thailand, f'{title_thailand_url}.js')
        with open(file_path, 'w', encoding='utf-8') as file:
            # Write JSX content to the new file
           file.write(
                f"""
                
                import React, {{ useState, useEffect }} from 'react';
                import '../../styles/Drama.css';
                import '@fortawesome/fontawesome-free/css/all.css';
                import Editable from '../Editable';
                import axios from 'axios';
                import {{ useParams }} from 'react-router-dom';
                import {{ useLocation }} from 'react-router-dom';
                const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';


                function {title_thailand_url.replace(' ', '')}() {{
const {{ pageId }} = useParams(); // Get the pageId from the route parameter

    const [isFollowing, setIsFollowing] = useState(false);
    const [followerCount, setFollowerCount] = useState(0);

    useEffect(() => {{
        fetchFollowerCount();
    }}, [pageId]);

    const fetchFollowerCount = async () => {{
        try {{
            const response = await axios.get(`${{API_BASE_URL}}/api/follower-count/${{pageId}}`);
            const {{ followerCount, isFollowing }} = response.data;
            setFollowerCount(followerCount);
            setIsFollowing(isFollowing);
        }} catch (error) {{
            console.error('Error fetching follower count:', error);
        }}
    }};

    const handleFollow = async () => {{
        try {{
            const response = await axios.post(`${{API_BASE_URL}}/api/follow/${{pageId}}`);
            const {{ followerCount, isFollowing }} = response.data;
            setFollowerCount(followerCount);
            setIsFollowing(isFollowing);
        }} catch (error) {{
            console.error('Error following:', error);
        }}
    }};

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [birthdated, setBirthdate] = useState('1986-09-26'); // Set initial birthdate


    const toggleDropdown = () => {{
        setIsDropdownOpen(!isDropdownOpen);
    }};
    const shareOptions = ['Copy Link', 'Facebook', 'Twitter', 'Messenger'];


    const today = new Date();
    const uploadDate = new Date('{date}'); // '2024-04-02' represents April 2, 2024

    const timeDifference = Math.abs(today.getTime() - uploadDate.getTime());
    const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

        // Define state variable for admin status

        const [showAd, setShowAd] = useState(true); // Initially show the ad
        const [adClicked, setAdClicked] = useState(false);
        const handleStartVideoClick = () => {{
            // Open the ad in a new tab
            window.open("https://example.com", "_blank");
            // Hide the ad
            setShowAd(false);
            setAdClicked(true);
            // Set timeout to show the ad again after 5 minutes
            setTimeout(() => {{
                setShowAd(true);
                setAdClicked(false);
            }}, 300000); // 5 minutes in milliseconds
        }};







        const [isInputVisible, setInputVisible] = useState(false);
        const [isAdmin, setIsAdmin] = useState(false);
        const [currentUrlIndex, setCurrentUrlIndex] = useState(0); // Initialize with default index

        useEffect(() => {{
            const userIsAdmin = checkIfUserIsAdmin();
            setIsAdmin(userIsAdmin);
        }}, []);

        const checkIfUserIsAdmin = () => {{
            // Example: Replace this logic with your actual admin check logic
            // For simplicity, returning true always in this example
            return true; // Return true if user is admin, false otherwise
        }};

                        const [icons, setIcons] = useState(() => {{
            const storedIcons = localStorage.getItem('{title_thailand_url}_icons');
            return storedIcons ? JSON.parse(storedIcons) : [
               {{ url: "{ep1}"}},
                {{ url: "{ep2}"}},
                {{ url: "{ep3}"}},

            ];
            }});


    useEffect(() => {{
        const storedIcons = localStorage.getItem('{title_thailand_url}_icons');
        if (storedIcons) {{
            setIcons(JSON.parse(storedIcons));
        }}
    }}, []);


    useEffect(() => {{
        // Save icons state to localStorage whenever it changes
        localStorage.setItem('{title_thailand_url}_icons', JSON.stringify(icons));
    }}, [icons]);

    const handleAddIcon = () => {{
        const newIcon = {{ url: "" }};
        setIcons([...icons, newIcon]);
    }};

    const handleDeleteIcon = (index) => {{
        const newIcons = [...icons];
        newIcons.splice(index, 1);
        setIcons(newIcons);
    }};

    const handleUrlChange = (index, value) => {{
        const newIcons = [...icons];
        newIcons[index].url = value;
        setIcons(newIcons);
    }};

    const saveToMongoDB = async (icons, pageId) => {{
                try {{
                    const urls = icons.map(icon => icon.url); // Extract urls from icons
                    const response = await fetch(`${{API_BASE_URL}}/api/korenaMovie/${{pageId}}`, {{    
                        method: 'POST',
                        headers: {{
                            'Content-Type': 'application/json'
                        }},
                        body: JSON.stringify({{ urls }}), // Pass urls to the backend
                    }});

                    const responseData = await response.json();
                    console.log(responseData);
            
                    const debugInfo = document.getElementById('debug-info');
                    debugInfo.innerHTML = `Page ID: ${{pageId}}<br />Saved Data: ${{JSON.stringify(urls)}}`;
            
                    console.log('Data saved successfully to MongoDB');
                }} catch (error) {{
                    console.error('Error saving data to MongoDB:', error);
                }}
            }};



        const location = useLocation();
        useEffect(() => {{
            const hash = location.hash;
            if (hash) {{
                toggleSection(hash.substring(1));
            }} else {{
                toggleSection('shows');
            }}
        }}, [location]);



        function toggleSection(sectionId) {{
            const sections = document.querySelectorAll('.section');
            sections.forEach(section => {{
                section.style.display = section.id === sectionId ? 'block' : 'none';
            }});
        }}




 







        const handleEnter = (e) => {{
            if (e.key === 'Enter' || e.target.id === 'saveButton') {{
                setInputVisible(false);
            }}
        }};



        






        // Function to handle clicking on an icon
        const handleIconClick = (index) => {{
            setCurrentUrlIndex(index);
            setSelectedIndex(index);
        }};



        const userName = '{title_thailand_url}-epdisode';
        const userName2 = '{title_thailand_url}-image';





    const [isVisible, setIsVisible] = useState(true);

    const handleClose = () => {{
        setIsVisible(false);
        setTimeout(() => {{
          setIsVisible(true);
        }}, 20 * 60 * 1000); // 30 minutes in milliseconds
      }};



                    const [imageData, setImageData] = useState(() => {{
                    const storedImageData = localStorage.getItem('{title_thailand_url}-image');
                    return storedImageData ? JSON.parse(storedImageData) : [
                        {{ url: "{show_url1}",
                          title: "{show_title1}",
                            img: "{imageshow_url1}" }},
                        {{ url: "{show_url2}",
                          title: "{show_title2}",
                            img: "{imageshow_url2}" }},
                        {{ url: "{show_url3}",
                          title: "{show_title3}",
                            img: "{imageshow_url3}" }},
                        {{ url: "{show_url4}",
                          title: "{show_title4}",
                            img: "{imageshow_url4}" }},
                        {{ url: "{show_url5}",
                          title: "{show_title5}",
                            img: "{imageshow_url5}" }},
                        ];
                }});
                
                    useEffect(() => {{
                    const storedImageData = localStorage.getItem('{title_thailand_url}-image');
                    if (storedImageData) {{
                        setImageData(JSON.parse(storedImageData));
                    }}
                }}, []);

                useEffect(() => {{
                    // Save icons state to localStorage whenever it changes
                    localStorage.setItem('{title_thailand_url}-image', JSON.stringify(imageData));
                }}, [imageData]);

                const handleImageDataChange = (index, field, value) => {{
                    const updatedImageData = [...imageData];
                    updatedImageData[index][field] = value;
                    setImageData(updatedImageData);
                }};

                const handleAddImage = () => {{
                    const userName2 = 'Leo_DN';

                    setImageData([{{ url: "", title: "", img: "", userName2 }}, ...imageData]);
                    setInputVisible(true);

                }};

                const handleDeleteImage = (index) => {{
                    const updatedImageData = imageData.filter((_, i) => i !== index);
                    setImageData(updatedImageData);
                }};

                const [selectedIndex, setSelectedIndex] = useState(null);

                // const handleIconClickd = (index) => {{
                //     setSelectedIndex(index);
                // }};


                const [user, setUser] = useState({{
                    name: '', // Initialize name as empty string
                    email: '',
                    is_admin: false,

                    // Add more fields as needed
                }});

                // Define fetchUserData function
                const fetchUserData = async () => {{
                    try {{
                    const loggedInUserEmail = sessionStorage.getItem('loggedInUserEmail') || localStorage.getItem('loggedInUserEmail');
                    console.log('Logged In User Email:', loggedInUserEmail);

                    const sessionToken = sessionStorage.getItem('sessionToken') || localStorage.getItem('sessionToken');
                    console.log('Session Token:', sessionToken);

                    if (!loggedInUserEmail || !sessionToken) {{
                    setUser(null);
                    console.log('User not logged in. Clearing user state.');
                    return;
                    }}


                    const response = await fetch(`${{API_BASE_URL}}/login?email=${{loggedInUserEmail}}`, {{
                        method: 'GET',
                        headers: {{
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${{sessionToken}}`
                        }},
                    }});

                    if (response.ok) {{
                        const userDataArray = await response.json();
                        const loggedInUser = userDataArray.find(user => user.email === loggedInUserEmail);
                        if (loggedInUser) {{
                        setUser(loggedInUser);
                        console.log('User data:', loggedInUser);
                        }} else {{
                        console.error('Logged-in user not found in response');
                        setUser(null); // Reset user state if user not found
                        }}
                    }} else {{
                        console.error('Failed to fetch user data');
                        setUser(null); // Reset user state if fetch failed
                    }}
                    }} catch (error) {{
                    console.error('Error occurred while fetching user data:', error);
                    setUser(null);
                    }}
                }};


                useEffect(() => {{
                    fetchUserData();
                }}, []);

                
                                    const [searchTitle, setSearchTitle] = useState('');
                    const [searchResult, setSearchResult] = useState(null);
                    const [editedTitle, setEditedTitle] = useState('');
                    const [editeddate, setEditeddate] = useState('');

                    const [error, setError] = useState('');

                    const handleSearch = async () => {{
                        try {{
                            const response = await axios.get(`${{API_BASE_URL}}/api/th?title=${{searchTitle}}`);
                            setSearchResult(response.data);
                            setEditedTitle(response.data.title); // Initialize editedTitle with the retrieved title
                            setEditeddate(response.data.date); // Initialize editedTitle with the retrieved title

                            setError('');
                        }} catch (error) {{
                            if (error.response && error.response.data) {{
                                setError(error.response.data.error);
                            }} else {{
                                setError('Failed to search for Korean drama.');
                            }}
                            setSearchResult(null);
                        }}
                    }};

                    const handleEditTitleChange = (e) => {{
                        setEditedTitle(e.target.value);
                    }};
                    const handleEditdate = (e) => {{
                    setEditeddate(e.target.value);
                    }};

                    const handleUpdateTitle = async () => {{
                        try {{
                            // Assuming `searchResult.id_data` contains the correct `id_data` value
                            const response = await axios.put(`${{API_BASE_URL}}/api/th/${{searchResult.id_data}}`, {{
                                title: editedTitle.trim(), // Trim any leading or trailing whitespace
                                date: editeddate.trim() // Trim any leading or trailing whitespace

                            }});
                            alert(response.data.message); // Display success message
                        }} catch (error) {{
                            console.error('Failed to update title:', error);
                            alert('Failed to update title. Please try again.'); // Display error message
                        }}
                    }};



                    useEffect(() => {{
                        if (searchTitle) {{
                            handleSearch();
                        }}
                    }}, [searchTitle]);

                    console.log("searchResult", searchResult)

  return (
    <div className="profile-container-headerd">
        <div className="profile-containerd">
            <div className="profile-containerd-korean">
                <div className='korean-title'>
                    <i className="fa-solid fa-film"> </i> <span>{title}</span>
                    <div className="border-test">
                        <p>
                            <span style={{{{fontSize:"15px"}}}}>Genre:{genres}</span>
                            <span>{{daysDifference}} days ago</span>
                        </p>
                        {{user && user.is_admin &&(
                        
                        <div>
                            {{/* Your JSX code here */}}
                            {{/* Input field for searching Korean dramas by title */}}
                            <input type="text" value={{searchTitle}} onChange={{(e) => setSearchTitle(e.target.value)}} />
                            <button onClick={{handleSearch}}>Search</button>
                            {{error && <p>{{error}}</p>}}
                            {{searchResult && (
                                <div>
                                    {{/* Input field for editing the title */}}
                                    <input type="text" value={{editedTitle}} onChange={{handleEditTitleChange}} />
                                    <input type="date" value={{editeddate}} onChange={{handleEditdate}} />

                                    <button onClick={{handleUpdateTitle}}>Update Title</button>
                                </div>
                            )}}
                        </div>
                        )}}
                    </div>
                </div>
            </div>
            <div className="profile-borderd">
                <div className="video-left">
                    <div className="vide-left-ads">
                        <div>
                           {{/* <p>h2</p>
                            <p>h2</p>
                            <p>h2</p>
                            <p>h2</p>
                            <p>h2</p>
                            <p>h2</p>
                            <p>h2</p> */}}
                        </div>
                    </div>
                </div>

                <div className="video">
                    {{showAd && !adClicked && (
                        <button className="ad-overlay" onClick={{handleStartVideoClick}}></button>
                    )}}
                    {{currentUrlIndex !== null && (
                        <iframe width="100%" height="100%" src={{icons[currentUrlIndex].url}} scrolling="no" frameborder="0" allowtransparency="true" allowfullscreen="true"
                        style={{{{border:"none", overflow:"hidden"}}}}
                        ></iframe>                    )}}
                </div>

                <div className="video-right">
                    <div className="vide-right-ads">
                        {{/* <p>h2</p>
                            <p>h2</p>
                            <p>h2</p>
                            <p>h2</p>
                            <p>h2</p>
                            <p>h2</p>
                            <p>h2</p> */}}
                    </div>
                </div>
            </div>
        </div>
        <div className='tittled'>
            <a href="#shows" onClick={{() => toggleSection('shows')}}><span>Episode</span></a>
            {{/* <a href="#cast" onClick={{() => toggleSection('cast')}}><span>Cast</span></a> */}}
            <a href="#summary" onClick={{() => toggleSection('summary')}}><span>Summary</span></a>
            <span>
                <button onClick={{handleFollow}} className="followd">
                    {{isFollowing ?
                    <span style={{{{marginRight:'6px'}}}}>
                        <i className="fa-solid fa-heart" style={{{{color:'red', marginLeft:'-1rem'}}}}></i> Love
                    </span>
                    :
                    <span>
                        <i className="fa-regular fa-heart" ></i> Like
                    </span>
                    }}
                    {{isFollowing ? <span style={{{{margin: '-5px 0px', marginRight:'5px'}}}}>{{followerCount}}</span> : null}}
                </button>
            </span>
        </div>

        <div className="section" id="shows">
            <div className="episode-video">
                <div className="nav-epdisode">
                    <div className="icon-container">
                        <div style={{{{ display: 'flex', flexWrap: 'wrap' }}}}>
                        {{icons.map((icon, index) => (
    <div key={{index}} style={{{{ margin: '4px' }}}}>
        {{isInputVisible && index === icons.length - 1 && ( // Only show input for the last added icon
            <input
                type="text"
                value={{icon.url}}
                onChange={{(e) => handleUrlChange(index, e.target.value)}}
                onKeyDown={{handleEnter}}
                style={{{{ width: '100%', boxSizing: 'border-box' }}}}
            />
        )}}
        <div
            className={{`icon ${{selectedIndex === index ? 'selected' : ''}}`}}
            onClick={{() => handleIconClick(index)}}
        >
            {{index + 1}}
        </div>
        {{user && user.is_admin &&(

            <button onClick={{() => handleDeleteIcon(index)}}>Delete</button>
        )}}
    </div>
))}}
<div style={{{{ margin: '5px' }}}}>
    {{user && user.is_admin &&(

        <>
            <button onClick={{() => {{ handleAddIcon(); setInputVisible(true); }}}}>Add Icon</button>
            <button id="saveButton" onClick={{(e) => {{ handleEnter(e); saveToMongoDB(icons, userName); setInputVisible(false); }}}}>Save</button>
        </>
    )}}
</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="section" id="cast">
            <div className="shows">
                <div className="shows-container">
                    <p> <span style={{{{fontSize:'16px', color:'rgb(13, 104, 241)'}}}}>{{'▶'}}</span>Cast: </p>
                </div>
                {{user && user.is_admin &&(

                    <>
                        <button onClick={{handleAddImage}}>Add Image</button>
                        <button id="saveButton" onClick={{(e) => {{ handleEnter(e); saveToMongoDB(imageData, userName2); }}}}>Save</button>
                    </>
                )}}
                <div className="news">
                    {{imageData.map((info, index) => (
                        <div key={{index}} className="image-container">
                            <a href={{info.url}} target="_blank" rel="noopener noreferrer">
                                <img src={{info.img}} alt={{`Image ${{index}}`}} />
                            </a>
                            {{user && user.is_admin ?(

                                (isInputVisible && (
                                    <div>
                                        <input
                                            type="text"
                                            value={{info.title}}
                                            onKeyDown={{handleEnter}}
                                            onChange={{(e) => handleImageDataChange(index, 'title', e.target.value)}}
                                            placeholder="Enter new title"
                                        />
                                        <input
                                            type="text"
                                            value={{info.url}}
                                            onKeyDown={{handleEnter}}
                                            onChange={{(e) => handleImageDataChange(index, 'url', e.target.value)}}
                                            placeholder="Enter new URL"
                                        />
                                        <input
                                            type="text"
                                            value={{info.img}}
                                            onKeyDown={{handleEnter}}
                                            onChange={{(e) => handleImageDataChange(index, 'img', e.target.value)}}
                                            placeholder="Enter new image URL"
                                        />
                                        <button onClick={{() => handleDeleteImage(index)}}>Delete</button>
                                    </div>
                                ))) : (
                                    // User view
                                    <div>
                                        <p className="image-title">{{info.title}}</p>
                                    </div>
                                )
                            }}
                        </div>
                    ))}}
                </div>
            </div>
        </div>
         <div className="section" id="summary">
            <div className="summary-main">
                    <div className="summary-nav">
                        <div className="summary-first">
                            <img src="{img}" alt=""
                             style={{{{width:"230px", height:"230px"}}}}/>
                        </div>
   
                        <div className="summary-second">
                                <p>Detail:</p>
                                <p> {summarytext}</p>
                        </div>
                    </div>
            </div>
             <div className="summary-seconds">
                        <p>Summary:</p>
                                <p> {fulldetail}</p>
                    </div>
        </div>

        {{isVisible && (
            <div className="outside-drama-ads">
                <div className="drama-bottom-ads">
                </div>
                <span className="close-btn" onClick={{handleClose}}>X</span>
            </div>
        )}}
    </div>
);
}};
                
            
            export default {title_thailand_url.replace(' ', '')};
            """
            )
        
        # Modify App.js to include import statement for the newly created file
        app_js_path = r'C:\Users\acquy\OneDrive\blog-web\blog\client\src\App.js'
        with open(app_js_path, 'r') as app_js_file:
            lines = app_js_file.readlines()
        
        # Find the line number of the closing tag </Routes>
        route_index = [i for i, line in enumerate(lines) if '</Routes>' in line][0]

        # Insert the import statement for the newly created file at the top of the file
        lines.insert(0, f"import Thailand_{title_thailand_url.replace(' ', '')} from './components/Thailand/{title_thailand_url}';\n")

        # Insert the Route component just before the closing tag </Routes>
        lines.insert(route_index, f'          <Route path="/Thailand/{title_thailand_url}/:pageId" element={{<Thailand_{title_thailand_url.replace(" ", "")} />}} />\n')

        # Write the modified content back to the file
        with open(app_js_path, 'w') as app_js_file:
            app_js_file.writelines(lines)

        return jsonify({'message': 'JavaScript file created successfully', 'jsFileName': f"{title_thailand_url}.js"}), 200


    elif title_taiwan_url and title:
        file_path = os.path.join(directory_taiwan, f'{title_taiwan_url}.js')
        with open(file_path, 'w', encoding='utf-8') as file:
            # Write JSX content to the new file
           file.write(
                f"""
                
                import React, {{ useState, useEffect }} from 'react';
                import '../../styles/Drama.css';
                import '@fortawesome/fontawesome-free/css/all.css';
                import Editable from '../Editable';
                import axios from 'axios';
                import {{ useParams }} from 'react-router-dom';
                import {{ useLocation }} from 'react-router-dom';
                const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';


                function {title_taiwan_url.replace(' ', '')}() {{
const {{ pageId }} = useParams(); // Get the pageId from the route parameter

    const [isFollowing, setIsFollowing] = useState(false);
    const [followerCount, setFollowerCount] = useState(0);

    useEffect(() => {{
        fetchFollowerCount();
    }}, [pageId]);

    const fetchFollowerCount = async () => {{
        try {{
            const response = await axios.get(`${{API_BASE_URL}}/api/follower-count/${{pageId}}`);
            const {{ followerCount, isFollowing }} = response.data;
            setFollowerCount(followerCount);
            setIsFollowing(isFollowing);
        }} catch (error) {{
            console.error('Error fetching follower count:', error);
        }}
    }};

    const handleFollow = async () => {{
        try {{
            const response = await axios.post(`${{API_BASE_URL}}/api/follow/${{pageId}}`);
            const {{ followerCount, isFollowing }} = response.data;
            setFollowerCount(followerCount);
            setIsFollowing(isFollowing);
        }} catch (error) {{
            console.error('Error following:', error);
        }}
    }};

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [birthdated, setBirthdate] = useState('1986-09-26'); // Set initial birthdate


    const toggleDropdown = () => {{
        setIsDropdownOpen(!isDropdownOpen);
    }};
    const shareOptions = ['Copy Link', 'Facebook', 'Twitter', 'Messenger'];


    const today = new Date();
    const uploadDate = new Date('{date}'); // '2024-04-02' represents April 2, 2024

    const timeDifference = Math.abs(today.getTime() - uploadDate.getTime());
    const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

        // Define state variable for admin status

        const [showAd, setShowAd] = useState(true); // Initially show the ad
        const [adClicked, setAdClicked] = useState(false);
        const handleStartVideoClick = () => {{
            // Open the ad in a new tab
            window.open("https://example.com", "_blank");
            // Hide the ad
            setShowAd(false);
            setAdClicked(true);
            // Set timeout to show the ad again after 5 minutes
            setTimeout(() => {{
                setShowAd(true);
                setAdClicked(false);
            }}, 300000); // 5 minutes in milliseconds
        }};







        const [isInputVisible, setInputVisible] = useState(false);
        const [isAdmin, setIsAdmin] = useState(false);
        const [currentUrlIndex, setCurrentUrlIndex] = useState(0); // Initialize with default index

        useEffect(() => {{
            const userIsAdmin = checkIfUserIsAdmin();
            setIsAdmin(userIsAdmin);
        }}, []);

        const checkIfUserIsAdmin = () => {{
            // Example: Replace this logic with your actual admin check logic
            // For simplicity, returning true always in this example
            return true; // Return true if user is admin, false otherwise
        }};

                        const [icons, setIcons] = useState(() => {{
            const storedIcons = localStorage.getItem('{title_taiwan_url}_icons');
            return storedIcons ? JSON.parse(storedIcons) : [
               {{ url: "{ep1}"}},
                {{ url: "{ep2}"}},
                {{ url: "{ep3}"}},

            ];
            }});


    useEffect(() => {{
        const storedIcons = localStorage.getItem('{title_taiwan_url}_icons');
        if (storedIcons) {{
            setIcons(JSON.parse(storedIcons));
        }}
    }}, []);


    useEffect(() => {{
        // Save icons state to localStorage whenever it changes
        localStorage.setItem('{title_taiwan_url}_icons', JSON.stringify(icons));
    }}, [icons]);

    const handleAddIcon = () => {{
        const newIcon = {{ url: "" }};
        setIcons([...icons, newIcon]);
    }};

    const handleDeleteIcon = (index) => {{
        const newIcons = [...icons];
        newIcons.splice(index, 1);
        setIcons(newIcons);
    }};

    const handleUrlChange = (index, value) => {{
        const newIcons = [...icons];
        newIcons[index].url = value;
        setIcons(newIcons);
    }};

    const saveToMongoDB = async (icons, pageId) => {{
                try {{
                    const urls = icons.map(icon => icon.url); // Extract urls from icons
                    const response = await fetch(`${{API_BASE_URL}}/api/korenaMovie/${{pageId}}`, {{    
                        method: 'POST',
                        headers: {{
                            'Content-Type': 'application/json'
                        }},
                        body: JSON.stringify({{ urls }}), // Pass urls to the backend
                    }});

                    const responseData = await response.json();
                    console.log(responseData);
            
                    const debugInfo = document.getElementById('debug-info');
                    debugInfo.innerHTML = `Page ID: ${{pageId}}<br />Saved Data: ${{JSON.stringify(urls)}}`;
            
                    console.log('Data saved successfully to MongoDB');
                }} catch (error) {{
                    console.error('Error saving data to MongoDB:', error);
                }}
            }};



        const location = useLocation();
        useEffect(() => {{
            const hash = location.hash;
            if (hash) {{
                toggleSection(hash.substring(1));
            }} else {{
                toggleSection('shows');
            }}
        }}, [location]);



        function toggleSection(sectionId) {{
            const sections = document.querySelectorAll('.section');
            sections.forEach(section => {{
                section.style.display = section.id === sectionId ? 'block' : 'none';
            }});
        }}




 







        const handleEnter = (e) => {{
            if (e.key === 'Enter' || e.target.id === 'saveButton') {{
                setInputVisible(false);
            }}
        }};



        






        // Function to handle clicking on an icon
        const handleIconClick = (index) => {{
            setCurrentUrlIndex(index);
            setSelectedIndex(index);
        }};



        const userName = '{title_taiwan_url}-epdisode';
        const userName2 = '{title_taiwan_url}-image';





    const [isVisible, setIsVisible] = useState(true);

    const handleClose = () => {{
        setIsVisible(false);
        setTimeout(() => {{
          setIsVisible(true);
        }}, 20 * 60 * 1000); // 30 minutes in milliseconds
      }};



                    const [imageData, setImageData] = useState(() => {{
                    const storedImageData = localStorage.getItem('{title_taiwan_url}-image');
                    return storedImageData ? JSON.parse(storedImageData) : [
                        {{ url: "{show_url1}",
                          title: "{show_title1}",
                            img: "{imageshow_url1}" }},
                        {{ url: "{show_url2}",
                          title: "{show_title2}",
                            img: "{imageshow_url2}" }},
                        {{ url: "{show_url3}",
                          title: "{show_title3}",
                            img: "{imageshow_url3}" }},
                        {{ url: "{show_url4}",
                          title: "{show_title4}",
                            img: "{imageshow_url4}" }},
                        {{ url: "{show_url5}",
                          title: "{show_title5}",
                            img: "{imageshow_url5}" }},
                        ];
                }});
                
                    useEffect(() => {{
                    const storedImageData = localStorage.getItem('{title_taiwan_url}-image');
                    if (storedImageData) {{
                        setImageData(JSON.parse(storedImageData));
                    }}
                }}, []);

                useEffect(() => {{
                    // Save icons state to localStorage whenever it changes
                    localStorage.setItem('{title_taiwan_url}-image', JSON.stringify(imageData));
                }}, [imageData]);

                const handleImageDataChange = (index, field, value) => {{
                    const updatedImageData = [...imageData];
                    updatedImageData[index][field] = value;
                    setImageData(updatedImageData);
                }};

                const handleAddImage = () => {{
                    const userName2 = 'Leo_DN';

                    setImageData([{{ url: "", title: "", img: "", userName2 }}, ...imageData]);
                    setInputVisible(true);

                }};

                const handleDeleteImage = (index) => {{
                    const updatedImageData = imageData.filter((_, i) => i !== index);
                    setImageData(updatedImageData);
                }};

                const [selectedIndex, setSelectedIndex] = useState(null);

                // const handleIconClickd = (index) => {{
                //     setSelectedIndex(index);
                // }};

                const [user, setUser] = useState({{
                    name: '', // Initialize name as empty string
                    email: '',
                    is_admin: false,

                    // Add more fields as needed
                }});

                // Define fetchUserData function
                const fetchUserData = async () => {{
                    try {{
                    const loggedInUserEmail = sessionStorage.getItem('loggedInUserEmail') || localStorage.getItem('loggedInUserEmail');
                    console.log('Logged In User Email:', loggedInUserEmail);

                    const sessionToken = sessionStorage.getItem('sessionToken') || localStorage.getItem('sessionToken');
                    console.log('Session Token:', sessionToken);

                    if (!loggedInUserEmail || !sessionToken) {{
                    setUser(null);
                    console.log('User not logged in. Clearing user state.');
                    return;
                    }}


                    const response = await fetch(`${{API_BASE_URL}}/login?email=${{loggedInUserEmail}}`, {{
                        method: 'GET',
                        headers: {{
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${{sessionToken}}`
                        }},
                    }});

                    if (response.ok) {{
                        const userDataArray = await response.json();
                        const loggedInUser = userDataArray.find(user => user.email === loggedInUserEmail);
                        if (loggedInUser) {{
                        setUser(loggedInUser);
                        console.log('User data:', loggedInUser);
                        }} else {{
                        console.error('Logged-in user not found in response');
                        setUser(null); // Reset user state if user not found
                        }}
                    }} else {{
                        console.error('Failed to fetch user data');
                        setUser(null); // Reset user state if fetch failed
                    }}
                    }} catch (error) {{
                    console.error('Error occurred while fetching user data:', error);
                    setUser(null);
                    }}
                }};


                useEffect(() => {{
                    fetchUserData();
                }}, []);


                    const [searchTitle, setSearchTitle] = useState('');
                    const [searchResult, setSearchResult] = useState(null);
                    const [editedTitle, setEditedTitle] = useState('');
                    const [editeddate, setEditeddate] = useState('');

                    const [error, setError] = useState('');

                    const handleSearch = async () => {{
                        try {{
                            const response = await axios.get(`${{API_BASE_URL}}/api/tw?title=${{searchTitle}}`);
                            setSearchResult(response.data);
                            setEditedTitle(response.data.title); // Initialize editedTitle with the retrieved title
                            setEditeddate(response.data.date); // Initialize editedTitle with the retrieved title

                            setError('');
                        }} catch (error) {{
                            if (error.response && error.response.data) {{
                                setError(error.response.data.error);
                            }} else {{
                                setError('Failed to search for Korean drama.');
                            }}
                            setSearchResult(null);
                        }}
                    }};

                    const handleEditTitleChange = (e) => {{
                        setEditedTitle(e.target.value);
                    }};
                    const handleEditdate = (e) => {{
                    setEditeddate(e.target.value);
                    }};

                    const handleUpdateTitle = async () => {{
                        try {{
                            // Assuming `searchResult.id_data` contains the correct `id_data` value
                            const response = await axios.put(`${{API_BASE_URL}}/api/tw/${{searchResult.id_data}}`, {{
                                title: editedTitle.trim(), // Trim any leading or trailing whitespace
                                date: editeddate.trim() // Trim any leading or trailing whitespace

                            }});
                            alert(response.data.message); // Display success message
                        }} catch (error) {{
                            console.error('Failed to update title:', error);
                            alert('Failed to update title. Please try again.'); // Display error message
                        }}
                    }};



                    useEffect(() => {{
                        if (searchTitle) {{
                            handleSearch();
                        }}
                    }}, [searchTitle]);

                    console.log("searchResult", searchResult)
  return (
    <div className="profile-container-headerd">
        <div className="profile-containerd">
            <div className="profile-containerd-korean">
                <div className='korean-title'>
                    <i className="fa-solid fa-film"> </i> <span>{title}</span>
                    <div className="border-test">
                        <p>
                            <span style={{{{fontSize:"15px"}}}}>Genre:{genres}</span>
                            <span>{{daysDifference}} days ago</span>
                        </p>
                        {{user && user.is_admin &&(
                        
                        <div>
                            {{/* Your JSX code here */}}
                            {{/* Input field for searching Korean dramas by title */}}
                            <input type="text" value={{searchTitle}} onChange={{(e) => setSearchTitle(e.target.value)}} />
                            <button onClick={{handleSearch}}>Search</button>
                            {{error && <p>{{error}}</p>}}
                            {{searchResult && (
                                <div>
                                    {{/* Input field for editing the title */}}
                                    <input type="text" value={{editedTitle}} onChange={{handleEditTitleChange}} />
                                    <input type="date" value={{editeddate}} onChange={{handleEditdate}} />

                                    <button onClick={{handleUpdateTitle}}>Update Title</button>
                                </div>
                            )}}
                        </div>
                        )}}
                    </div>
                </div>
            </div>
            <div className="profile-borderd">
                <div className="video-left">
                    <div className="vide-left-ads">
                        <div>
                            {{/* <p>h2</p>
                            <p>h2</p>
                            <p>h2</p>
                            <p>h2</p>
                            <p>h2</p>
                            <p>h2</p>
                            <p>h2</p> */}}
                        </div>
                    </div>
                </div>

                <div className="video">
                    {{showAd && !adClicked && (
                        <button className="ad-overlay" onClick={{handleStartVideoClick}}></button>
                    )}}
                    {{currentUrlIndex !== null && (
                        <iframe width="100%" height="100%" src={{icons[currentUrlIndex].url}} scrolling="no" frameborder="0" allowtransparency="true" allowfullscreen="true"
                        style={{{{border:"none", overflow:"hidden"}}}}
                        ></iframe>                    )}}
                </div>

                <div className="video-right">
                    <div className="vide-right-ads">
 {{/* <p>h2</p>
                            <p>h2</p>
                            <p>h2</p>
                            <p>h2</p>
                            <p>h2</p>
                            <p>h2</p>
                            <p>h2</p> */}}
                    </div>
                </div>
            </div>
        </div>
        <div className='tittled'>
            <a href="#shows" onClick={{() => toggleSection('shows')}}><span>Episode</span></a>
            {{/* <a href="#cast" onClick={{() => toggleSection('cast')}}><span>Cast</span></a> */}}
            <a href="#summary" onClick={{() => toggleSection('summary')}}><span>Summary</span></a>
            <span>
                <button onClick={{handleFollow}} className="followd">
                    {{isFollowing ?
                    <span style={{{{marginRight:'6px'}}}}>
                        <i className="fa-solid fa-heart" style={{{{color:'red', marginLeft:'-1rem'}}}}></i> Love
                    </span>
                    :
                    <span>
                        <i className="fa-regular fa-heart" ></i> Like
                    </span>
                    }}
                    {{isFollowing ? <span style={{{{margin: '-5px 0px', marginRight:'5px'}}}}>{{followerCount}}</span> : null}}
                </button>
            </span>
        </div>

        <div className="section" id="shows">
            <div className="episode-video">
                <div className="nav-epdisode">
                    <div className="icon-container">
                        <div style={{{{ display: 'flex', flexWrap: 'wrap' }}}}>
                        {{icons.map((icon, index) => (
    <div key={{index}} style={{{{ margin: '4px' }}}}>
        {{isInputVisible && index === icons.length - 1 && ( // Only show input for the last added icon
            <input
                type="text"
                value={{icon.url}}
                onChange={{(e) => handleUrlChange(index, e.target.value)}}
                onKeyDown={{handleEnter}}
                style={{{{ width: '100%', boxSizing: 'border-box' }}}}
            />
        )}}
        <div
            className={{`icon ${{selectedIndex === index ? 'selected' : ''}}`}}
            onClick={{() => handleIconClick(index)}}
        >
            {{index + 1}}
        </div>
        {{user && user.is_admin &&(

            <button onClick={{() => handleDeleteIcon(index)}}>Delete</button>
        )}}
    </div>
))}}
<div style={{{{ margin: '5px' }}}}>
    {{user && user.is_admin &&(

        <>
            <button onClick={{() => {{ handleAddIcon(); setInputVisible(true); }}}}>Add Icon</button>
            <button id="saveButton" onClick={{(e) => {{ handleEnter(e); saveToMongoDB(icons, userName); setInputVisible(false); }}}}>Save</button>
        </>
    )}}
</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="section" id="cast">
            <div className="shows">
                <div className="shows-container">
                    <p> <span style={{{{fontSize:'16px', color:'rgb(13, 104, 241)'}}}}>{{'▶'}}</span>Cast: </p>
                </div>
                {{user && user.is_admin &&(

                    <>
                        <button onClick={{handleAddImage}}>Add Image</button>
                        <button id="saveButton" onClick={{(e) => {{ handleEnter(e); saveToMongoDB(imageData, userName2); }}}}>Save</button>
                    </>
                )}}
                <div className="news">
                    {{imageData.map((info, index) => (
                        <div key={{index}} className="image-container">
                            <a href={{info.url}} target="_blank" rel="noopener noreferrer">
                                <img src={{info.img}} alt={{`Image ${{index}}`}} />
                            </a>
                            {{user && user.is_admin ?(

                                (isInputVisible && (
                                    <div>
                                        <input
                                            type="text"
                                            value={{info.title}}
                                            onKeyDown={{handleEnter}}
                                            onChange={{(e) => handleImageDataChange(index, 'title', e.target.value)}}
                                            placeholder="Enter new title"
                                        />
                                        <input
                                            type="text"
                                            value={{info.url}}
                                            onKeyDown={{handleEnter}}
                                            onChange={{(e) => handleImageDataChange(index, 'url', e.target.value)}}
                                            placeholder="Enter new URL"
                                        />
                                        <input
                                            type="text"
                                            value={{info.img}}
                                            onKeyDown={{handleEnter}}
                                            onChange={{(e) => handleImageDataChange(index, 'img', e.target.value)}}
                                            placeholder="Enter new image URL"
                                        />
                                        <button onClick={{() => handleDeleteImage(index)}}>Delete</button>
                                    </div>
                                ))) : (
                                    // User view
                                    <div>
                                        <p className="image-title">{{info.title}}</p>
                                    </div>
                                )
                            }}
                        </div>
                    ))}}
                </div>
            </div>
        </div>
         <div className="section" id="summary">
            <div className="summary-main">
                    <div className="summary-nav">
                        <div className="summary-first">
                            <img src="{img}" alt=""
                             style={{{{width:"230px", height:"230px"}}}}/>
                        </div>
   
                        <div className="summary-second">
                                <p>Detail:</p>
                                <p> {summarytext}</p>
                        </div>
                    </div>
            </div>
             <div className="summary-seconds">
                        <p>Summary:</p>
                                <p> {fulldetail}</p>
                    </div>
        </div>

        {{isVisible && (
            <div className="outside-drama-ads">
                <div className="drama-bottom-ads">
                </div>
                <span className="close-btn" onClick={{handleClose}}>X</span>
            </div>
        )}}
    </div>
);
}};
                
            
            export default {title_taiwan_url.replace(' ', '')};
            """
            )
        
        # Modify App.js to include import statement for the newly created file
        app_js_path = r'C:\Users\acquy\OneDrive\blog-web\blog\client\src\App.js'
        with open(app_js_path, 'r') as app_js_file:
            lines = app_js_file.readlines()
        
        # Find the line number of the closing tag </Routes>
        route_index = [i for i, line in enumerate(lines) if '</Routes>' in line][0]

        # Insert the import statement for the newly created file at the top of the file
        lines.insert(0, f"import Taiwan_{title_taiwan_url.replace(' ', '')} from './components/Taiwan/{title_taiwan_url}';\n")

        # Insert the Route component just before the closing tag </Routes>
        lines.insert(route_index, f'          <Route path="/Taiwan/{title_taiwan_url}/:pageId" element={{<Taiwan_{title_taiwan_url.replace(" ", "")} />}} />\n')

        # Write the modified content back to the file
        with open(app_js_path, 'w') as app_js_file:
            app_js_file.writelines(lines)

        return jsonify({'message': 'JavaScript file created successfully', 'jsFileName': f"{title_taiwan_url}.js"}), 200

    elif title_japan_url and title:
        file_path = os.path.join(directory_japan, f'{title_japan_url}.js')
        with open(file_path, 'w', encoding='utf-8') as file:
            # Write JSX content to the new file
           file.write(
                f"""
                
                import React, {{ useState, useEffect }} from 'react';
                import '../../styles/Drama.css';
                import '@fortawesome/fontawesome-free/css/all.css';
                import Editable from '../Editable';
                import axios from 'axios';
                import {{ useParams }} from 'react-router-dom';
                import {{ useLocation }} from 'react-router-dom';
                const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';


                function {title_japan_url.replace(' ', '')}() {{
const {{ pageId }} = useParams(); // Get the pageId from the route parameter

    const [isFollowing, setIsFollowing] = useState(false);
    const [followerCount, setFollowerCount] = useState(0);

    useEffect(() => {{
        fetchFollowerCount();
    }}, [pageId]);

    const fetchFollowerCount = async () => {{
        try {{
            const response = await axios.get(`${{API_BASE_URL}}/api/follower-count/${{pageId}}`);
            const {{ followerCount, isFollowing }} = response.data;
            setFollowerCount(followerCount);
            setIsFollowing(isFollowing);
        }} catch (error) {{
            console.error('Error fetching follower count:', error);
        }}
    }};

    const handleFollow = async () => {{
        try {{
            const response = await axios.post(`${{API_BASE_URL}}/api/follow/${{pageId}}`);
            const {{ followerCount, isFollowing }} = response.data;
            setFollowerCount(followerCount);
            setIsFollowing(isFollowing);
        }} catch (error) {{
            console.error('Error following:', error);
        }}
    }};

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [birthdated, setBirthdate] = useState('1986-09-26'); // Set initial birthdate


    const toggleDropdown = () => {{
        setIsDropdownOpen(!isDropdownOpen);
    }};
    const shareOptions = ['Copy Link', 'Facebook', 'Twitter', 'Messenger'];


    const today = new Date();
    const uploadDate = new Date('{date}'); // '2024-04-02' represents April 2, 2024

    const timeDifference = Math.abs(today.getTime() - uploadDate.getTime());
    const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

        // Define state variable for admin status

        const [showAd, setShowAd] = useState(true); // Initially show the ad
        const [adClicked, setAdClicked] = useState(false);
        const handleStartVideoClick = () => {{
            // Open the ad in a new tab
            window.open("https://example.com", "_blank");
            // Hide the ad
            setShowAd(false);
            setAdClicked(true);
            // Set timeout to show the ad again after 5 minutes
            setTimeout(() => {{
                setShowAd(true);
                setAdClicked(false);
            }}, 300000); // 5 minutes in milliseconds
        }};







        const [isInputVisible, setInputVisible] = useState(false);
        const [isAdmin, setIsAdmin] = useState(false);
        const [currentUrlIndex, setCurrentUrlIndex] = useState(0); // Initialize with default index

        useEffect(() => {{
            const userIsAdmin = checkIfUserIsAdmin();
            setIsAdmin(userIsAdmin);
        }}, []);

        const checkIfUserIsAdmin = () => {{
            // Example: Replace this logic with your actual admin check logic
            // For simplicity, returning true always in this example
            return true; // Return true if user is admin, false otherwise
        }};

                        const [icons, setIcons] = useState(() => {{
            const storedIcons = localStorage.getItem('{title_japan_url}_icons');
            return storedIcons ? JSON.parse(storedIcons) : [
               {{ url: "{ep1}"}},
                {{ url: "{ep2}"}},
                {{ url: "{ep3}"}},

            ];
            }});


    useEffect(() => {{
        const storedIcons = localStorage.getItem('{title_japan_url}_icons');
        if (storedIcons) {{
            setIcons(JSON.parse(storedIcons));
        }}
    }}, []);


    useEffect(() => {{
        // Save icons state to localStorage whenever it changes
        localStorage.setItem('{title_japan_url}_icons', JSON.stringify(icons));
    }}, [icons]);

    const handleAddIcon = () => {{
        const newIcon = {{ url: "" }};
        setIcons([...icons, newIcon]);
    }};

    const handleDeleteIcon = (index) => {{
        const newIcons = [...icons];
        newIcons.splice(index, 1);
        setIcons(newIcons);
    }};

    const handleUrlChange = (index, value) => {{
        const newIcons = [...icons];
        newIcons[index].url = value;
        setIcons(newIcons);
    }};

    const saveToMongoDB = async (icons, pageId) => {{
                try {{
                    const urls = icons.map(icon => icon.url); // Extract urls from icons
                    const response = await fetch(`${{API_BASE_URL}}/api/korenaMovie/${{pageId}}`, {{    
                        method: 'POST',
                        headers: {{
                            'Content-Type': 'application/json'
                        }},
                        body: JSON.stringify({{ urls }}), // Pass urls to the backend
                    }});

                    const responseData = await response.json();
                    console.log(responseData);
            
                    const debugInfo = document.getElementById('debug-info');
                    debugInfo.innerHTML = `Page ID: ${{pageId}}<br />Saved Data: ${{JSON.stringify(urls)}}`;
            
                    console.log('Data saved successfully to MongoDB');
                }} catch (error) {{
                    console.error('Error saving data to MongoDB:', error);
                }}
            }};



        const location = useLocation();
        useEffect(() => {{
            const hash = location.hash;
            if (hash) {{
                toggleSection(hash.substring(1));
            }} else {{
                toggleSection('shows');
            }}
        }}, [location]);



        function toggleSection(sectionId) {{
            const sections = document.querySelectorAll('.section');
            sections.forEach(section => {{
                section.style.display = section.id === sectionId ? 'block' : 'none';
            }});
        }}




 







        const handleEnter = (e) => {{
            if (e.key === 'Enter' || e.target.id === 'saveButton') {{
                setInputVisible(false);
            }}
        }};



        






        // Function to handle clicking on an icon
        const handleIconClick = (index) => {{
            setCurrentUrlIndex(index);
            setSelectedIndex(index);
        }};



        const userName = '{title_japan_url}-epdisode';
        const userName2 = '{title_japan_url}-image';





    const [isVisible, setIsVisible] = useState(true);

    const handleClose = () => {{
        setIsVisible(false);
        setTimeout(() => {{
          setIsVisible(true);
        }}, 20 * 60 * 1000); // 30 minutes in milliseconds
      }};



                    const [imageData, setImageData] = useState(() => {{
                    const storedImageData = localStorage.getItem('{title_japan_url}-image');
                    return storedImageData ? JSON.parse(storedImageData) : [
                        {{ url: "{show_url1}",
                          title: "{show_title1}",
                            img: "{imageshow_url1}" }},
                        {{ url: "{show_url2}",
                          title: "{show_title2}",
                            img: "{imageshow_url2}" }},
                        {{ url: "{show_url3}",
                          title: "{show_title3}",
                            img: "{imageshow_url3}" }},
                        {{ url: "{show_url4}",
                          title: "{show_title4}",
                            img: "{imageshow_url4}" }},
                        {{ url: "{show_url5}",
                          title: "{show_title5}",
                            img: "{imageshow_url5}" }},
                        ];
                }});
                
                    useEffect(() => {{
                    const storedImageData = localStorage.getItem('{title_japan_url}-image');
                    if (storedImageData) {{
                        setImageData(JSON.parse(storedImageData));
                    }}
                }}, []);

                useEffect(() => {{
                    // Save icons state to localStorage whenever it changes
                    localStorage.setItem('{title_japan_url}-image', JSON.stringify(imageData));
                }}, [imageData]);

                const handleImageDataChange = (index, field, value) => {{
                    const updatedImageData = [...imageData];
                    updatedImageData[index][field] = value;
                    setImageData(updatedImageData);
                }};

                const handleAddImage = () => {{
                    const userName2 = 'Leo_DN';

                    setImageData([{{ url: "", title: "", img: "", userName2 }}, ...imageData]);
                    setInputVisible(true);

                }};

                const handleDeleteImage = (index) => {{
                    const updatedImageData = imageData.filter((_, i) => i !== index);
                    setImageData(updatedImageData);
                }};

                const [selectedIndex, setSelectedIndex] = useState(null);

                // const handleIconClickd = (index) => {{
                //     setSelectedIndex(index);
                // }};


                const [user, setUser] = useState({{
                    name: '', // Initialize name as empty string
                    email: '',
                    is_admin: false,

                    // Add more fields as needed
                }});

                // Define fetchUserData function
                const fetchUserData = async () => {{
                    try {{
                    const loggedInUserEmail = sessionStorage.getItem('loggedInUserEmail') || localStorage.getItem('loggedInUserEmail');
                    console.log('Logged In User Email:', loggedInUserEmail);

                    const sessionToken = sessionStorage.getItem('sessionToken') || localStorage.getItem('sessionToken');
                    console.log('Session Token:', sessionToken);

                    if (!loggedInUserEmail || !sessionToken) {{
                    setUser(null);
                    console.log('User not logged in. Clearing user state.');
                    return;
                    }}


                    const response = await fetch(`${{API_BASE_URL}}/login?email=${{loggedInUserEmail}}`, {{
                        method: 'GET',
                        headers: {{
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${{sessionToken}}`
                        }},
                    }});

                    if (response.ok) {{
                        const userDataArray = await response.json();
                        const loggedInUser = userDataArray.find(user => user.email === loggedInUserEmail);
                        if (loggedInUser) {{
                        setUser(loggedInUser);
                        console.log('User data:', loggedInUser);
                        }} else {{
                        console.error('Logged-in user not found in response');
                        setUser(null); // Reset user state if user not found
                        }}
                    }} else {{
                        console.error('Failed to fetch user data');
                        setUser(null); // Reset user state if fetch failed
                    }}
                    }} catch (error) {{
                    console.error('Error occurred while fetching user data:', error);
                    setUser(null);
                    }}
                }};


                useEffect(() => {{
                    fetchUserData();
                }}, []);

                const [searchTitle, setSearchTitle] = useState('');
                    const [searchResult, setSearchResult] = useState(null);
                    const [editedTitle, setEditedTitle] = useState('');
                    const [editeddate, setEditeddate] = useState('');

                    const [error, setError] = useState('');

                    const handleSearch = async () => {{
                        try {{
                            const response = await axios.get(`${{API_BASE_URL}}/api/ja?title=${{searchTitle}}`);
                            setSearchResult(response.data);
                            setEditedTitle(response.data.title); // Initialize editedTitle with the retrieved title
                            setEditeddate(response.data.date); // Initialize editedTitle with the retrieved title

                            setError('');
                        }} catch (error) {{
                            if (error.response && error.response.data) {{
                                setError(error.response.data.error);
                            }} else {{
                                setError('Failed to search for Korean drama.');
                            }}
                            setSearchResult(null);
                        }}
                    }};

                    const handleEditTitleChange = (e) => {{
                        setEditedTitle(e.target.value);
                    }};
                    const handleEditdate = (e) => {{
                    setEditeddate(e.target.value);
                    }};

                    const handleUpdateTitle = async () => {{
                        try {{
                            // Assuming `searchResult.id_data` contains the correct `id_data` value
                            const response = await axios.put(`${{API_BASE_URL}}/api/ja/${{searchResult.id_data}}`, {{
                                title: editedTitle.trim(), // Trim any leading or trailing whitespace
                                date: editeddate.trim() // Trim any leading or trailing whitespace

                            }});
                            alert(response.data.message); // Display success message
                        }} catch (error) {{
                            console.error('Failed to update title:', error);
                            alert('Failed to update title. Please try again.'); // Display error message
                        }}
                    }};



                    // Call handleSearch when the component mounts or searchTitle changes
                    useEffect(() => {{
                        if (searchTitle) {{
                            handleSearch();
                        }}
                    }}, [searchTitle]);

                    console.log("searchResult", searchResult)



  return (
    <div className="profile-container-headerd">
        <div className="profile-containerd">
            <div className="profile-containerd-korean">
                <div className='korean-title'>
                    <i className="fa-solid fa-film"> </i> <span>{title}</span>
                    <div className="border-test">
                        <p>
                            <span style={{{{fontSize:"15px"}}}}>Genre:{genres}</span>

                            <span>{{daysDifference}} days ago</span>
                        </p>
                        {{user && user.is_admin &&(
                        
                        <div>
                            {{/* Your JSX code here */}}
                            {{/* Input field for searching Korean dramas by title */}}
                            <input type="text" value={{searchTitle}} onChange={{(e) => setSearchTitle(e.target.value)}} />
                            <button onClick={{handleSearch}}>Search</button>
                            {{error && <p>{{error}}</p>}}
                            {{searchResult && (
                                <div>
                                    {{/* Input field for editing the title */}}
                                    <input type="text" value={{editedTitle}} onChange={{handleEditTitleChange}} />
                                    <input type="date" value={{editeddate}} onChange={{handleEditdate}} />

                                    <button onClick={{handleUpdateTitle}}>Update Title</button>
                                </div>
                            )}}
                        </div>
                        )}}
                    </div>
                </div>
            </div>
            <div className="profile-borderd">
                <div className="video-left">
                    <div className="vide-left-ads">
                        <div>
                           {{/* <p>h2</p>
                            <p>h2</p>
                            <p>h2</p>
                            <p>h2</p>
                            <p>h2</p>
                            <p>h2</p>
                            <p>h2</p> */}}
                        </div>
                    </div>
                </div>

                <div className="video">
                    {{showAd && !adClicked && (
                        <button className="ad-overlay" onClick={{handleStartVideoClick}}></button>
                    )}}
                    {{currentUrlIndex !== null && (
                        <iframe width="100%" height="100%" src={{icons[currentUrlIndex].url}} scrolling="no" frameborder="0" allowtransparency="true" allowfullscreen="true"
                        style={{{{border:"none", overflow:"hidden"}}}}
                        ></iframe>                    )}}
                </div>

                <div className="video-right">
                    <div className="vide-right-ads">
                        {{/* <p>h2</p>
                            <p>h2</p>
                            <p>h2</p>
                            <p>h2</p>
                            <p>h2</p>
                            <p>h2</p>
                            <p>h2</p> */}}
                    </div>
                </div>
            </div>
        </div>
        <div className='tittled'>
            <a href="#shows" onClick={{() => toggleSection('shows')}}><span>Episode</span></a>
            {{/* <a href="#cast" onClick={{() => toggleSection('cast')}}><span>Cast</span></a> */}}
            <a href="#summary" onClick={{() => toggleSection('summary')}}><span>Summary</span></a>
            <span>
                <button onClick={{handleFollow}} className="followd">
                    {{isFollowing ?
                    <span style={{{{marginRight:'6px'}}}}>
                        <i className="fa-solid fa-heart" style={{{{color:'red', marginLeft:'-1rem'}}}}></i> Love
                    </span>
                    :
                    <span>
                        <i className="fa-regular fa-heart" ></i> Like
                    </span>
                    }}
                    {{isFollowing ? <span style={{{{margin: '-5px 0px', marginRight:'5px'}}}}>{{followerCount}}</span> : null}}
                </button>
            </span>
        </div>

        <div className="section" id="shows">
            <div className="episode-video">
                <div className="nav-epdisode">
                    <div className="icon-container">
                        <div style={{{{ display: 'flex', flexWrap: 'wrap' }}}}>
                        {{icons.map((icon, index) => (
    <div key={{index}} style={{{{ margin: '4px' }}}}>
        {{isInputVisible && index === icons.length - 1 && ( // Only show input for the last added icon
            <input
                type="text"
                value={{icon.url}}
                onChange={{(e) => handleUrlChange(index, e.target.value)}}
                onKeyDown={{handleEnter}}
                style={{{{ width: '100%', boxSizing: 'border-box' }}}}
            />
        )}}
        <div
            className={{`icon ${{selectedIndex === index ? 'selected' : ''}}`}}
            onClick={{() => handleIconClick(index)}}
        >
            {{index + 1}}
        </div>
        {{user && user.is_admin &&(

            <button onClick={{() => handleDeleteIcon(index)}}>Delete</button>
        )}}
    </div>
))}}
<div style={{{{ margin: '5px' }}}}>
    {{user && user.is_admin &&(

        <>
            <button onClick={{() => {{ handleAddIcon(); setInputVisible(true); }}}}>Add Icon</button>
            <button id="saveButton" onClick={{(e) => {{ handleEnter(e); saveToMongoDB(icons, userName); setInputVisible(false); }}}}>Save</button>
        </>
    )}}
</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="section" id="cast">
            <div className="shows">
                <div className="shows-container">
                    <p> <span style={{{{fontSize:'16px', color:'rgb(13, 104, 241)'}}}}>{{'▶'}}</span>Cast: </p>
                </div>
                {{user && user.is_admin &&(

                    <>
                        <button onClick={{handleAddImage}}>Add Image</button>
                        <button id="saveButton" onClick={{(e) => {{ handleEnter(e); saveToMongoDB(imageData, userName2); }}}}>Save</button>
                    </>
                )}}
                <div className="news">
                    {{imageData.map((info, index) => (
                        <div key={{index}} className="image-container">
                            <a href={{info.url}} target="_blank" rel="noopener noreferrer">
                                <img src={{info.img}} alt={{`Image ${{index}}`}} />
                            </a>
                            {{user && user.is_admin ?(

                                (isInputVisible && (
                                    <div>
                                        <input
                                            type="text"
                                            value={{info.title}}
                                            onKeyDown={{handleEnter}}
                                            onChange={{(e) => handleImageDataChange(index, 'title', e.target.value)}}
                                            placeholder="Enter new title"
                                        />
                                        <input
                                            type="text"
                                            value={{info.url}}
                                            onKeyDown={{handleEnter}}
                                            onChange={{(e) => handleImageDataChange(index, 'url', e.target.value)}}
                                            placeholder="Enter new URL"
                                        />
                                        <input
                                            type="text"
                                            value={{info.img}}
                                            onKeyDown={{handleEnter}}
                                            onChange={{(e) => handleImageDataChange(index, 'img', e.target.value)}}
                                            placeholder="Enter new image URL"
                                        />
                                        <button onClick={{() => handleDeleteImage(index)}}>Delete</button>
                                    </div>
                                ))) : (
                                    // User view
                                    <div>
                                        <p className="image-title">{{info.title}}</p>
                                    </div>
                                )
                            }}
                        </div>
                    ))}}
                </div>
            </div>
        </div>
        <div className="section" id="summary">
            <div className="summary-main">
                    <div className="summary-nav">
                        <div className="summary-first">
                            <img src="{img}" alt=""
                             style={{{{width:"230px", height:"230px"}}}}/>
                        </div>
   
                        <div className="summary-second">
                                <p>Detail:</p>
                                <p> {summarytext}</p>
                        </div>
                    </div>
            </div>
             <div className="summary-seconds">
                        <p>Summary:</p>
                                <p> {fulldetail}</p>
                    </div>
        </div>

        {{isVisible && (
            <div className="outside-drama-ads">
                <div className="drama-bottom-ads">
                </div>
                <span className="close-btn" onClick={{handleClose}}>X</span>
            </div>
        )}}
    </div>
);
}};
                
            
            export default {title_japan_url.replace(' ', '')};
            """
            )
        
        # Modify App.js to include import statement for the newly created file
        app_js_path = r'C:\Users\acquy\OneDrive\blog-web\blog\client\src\App.js'
        with open(app_js_path, 'r') as app_js_file:
            lines = app_js_file.readlines()
        
        # Find the line number of the closing tag </Routes>
        route_index = [i for i, line in enumerate(lines) if '</Routes>' in line][0]

        # Insert the import statement for the newly created file at the top of the file
        lines.insert(0, f"import Japan_{title_japan_url.replace(' ', '')} from './components/Japan/{title_japan_url}';\n")

        # Insert the Route component just before the closing tag </Routes>
        lines.insert(route_index, f'          <Route path="/Japan/{title_japan_url}/:pageId" element={{<Japan_{title_japan_url.replace(" ", "")} />}} />\n')

        # Write the modified content back to the file
        with open(app_js_path, 'w') as app_js_file:
            app_js_file.writelines(lines)

        return jsonify({'message': 'JavaScript file created successfully', 'jsFileName': f"{title_japan_url}.js"}), 200




    elif title_chinese_url and title:
        file_path = os.path.join(directory_movie, f'{title_chinese_url}.js')
        with open(file_path, 'w', encoding='utf-8') as file:
            # Write JSX content to the new file
           file.write(
                f"""
                
                import React, {{ useState, useEffect }} from 'react';
                import '../../styles/Drama.css';
                import '@fortawesome/fontawesome-free/css/all.css';
                import Editable from '../Editable';
                import axios from 'axios';
                import {{ useParams }} from 'react-router-dom';
                import {{ useLocation }} from 'react-router-dom';
                const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';


                function {title_chinese_url.replace(' ', '')}() {{
                    const {{ pageId }} = useParams(); // Get the pageId from the route parameter

    const [isFollowing, setIsFollowing] = useState(false);
    const [followerCount, setFollowerCount] = useState(0);

    useEffect(() => {{
        fetchFollowerCount();
    }}, [pageId]);

    const fetchFollowerCount = async () => {{
        try {{
            const response = await axios.get(`${{API_BASE_URL}}/api/follower-count/${{pageId}}`);
            const {{ followerCount, isFollowing }} = response.data;
            setFollowerCount(followerCount);
            setIsFollowing(isFollowing);
        }} catch (error) {{
            console.error('Error fetching follower count:', error);
        }}
    }};

    const handleFollow = async () => {{
        try {{
            const response = await axios.post(`${{API_BASE_URL}}/api/follow/${{pageId}}`);
            const {{ followerCount, isFollowing }} = response.data;
            setFollowerCount(followerCount);
            setIsFollowing(isFollowing);
        }} catch (error) {{
            console.error('Error following:', error);
        }}
    }};

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [birthdated, setBirthdate] = useState('1986-09-26'); // Set initial birthdate


    const toggleDropdown = () => {{
        setIsDropdownOpen(!isDropdownOpen);
    }};
    const shareOptions = ['Copy Link', 'Facebook', 'Twitter', 'Messenger'];


    const today = new Date();
    const uploadDate = new Date('{date}'); // '2024-04-02' represents April 2, 2024

    const timeDifference = Math.abs(today.getTime() - uploadDate.getTime());
    const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

        // Define state variable for admin status

        const [showAd, setShowAd] = useState(true); // Initially show the ad
        const [adClicked, setAdClicked] = useState(false);
        const handleStartVideoClick = () => {{
            // Open the ad in a new tab
            window.open("https://example.com", "_blank");
            // Hide the ad
            setShowAd(false);
            setAdClicked(true);
            // Set timeout to show the ad again after 5 minutes
            setTimeout(() => {{
                setShowAd(true);
                setAdClicked(false);
            }}, 300000); // 5 minutes in milliseconds
        }};







        const [isInputVisible, setInputVisible] = useState(false);
        const [isAdmin, setIsAdmin] = useState(false);
        const [currentUrlIndex, setCurrentUrlIndex] = useState(0); // Initialize with default index

        useEffect(() => {{
            const userIsAdmin = checkIfUserIsAdmin();
            setIsAdmin(userIsAdmin);
        }}, []);

        const checkIfUserIsAdmin = () => {{
            // Example: Replace this logic with your actual admin check logic
            // For simplicity, returning true always in this example
            return true; // Return true if user is admin, false otherwise
        }};

                        const [icons, setIcons] = useState(() => {{
            const storedIcons = localStorage.getItem('{title_chinese_url}_icons');
            return storedIcons ? JSON.parse(storedIcons) : [
               {{ url: "{ep1}"}},
                {{ url: "{ep2}"}},
                {{ url: "{ep3}"}},

            ];
            }});


    useEffect(() => {{
        const storedIcons = localStorage.getItem('{title_chinese_url}_icons');
        if (storedIcons) {{
            setIcons(JSON.parse(storedIcons));
        }}
    }}, []);


    useEffect(() => {{
        // Save icons state to localStorage whenever it changes
        localStorage.setItem('{title_chinese_url}_icons', JSON.stringify(icons));
    }}, [icons]);

    const handleAddIcon = () => {{
        const newIcon = {{ url: "" }};
        setIcons([...icons, newIcon]);
    }};

    const handleDeleteIcon = (index) => {{
        const newIcons = [...icons];
        newIcons.splice(index, 1);
        setIcons(newIcons);
    }};

    const handleUrlChange = (index, value) => {{
        const newIcons = [...icons];
        newIcons[index].url = value;
        setIcons(newIcons);
    }};

    const saveToMongoDB = async (icons, pageId) => {{
                try {{
                    const urls = icons.map(icon => icon.url); // Extract urls from icons
                    const response = await fetch(`${{API_BASE_URL}}/api/korenaMovie/${{pageId}}`, {{    
                        method: 'POST',
                        headers: {{
                            'Content-Type': 'application/json'
                        }},
                        body: JSON.stringify({{ urls }}), // Pass urls to the backend
                    }});

                    const responseData = await response.json();
                    console.log(responseData);
            
                    const debugInfo = document.getElementById('debug-info');
                    debugInfo.innerHTML = `Page ID: ${{pageId}}<br />Saved Data: ${{JSON.stringify(urls)}}`;
            
                    console.log('Data saved successfully to MongoDB');
                }} catch (error) {{
                    console.error('Error saving data to MongoDB:', error);
                }}
            }};



        const location = useLocation();
        useEffect(() => {{
            const hash = location.hash;
            if (hash) {{
                toggleSection(hash.substring(1));
            }} else {{
                toggleSection('shows');
            }}
        }}, [location]);



        function toggleSection(sectionId) {{
            const sections = document.querySelectorAll('.section');
            sections.forEach(section => {{
                section.style.display = section.id === sectionId ? 'block' : 'none';
            }});
        }}




 







        const handleEnter = (e) => {{
            if (e.key === 'Enter' || e.target.id === 'saveButton') {{
                setInputVisible(false);
            }}
        }};



        






        // Function to handle clicking on an icon
        const handleIconClick = (index) => {{
            setCurrentUrlIndex(index);
            setSelectedIndex(index);
        }};



        const userName = '{title_chinese_url}-epdisode';
        const userName2 = '{title_chinese_url}-image';





    const [isVisible, setIsVisible] = useState(true);

    const handleClose = () => {{
        setIsVisible(false);
        setTimeout(() => {{
          setIsVisible(true);
        }}, 20 * 60 * 1000); // 30 minutes in milliseconds
      }};



                    const [imageData, setImageData] = useState(() => {{
                    const storedImageData = localStorage.getItem('{title_chinese_url}-image');
                    return storedImageData ? JSON.parse(storedImageData) : [
                        {{ url: "{show_url1}",
                          title: "{show_title1}",
                            img: "{imageshow_url1}" }},
                        {{ url: "{show_url2}",
                          title: "{show_title2}",
                            img: "{imageshow_url2}" }},
                        {{ url: "{show_url3}",
                          title: "{show_title3}",
                            img: "{imageshow_url3}" }},
                        {{ url: "{show_url4}",
                          title: "{show_title4}",
                            img: "{imageshow_url4}" }},
                        {{ url: "{show_url5}",
                          title: "{show_title5}",
                            img: "{imageshow_url5}" }},
                        ];
                }});
                
                    useEffect(() => {{
                    const storedImageData = localStorage.getItem('{title_chinese_url}-image');
                    if (storedImageData) {{
                        setImageData(JSON.parse(storedImageData));
                    }}
                }}, []);

                useEffect(() => {{
                    // Save icons state to localStorage whenever it changes
                    localStorage.setItem('{title_chinese_url}-image', JSON.stringify(imageData));
                }}, [imageData]);

                const handleImageDataChange = (index, field, value) => {{
                    const updatedImageData = [...imageData];
                    updatedImageData[index][field] = value;
                    setImageData(updatedImageData);
                }};

                const handleAddImage = () => {{
                    const userName2 = 'Leo_DN';

                    setImageData([{{ url: "", title: "", img: "", userName2 }}, ...imageData]);
                    setInputVisible(true);

                }};

                const handleDeleteImage = (index) => {{
                    const updatedImageData = imageData.filter((_, i) => i !== index);
                    setImageData(updatedImageData);
                }};

                const [selectedIndex, setSelectedIndex] = useState(null);

                // const handleIconClickd = (index) => {{
                //     setSelectedIndex(index);
                // }};

                const [user, setUser] = useState({{
                    name: '', // Initialize name as empty string
                    email: '',
                    is_admin: false,

                    // Add more fields as needed
                }});

                // Define fetchUserData function
                const fetchUserData = async () => {{
                    try {{
                    const loggedInUserEmail = sessionStorage.getItem('loggedInUserEmail') || localStorage.getItem('loggedInUserEmail');
                    console.log('Logged In User Email:', loggedInUserEmail);

                    const sessionToken = sessionStorage.getItem('sessionToken') || localStorage.getItem('sessionToken');
                    console.log('Session Token:', sessionToken);

                    if (!loggedInUserEmail || !sessionToken) {{
                    setUser(null);
                    console.log('User not logged in. Clearing user state.');
                    return;
                    }}


                    const response = await fetch(`${{API_BASE_URL}}/login?email=${{loggedInUserEmail}}`, {{
                        method: 'GET',
                        headers: {{
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${{sessionToken}}`
                        }},
                    }});

                    if (response.ok) {{
                        const userDataArray = await response.json();
                        const loggedInUser = userDataArray.find(user => user.email === loggedInUserEmail);
                        if (loggedInUser) {{
                        setUser(loggedInUser);
                        console.log('User data:', loggedInUser);
                        }} else {{
                        console.error('Logged-in user not found in response');
                        setUser(null); // Reset user state if user not found
                        }}
                    }} else {{
                        console.error('Failed to fetch user data');
                        setUser(null); // Reset user state if fetch failed
                    }}
                    }} catch (error) {{
                    console.error('Error occurred while fetching user data:', error);
                    setUser(null);
                    }}
                }};


                useEffect(() => {{
                    fetchUserData();
                }}, []);

                    const [searchTitle, setSearchTitle] = useState('');
                    const [searchResult, setSearchResult] = useState(null);
                    const [editedTitle, setEditedTitle] = useState('');
                    const [editedepisode, setEditepisode] = useState('');

                    const [error, setError] = useState('');

                    const handleSearch = async () => {{
                        try {{
                            const response = await axios.get(`${{API_BASE_URL}}/api/ch?title=${{searchTitle}}`);
                            setSearchResult(response.data);
                            setEditedTitle(response.data.title); // Initialize editedTitle with the retrieved title
                            setEditeddate(response.data.date); // Initialize editedTitle with the retrieved title
                            setEditepisode(response.data.episode); // Initialize editedTitle with the retrieved title

                            setError('');
                        }} catch (error) {{
                            if (error.response && error.response.data) {{
                                setError(error.response.data.error);
                            }} else {{
                                setError('Failed to search for Korean drama.');
                            }}
                            setSearchResult(null);
                        }}
                    }};

                    const handleEditTitleChange = (e) => {{
                        setEditedTitle(e.target.value);
                    }};
                    const handleEditdate = (e) => {{
                    setEditeddate(e.target.value);
                    }};
                    const handleEditepisode = (e) => {{
                        setEditepisode(e.target.value);
                    }};
                    const handleUpdateTitle = async () => {{
                        try {{
                            // Assuming `searchResult.id_data` contains the correct `id_data` value
                            const response = await axios.put(`${{API_BASE_URL}}/api/ch/${{searchResult.id_data}}`, {{
                                title: editedTitle.trim(), // Trim any leading or trailing whitespace
                                date: editeddate.trim(), // Trim any leading or trailing whitespace
                                episode: editedepisode.trim()

                            }});
                            alert(response.data.message); // Display success message
                        }} catch (error) {{
                            console.error('Failed to update title:', error);
                            alert('Failed to update title. Please try again.'); // Display error message
                        }}
                    }};



                    // Call handleSearch when the component mounts or searchTitle changes
                    useEffect(() => {{
                        if (searchTitle) {{
                            handleSearch();
                        }}
                    }}, [searchTitle]);

                    console.log("searchResult", searchResult)                


  return (
    <div className="profile-container-headerd">
        <div className="profile-containerd">
            <div className="profile-containerd-korean">
                <div className='korean-title'>
                    <i className="fa-solid fa-film"> </i> <span>{title}</span>
                    <div className="border-test">
                        <p>
                            <span style={{{{fontSize:"15px"}}}}>Genre:{genres}</span>

                            <span>{{daysDifference}} days ago</span>
                        </p>
                        {{user && user.is_admin &&(
                        
                        <div>
                            {{/* Your JSX code here */}}
                            {{/* Input field for searching Korean dramas by title */}}
                            <input type="text" value={{searchTitle}} onChange={{(e) => setSearchTitle(e.target.value)}} />
                            <button onClick={{handleSearch}}>Search</button>
                            {{error && <p>{{error}}</p>}}
                            {{searchResult && (
                                <div>
                                    {{/* Input field for editing the title */}}
                                    <input type="text" value={{editedTitle}} onChange={{handleEditTitleChange}} />
                                    <input type="date" value={{editeddate}} onChange={{handleEditdate}} />
                                    <input type="text" value={{editedepisode}} onChange={{handleEditepisode}} />

                                    <button onClick={{handleUpdateTitle}}>Update Title</button>
                                </div>
                            )}}
                        </div>
                        )}}
                    </div>
                </div>
            </div>
            <div className="profile-borderd">
                <div className="video-left">
                    <div className="vide-left-ads">
                        <div>
                           {{/* <p>h2</p>
                            <p>h2</p>
                            <p>h2</p>
                            <p>h2</p>
                            <p>h2</p>
                            <p>h2</p>
                            <p>h2</p> */}}
                        </div>
                    </div>
                </div>

                <div className="video">
                    {{showAd && !adClicked && (
                        <button className="ad-overlay" onClick={{handleStartVideoClick}}></button>
                    )}}
                    {{currentUrlIndex !== null && (
                        <iframe width="100%" height="100%" src={{icons[currentUrlIndex].url}} scrolling="no" frameborder="0" allowtransparency="true" allowfullscreen="true"
                        style={{{{border:"none", overflow:"hidden"}}}}
                        ></iframe>                    )}}
                </div>

                <div className="video-right">
                    <div className="vide-right-ads">
                        {{/* <p>h2</p>
                            <p>h2</p>
                            <p>h2</p>
                            <p>h2</p>
                            <p>h2</p>
                            <p>h2</p>
                            <p>h2</p> */}}
                    </div>
                </div>
            </div>
        </div>
        <div className='tittled'>
            <a href="#shows" onClick={{() => toggleSection('shows')}}><span>Episode</span></a>
            {{/* <a href="#cast" onClick={{() => toggleSection('cast')}}><span>Cast</span></a> */}}
            <a href="#summary" onClick={{() => toggleSection('summary')}}><span>Summary</span></a>
            <span>
                <button onClick={{handleFollow}} className="followd">
                    {{isFollowing ?
                    <span style={{{{marginRight:'6px'}}}}>
                        <i className="fa-solid fa-heart" style={{{{color:'red', marginLeft:'-1rem'}}}}></i> Love
                    </span>
                    :
                    <span>
                        <i className="fa-regular fa-heart" ></i> Like
                    </span>
                    }}
                    {{isFollowing ? <span style={{{{margin: '-5px 0px', marginRight:'5px'}}}}>{{followerCount}}</span> : null}}
                </button>
            </span>
        </div>

        <div className="section" id="shows">
            <div className="episode-video">
                <div className="nav-epdisode">
                    <div className="icon-container">
                        <div style={{{{ display: 'flex', flexWrap: 'wrap' }}}}>
                        {{icons.map((icon, index) => (
    <div key={{index}} style={{{{ margin: '4px' }}}}>
        {{isInputVisible && index === icons.length - 1 && ( // Only show input for the last added icon
            <input
                type="text"
                value={{icon.url}}
                onChange={{(e) => handleUrlChange(index, e.target.value)}}
                onKeyDown={{handleEnter}}
                style={{{{ width: '100%', boxSizing: 'border-box' }}}}
            />
        )}}
        <div
            className={{`icon ${{selectedIndex === index ? 'selected' : ''}}`}}
            onClick={{() => handleIconClick(index)}}
        >
            {{index + 1}}
        </div>
        {{user && user.is_admin &&(

            <button onClick={{() => handleDeleteIcon(index)}}>Delete</button>
        )}}
    </div>
))}}
<div style={{{{ margin: '5px' }}}}>
    {{user && user.is_admin &&(

        <>
            <button onClick={{() => {{ handleAddIcon(); setInputVisible(true); }}}}>Add Icon</button>
            <button id="saveButton" onClick={{(e) => {{ handleEnter(e); saveToMongoDB(icons, userName); setInputVisible(false); }}}}>Save</button>
        </>
    )}}
</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="section" id="cast">
            <div className="shows">
                <div className="shows-container">
                    <p> <span style={{{{fontSize:'16px', color:'rgb(13, 104, 241)'}}}}>{{'▶'}}</span>Cast: </p>
                </div>
                {{user && user.is_admin &&(

                    <>
                        <button onClick={{handleAddImage}}>Add Image</button>
                        <button id="saveButton" onClick={{(e) => {{ handleEnter(e); saveToMongoDB(imageData, userName2); }}}}>Save</button>
                    </>
                )}}
                <div className="news">
                    {{imageData.map((info, index) => (
                        <div key={{index}} className="image-container">
                            <a href={{info.url}} target="_blank" rel="noopener noreferrer">
                                <img src={{info.img}} alt={{`Image ${{index}}`}} />
                            </a>
                            {{user && user.is_admin ?(

                                (isInputVisible && (
                                    <div>
                                        <input
                                            type="text"
                                            value={{info.title}}
                                            onKeyDown={{handleEnter}}
                                            onChange={{(e) => handleImageDataChange(index, 'title', e.target.value)}}
                                            placeholder="Enter new title"
                                        />
                                        <input
                                            type="text"
                                            value={{info.url}}
                                            onKeyDown={{handleEnter}}
                                            onChange={{(e) => handleImageDataChange(index, 'url', e.target.value)}}
                                            placeholder="Enter new URL"
                                        />
                                        <input
                                            type="text"
                                            value={{info.img}}
                                            onKeyDown={{handleEnter}}
                                            onChange={{(e) => handleImageDataChange(index, 'img', e.target.value)}}
                                            placeholder="Enter new image URL"
                                        />
                                        <button onClick={{() => handleDeleteImage(index)}}>Delete</button>
                                    </div>
                                ))) : (
                                    // User view
                                    <div>
                                        <p className="image-title">{{info.title}}</p>
                                        <p>{{info.url}}</p>
                                    </div>
                                )
                            }}
                        </div>
                    ))}}
                </div>
            </div>
        </div>
        <div className="section" id="summary">
            <div className="summary-main">
                    <div className="summary-nav">
                        <div className="summary-first">
                            <img src="{img}" alt=""
                             style={{{{width:"230px", height:"230px"}}}}/>
                        </div>
   
                        <div className="summary-second">
                                <p>Detail:</p>
                                <p> {summarytext}</p>
                        </div>
                    </div>
            </div>
             <div className="summary-seconds">
                        <p>Summary:</p>
                                <p> {fulldetail}</p>
                    </div>
        </div>
        {{isVisible && (
            <div className="outside-drama-ads">
                <div className="drama-bottom-ads">
                </div>
                <span className="close-btn" onClick={{handleClose}}>X</span>
            </div>
        )}}
    </div>
);
}};

                
            
            export default {title_chinese_url.replace(' ', '')};
            """
            )
        
        # Modify App.js to include import statement for the newly created file
        app_js_path = r'C:\Users\acquy\OneDrive\blog-web\blog\client\src\App.js'
        with open(app_js_path, 'r') as app_js_file:
            lines = app_js_file.readlines()
        
        # Find the line number of the closing tag </Routes>
        route_index = [i for i, line in enumerate(lines) if '</Routes>' in line][0]

        # Insert the import statement for the newly created file at the top of the file
        lines.insert(0, f"import Movie_{title_chinese_url.replace(' ', '')} from './components/Movie/{title_chinese_url}';\n")

        # Insert the Route component just before the closing tag </Routes>
        lines.insert(route_index, f'          <Route path="/Movie/{title_chinese_url}/:pageId" element={{<Movie_{title_chinese_url.replace(" ", "")} />}} />\n')

        # Write the modified content back to the file
        with open(app_js_path, 'w') as app_js_file:
            app_js_file.writelines(lines)

        return jsonify({'message': 'JavaScript file created successfully', 'jsFileName': f"{title_chinese_url}.js"}), 200
    
   
    



    elif title_korean_url and title:
        # Create a new JavaScript file with the name in the specified directory
        file_path = os.path.join(directory_anime, f'{title_korean_url}.js')
        with open(file_path, 'w', encoding='utf-8') as file:
            # Write JSX content to the new file
           file.write(
                f"""
                
                import React, {{ useState, useEffect }} from 'react';
                import '../../styles/Drama.css';
                import '@fortawesome/fontawesome-free/css/all.css';
                import Editable from '../Editable';
                import axios from 'axios';
                import {{ useParams }} from 'react-router-dom';
                import {{ useLocation }} from 'react-router-dom';
                const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';


                function {title_korean_url.replace(' ', '')}() {{
                    const {{ pageId }} = useParams(); // Get the pageId from the route parameter

    const [isFollowing, setIsFollowing] = useState(false);
    const [followerCount, setFollowerCount] = useState(0);

    useEffect(() => {{
        fetchFollowerCount();
    }}, [pageId]);

    const fetchFollowerCount = async () => {{
        try {{
            const response = await axios.get(`${{API_BASE_URL}}/api/follower-count/${{pageId}}`);
            const {{ followerCount, isFollowing }} = response.data;
            setFollowerCount(followerCount);
            setIsFollowing(isFollowing);
        }} catch (error) {{
            console.error('Error fetching follower count:', error);
        }}
    }};

    const handleFollow = async () => {{
        try {{
            const response = await axios.post(`${{API_BASE_URL}}/api/follow/${{pageId}}`);
            const {{ followerCount, isFollowing }} = response.data;
            setFollowerCount(followerCount);
            setIsFollowing(isFollowing);
        }} catch (error) {{
            console.error('Error following:', error);
        }}
    }};

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [birthdated, setBirthdate] = useState('1986-09-26'); // Set initial birthdate


    const toggleDropdown = () => {{
        setIsDropdownOpen(!isDropdownOpen);
    }};
    const shareOptions = ['Copy Link', 'Facebook', 'Twitter', 'Messenger'];


    const today = new Date();
    const uploadDate = new Date('{date}'); // '2024-04-02' represents April 2, 2024

    const timeDifference = Math.abs(today.getTime() - uploadDate.getTime());
    const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

        // Define state variable for admin status

        const [showAd, setShowAd] = useState(true); // Initially show the ad
        const [adClicked, setAdClicked] = useState(false);
        const handleStartVideoClick = () => {{
            // Open the ad in a new tab
            window.open("https://example.com", "_blank");
            // Hide the ad
            setShowAd(false);
            setAdClicked(true);
            // Set timeout to show the ad again after 5 minutes
            setTimeout(() => {{
                setShowAd(true);
                setAdClicked(false);
            }}, 300000); // 5 minutes in milliseconds
        }};







        const [isInputVisible, setInputVisible] = useState(false);
        const [isAdmin, setIsAdmin] = useState(false);
        const [currentUrlIndex, setCurrentUrlIndex] = useState(0); // Initialize with default index

        useEffect(() => {{
            const userIsAdmin = checkIfUserIsAdmin();
            setIsAdmin(userIsAdmin);
        }}, []);

        const checkIfUserIsAdmin = () => {{
            // Example: Replace this logic with your actual admin check logic
            // For simplicity, returning true always in this example
            return true; // Return true if user is admin, false otherwise
        }};

                        const [icons, setIcons] = useState(() => {{
            const storedIcons = localStorage.getItem('{title_korean_url}_icons');
            return storedIcons ? JSON.parse(storedIcons) : [
               {{ url: "{ep1}"}},
                {{ url: "{ep2}"}},
                {{ url: "{ep3}"}},

            ];
            }});


    useEffect(() => {{
        const storedIcons = localStorage.getItem('{title_korean_url}_icons');
        if (storedIcons) {{
            setIcons(JSON.parse(storedIcons));
        }}
    }}, []);


    useEffect(() => {{
        // Save icons state to localStorage whenever it changes
        localStorage.setItem('{title_korean_url}_icons', JSON.stringify(icons));
    }}, [icons]);

    const handleAddIcon = () => {{
        const newIcon = {{ url: "" }};
        setIcons([...icons, newIcon]);
    }};

    const handleDeleteIcon = (index) => {{
        const newIcons = [...icons];
        newIcons.splice(index, 1);
        setIcons(newIcons);
    }};

    const handleUrlChange = (index, value) => {{
        const newIcons = [...icons];
        newIcons[index].url = value;
        setIcons(newIcons);
    }};

    const saveToMongoDB = async (icons, pageId) => {{
                try {{
                    const urls = icons.map(icon => icon.url); // Extract urls from icons
                    const response = await fetch(`${{API_BASE_URL}}/api/korenaMovie/${{pageId}}`, {{    
                        method: 'POST',
                        headers: {{
                            'Content-Type': 'application/json'
                        }},
                        body: JSON.stringify({{ urls }}), // Pass urls to the backend
                    }});

                    const responseData = await response.json();
                    console.log(responseData);
            
                    const debugInfo = document.getElementById('debug-info');
                    debugInfo.innerHTML = `Page ID: ${{pageId}}<br />Saved Data: ${{JSON.stringify(urls)}}`;
            
                    console.log('Data saved successfully to MongoDB');
                }} catch (error) {{
                    console.error('Error saving data to MongoDB:', error);
                }}
            }};



        const location = useLocation();
        useEffect(() => {{
            const hash = location.hash;
            if (hash) {{
                toggleSection(hash.substring(1));
            }} else {{
                toggleSection('shows');
            }}
        }}, [location]);



        function toggleSection(sectionId) {{
            const sections = document.querySelectorAll('.section');
            sections.forEach(section => {{
                section.style.display = section.id === sectionId ? 'block' : 'none';
            }});
        }}




 







        const handleEnter = (e) => {{
            if (e.key === 'Enter' || e.target.id === 'saveButton') {{
                setInputVisible(false);
            }}
        }};



        






        // Function to handle clicking on an icon
        const handleIconClick = (index) => {{
            setCurrentUrlIndex(index);
            setSelectedIndex(index);
        }};



        const userName = '{title_korean_url}-epdisode';
        const userName2 = '{title_korean_url}-image';





    const [isVisible, setIsVisible] = useState(true);

    const handleClose = () => {{
        setIsVisible(false);
        setTimeout(() => {{
          setIsVisible(true);
        }}, 20 * 60 * 1000); // 30 minutes in milliseconds
      }};



                    const [imageData, setImageData] = useState(() => {{
                    const storedImageData = localStorage.getItem('{title_korean_url}-image');
                    return storedImageData ? JSON.parse(storedImageData) : [
                        {{ url: "{show_url1}",
                          title: "{show_title1}",
                            img: "{imageshow_url1}" }},
                        {{ url: "{show_url2}",
                          title: "{show_title2}",
                            img: "{imageshow_url2}" }},
                        {{ url: "{show_url3}",
                          title: "{show_title3}",
                            img: "{imageshow_url3}" }},
                        {{ url: "{show_url4}",
                          title: "{show_title4}",
                            img: "{imageshow_url4}" }},
                        {{ url: "{show_url5}",
                          title: "{show_title5}",
                            img: "{imageshow_url5}" }},
                        ];
                }});
                
                    useEffect(() => {{
                    const storedImageData = localStorage.getItem('{title_korean_url}-image');
                    if (storedImageData) {{
                        setImageData(JSON.parse(storedImageData));
                    }}
                }}, []);

                useEffect(() => {{
                    // Save icons state to localStorage whenever it changes
                    localStorage.setItem('{title_korean_url}-image', JSON.stringify(imageData));
                }}, [imageData]);

                const handleImageDataChange = (index, field, value) => {{
                    const updatedImageData = [...imageData];
                    updatedImageData[index][field] = value;
                    setImageData(updatedImageData);
                }};

                const handleAddImage = () => {{
                    const userName2 = 'Leo_DN';

                    setImageData([{{ url: "", title: "", img: "", userName2 }}, ...imageData]);
                    setInputVisible(true);

                }};

                const handleDeleteImage = (index) => {{
                    const updatedImageData = imageData.filter((_, i) => i !== index);
                    setImageData(updatedImageData);
                }};

                const [selectedIndex, setSelectedIndex] = useState(null);

                // const handleIconClickd = (index) => {{
                //     setSelectedIndex(index);
                // }};

                const [user, setUser] = useState({{
                    name: '', // Initialize name as empty string
                    email: '',
                    is_admin: false,

                    // Add more fields as needed
                }});

                // Define fetchUserData function
                const fetchUserData = async () => {{
                    try {{
                    const loggedInUserEmail = sessionStorage.getItem('loggedInUserEmail') || localStorage.getItem('loggedInUserEmail');
                    console.log('Logged In User Email:', loggedInUserEmail);

                    const sessionToken = sessionStorage.getItem('sessionToken') || localStorage.getItem('sessionToken');
                    console.log('Session Token:', sessionToken);

                    if (!loggedInUserEmail || !sessionToken) {{
                    setUser(null);
                    console.log('User not logged in. Clearing user state.');
                    return;
                    }}


                    const response = await fetch(`${{API_BASE_URL}}/login?email=${{loggedInUserEmail}}`, {{
                        method: 'GET',
                        headers: {{
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${{sessionToken}}`
                        }},
                    }});

                    if (response.ok) {{
                        const userDataArray = await response.json();
                        const loggedInUser = userDataArray.find(user => user.email === loggedInUserEmail);
                        if (loggedInUser) {{
                        setUser(loggedInUser);
                        console.log('User data:', loggedInUser);
                        }} else {{
                        console.error('Logged-in user not found in response');
                        setUser(null); // Reset user state if user not found
                        }}
                    }} else {{
                        console.error('Failed to fetch user data');
                        setUser(null); // Reset user state if fetch failed
                    }}
                    }} catch (error) {{
                    console.error('Error occurred while fetching user data:', error);
                    setUser(null);
                    }}
                }};


                useEffect(() => {{
                    fetchUserData();
                }}, []);
                    

                     const [lastIdData, setLastIdData] = useState(null);     

                    // Function to fetch id_data values and update state
                    const fetchLastIdData = async () => {{
                        try {{
                            const response = await axios.get(`${{API_BASE_URL}}/api/kd/id_data`);
                            const idDataList = response.data;
                            if (idDataList.length > 0) {{
                                setLastIdData(idDataList[idDataList.length - 1]);
                            }}
                        }} catch (error) {{
                            console.error('Error fetching id_data:', error);
                        }}
                    }};

                    useEffect(() => {{
                        // Fetch the last id_data value when component mounts
                        fetchLastIdData();
                    }}, []);

                    // Another function that uses the id_data value
                    const anotherFunction = (id_data) => {{
                        // Convert id_data to a string enclosed within double quotes
                        const Id_data = `"${{String(id_data)}}"`;
                        console.log(Id_data);

                        // Your function logic here...
                    }};

                    // Call anotherFunction automatically when lastIdData changes
                    useEffect(() => {{
                        if (lastIdData !== null) {{
                            anotherFunction(lastIdData);
                        }}
                    }}, [lastIdData]);

const [searchTitle, setSearchTitle] = useState('');
                    const [searchResult, setSearchResult] = useState(null);
                    const [editedTitle, setEditedTitle] = useState('');
                    const [editeddate, setEditeddate] = useState('');
                    const [editedepisode, setEditepisode] = useState('');

                    const [error, setError] = useState('');

                    const handleSearch = async () => {{
                        try {{
                            const response = await axios.get(`${{API_BASE_URL}}/api/kd?title=${{searchTitle}}`);
                            setSearchResult(response.data);
                            setEditedTitle(response.data.title); // Initialize editedTitle with the retrieved title
                            setEditeddate(response.data.date); // Initialize editedTitle with the retrieved title
                            setEditepisode(response.data.episode); // Initialize editedTitle with the retrieved title

                            setError('');
                        }} catch (error) {{
                            if (error.response && error.response.data) {{
                                setError(error.response.data.error);
                            }} else {{
                                setError('Failed to search for Korean drama.');
                            }}
                            setSearchResult(null);
                        }}
                    }};

                    const handleEditTitleChange = (e) => {{
                        setEditedTitle(e.target.value);
                    }};
                    const handleEditdate = (e) => {{
                        setEditeddate(e.target.value);
                    }};
                     const handleEditepisode = (e) => {{
                        setEditepisode(e.target.value);
                    }};

                    const handleUpdateTitle = async () => {{
                        try {{
                            // Assuming `searchResult.id_data` contains the correct `id_data` value
                            const response = await axios.put(`${{API_BASE_URL}}/api/kd/${{searchResult.id_data}}`, {{
                                title: editedTitle.trim(), // Trim any leading or trailing whitespace
                                date: editeddate.trim(), // Trim any leading or trailing whitespace
                                episode: editedepisode.trim()

                            }});
                            alert(response.data.message); // Display success message
                        }} catch (error) {{
                            console.error('Failed to update title:', error);
                            alert('Failed to update title. Please try again.'); // Display error message
                        }}
                    }};



                    // Call handleSearch when the component mounts or searchTitle changes
                    useEffect(() => {{
                        if (searchTitle) {{
                            handleSearch();
                        }}
                    }}, [searchTitle]);

                    console.log("searchResult", searchResult)

                    

  return (
    <div className="profile-container-headerd">
        <div className="profile-containerd">
            <div className="profile-containerd-korean">
                <div className='korean-title'>
                    <i className="fa-solid fa-film"> </i> <span> {title}</span>
                    <div className="border-test">
                        <p>
                            <span style={{{{fontSize:"15px"}}}}>Genre:{genres}</span>

                            <span>{{daysDifference}} days ago</span>
                        </p>
                        {{user && user.is_admin &&(
                        
                        <div>
                            {{/* Your JSX code here */}}
                            {{/* Input field for searching Korean dramas by title */}}
                            <input type="text" value={{searchTitle}} onChange={{(e) => setSearchTitle(e.target.value)}} />
                            <button onClick={{handleSearch}}>Search</button>
                            {{error && <p>{{error}}</p>}}
                            {{searchResult && (
                                <div>
                                    {{/* Input field for editing the title */}}
                                    <input type="text" value={{editedTitle}} onChange={{handleEditTitleChange}} />
                                    <input type="date" value={{editeddate}} onChange={{handleEditdate}} />
                                    <input type="text" value={{editedepisode}} onChange={{handleEditepisode}} />

                                    <button onClick={{handleUpdateTitle}}>Update Title</button>
                                </div>
                            )}}
                        </div>
                        )}}
                    </div>
                </div>
            </div>
            <div className="profile-borderd">
                <div className="video-left">
                    <div className="vide-left-ads">
                        <div>
                           {{/* <p>h2</p>
                            <p>h2</p>
                            <p>h2</p>
                            <p>h2</p>
                            <p>h2</p>
                            <p>h2</p>
                            <p>h2</p> */}}
                        </div>
                    </div>
                </div>

                <div className="video">
                    {{showAd && !adClicked && (
                        <button className="ad-overlay" onClick={{handleStartVideoClick}}></button>
                    )}}
                    {{currentUrlIndex !== null && (
                        <iframe width="100%" height="100%" src={{icons[currentUrlIndex].url}} scrolling="no" frameborder="0" allowtransparency="true" allowfullscreen="true"
                        style={{{{border:"none", overflow:"hidden"}}}}
                        ></iframe>
                    )}}
                </div>

                <div className="video-right">
                    <div className="vide-right-ads">
                        {{/* <p>h2</p>
                            <p>h2</p>
                            <p>h2</p>
                            <p>h2</p>
                            <p>h2</p>
                            <p>h2</p>
                            <p>h2</p> */}}
                    </div>
                </div>
            </div>
        </div>
        <div className='tittled'>
            <a href="#shows" onClick={{() => toggleSection('shows')}}><span>Episode</span></a>
            {{/* <a href="#cast" onClick={{() => toggleSection('cast')}}><span>Cast</span></a> */}}
            <a href="#summary" onClick={{() => toggleSection('summary')}}><span>Summary</span></a>
            <span>
                <button onClick={{handleFollow}} className="followd">
                    {{isFollowing ?
                    <span style={{{{marginRight:'6px'}}}}>
                        <i className="fa-solid fa-heart" style={{{{color:'red', marginLeft:'-1rem'}}}}></i> Love
                    </span>
                    :
                    <span>
                        <i className="fa-regular fa-heart" ></i> Like
                    </span>
                    }}
                    {{isFollowing ? <span style={{{{margin: '-5px 0px', marginRight:'5px'}}}}>{{followerCount}}</span> : null}}
                </button>
            </span>
        </div>

        <div className="section" id="shows">
            <div className="episode-video">
                <div className="nav-epdisode">
                    <div className="icon-container">
                        <div style={{{{ display: 'flex', flexWrap: 'wrap' }}}}>
                        {{icons.map((icon, index) => (
    <div key={{index}} style={{{{ margin: '4px' }}}}>
        {{isInputVisible && index === icons.length - 1 && ( // Only show input for the last added icon
            <input
                type="text"
                value={{icon.url}}
                onChange={{(e) => handleUrlChange(index, e.target.value)}}
                onKeyDown={{handleEnter}}
                style={{{{ width: '100%', boxSizing: 'border-box' }}}}
            />
        )}}
        <div
            className={{`icon ${{selectedIndex === index ? 'selected' : ''}}`}}
            onClick={{() => handleIconClick(index)}}
        >
            {{index + 1}}
        </div>
        {{user && user.is_admin &&(

            <button onClick={{() => handleDeleteIcon(index)}}>Delete</button>
        )}}
    </div>
))}}
<div style={{{{ margin: '5px' }}}}>
    {{user && user.is_admin &&(

        <>
            <button onClick={{() => {{ handleAddIcon(); setInputVisible(true); }}}}>Add Icon</button>
            <button id="saveButton" onClick={{(e) => {{ handleEnter(e); saveToMongoDB(icons, userName); setInputVisible(false); }}}}>Save</button>
        </>
    )}}
</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="section" id="cast">
            <div className="shows">
                <div className="shows-container">
                    <p> <span style={{{{fontSize:'16px', color:'rgb(13, 104, 241)'}}}}>{{'▶'}}</span>Cast: </p>
                </div>
                {{user && user.is_admin &&(

                    <>
                        <button onClick={{handleAddImage}}>Add Image</button>
                        <button id="saveButton" onClick={{(e) => {{ handleEnter(e); saveToMongoDB(imageData, userName2); }}}}>Save</button>
                    </>
                )}}
                <div className="news">
                    {{imageData.map((info, index) => (
                        <div key={{index}} className="image-container">
                            <a href={{info.url}} target="_blank" rel="noopener noreferrer">
                                <img src={{info.img}} alt={{`Image ${{index}}`}} />
                            </a>
                            {{user && user.is_admin ?(

                                (isInputVisible && (
                                    <div>
                                        <input
                                            type="text"
                                            value={{info.title}}
                                            onKeyDown={{handleEnter}}
                                            onChange={{(e) => handleImageDataChange(index, 'title', e.target.value)}}
                                            placeholder="Enter new title"
                                        />
                                        <input
                                            type="text"
                                            value={{info.url}}
                                            onKeyDown={{handleEnter}}
                                            onChange={{(e) => handleImageDataChange(index, 'url', e.target.value)}}
                                            placeholder="Enter new URL"
                                        />
                                        <input
                                            type="text"
                                            value={{info.img}}
                                            onKeyDown={{handleEnter}}
                                            onChange={{(e) => handleImageDataChange(index, 'img', e.target.value)}}
                                            placeholder="Enter new image URL"
                                        />
                                        <button onClick={{() => handleDeleteImage(index)}}>Delete</button>
                                    </div>
                                ))) : (
                                    // User view
                                    <div>
                                        <p className="image-title">{{info.title}}</p>
                                    </div>
                                )
                            }}
                        </div>
                    ))}}
                </div>
            </div>
        </div>
        <div className="section" id="summary">
            <div className="summary-main">
                    <div className="summary-nav">
                        <div className="summary-first">
                            <img src="{img}" alt=""
                             style={{{{width:"230px", height:"230px"}}}}/>
                        </div>
   
                        <div className="summary-second">
                                <p>Detail:</p>
                                <p> {summarytext}</p>
                        </div>
                    </div>
            </div>
             <div className="summary-seconds">
                        <p>Summary:</p>
                                <p> {fulldetail}</p>
                    </div>
        </div>

        {{isVisible && (
            <div className="outside-drama-ads">
                <div className="drama-bottom-ads">
                </div>
                <span className="close-btn" onClick={{handleClose}}>X</span>
            </div>
        )}}
    </div>
);
}};


                
            
            export default {title_korean_url.replace(' ', '')};
            """
            )
        
        # Modify App.js to include import statement for the newly created file
        app_js_path = r'C:\Users\acquy\OneDrive\blog-web\blog\client\src\App.js'
        with open(app_js_path, 'r') as app_js_file:
            lines = app_js_file.readlines()
        
        # Find the line number of the closing tag </Routes>
        route_index = [i for i, line in enumerate(lines) if '</Routes>' in line][0]

        # Insert the import statement for the newly created file at the top of the file
        lines.insert(0, f"import Anime_{title_korean_url.replace(' ', '')} from './components/Anime/{title_korean_url}';\n")

        # Insert the Route component just before the closing tag </Routes>
        lines.insert(route_index, f'          <Route path="/Anime/{title_korean_url}/:pageId" element={{<Anime_{title_korean_url.replace(" ", "")} />}} />\n')

        # Write the modified content back to the file
        with open(app_js_path, 'w') as app_js_file:
            app_js_file.writelines(lines)

        return jsonify({'message': 'JavaScript file created successfully', 'jsFileName': f"{title_korean_url}.js"}), 200
    else:
        return jsonify({'error': 'Name or image URL not provided in form data'}), 400











@app.route('/test', methods=['POST'])
def test_endpoint():
    return 'Test endpoint works!', 200


if __name__ == '__main__':
    app.run(debug=True)
