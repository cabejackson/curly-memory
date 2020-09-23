import React from "react";
import PropTypes from "prop-types";
import ApiContext from "../ApiContext";
import config from "../config";
import cuid from "cuid";
import ValidationError from "../ValidationError";

// Create a new component AddNote that implements a form
// to capture the name, content and folder for a new Note.
export default function AddNote(props) {
  // handles the note form submission
  // adds a new note to the sever
  // which appears on the main page, but not within the folders
  const handleAddNote = (name, content, folderId) => {
    console.log("this is the value of content:", content);
    let newNote = {
      id: cuid(),
      name,
      modified: new Date(), //this is automatically created
      folderId,
      content
    };

    fetch(`${config.API_ENDPOINT}/notes`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(newNote)
    })
      .then((res) => res.json())

      .then((data) => console.log("this is data:", data));
  };

  // validation goes here
  const validateName = (noteNameValue) => {
    console.log("this is name:", noteNameValue);
    if (noteNameValue.length < 2) return "You need a name!"; // (noteNameValue.length < 2) OR noteNameValue == 0
  };

  const validateDesc = (noteContentValue) => {
    console.log("this is content:", noteContentValue);
    if (!noteContentValue) return "You need a description!!";
  };

  AddNote.prototype = { note: PropTypes.string.isRequired };

  return (
    <ApiContext.Consumer>
      {(context) => {
        // console.log(context);
        console.log("add note is running");
        return (
          <>
            <form
              className="form-submission"
              onSubmit={(e) => {
                e.preventDefault();
                console.log("the NOTE form has been submitted", context);
                handleAddNote(
                  context.noteNameValue,
                  context.noteContentValue,
                  context.noteFolderIdValue
                );
              }}
            >
              <label htmlFor="noteName"> Name: </label>
              <input
                type="text"
                name="noteName"
                onChange={(e) => context.handleNoteNameChange(e.target.value)}
              />
              {/* <pre>{JSON.stringify(context, null, 2)}</pre> */}
              <ValidationError message={validateName(context.noteNameValue)} />

              {/* value={context.noteNameValue} */}
              {/* <ValidationError message={validateName()} /> */}
              <label htmlFor="noteContent">
                Content:
                <input
                  type="text"
                  id="noteContent"
                  name="content"
                  onChange={(e) =>
                    context.handleNoteContentChange(e.target.value)
                  }
                />
                <ValidationError
                  message={validateDesc(context.noteContentValue)}
                />
                {/* // value={context.noteContentValue} */}
              </label>
              <select
                type="text"
                name="folderName"
                onChange={(e) => {
                  console.log(
                    "this is FOLDER ID(or some folder identifier):",
                    e.target.value
                  ); //this is the folder ID // tried context.noteFolderIdValue
                  context.handleChooseFolder(e.target.value);
                }}
              >
                {context.folders.map((folder, key) => (
                  <option value={folder.id} key={key}>
                    {folder.name}
                  </option>
                ))}
              </select>
              <button type="submit">Save Note</button>
            </form>
          </>
        );
      }}
    </ApiContext.Consumer>
  );
}
