import React, { Component } from 'react';

class FileUpload extends Component {
    state = {}
    render() {
        return (
            <div className="upload-form">
                <div class="form-group" id="input_form_group">
                    <div class="custom-file">
                        <input type="file" class="custom-file-input" id="file_input" oninput="input_filename();" />
                        <label for="file_input" id="file_input_label" class="custom-file-label">Select file</label>
                    </div>
                </div>

                <button onclick={this.props.upload} id="upload_btn" class="btn btn-primary">Upload</button>
                <button class="btn btn-primary d-none" id="loading_btn" type="buton" disabled>
                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Processing files...
                </button>
            </div>
        );
    }
}

export default FileUpload;  