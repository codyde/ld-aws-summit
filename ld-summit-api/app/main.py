from psycopg2.extras import RealDictCursor
import psycopg2
from flask_cors import CORS
from flask import Flask,jsonify, request
import json
import ldclient
from ldclient.config import Config
import eventlet
eventlet.monkey_patch()

app = Flask(__name__)
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True

CORS(app)

LD_KEY = "sdk-2a7c1b66-11d1-4935-9d43-8ed3cbb708ee"

fallback = '{"dbinfo":"localhost","dbname":"localdb"}'

user = {
    "key": "anonymous"
}

@app.route("/health")
def get_api():
    ldclient.set_config(Config(LD_KEY))
    dbinfo = ldclient.get().variation('dbDetails', user, fallback)
    if dbinfo['mode'] == "RDS":
        stats = {
            'version': '2',
            'status': 'healthy',
            'location': 'RDS'
        }
        
    else:
        stats = {
            'version': '1',
            'status': 'healthy',
            'location': 'Local'
        }
    return jsonify(stats)

@app.route("/users", methods=["GET", "POST"])
def users():
    ldclient.set_config(Config(LD_KEY))
    user = {
        "key": "anonymous"
    }
    dbinfo = ldclient.get().variation('dbDetails', user, fallback)
    conn = psycopg2.connect(f"host={dbinfo['dbhost']} port=5432 \
            dbname={dbinfo['dbname']} user=postgres password=postgres_password \
            sslmode=disable")
    if request.method == "GET":
        cur = conn.cursor(cursor_factory=RealDictCursor)
        cur.execute('SELECT * FROM users ORDER BY id')
        ret = cur.fetchall()
        return jsonify(ret)
    if request.method == "POST":
        val = request.get_json()
        print(val)
        cur = conn.cursor()
        migrate = ldclient.get().variation('dbmigrate', user, False)
        if migrate == True:
            cur.execute("INSERT INTO users (username, location) \
                VALUES (%s,%s)", (val['username'],val['location']))
        else:
            cur.execute("INSERT INTO users (username) \
                VALUES (%s)", (val['username'],))
        conn.commit()
        cur.execute('SELECT * FROM users ORDER BY id')
        ret = cur.fetchall()
        return jsonify(ret)
   

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers',
                         'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods',
                         'GET,PUT,POST,DELETE,OPTIONS')
    return response
