
import gradio as gr
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import load_img, img_to_array
import numpy as np

# Load the trained model
model_path = '/content/drive/My Drive/Preprocessed_Images/disaster_model.h5'
model = load_model(model_path)

# Define class labels
class_labels = ['Cyclone', 'Earthquake', 'Flood', 'Wildfire']

# Preprocessing function for input image
def preprocess_image(image):
    image = image.resize((150, 150))  # Resize image to model input size
    image = img_to_array(image)      # Convert to NumPy array
    image = np.expand_dims(image, axis=0)  # Add batch dimension
    image = image / 255.0           # Normalize pixel values
    return image

# Prediction function
def classify_image(image):
    processed_image = preprocess_image(image)
    prediction = model.predict(processed_image)
    class_idx = np.argmax(prediction)  # Get index of highest probability
    class_name = class_labels[class_idx]
    confidence = prediction[0][class_idx]
    return f"Prediction: {class_name}, Confidence: {confidence:.2f}"

# Create Gradio Interface
interface = gr.Interface(
    fn=classify_image,
    inputs=gr.Image(type="pil"),
    outputs="text",
    title="Disaster Classification",
    description="Upload an image of a disaster (Cyclone, Earthquake, Flood, Wildfire) to classify."
)

# Launch the Gradio app
interface.launch()
