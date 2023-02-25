import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../css/ModelPage.css'
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload, Checkbox, Button, Result } from 'antd';
import axios from 'axios';


const { Dragger } = Upload;

export default function TestModel(props) {

    const navigate = useNavigate()

    const model = props.model
    const uid = props.uid
    const [uploaded, setUploaded] = useState(false)
    const [files, setFiles] = useState([])
    const [consent, setConsent] = useState(false)

    const handleConsent = e => {
        setConsent(e.target.checked)
    }

    const handleAction = ({ file, onSuccess, onError }) => {
        if (file.type === 'text/csv') {
            let tmp = files
            tmp.push(file)
            setFiles(tmp)
            onSuccess("ok")
        } else {
            message.error('Please upload a .csv file!')
            onError("Wrong format!")
        }
    }

    const handleUpload = () => {
        if (files.length > 0) {
            // console.log(files)
            let formData = new FormData()
            for (let i = 0; i < files.length; i++) {
                console.log(files[i])
                if (files[i].type === 'text/csv') {
                    formData.append('files', files[i])
                } else {
                    message.error('Wrong format!')
                }

            }
            formData.append('consent', consent)

            axios({
                method: 'post',
                url: `${props.server}/api/models/test/${model.Id}/${uid}`,
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(() => {
                // onSuccess("ok")
                setFiles([])
                setUploaded(true)
            })
        } else {
            message.error('Please add files first!')
        }
    }

    const handleClear = () => {
        setFiles([])
    }

    const handleChange = e => {
        const { status, uid } = e.file;
        if (status === 'removed') {
            setFiles(curr => curr.filter(file => file.uid !== uid))
        }
        if (status !== 'uploading') {
            // console.log(e.file, e.fileList);
        }
        if (status === 'done') {
            // message.success(`${e.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            // message.error(`${e.file.name} file upload failed.`);
        }
    }

    const handleConfirm = () => {
        if (uploaded === true) {
            setUploaded(false)
        }

    }

    const handleResult = () => {
        if (uploaded === true) {
            navigate('/userinfo')
        }

    }

    const args = {
        name: 'file',
        multiple: true,
        customRequest: handleAction,
        onChange: handleChange,
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
        fileList: files
    };

    return (
        <div className='test-model-content'>
            {/* <div className={`success${uploaded ? '' : '-close'}`}>
                <div className="success-info">You have successfully uploaded your file!</div>
                <div className="confirm-btn-area">
                    <div className="confirm-btn" onClick={handleConfirm} style={{ cursor: uploaded ? 'pointer' : 'default' }}>Confirm</div>
                    <div className="result-btn" onClick={handleResult} style={{ cursor: uploaded ? 'pointer' : 'default' }}>Results</div>
                </div>
            </div> */}
            <div className={`success${uploaded ? '' : '-close'}`}>
                <Result
                    status='success' title='Successfully uploaded files!'
                    subTitle="It may take a while before we're able to show you the results. You can track the progress in your account page."
                    extra={[
                        <Button type='primary' onClick={handleConfirm}>Confirm</Button>,
                        <Button onClick={handleResult}>Go to account</Button>
                    ]}
                />
            </div>

            <div className={`data-not-saved-note${uploaded || consent ? '-close' : ''}`}>⚠️Your data will NOT be saved by any means!</div>
            <div className={`data-info${uploaded ? '-close' : ''}`}>Your data should contain 30s of PPG signals. Please see <a className='link' href={`${process.env.PUBLIC_URL}/example_files/${model.ExampleFile}`} download>this example</a>.</div>
            <div className={`file-dropbox${uploaded ? '-close' : ''}`}>
                <Dragger {...args}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">
                        Click or drag file to this area to upload
                    </p>
                    <p className="ant-upload-hint">
                        Support only for .csv files
                    </p>
                </Dragger>
                <div className={`data-saving-consent${uploaded ? '-close' : ''}`}>
                    <Checkbox onChange={handleConsent}>By checking this checkbox, you agree to give the website permission to save the data you uploaded for any legal usage, and you will have advanced access to more analysis tools we provide.</Checkbox>
                </div>
                <div className="upload-btn-area">
                    <div className="upload-btn" onClick={handleUpload}>Upload</div>
                    <div className="clear-btn" onClick={handleClear}>Clear</div>
                </div>

            </div>

        </div>
    )
}
