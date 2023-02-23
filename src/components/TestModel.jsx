import React from 'react'
import '../css/ModelPage.css'
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import axios from 'axios';

const { Dragger } = Upload;

export default function TestModel(props) {

    const model = props.model

    const handleUpload = ({file, onSuccess}) => {
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
        })
    }

    const args = {
        name: 'file',
        multiple: false,
        customRequest: handleUpload,
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    return (
        <>
            <div className="file-dropbox">
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
        </>
    )
}
