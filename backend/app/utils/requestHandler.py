from flask import jsonify

# Handles API requests/returns


def handle_success(data):
    """handle success requests"""
    return jsonify(data), 200


def handle_bad_request(message):
    """handle bad requests"""
    return jsonify({'message': message}), 400


def handle_server_error(err):
    """handle server errors"""
    return jsonify({'message': str(err)}), 500


def handle_not_found():
    """handle not found error"""
    return jsonify({'message': "not found"}), 404