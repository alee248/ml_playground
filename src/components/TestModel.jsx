import React, { useState } from 'react'
import '../css/ModelPage.css'
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import axios from 'axios';


const { Dragger } = Upload;

export default function TestModel(props) {

    const model = props.model
    const [uploaded, setUploaded] = useState(false)

    const handleUpload = ({ file, onSuccess, onError }) => {
        // console.log(file)

        // check format
        if (file.type === 'text/csv') {
            let formData = new FormData()
            formData.append('file', file)
            axios({
                method: 'post',
                url: `${props.server}/api/models/test/${model.Id}`,
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((res) => {
                onSuccess("ok")
                setUploaded(true)
            })
        } else {
            message.error('Please upload a .csv file!')
            onError("Wrong format!")
        }


    }

    // const handleChange = e => {
    //     const { status } = e.file;
    //     if (status !== 'uploading') {
    //         console.log(e.file, e.fileList);
    //     }
    //     if (status === 'done') {
    //         message.success(`${e.file.name} file uploaded successfully.`);
    //     } else if (status === 'error') {
    //         message.error(`${e.file.name} file upload failed.`);
    //     }
    // }

    const handleConfirm = () => {
        setUploaded(false)
    }

    const handleResult = () => {
        // TODO: handle result
    }

    const args = {
        name: 'file',
        multiple: false,
        customRequest: handleUpload,
        // onChange: handleChange,
        // onDrop(e) {
        //     console.log('Dropped files', e.dataTransfer.files);
        // },
        fileList: []
    };

    return (
        <>
            <div className={`data-not-saved-note${uploaded ? '-close' : ''}`}>⚠️Your data will NOT be saved by any means!</div>
            <div className={`file-dropbox${uploaded ? '-close' : ''}`}>
                <Dragger {...args}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">
                        Click or drag file to this area to upload
                    </p>
                    <p className="ant-upload-hint">
                        Support only for a single .csv file
                    </p>
                </Dragger>
            </div>
            <div className={`data-info${uploaded ? '-close' : ''}`}>Your data should contain 30s of PPG signals. Please see <a className='link' href={`${process.env.PUBLIC_URL}/example.csv`} download>this example</a>.</div>

            <div className={`success${uploaded ? '' : '-close'}`}>
                <div className="success-info">You have successfully uploaded your file!</div>
                <div className="confirm-btn-area">
                    <div className="confirm-btn" onClick={handleConfirm}>Confirm</div>
                    <div className="result-btn" onClick={handleResult}>Result</div>
                </div>
            </div>

        </>
    )
}
