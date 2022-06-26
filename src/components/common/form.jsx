import React, { Component } from 'react';
import Joi from 'joi-browser';
import Input from './input';
import FileUploadInput from './fileUploadInput'

class Form extends Component {
    state = {
        data: {},
        errors: {}
    };

    validate = () => {
        console.log("I'm in parent validate method");
        const options = { abortEarly: false };
        const { error } = Joi.validate(this.state.data, this.schema, options);
        if (!error) return null;

        const errors = {};
        for (let item of error.details)
            errors[item.path[0]] = item.message;
        return errors;
    };

    validateProperty = ({ name, value }) => {
        const obj = { [name]: value };
        const schema = { [name]: this.schema[name] };
        const { error } = Joi.validate(obj, schema);
        return error ? error.details[0].message : null;
    };

    handleSubmit = e => {
        e.preventDefault();
        console.log("executing handleSubmit of form class.");
        //const errors = this.validate();


        //if (errors) return;
        this.doSubmit();
    };

    handleChange = ({ currentTarget: input }) => {
        console.log("I'm in handleChange, input value is: ", input);
        const errors = { ...this.state.errors }
        const errorMessage = this.validateProperty(input);
        //input = e.currentTarget.input.name
        if (errorMessage) {
            console.log('error message has been set');
            errors[input.name] = errorMessage;
        }

        else delete errors[input.name];
        const data = { ...this.state.data };
        data[input.name] = input.value;
        this.setState({ data, errors });
    };

    renderButton = label => {
        return (

            <button className="btn btn-primary">
                {label}
            </button>
        );
    };

    renderFileUploadButton = (label, isDisabled) => {
        return (

            <button disabled={isDisabled} className="btn btn-primary">
                {label}
            </button>
        );
    };

    renderInput = (name, label, type = "text") => {
        const { data, errors } = this.state;
        return (
            <Input
                type={type}
                name={name}
                value={data[name]}
                label={label}
                error={errors[name]}
                onChange={this.handleChange}
            />
        );
    };

    renderFileUploadInput() {

        return (
            <FileUploadInput
                // type={type}
                // name={name}
                // value={data[name]}
                // label={label}
                // error={errors[name]}                
                onChange={this.handleChange}
            />
        );
    }
}

export default Form;