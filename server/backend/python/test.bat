echo %1 %2
python basicsr/demo.py -opt options/test/RestoreNet/RestoreNet-width64.yml --input_path ./demo/%1.%2 --output_path ./demo/%1_denoise.png
