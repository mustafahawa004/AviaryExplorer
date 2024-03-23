from flask import Flask, request, jsonify
from inference_sdk import InferenceHTTPClient

app = Flask(__name__)

# Initialize the InferenceHTTPClient
CLIENT = InferenceHTTPClient(
    api_url="https://detect.roboflow.com",
    api_key="YOUR_ROBOFLOW_API_KEY"
)

@app.route('/infer', methods=['POST'])
def infer():
    # Get the image URL from the request
    image_url = request.json.get('image_url')

    # Perform inference
    model_id = "animal-detection-68jio/1"
    result = CLIENT.infer(image_url, model_id)

    # Return the inference result as JSON response
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)