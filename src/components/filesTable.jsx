import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Table from "./common/table";
import CheckBox from "./checkbox"

class FilesTable extends Component {
    columns = [
        {
            key: "checkBox",
            content: file => (
                <CheckBox checked={file.checked} onClick={() => this.props.onCheck(file)} />
            )
        },
        { path: "extension", label: "File Type" },
        { path: "title", label: "Title", content: file => <Link to={`/files/${file._id}`}>{file.title}</Link> },
        { path: "fileSize", label: "File Size" },
        { path: "modifiedDate", label: "Modified Date" },
        {
            key: "delete",
            content: file => (
                <button
                    onClick={() => this.props.onDelete(file)}
                    className="btn btn-danger btn-sm"
                >
                    Delete
                </button>
            )
        }
    ];
    render() {
        const { files, onSort, sortColumn } = this.props;

        return (
            <Table
                columns={this.columns}
                data={files}
                sortColumn={sortColumn}
                onSort={onSort}
            />
        );
    }
}


export default FilesTable;