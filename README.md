![header](https://capsule-render.vercel.app/api?type=soft&color=auto&height=300&section=header&text=Image%20Restoration&fontSize=90)

<img src="https://img.shields.io/badge/PyTorch-EE4C2C?style=flat&logo=react&logoColor=white"/>
<img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black"/>
<img src="https://img.shields.io/badge/NodeJS-339933?style=flat&logo=nodedotjs&logoColor=white"/>
<br>
<img src="https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white"/>
<img src="https://img.shields.io/badge/Javascript-F7DF1E?style=flat&logo=javascript&logoColor=black"/>

<br>
<br>
<br>

# <img src="server/frontend/public/favicon3.svg" height=20 width=20> Introduction

### Major Challenge
- We found that there is an active research for denoising or deblurring seperately, but there are few attempts to address
  the issue of image deblurring and denoising of same image, which is common in real life.

### Main features
- Image restoration is a simple web server for image denoising/deblurring at the same time.

<br>
<br>

# Service Architecture

## How does this work?

We made it as simple as possible, so you will only need to remember three steps.

1. React frontend sends an image file to Express backend using POST.\
   For this, we use `http-proxy-middleware` to proxy between frontend and backend server.

2. Backend receives the image frontend sent, and makes the model inference using `child_process`.

3. After the inference, backend sends the name of the restored image, and frontend shows it to the client.

<br>
<br>

# Dataset

<br>
<br>

# Model Architecture

<br>
<br>

# Demo
### 0. Requirements

- A server with **CUDA** enabled
- **Node.js**

<br>

### 1. Dependencies and Installation

```
# This will install node_modules for backend
cd server/backend
npm install


# This will install node_modules for frontend
cd server/frontend
npm install


# This will install required modules for python
cd server/backend/python
pip install -r requirements.txt
# This will set basicsr modules for inference
python setup.py develop --no_cuda_ext
```

<br>

### 2. Download the pretrained weights

- You can download the pretrained weight [here](https://drive.google.com/drive/folders/1vioBTsrzYxiXOEdy4NwGCzUH--Hrn6Eg)
- You will need this pretained models for inference.
- Put these pretained models in `server/backend/python/experiments/pretrained_models`.<br>
  Make directory if you cannot find folders.

<br>

### 3. Run the server

```
cd server/frontend
npm run start
```
- This will start both backend and frontend at the same time with the aid of the module
  **concurrently**.

<br>
<br>

# Reference
## Paper
[1] L. Chen, X. Chu, X. Zhang, and J. Sun, “Simple baselines for image restoration,” 2022 ECCV : 17th European Conference, pp. 17–33, 2022. doi:10.1007/978-3-031-20071-7_2 

[2] S. W. Zamir et al., “Multi-Stage Progressive Image Restoration,” 2021 IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR), 2021. doi:10.1109/cvpr46437.2021.01458 

[3] L. Chen, X. Lu, J. Zhang, X. Chu, and C. Chen, “HINet: Half instance normalization network for image restoration,” 2021 IEEE/CVF Conference on Computer Vision and Pattern Recognition Workshops (CVPRW), 2021. doi:10.1109/cvprw53098.2021.00027 

[4] J. Liang et al., “Swinir: Image restoration using swin transformer,” 2021 IEEE/CVF International Conference on Computer Vision Workshops (ICCVW), 2021. doi:10.1109/iccvw54120.2021.00210 

[5] S. W. Zamir et al., “Restormer: Efficient Transformer for high-resolution image restoration,” 2022 IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR), 2022. doi:10.1109/cvpr52688.2022.00564 

[6] J. Rim, H. Lee, J. Won, and S. Cho, “Real-world blur dataset for learning and benchmarking Deblurring algorithms,” Computer Vision – ECCV 2020, pp. 184–201, 2020. doi:10.1007/978-3-030-58595-2_12 

[7] Y. Zhao et al., “D2HNet: Joint denoising and Deblurring with hierarchical network for robust night image restoration,” 2022 ECCV : 17th European Conference, pp. 91–110, 2022. doi:10.1007/978-3-031-20071-7_6 

[8] D. Sun, Y. Shi, and Y. Feng, “Blind deblurring and denoising via a learning deep CNN denoiser prior and an adaptive L0‐regularised gradient prior for passive millimetre‐wave images,” IET Image Processing, vol. 14, no. 17, pp. 4774–4784, 2020. doi:10.1049/iet-ipr.2020.1193 

<br>

## Code
- Image Deblur / Denoize [code](https://github.com/megvii-research/NAFNet)