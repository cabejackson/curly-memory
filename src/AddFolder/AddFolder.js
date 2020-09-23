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
    });
  };

  AddFolder.prototype = {
    folder: PropTypes.string.isRequired
  };

  return (
    <ApiContext.Consumer>
      {(context) => {
        // console.log(context);
        console.log("add folder is running");
        return (
          <>
            {/* <h1>Test</h1> */}
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
                {/* // value={context.value} */}
              </label>
              <button type="submit">Submit</button>
            </form>
          </>
        );
      }}
    </ApiContext.Consumer>
  );
}
