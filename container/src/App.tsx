import React, { lazy, Suspense, useState, useEffect } from "react";
import { Route, Switch, Router, Redirect, Link as BrowserLink } from "react-router-dom";
import Link from '@material-ui/core/Link';

import {
  StylesProvider,
  createGenerateClassName,
  makeStyles
} from "@material-ui/core/styles";
import Header from "../components/Header";
import { createBrowserHistory } from "history";
import { Container, Grid, Typography } from "@material-ui/core";

const AuthApp = lazy(() => import("../components/AuthApp"));
const MarketingApp = lazy(() => import("../components/MarketingApp"));
const DashboardApp = lazy(() => import("../components/DashboardApp"));


const footers = [
  {
    title: 'Company',
    description: ['Team', 'History', 'Contact us', 'Locations'],
  },
  {
    title: 'Features',
    description: [
      'Cool stuff',
      'Random feature',
      'Team feature',
      'Developer stuff',
      'Another one',
    ],
  },
  {
    title: 'Resources',
    description: [
      'Resource',
      'Resource name',
      'Another resource',
      'Final resource',
    ],
  },
  {
    title: 'Legal',
    description: ['Privacy policy', 'Terms of use'],
  },
];


const generateClassName = createGenerateClassName({
  productionPrefix: "container",
});

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(2),
    marginTop: "auto",
    backgroundColor: "white",
    // just this item, push to bottom
    alignSelf: "flex-end",
  },
}));

function Copyright() {
  // classes created because it is needed in the footer.
  const classes = useStyles();
  return (
    <Container className={classes.footer}>
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <BrowserLink color="inherit" to="https://material-ui.com/" href="https://material-ui.com/">
          Your Website
        </BrowserLink>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Container>
  );
}

const history = createBrowserHistory();

function App() {
  const signedInLocalS = !!localStorage.getItem("isSignedIn");
  const [isSignedIn, setSignedIn] = useState(signedInLocalS);
  const classes = useStyles();
  useEffect(() => {}, [isSignedIn]);
  return (
    <StylesProvider generateClassName={generateClassName}>
      <Router history={history}>
        <div>
          <Header
            signedIn={isSignedIn}
            onSignOut={() => {
              localStorage.removeItem("isSignedIn");
              setSignedIn(false);
            }}
          />
          <Suspense fallback={<div>loading</div>}>
            <Switch>
              <Route path="/auth">
                <AuthApp
                  onSignIn={() => {
                    localStorage.setItem("isSignedIn", "true");
                    setSignedIn(true);
                    history.push("/dashboard");
                  }}
                />
              </Route>
              <Route path="/dashboard">
                {!isSignedIn && <Redirect to="/" />}
                <DashboardApp />
              </Route>
              <Route path="/" component={MarketingApp}></Route>
            </Switch>
          </Suspense>
          <Container maxWidth="md" component="footer" className={classes.footer}>
        <Grid container spacing={4} justify="space-evenly">
          {footers.map((footer) => (
            <Grid item xs={6} sm={3} key={footer.title}>
              <Typography variant="h6" color="textPrimary" gutterBottom>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map((item) => (
                  <li key={item}>
                    <Link href="#" variant="subtitle1" color="textSecondary">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
      </Container>
          <Copyright />
        </div>
      </Router>
    </StylesProvider>
  );
}

export default App;
