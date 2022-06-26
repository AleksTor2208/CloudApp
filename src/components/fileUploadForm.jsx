import React, { Component } from 'react';
import Form from './common/form';
import Joi from 'joi-browser';
import { saveFile } from '../services/fakeCloudService';
import FileUploadInput from './common/fileUploadInput';
import formatsConfig from '../acceptedFormats.json';
import { toast } from 'react-toastify';

class FileUploadForm extends Form {
    state = {
        files: [],
        errors: {},
        maxFilesCount: 10,
        uploadDisabled: true
    }
    schema = {}

    doSubmit = () => {
        // Call the server 
        console.log("Submitted");
        toast.success("File added successfully.");

        saveFile(this.state.files[0]);

        this.props.history.push("/cloud");
        this.setState({ uploadDisabled: true });
    }

    handleChange = (e) => {
        const files = e.target.files;
        const filesArr = [...files];

        let isValidInput = true;
        const errors = { ...this.state.errors };

        for (let file of filesArr) {
            let errorMessage = this.validate(file);
            if (errorMessage) {
                Object.assign(errors, errorMessage);
                isValidInput = false;

                //one error is enough to be displayed on UI         
                break;
            }
        }
        if (!isValidInput) {
            console.log("there are some errors: ", errors);
            this.setState({ errors })
            return;
        }
        this.setState({
            errors: {},
            uploadDisabled: false,
            files: [...filesArr.map(f => this.mapToViewModel(f), ...this.state.files)]
        });
    };

    mapToViewModel(file) {
        return {
            _id: Date.now().toString(),
            checked: false,
            title: file.name,
            extension: file.name.split('.').pop(),
            fileSize: file.size,
            modifiedDate: Date.now().toString()
        }
    }

    validate = ({ name: filename, size }) => {
        //const errors = { ...this.state.errors }

        if (!filename) {
            //errors["Name"] = "File name is empty.";
            return { "Name error": "File name is empty." };
        }
        else if (!size || size === 0) {
            //errors["File Size"] = "File size is empty.";
            return { "FileSize error": "File size is empty." };
        }
        const fileExt = filename.split('.').pop();

        let isValidFormat = false;
        for (let index in formatsConfig.allFormats) {
            for (let format in formatsConfig.allFormats[index]) {
                let extensions = formatsConfig.allFormats[index][format];
                if (extensions.some(e => e == fileExt)) {
                    isValidFormat = true;
                }
            }
        }
        if (!isValidFormat) {
            return { "File type error": "File type '" + fileExt + "' is invalid." };
        }
        // return null, which means no errors
        return null;
    }

    removeFile(f) {
        //todo: to fix
        //this.setState({ files: this.state.files.filter(x => x !== f) });
    }

    render() {
        const { files, errors, uploadDisabled } = this.state
        const errorKey = Object.keys(errors)[0];

        return (
            <div className="file-input-form-parent-div">
                <form className="file-input-form" onSubmit={this.handleSubmit}>
                    <h4>Choose file:</h4>
                    <FileUploadInput
                        files={files}
                        error={errors[errorKey]}
                        onChange={this.handleChange}
                        removeFile={this.removeFile}
                    />
                    {this.renderFileUploadButton("Upload", uploadDisabled)}
                </form>
            </div>
        );
    }
}

export default FileUploadForm;