import React, { Component } from 'react';
import { getFiles, saveFile } from '../services/fakeCloudService';
import { uploadFile } from '../services/fileUploadService';
import FilesTable from './filesTable';
import FileUploadForm from './fileUploadForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class Cloud extends Component {
    state = {
        files: [],
        currentPage: 1,
        pageSize: 4,
        sortColumn: { path: "title", order: "asc" }
    }

    componentDidMount() {
        this.setState({ files: getFiles() });
    }

    handleSort = sortColumn => {
        this.setState({ sortColumn });
    };

    handleCheck() {
        console.log('checked...');
    }

    handleDelete = file => {
        const files = this.state.files.filter(m => m._id !== file._id);
        this.setState({ files });
    };

    handleFileUpload = file => {
        saveFile(file);
    }



    render() {
        const { files, sortColumn } = this.state;
        return (
            <div className="row">
                <div className="col-6 files-list">
                    <FilesTable
                        files={files}
                        sortColumn={sortColumn}
                        onCheck={this.handleCheck}
                        onDelete={this.handleDelete}
                        onSort={this.handleSort}
                    />
                </div>
                <div className="col">
                    <ToastContainer />
                    <FileUploadForm history={this.props.history} />
                </div>
            </div>

        );
    }
}

export default Cloud;