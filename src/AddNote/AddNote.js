// import React, { Component }  from 'react';
// import ReactDOM from 'react-dom'
// import PropTypes from 'prop-types';
// import ApiContext from '../ApiContext';
// import Note from '../Note/Note';

// export default function AddNote (props) {

//     handleSubmit = event => {
//         event.preventDefault()
//         const note = {name: event.target.val()}

//         fetch(`${config.API_ENDPOINT}/folders`, {
//             method: 'POST',
//             header: {
//                 'content-type': 'application/json'
//             },
//             body: JSON.stringify(note),
//         })
//     }

//     AddNote.prototype = {
//         note: PropTypes.string.isRequired,

//     }

//     return (
//         <ApiContext.Consumer>
//             {context => {
//                 // console.log(context);
//                 console.log('add note is running')
//                 return (
//                     <>
//                     <h1>Hello</h1>
//                     <Note className="form-submission" onSubmit={e => console.log('the note has been submitted',handleSubmit)} >
//                         <label htmlFor="NoteName">Add Note Here
//                             <input type="text" id="NoteName" name="NoteName" onChange={e => context.handleChange(e.target.value)} value={context.value}></input>
//                         </label>
//                         <button tyep="submit">Submit</button>
//                     </Note>
//                     </>
//                 )
//                 }}
//         </ApiContext.Consumer>

//     )

// };


