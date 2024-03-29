import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import { ChevronLeft } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
    a: {
      textDecoration: "none",
    },
    body: {
      margin: 0,
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
}));

type HeaderProps = {
  signedIn: boolean;
  onSignOut: () => void;
};

export default function Header({ signedIn, onSignOut }: HeaderProps) {
  const classes = useStyles();

  const onClick = () => {
    if (signedIn && onSignOut) {
      onSignOut();
    }
  };

  return (
    <React.Fragment>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        className={classes.appBar}
      >
        <Toolbar className={classes.toolbar}>
          <Box display="flex" alignItems='center'>
            <Box mr={2}>
              <Typography
                variant="body1"
                color="inherit"
                noWrap
                component={RouterLink}
                to="/"
              >
                Home
              </Typography>
            </Box>

            {signedIn && (
              <Box mx={2}>
                <Typography
                  variant="body1"
                  color="inherit"
                  noWrap
                  component={RouterLink}
                  to="/dashboard"
                >
                  Dashboard
                </Typography>
                
              </Box>
             
            )}
             <Typography variant="caption">
              {new Date().toISOString()}
            </Typography>
          </Box>

          <Button
            color="primary"
            variant="outlined"
            className={classes.link}
            component={RouterLink}
            to={signedIn ? "/" : "/auth/signin"}
            onClick={onClick}
          >
            {signedIn ? "Logout" : "Login"}
          </Button>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
