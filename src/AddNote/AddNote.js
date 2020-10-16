import React from "react";
// import PropTypes from "prop-types";
import ApiContext from "../ApiContext";
import config from "../config";
import ValidationError from "../ValidationError";
import ErrorBoundary from "../ErrorBoundary";

// Create a new component AddNote that implements a form
// to capture the name, content and folder for a new Note.
export default function AddNote(props) {
  // handles the note form submission
  // adds a new note to the sever
  // which appears on the main page & within the folders
  const handleAddNote = (note_name, note_content, folder_id) => {
    // console.log("this is the value of content:", content, name, folderId);
    let newNote = {
      note_name,
      modified_date: new Date(),
      folder_id,
      note_content
    }; //id is automatically created, but I used the cuid() for the ID

    fetch(`${config.API_ENDPOINT}/notes`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(newNote)
      })
      .then((res) => res.json())

      .then((data) => console.log("this is data:", data))
      .catch((error) => {
        console.error({ error });
      });
  };

  // validates that a note is given
  const validateName = (noteNameValue) => {
    // console.log("this is name:", noteNameValue);
    if (noteNameValue.length < 2) return "You need a name!";
  };

  // validates that note content is given
  const validateDesc = (noteContentValue) => {
    // console.log("this is content:", noteContentValue);
    if (!noteContentValue) return "You need a description!!";
  };

  // validates that note folder is given
  const validateFolder = (noteFolderIdValue) => {
    // console.log("this is folder:", noteFolderIdValue);
    if (noteFolderIdValue === null) return "You need to select a folder!!";
  };

  // // proptype requirement met here:
  // // .isRequired added here
  // AddNote.prototype = {
  //   note: PropTypes.string.isRequired
  // };

  //note: the ApiContext.Consumer gives this component acess to context,
  //which comes from app.js Provider
  return (
    <ErrorBoundary>
      <ApiContext.Consumer>
        {(context) => {
          // console.log(context);
          // console.log("add note is running");
          return (
            <>
              <form
                className="form-submission"
                onSubmit={(e) => {
                  e.preventDefault();
                  // console.log("the NOTE form has been submitted", context);
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
                  required
                />
                {/* <pre>{JSON.stringify(context, null, 2)}</pre> //this was useful for looking at context*/}
                <ValidationError
                  message={validateName(context.noteNameValue)}
                />
                <label htmlFor="noteContent">
                  Content:
                  <input
                    type="text"
                    id="noteContent"
                    name="content"
                    onChange={(e) =>
                      context.handleNoteContentChange(e.target.value)
                    }
                    required
                  />
                  <ValidationError
                    message={validateDesc(context.noteContentValue)}
                  />
                </label>
                <label htmlFor="folderId">
                  Choose a Folder:
                  <select
                    type="text"
                    id="folderId"
                    name="folderName"
                    onChange={(e) => {
                      // console.log(
                      //   "this is FOLDER ID(or some folder identifier):",
                      //   e.target.value
                      // );
                      context.handleChooseFolder(e.target.value);
                    }}
                    required
                    defaultValue=""
                  >
                    {/* folder.id is the value like for the backend, but folder.name is what the users see */}
                    <option value="">-- select one --</option>
                    {context.folders.map((folder, key) => (
                      <option value={folder.id} key={key}>
                        {folder.folder_name}
                      </option>
                    ))}
                  </select>
                  <ValidationError
                    message={validateFolder(context.noteFolderIdValue)}
                  />
                </label>

                <button type="submit">Save Note</button>
              </form>
            </>
          );
        }}
      </ApiContext.Consumer>
    </ErrorBoundary>
  );
}
