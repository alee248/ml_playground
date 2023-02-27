import numpy as np
import torch

class Dataset_ori():
    def __init__(self, data):
        # self.root = root
        self.data = data
        self.dataset = self.build_dataset()
        self.length = self.dataset.shape[0]

    def __len__(self):
        return self.length

    def __getitem__(self, idx):
        step = self.dataset[idx, :]
        step = torch.unsqueeze(step, 0)
        return step

    def build_dataset(self):
        '''get dataset of signal'''

        dataset = torch.from_numpy(self.data)

        return dataset