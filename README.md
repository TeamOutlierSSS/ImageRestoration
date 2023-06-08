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

<br>
After we install the essential components for React and Express, let's start the server.

- `server/frontend -> npm start`\
This will start both backend and frontend at the same time with the aid of the module 
**concurrently**.

## How does this work?

- TODO