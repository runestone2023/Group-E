from flask import Flask, Response, request
import redis
import socket


app = Flask(__name__)
app.config['REDIS_HOST'] = "127.0.0.1"
app.config['REDIS_PORT'] = "5000"
db = redis.Redis(app)


@app.route('/')
def index():
    return "Mobility Mate"

@app.route('/stream')
def stream():
    def event_stream():
        # Replace this with your own data source or generator function
        last_command = get_last()
        yield 'data: {}\n\n'.format(last_command)
    
    return Response(event_stream(), mimetype='text/event-stream')

@app.route('/command', methods=['POST'])
def save_data():
    data = request.form['data']
    db.rpush('last command', data)
    return "Data saved successfully!"


def get_last():
    val = db.get('last command')
    if val:
        return val
    
if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0', port=5000)

