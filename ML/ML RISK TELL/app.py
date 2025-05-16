from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

# Load model and label encoder
model = joblib.load("model/pregnancy_risk_model.pkl")
label_encoder = joblib.load("model/label_encoder.pkl")

# Feature mapping by trimester
TRIMESTER_PARAMS = {
    "First": [
        "Age_Risk", "History_Miscarriage", "Previous_High_Risk", "Hyperemesis",
        "Bleeding_Cramping", "Birth_Spacing_Short", "Tobacco_Alcohol", "No_ANC_by_12wks"
    ],
    "Second": [
        "Swelling", "Headaches", "Blurred_Vision", "High_BP",
        "Nutrition_Issue", "No_Fetal_Movement", "Breathlessness", "Age_Risk"
    ],
    "Third": [
        "Reduced_Movement", "Seizures", "Bleeding_Pain", "Early_Water_Break",
        "No_ANC_by_3rd_trim", "Anemia_Signs", "No_Birth_Prep", "Age_Risk"
    ]
}

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    trimester = data.get("trimester")

    if not trimester or trimester not in TRIMESTER_PARAMS:
        return jsonify({"error": "Invalid or missing trimester"}), 400

    features = TRIMESTER_PARAMS[trimester]
    input_dict = {}

    for feature in features:
        if feature == "Age_Risk":
            try:
                age = int(data.get("Age_Risk", -1))
                input_dict["Age_Risk"] = 1 if age < 18 or age >= 35 else 0
            except:
                input_dict["Age_Risk"] = -1
        else:
            val = data.get(feature)
            if val == "Yes":
                input_dict[feature] = 1
            elif val == "No":
                input_dict[feature] = 0
            else:
                input_dict[feature] = -1

    # Fill missing features with -1
    full_features = model.feature_names_in_
    input_vector = [input_dict.get(f, -1) for f in full_features]

    prediction = model.predict([input_vector])[0]
    risk_label = label_encoder.inverse_transform([prediction])[0]

    return jsonify({"risk_level": risk_label})


if __name__ == "__main__":
    app.run(debug=True)
