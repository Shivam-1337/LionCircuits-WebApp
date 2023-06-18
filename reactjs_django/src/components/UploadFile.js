// importing required components
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Login from './Login'
import { Navigation } from './Navigation'
import Stats from './Stats'
import { Alert } from 'reactstrap';


function UploadFile() {
    // Managing different states
    const [filename, setFilename] = useState('')
    const [files, setFiles] = useState([{}])
    const [status, setstatus] = useState('')

    // Checking if user is authenticated
    const isAuthenticated = !!localStorage.getItem('token');

    // Fetching username
    let username = localStorage.getItem('user');


    // Deining API URL
    let api = 'http://127.0.0.1:8000/api'


    const saveFile = () => {
        console.log('Button clicked')
        const file_type = filename['type'];
        console.log(file_type)
        const file_name = document.querySelector('#file_name');
        const today = new Date();
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1; // Months start at 0!
        let dd = today.getDate();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        const uploadDate = yyyy + '-' + mm + '-' + dd
        console.log(uploadDate)


        // Creating form data object
        let formData = new FormData();
        // Storing data in the form
        formData.append("file_name", file_name.value)
        formData.append('uploadedBy', username)
        formData.append("file", filename)
        formData.append("file_type", file_type)
        formData.append("dateUploaded", uploadDate)

        // Defining headers
        let axiosConfig = {
            headers: {
                'Content-Type': 'multpart/form-data'
            }
        }

        console.log(formData)
        // Making a post request
        axios.post(api + '/files/', formData, axiosConfig).then(
            response => {
                console.log(response)
                setstatus('File Uploaded Successfully')
                window.location.reload();
            }
        ).catch(error => {
            setstatus('Error Uploading File')
            console.log(error)

        })
    }
    // Fetcing list of files
    const getFiles = () => {

        axios.get(api + '/files/').then(
            response => {
                //console.log(response.data)
                setFiles(response.data)
            }
        ).catch(error => {
            console.log(error)
        })
    }
    // File Download functionality
    const forceDownload = (response, title) => {
        console.log(response)
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', title + '.pdf')
        document.body.appendChild(link)
        link.click()
    }
    const downloadWithAxios = (url, title) => {
        axios({
            method: 'get',
            url,
            responseType: 'arraybuffer'
        }).then((response) => {
            forceDownload(response, title)
        }).catch((error) => console.log(error))

    }
    useEffect(() => {
        getFiles()
        console.log(files)
    }, [])
    return (
        <div className="container-fluid">
            {isAuthenticated ? (
                <div className="container-fluid">
                    <Navigation />
                    <br />
                    <div className="row">
                        <div className="col-md-4">
                            <h2 className="alert alert-success">File Upload Section</h2>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlFile1" className="float-left">Enter File Name</label>
                                    <input type="text" id='file_name' onChange={e => setFilename(e.target.files[0])} className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlFile1" className="float-left">Browse A File To Upload</label>
                                    <input type="file" onChange={e => setFilename(e.target.files[0])} className="form-control" />
                                </div>
                                <button type="button" onClick={saveFile} className="btn btn-primary float-left mt-2">Submit</button>
                                <br />
                                <br />
                                {status ? <Alert color="primary">{status}</Alert> : null}
                            </form>
                        </div>
                        <div className="col-md-8">
                            <h2 className="alert alert-secondary">List of Uploaded Files</h2>

                            <table className="table table-bordered mt-4">
                                <thead>
                                    <tr>
                                        <th scope="col">File Title</th>
                                        <th scope="col">File Type</th>
                                        <th scope="col">Date Uploaded</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {files.map(file => {
                                        return (
                                            <tr>
                                                <td><a href="" onClick={() => downloadWithAxios(file.file, file.id)}>{file.file_name}</a></td>
                                                <td>
                                                    {file.file_type}
                                                </td>
                                                <td>
                                                    {file.dateUploaded}
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <Stats />
                </div>                
                
            ) : (
                <div className='container-fluid'>
                    <h2 className="text-center alert alert-danger mt-2">User not authenticated, Please Login First</h2>
                    <Login />
                </div>
            )}
        </div>
    )
}

export default UploadFile
