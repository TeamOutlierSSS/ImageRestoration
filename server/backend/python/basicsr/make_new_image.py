# ------------------------------------------------------------------------
# Copyright (c) 2022 megvii-model. All Rights Reserved.
# ------------------------------------------------------------------------
# Modified from BasicSR (https://github.com/xinntao/BasicSR)
# Copyright 2018-2020 BasicSR Authors
# ------------------------------------------------------------------------
import torch
import argparse
import numpy as np
# from basicsr.data import create_dataloader, create_dataset
#from basicsr.models import create_model
from basicsr.utils import FileClient, imfrombytes, img2tensor, padding, tensor2img, imwrite

# from basicsr.utils import (get_env_info, get_root_logger, get_time_str,
#                            make_exp_dirs)
# from basicsr.utils.options import dict2str

def parse_options(is_train=True):
    parser = argparse.ArgumentParser()

    parser.add_argument('--input_path', type=str, required=False, help='The path to the input image. For single image inference only.')
    parser.add_argument('--input_path2', type=str, required=False, help='The path to the input image2. For restore image only.')
    parser.add_argument('--input_path3', type=str, required=False, help='The path to the input image3. For restore image only.')
    parser.add_argument('--output_path', type=str, required=False, help='The path to the output image. For single image inference only.')

    args = parser.parse_args()


    '''if args.input_path is not None and args.output_path is not None:
        args['img_path'] = {
            'input_img': args.input_path,
            'output_img': args.output_path
        }
        if args.input_path2 is not None and args.input_path3 is not None:
            args['img_path'] += {
                'input_img2': args.input_path2,
                'input_img3': args.input_path3
            }'''

    return args

def main():
    # parse options, set distributed setting, set ramdom seed
    args = parse_options(is_train=False)

    img_path = args.input_path
    img_path2 = args.input_path2
    img_path3 = args.input_path3
    output_path = args.output_path



    ## 1. read image
    file_client = FileClient('disk')
    img_bytes = file_client.get(img_path, None)
    try:
        img = imfrombytes(img_bytes, float32=True)
    except:
        raise Exception("path {} not working".format(img_path))

    img = img2tensor(img, bgr2rgb=True, float32=True)

    tensor2 = torch.load(img_path2)
    tensor3 = torch.load(img_path3)


    sr_img = tensor2img([img*1 + tensor2*1 + tensor3*1])

    imwrite(sr_img, output_path)
    print(f'inference {img_path} .. finished. saved to {output_path}')

if __name__ == '__main__':
    main()

