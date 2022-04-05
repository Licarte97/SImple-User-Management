import React, { Component } from 'react'


const data = [
    { type: "input", required: false },
    { type: "label" },
    { type: "checkbox", required: false, options: ["1", "2", "3", "4"] }
]
export default class FormBuilder extends Component {
    constructor(parent) {
        super(parent);
        this.state = {

        }
    }
    render() {
        return (
            <div>FormBuilder</div>
        )
    }
}
