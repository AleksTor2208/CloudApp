import React from 'react';

const FileUploadInput = ({ files, error, onChange, removeFile }) => {
    const styles = {
        fontFamily: 'sans-serif',
        textAlign: 'center',
        display: 'flex',
    };
    return (
        <React.Fragment>
            <div style={styles}>
                <label className="custom-file-upload">
                    <input type="file" multiple onChange={onChange} />
                    <i className="fa fa-cloud-upload" /> Attach
                </label>
                {files.map(x =>
                    <div className="file-preview" key={x._id} onClick={removeFile.bind(this, x)}>{x.title}</div>
                )}
                {error && <div className="alert alert-danger">{error}</div>}
            </div>
        </React.Fragment>
    );
}

export default FileUploadInput;

