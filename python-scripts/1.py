import sys
import numpy as np
import torch
from torch.utils.data import DataLoader
from afib_model.resnet1d import Resnet34
from afib_model.dataset import Dataset_ori

if __name__ == '__main__':

    file_path = sys.argv[1]
    model_path = 'python-scripts/afib_model/saved_models/epoch_30_ppglr_0.0001_lambda_0.9/PPG_best_1.pt'

    data = np.fromfile(file_path,  dtype=float)
    if data.ndim == 1:
        data = np.array([data])
    model = Resnet34().cpu()
    state_dict = torch.load(model_path, map_location=torch.device('cpu'))
    model.load_state_dict(state_dict)
    model.eval()
    dataset = Dataset_ori(data)
    dataLoader = DataLoader(dataset, batch_size=1, shuffle=False, num_workers=0)
    
    for batch_idx, PPG in enumerate(dataLoader):
        PPG = PPG.to('cpu').float()
        PPG_feature, PPG_out = model(PPG)
        PPG_predicted = PPG_out.argmax(1)
        PPG_predicted_prob = PPG_out[:, 1]
        print(str(PPG_predicted.detach().cpu().numpy().tolist()[0]))
        # print(PPG_predicted_prob.detach().cpu().numpy().tolist()[0])