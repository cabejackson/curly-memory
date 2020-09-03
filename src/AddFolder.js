import React, { Component }  from 'react';
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';
import ApiContext from './ApiContext';
import NotefulForm from './NotefulForm/NotefulForm';

export default function AddFolder (props) {
    // constructor(props) {
    //     super(props);
    //     nameInput = React.createRef();
    // };

    handleSubmit = e => {
        e.preventDefault()
        const folder = {name: e.target.val()}

        fetch(`${config.API_ENDPOINT}/folders`, {
            method: 'POST',
            header: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(folder),
        })
    }

    return (
        <ApiContext.Consumer>
            {context => {
                // console.log(context);
                console.log('add folder is running')
                return (
                    <>
                    <h1>Hello</h1>
                    <NotefulForm className="form-submission" onSubmit={e => console.log('the form has been submitted',handleSubmit)} >
                        <label htmlFor="folderName">
                            <input type="text" id="folderName" name="folderName" onChange={e => context.handleChange(e.target.value)} value={context.value}>Folder Name</input>
                        </label>
                        <button tyep="submit">Submit</button>
                    </NotefulForm>
                    </>
                )
                }}
        </ApiContext.Consumer>

    )

};


