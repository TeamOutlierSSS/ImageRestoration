## RestoreNet: Joint Image Deblur and Denoise

<br>

### Model Architecture

- Backbone: [Simple Baselines For Image Restoration](https://github.com/megvii-research/NAFNet)

<img src="../docs/model_arch.png" alt="Model Architecture" width=600>

<br>

### Training Datasets

- Used [DANet](https://github.com/zsyOAOA/DANet) to generate images with both noise and blur, as well as images with noise only, based on the blur datasets(BSD, GoPro, Realblur-J)
- Created four types of images-<i>noise, blur, blur with noise(BLNO), and groundtruth</i>-through augmentation techniques for the same scenes
- Trained with a diverse set of training datasets with various combinations

1. BSD dataset only
2. BLNO type only
3. Combining the four types of images in various ratios [BLNO:Blur:Noise:GroundTruth]
   - 13:2:2:1
   - 11:4:4:1
   - 2:1:1:1

<br>

### Training Methods

1. Load & Freeze
   - Loaded the pretrained deblur and denoise models
   - Froze the models to prevent updating their weights
2. Train
   - Trained the extra model by incorporating the weights from the pretrained models

- Proceed the additional training(only for the training dataset #2) by freezing the extra model in the back and retraining the pretrained deblur model in the front

<br>

### Implementation Detail

- Our Final Model [view](./basicsr/models/archs/RestoreNet_arch.py)
- StraightNet(for reference) [view](./basicsr/models/archs/StraightNet_arch.py)
- You can find the log files [here](../logs)
