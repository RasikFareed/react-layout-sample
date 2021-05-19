import React, { useState, useCallback } from "react";
import Header from "../../component/Header";
import MiniDrawer from "../../component/Drawer";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Router, Route } from "react-router-dom";
import Home from "../Home/Home";
import About from "../About/About";
import Users from "../Users/Users";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: "64px 24px 24px 24px",
  },
}));

const MainLayout = () => {
  const customClass = useStyles();

  const [currentRoute, setCurrentRoute] = React.useState(
    window.location.pathname.split("/")[1] || "/"
  );

  React.useEffect(() => {
    history.listen((location) => {
      const newRoute =
        location.pathname.split("/")[1].trim().length > 0
          ? location.pathname.split("/")[1]
          : "/";
      setCurrentRoute(newRoute);
    });

    // eslint-disable-next-line
  }, []);

  const [open, setOpen] = useState(false);

  const handleDrawerOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleDrawerClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Router history={history}>
      <div className={customClass.root}>
        <CssBaseline />
        <Header
          classes={customClass}
          isOpen={open}
          handleDrawerOpen={handleDrawerOpen}
        />
        <MiniDrawer
          history={history}
          classes={customClass}
          isOpen={open}
          handleDrawerClose={handleDrawerClose}
        />
        <div className={customClass.content}>
          <Route exact path={["/", "/home"]} component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/users" component={Users} />
        </div>
      </div>
    </Router>
  );
};

export default MainLayout;
