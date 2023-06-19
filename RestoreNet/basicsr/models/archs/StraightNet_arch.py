# ------------------------------------------------------------------------
# Copyright (c) 2022 megvii-model. All Rights Reserved.
# ------------------------------------------------------------------------

'''
Simple Baselines for Image Restoration

@article{chen2022simple,
  title={Simple Baselines for Image Restoration},
  author={Chen, Liangyu and Chu, Xiaojie and Zhang, Xiangyu and Sun, Jian},
  journal={arXiv preprint arXiv:2204.04676},
  year={2022}
}
'''

import torch
import torch.nn as nn
import torch.nn.functional as F
from basicsr.models.archs.arch_util import LayerNorm2d
from basicsr.models.archs.local_arch import Local_Base
from basicsr.models.archs.NAFNet_arch import NAFNet
from basicsr.models.archs.Baseline_arch import Baseline, BaselineLocal



class StraightNet(nn.Module):

    def __init__(self, img_channel=3, width_deblur=16, middle_blk_num_deblur=1, enc_blk_nums_deblur=[], dec_blk_nums_deblur=[], \
                 dw_expand_deblur=1, ffn_expand_deblur=2, width_denoise=16, middle_blk_num_denoise=1, enc_blk_nums_denoise=[], dec_blk_nums_denoise=[],\
                      dw_expand_denoise=1, ffn_expand_denoise=2):
        super().__init__()
        self.chan = img_channel
        # Deblur Module, Frozen
        self.deblur = Baseline(img_channel=img_channel, width=width_deblur, middle_blk_num=middle_blk_num_deblur,
                      enc_blk_nums=enc_blk_nums_deblur, dec_blk_nums=dec_blk_nums_deblur, dw_expand=dw_expand_deblur, ffn_expand=ffn_expand_deblur)
        self.deblur.requires_grad_(False)

        # Denoise Module, Frozen
        self.denoise = Baseline(img_channel=img_channel, width=width_denoise, middle_blk_num=middle_blk_num_denoise,
                      enc_blk_nums=enc_blk_nums_denoise, dec_blk_nums=dec_blk_nums_denoise, dw_expand=dw_expand_denoise, ffn_expand=ffn_expand_denoise)
        self.denoise.requires_grad_(False)

        self.padder_size = 2 ** len(self.deblur.encoders)

    def forward(self, inp):
        B, C, H, W = inp.shape
        inp = self.check_image_size(inp)
        
        x = self.denoise(inp)
        x = self.deblur(x)
        return x[:, :, :H, :W]

    def check_image_size(self, x):
        _, _, h, w = x.size()
        mod_pad_h = (self.padder_size - h % self.padder_size) % self.padder_size
        mod_pad_w = (self.padder_size - w % self.padder_size) % self.padder_size
        x = F.pad(x, (0, mod_pad_w, 0, mod_pad_h))
        return x

class StraightNetLocal(Local_Base, StraightNet):
    def __init__(self, *args, train_size=(1, 3, 256, 256), fast_imp=False, **kwargs):
        Local_Base.__init__(self)
        StraightNet.__init__(self, *args, **kwargs)

        N, C, H, W = train_size
        base_size = (int(H * 1.5), int(W * 1.5))

        self.eval()
        with torch.no_grad():
            self.convert(base_size=base_size, train_size=train_size, fast_imp=fast_imp)


if __name__ == '__main__':
    img_channel = 3
    width = 32

    # enc_blks = [2, 2, 4, 8]
    # middle_blk_num = 12
    # dec_blks = [2, 2, 2, 2]

    enc_blks = [1, 1, 1, 28]
    middle_blk_num = 1
    dec_blks = [1, 1, 1, 1]
    
    net = StraightNet(img_channel=img_channel, width=width, middle_blk_num=middle_blk_num,
                      enc_blk_nums=enc_blks, dec_blk_nums=dec_blks)


    inp_shape = (3, 256, 256)

    from ptflops import get_model_complexity_info

    macs, params = get_model_complexity_info(net, inp_shape, verbose=False, print_per_layer_stat=False)

    params = float(params[:-3])
    macs = float(macs[:-4])

    print(macs, params)
    print(net)