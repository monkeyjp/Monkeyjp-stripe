"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
import stripe

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

stripe.api_key = "sk_test_51QwQ7HL5pqbB2Ow0bxdp3sUe1hYM3ZP18WbczYJEzoaOoZelktYw75MLRzBI0VKnF9jNRb7jQ7WVGrGcPHm6vkR500FYsqnnUj"


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/create-payment', methods=["POST"])
def create_payment():
    response_body = {}
    try:
        data = request.json
        intent = stripe.PaymentIntent.create(
            amount=data["amount"], currency=data["currency"], automatic_payment_methods={'enabled': True})
        print(intent)
        response_body["client_secret"] = intent["client_secret"]
        return response_body, 200
    except Exception as e:
        response_body["success"] = False
        response_body["error"] = str(e)
        return response_body, 403
