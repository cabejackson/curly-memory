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
import "./App.css";
import ErrorBoundary from "../ErrorBoundary";

export default class App extends Component {
  // first set state
  state = {
    notes: [],
    folders: [],
    value: "",
    noteFolderIdValue: "b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1",
    folderName: "",
    noteValue: "",
    noteNameValue: "",
    noteContentValue: ""
  }; //value is the user input

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
        this.setState({ notes, folders });
      })
      .catch((error) => {
        console.error({ error });
      });
  }

  // set-up event handlers which will be passed down to components

  handleDeleteNote = (noteId) => {
    this.setState({
      notes: this.state.notes.filter((note) => note.id !== noteId)
    });
  };

  handleFolderNameChange = (value) => {
    console.log("test");
    this.setState({ value });
  };

  //Here's the DRY method of doing things,
  //will try refactoring app to do this after graded submission passes
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

  //fix paths so they take user to an "addFolder" and a "addNote" page

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
  // context provider wraps around the app & value is set to the value obj
  //value is whats being passed to the child components of app via consumer

  // error boundary wraps around the whole app,
  // you can break the app by commenting out lines inside the value obj (like line 129 - noteNameValue: ...)
  // then try adding a note
  render() {
    const value = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.handleDeleteNote,
      value: this.state.value, // noteValue: this.state.noteValue,
      setContextState: (newState) => this.setState(newState),
      noteNameValue: this.state.noteNameValue,
      noteContentValue: this.state.noteContentValue,
      noteFolderIdValue: this.state.noteFolderIdValue,
      handleFolderNameChange: this.handleFolderNameChange,
      handleNoteNameChange: this.handleNoteNameChange,
      handleNoteContentChange: this.handleNoteContentChange,
      handleChooseFolder: this.handleChooseFolder
    };
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

// export default App;
