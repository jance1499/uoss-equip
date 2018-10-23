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
      buffFilters: [],
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
          buffFilters={this.state.buffFilters}
          statBonusFilters={this.state.statBonusFilters}
        />
        <main>
          <div className={classes.toolbar} />
          
          <Equipment
            stats={this.state.stats}
            typeFilters={this.state.typeFilters}
            buffFilters={this.state.buffFilters}
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
    let filters = setFilters(filter, this.state.statBonusFilters);
    this.setState({ statBonusFilters: filters });
  }

  setTypeFilters = filter => {
    let filters = setFilters(filter, this.state.typeFilters);
    this.setState({ typeFilters: filters });
  }

  setBuffFilters = filter => {
    let filters = setFilters(filter, this.state.buffFilters);
    this.setState({ buffFilters: filters });
  }

  setAvailableItems = availableItems => {
    this.setState({ availableItems: availableItems });
  }
}

const setFilters = (filter, currentFilters) => {
  let filters = currentFilters;

  if (filters.indexOf(filter) > -1) {
    filters.splice(filters.indexOf(filter), 1)
  } else {
    filters.push(filter);
  }

  return filters;
};

export default withStyles(styles)(App);