import React, { Component } from 'react'
import { withStyles } from "@material-ui/core/styles";

import Equipment from './components/Equipment'
import NavBar from './components/NavBar'
import FilterDrawer from './components/FilterDrawer'

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex'
  },
  toolbar: theme.mixins.toolbar
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stats: {
        strength: "",
        agility: "",
        vitality: "",
        wisdom: "",
        will: ""
      },
      filters: [],
      availableItems: []
    };
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <NavBar />
        <FilterDrawer
          setStat={this.setStat}
          setFilter={this.setFilter}
          setAvailableItems={this.setAvailableItems}
          stats={this.state.stats}
          filters={this.state.filters}
        />
        <main>
          <div className={classes.toolbar} />
          <Equipment
            stats={this.state.stats}
            filters={this.state.filters}
            availableItems={this.state.availableItems}
          />
        </main>
      </div>
    )
  }

  setStat = stat => event => {
    let stats = this.state.stats;
    stats[stat] = event.target.value;
    this.setState({ stats: stats });
  }

  setFilter = filter => {
    let filters = this.state.filters;

    if (filters.indexOf(filter) > -1) {
      filters.splice(filters.indexOf(filter), 1)
    } else {
      filters.push(filter);
    }

    this.setState({ filters: filters });
  }

  setAvailableItems = availableItems => {
    this.setState({ availableItems: availableItems });
    console.log(availableItems);
  }
}

export default withStyles(styles)(App);