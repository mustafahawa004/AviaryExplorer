from flask import Flask, request, jsonify
import requests
from inference_sdk import InferenceHTTPClient
from PIL import Image
from io import BytesIO

app = Flask(__name__)

CLIENT = InferenceHTTPClient(
    api_url="https://detect.roboflow.com",
    api_key="rAckvLPYRYeXA3pUbecr"
)

@app.route('/infer', methods=['POST'])
def infer_image_from_url():
    url = request.json['url']
    model_id = request.json.get('model_id', "animal-detection-68jio/1")
    response = requests.get(url)
    img = Image.open(BytesIO(response.content))
    img.save("temp.jpg")
    result = CLIENT.infer("temp.jpg", model_id=model_id)
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)