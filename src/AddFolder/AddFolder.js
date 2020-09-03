import React, { Component }  from 'react';
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';
import ApiContext from '../ApiContext';
import config from '../config';

export default function AddFolder (props) {
    // constructor(props) {
    //     super(props);
    //     nameInput = React.createRef();
    // };

    const handleSubmit = event => {
        event.preventDefault()
        const folder = {name: event.target.val()}

        fetch(`${config.API_ENDPOINT}/folders`, {
            method: 'POST',
            header: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(folder),
        })
    }

    AddFolder.prototype = {
        folder: PropTypes.string.isRequired,
    }

    return (
        <ApiContext.Consumer>
            {context => {
                // console.log(context);
                console.log('add folder is running')
                return (
                    <>
                    <form className="form-submission" 
                    onSubmit= {e => console.log('the form has been submitted',handleSubmit)}>
                        <label htmlFor="folderName">Folder Name:
                        <input 
                        type="text" 
                        id="folderName" 
                        name="folderName" 
                        onChange={e => context.handleChange(e.target.value)} 
                        value={context.value}/>
                        
                        </label>
                        <button type="submit">Submit</button>
                    </form>
                    </>
                )
                }}
        </ApiContext.Consumer>

    )

};


