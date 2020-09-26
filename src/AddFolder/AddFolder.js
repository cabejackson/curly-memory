import React from "react";
import PropTypes from "prop-types";
import ApiContext from "../ApiContext";
import config from "../config";

// Create a new component AddFolder
// that implements a form to capture
// the name of a new folder from the user

export default function AddFolder(props) {
  // handles the form submission
  // adds a new folder to the sever
  // which appears on the main page
  const handleSubmit = (name) => {
    const folder = { name };
    // console.log("this is the name", name);
    fetch(`${config.API_ENDPOINT}/folders`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(folder)
    }).catch((error) => {
      console.error({ error });
    });
  };
  // proptype requirement met here:
  AddFolder.prototype = { folder: PropTypes.string.isRequired };

  //note: the ApiContext.Consumer gives this component acess to context,
  //which comes from app.js Provider
  return (
    <ApiContext.Consumer>
      {(context) => {
        // console.log(context);
        console.log("add folder is running");
        return (
          <>
            <form
              className="form-submission"
              onSubmit={(e) => {
                e.preventDefault();
                console.log("the form has been submitted");
                handleSubmit(context.value);
              }}
            >
              <label htmlFor="folderName">
                Folder Name:
                <input
                  type="text"
                  id="folderName"
                  name="folderName"
                  onChange={(e) =>
                    context.handleFolderNameChange(e.target.value)
                  }
                />
              </label>
              <button type="submit">Submit</button>
            </form>
          </>
        );
      }}
    </ApiContext.Consumer>
  );
}
