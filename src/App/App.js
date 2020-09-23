import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NoteListNav from "../NoteListNav/NoteListNav";
import NotePageNav from "../NotePageNav/NotePageNav";
import NoteListMain from "../NoteListMain/NoteListMain";
import NotePageMain from "../NotePageMain/NotePageMain";
import ApiContext from "../ApiContext";
import config from "../config";
import AddFolder from "../AddFolder/AddFolder";
import AddNote from "../AddNote/AddNote";
// import AddNote from '../AddNote/AddNote';

import "./App.css";
import ValidationError from "../ValidationError";
import ErrorBoundary from "../ErrorBoundary";

class App extends Component {
  state = {
    notes: [],
    folders: [],
    value: "", //value is the user input
    noteFolderIdValue: "",
    folderName: "",
    noteValue: "",
    noteNameValue: "",
    noteContentValue: ""
  };

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/notes`),
      fetch(`${config.API_ENDPOINT}/folders`)
    ])
      .then(([notesRes, foldersRes]) => {
        if (!notesRes.ok) return notesRes.json().then((e) => Promise.reject(e));
        if (!foldersRes.ok)
          return foldersRes.json().then((e) => Promise.reject(e));

        return Promise.all([notesRes.json(), foldersRes.json()]);
      })
      .then(([notes, folders]) => {
        this.setState({
          notes,
          folders
        });
      })
      .catch((error) => {
        console.error({
          error
        });
      });
  }

  handleDeleteNote = (noteId) => {
    this.setState({
      notes: this.state.notes.filter((note) => note.id !== noteId)
    });
  };

  handleFolderNameChange = (value) => {
    console.log("test");
    this.setState({ value });
  };

  // handleInputChange = (e) => {
  //   console.log("test");
  //   // Here, e is the event.
  //   // e.target is our element.
  //   // All we need to do is to update the current state with the values here.
  //   this.setState({
  //     [e.target.name]: e.target.value
  //     //what is name? A: name is the attr inside the
  //     //what is value? A: whatever the user types inside the input
  //   });
  // };

  handleNoteNameChange = (noteNameValue) => {
    console.log("handleNoteNameChange is working");
    this.setState({ noteNameValue });
  };

  handleNoteContentChange = (noteContentValue) => {
    console.log("handleNoteContentChange is working");
    this.setState({ noteContentValue });
  };

  handleChooseFolder = (noteFolderIdValue) => {
    console.log("handleChooseFolder is working");
    this.setState({ noteFolderIdValue });
  };

  renderNavRoutes() {
    return (
      <>
        {["/", "/folder/:folderId"].map((path) => (
          <Route exact key={path} path={path} component={NoteListNav} />
        ))}{" "}
        <Route path="/note/:noteId" component={NotePageNav} />{" "}
        <Route path="/add-folder" component={NotePageNav} />{" "}
      </>
    );
  }

  renderMainRoutes() {
    return (
      <>
        {["/", "/folder/:folderId"].map((path) => (
          <Route exact key={path} path={path} component={NoteListMain} />
        ))}
        <Route path="/add-folder" component={AddFolder} />{" "}
        <Route path="/note/:noteId" component={NotePageMain} />{" "}
        <Route path="/add-note" component={AddNote} />{" "}
      </>
    );
  }
  render() {
    const value = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.handleDeleteNote,
      value: this.state.value,
      nameFolder: this.state.nameFolder,
      noteValue: this.state.noteValue,
      setContextState: (newState) => this.setState(newState),
      noteNameValue: this.state.noteNameValue,
      noteContentValue: this.state.noteContentValue,
      noteFolderIdValue: this.state.noteFolderIdValue,
      handleInputChange: this.handleInputChange,
      handleFolderNameChange: this.handleFolderNameChange,
      handleNoteContentChange: this.handleNoteContentChange,
      handleNoteNameChange: this.handleNoteNameChange,
      handleChooseFolder: this.handleChooseFolder
    }; // noteNameValue: (noteName) => this.setState({ noteName }),
    return (
      <ErrorBoundary>
        <ApiContext.Provider value={value}>
          <div className="App">
            <nav className="App__nav"> {this.renderNavRoutes()} </nav>{" "}
            <header className="App__header">
              <h1>
                <Link to="/"> Noteful </Link>{" "}
                <FontAwesomeIcon icon="check-double" />
              </h1>{" "}
            </header>{" "}
            <main className="App__main"> {this.renderMainRoutes()} </main>
          </div>{" "}
        </ApiContext.Provider>
      </ErrorBoundary>
    );
  }
}

export default App;
