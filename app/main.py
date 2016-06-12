""" main  """
from flask import Flask, render_template
from flask_restful import Api
from scavenger import TwilioHandler

app = Flask(__name__)
api = Api(app)
api.add_resource(TwilioHandler, '/')


@app.route('/index')
def hello():
    """Return a friendly HTTP greeting."""
    return render_template('index.html')


@app.errorhandler(404)
def page_not_found(e):
    """Return a custom 404 error."""
    return 'Sorry, Nothing at this URL.', 404


@app.errorhandler(500)
def application_error(e):
    """Return a custom 500 error."""
    return 'Sorry, unexpected error: {}'.format(e), 500