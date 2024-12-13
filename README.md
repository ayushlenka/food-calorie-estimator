# food-calorie-estimator
Full-stack mobile application leveraging computer vision to estimate calories in food

# Goal
1. We need to train the Food-101 Dataset on three models: MobileNet, ResNet, and EfficientNet
2. After training the models, we will then make the application compare results from an imput(picture of food/user input of its weight) to compare the results of each model in terms of calorie and macro calculations
3. We will be using FastAPI (Python-based backend) to integrate a React Native frontend for making sure we can test the application through taking pictures of food

# Steps
1. First we need to write the PyTorch code to train the models
2. Implement FastAPI APIs to make each model callable via frontend
3. Implement basic frontend using React-Native-Image-Picker to call models and show results for comparison
 

