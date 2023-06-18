// Importing required components
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Stats() {

    const [stats, setStats] = useState('')
    // API URL
    let api = 'http://127.0.0.1:8000/file_stats/'

    // GET request to fetch file stats
    const getStats = () => {
        axios.get(api).then(
            response => {
                //console.log(response.data)
                setStats(response.data)
                console.log(stats.file_types)
            }
        ).catch(error => {
            console.log(error)
        })
    }

    useEffect(() => {
        getStats()
    }, [])

    return (
        <div className="container-fluid">
            <h2 className="alert alert-info">File Statistics</h2>
            <div className='row'>
                <div className="col-md-4">
                    <table className="table table-bordered mt-4">
                        <thead>
                            <tr className="alert alert-success">
                                <th scope="col">Total Files</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    {stats.total_files}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="col-md-4">
                    <table className="table table-bordered mt-4">
                        <thead className="alert alert-success">
                            <tr>
                                <th scope="col">File Type</th>
                                <th scope="col">File Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stats.file_types &&
                                stats.file_types.map((fileType) => (


                                    <tr>
                                        <td>
                                            {fileType.file_type}
                                        </td>
                                        <td>
                                            {fileType.total_files}
                                        </td>
                                    </tr>
                                ))}









                        </tbody>
                    </table>


                </div>
                <div className="col-md-4">
                    <table className="table table-bordered mt-4">
                        <thead className="alert alert-success">
                            <tr>
                                <th scope="col">User Name</th>
                                <th scope="col">File Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stats.users &&
                                stats.users.map((user) => (


                                    <tr>
                                        <td>
                                            {user.uploadedBy}
                                        </td>
                                        <td>
                                            {user.total_files}
                                        </td>
                                    </tr>
                                ))}









                        </tbody>
                    </table>


                </div>
            </div>
        </div>
    );
}

export default Stats;