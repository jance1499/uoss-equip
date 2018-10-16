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
      typeFilters: [],
      statBonusFilters: [],
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
          setTypeFilters={this.setTypeFilters}
          setStatBonusFilters={this.setStatBonusFilters}
          setAvailableItems={this.setAvailableItems}
          stats={this.state.stats}
          typeFilters={this.state.typeFilters}
          statBonusFilters={this.state.statBonusFilters}
        />
        <main>
          <div className={classes.toolbar} />
          <Equipment
            stats={this.state.stats}
            typeFilters={this.state.typeFilters}
            statBonusFilters={this.state.statBonusFilters}
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

  setStatBonusFilters = filter => {
    let filters = this.state.statBonusFilters;

    if (filters.indexOf(filter) > -1) {
      filters.splice(filters.indexOf(filter), 1)
    } else {
      filters.push(filter);
    }

    this.setState({ statBonusFilters: filters });
  }

  setTypeFilters = filter => {
    let filters = this.state.typeFilters;

    if (filters.indexOf(filter) > -1) {
      filters.splice(filters.indexOf(filter), 1)
    } else {
      filters.push(filter);
    }

    this.setState({ typeFilters: filters });
  }

  setAvailableItems = availableItems => {
    this.setState({ availableItems: availableItems });
    console.log(availableItems);
  }
}

export default withStyles(styles)(App);