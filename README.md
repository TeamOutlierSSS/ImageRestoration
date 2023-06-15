# ImageRestoration

Image restoration is a simple web server for image denoising/deblurring at the same time.

We found that there is an active research for denoising or deblurring seperately, but there are few attempts to address
the issue of image deblurring and denoising of same image, which is common in real life.

## Requirements

- A server with **CUDA** enabled
- **Node.js**


## What should I do to start the server?

Let's install node_modules for both frontend and backend.

- `server/backend -> npm install`\
This will install node_modules for backend.


- `server/frontend -> npm install`\
This will install node_modules for frontend.


Then, install required module and setup for image restore model.

- `server/backend/python -> pip install -r requirements.txt`\
This will install required modules for python.


- `server/backend/python -> python setup.py develop --no_cuda_ext`\
This will set basicsr modules for inference.


- Download the pretrained weights [(Link)](https://drive.google.com/drive/folders/1vioBTsrzYxiXOEdy4NwGCzUH--Hrn6Eg)\
You will need this pretained models for inference.\
Put these pretained models in `server/backend/python/experiments/pretrained_models`.\
Make directory if you cannot find folders.

<br>
After we install the essential components for React and Express, let's start the server.

- `server/frontend -> npm start`\
This will start both backend and frontend at the same time with the aid of the module 
**concurrently**.

## How does this work?

We made it as simple as possible, so you will only need to remember three steps.

1. React frontend sends an image file to Express backend using POST.\
For this, we use `http-proxy-middleware` to proxy between frontend and backend server.


2. Backend receives the image frontend sent, and makes the model inference using `child_process`.


3. After the inference, backend sends the name of the restored image, and frontend shows it to the client.