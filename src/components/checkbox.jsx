import React, { Component } from 'react';

const CheckBox = props => {
    return (
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <div className="input-group-text">
                    <input type="checkbox" aria-label="Checkbox for following text input" />
                </div>
            </div>
        </div>
    );
}


export default CheckBox;