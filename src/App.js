import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import TextEditor from "./Components/TextEditor/TextEditor";
import { v4 as uuidv4 } from "uuid";
import Header from "./Components/Header/Header";

function App() {
  const id = uuidv4();
  //docs title
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" exact>
          <Redirect to={`/document/${id}`}></Redirect>
        </Route>
        <Route path="/document/:documentId" exact>
          <TextEditor />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
