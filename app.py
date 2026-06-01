from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import joblib
import os
import numpy as np
import pandas as pd
import warnings

warnings.filterwarnings("ignore")

app = Flask(__name__)
CORS(app) 

# Model aur Features files ko load karna
try:
    base_path = os.path.dirname(__file__)
    model = joblib.load(os.path.join(base_path, 'model', 'attrition_model.pkl'))
    expected_features = joblib.load(os.path.join(base_path, 'model', 'features.pkl'))
    print("====================================")
    print(" ENGINE START: ML Model Successfully Loaded! ")
    print("====================================")
except Exception as e:
    print("====================================")
    print(f"❌ Error loading model files: {e}")
    print("Check kariye ki 'model' folder mein sahi files hain ya nahi.")
    print("====================================")
@app.route('/')
def home():
    return render_template('index.html')
@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        
        #  coming data from Frontend (script.js) , map of modal's variabldata
        ui_data = {
            "Age": int(data.get("Age", 0)),
            "MonthlyIncome": float(data.get("MonthlyIncome", 0)),
            "JobSatisfaction": int(data.get("JobSatisfaction", 1)),
            "TotalWorkingYears": int(data.get("TotalWorkingYears", 0)),
            "Overtime_Yes": int(data.get("Overtime_ yes", 0)) # add here frontend and backend 
        }
        
        # make Features  list acording to machine learning model's sequence 
        features_list = []
        for feature in expected_features:
            matched_value = 0 # Safe default value
            for key, val in ui_data.items():
                if key.lower().replace("_", "").strip() == feature.lower().replace("_", "").strip():
                    matched_value = val
                    break
            features_list.append(matched_value)

        final_features = np.array(features_list).reshape(1, -1)

        # Prediction lena (1 = Chala jayega, 0 = Rukega)
        prediction = model.predict(final_features)
        result = int(prediction[0])
    
        return jsonify({
            "status": "success",
            "attrition_prediction": result,
            "risk_level": "high" if result == 1 else "low",
            "message": "Risk High: Employee might leave" if result == 1 else "Risk Low: Employee will stay"
        }), 200

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500
if __name__ == '_main_':
    app.run(port=5000)
