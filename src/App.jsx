import React from "react";
import { useObserver } from "mobx-react";
import { ThemeProvider } from "styled-components";
import Container from "./component/Container";
import useStores from "./useStores";
import StartPage from "./page/StartPage";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import CreatePage from "./page/CreatePage";
import * as firebase from "firebase/app";
import config from "./firebaseConfig";

firebase.initializeApp(config);

function useColorTheme() {
  const { rootStore } = useStores();
  const { colorStore } = rootStore;

  return useObserver(() => ({
    colorTheme: colorStore.getTheme
  }));
}

function App() {
  const { colorTheme } = useColorTheme();
  return (
    <ThemeProvider theme={colorTheme}>
      <Container>
        <Router>
          <Switch>
            <Route exact path="/" component={StartPage} />
            <Route exact path="/create" component={CreatePage} />
          </Switch>
        </Router>
      </Container>
    </ThemeProvider>
  );
}

export default App;
