import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import items from '../data/Items.json'

const styles = theme => ({
  root: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    maxWidth: 500
  },
});

// Filter based on the selected chips in the JobSelection component.
function filterSelectedItemTypes(items, filters) {
  let filteredItems = [];

  if (filters.length > 0) {
    filters.forEach(filter => {
      let filtered = items.filter(item => item.type === filter);
      filteredItems = filteredItems.concat(filtered);
    });
  } else {
    filteredItems = items;
  }

  return filteredItems;
}

// Filter based on the selected chips in the FilterDrawer component for stat bonuses.
function filterSelectedStatBonuses(items, filters) {
  let filteredItems = [];
  let filtered = [];

  // Set the default values if stat bonuses aren't provided.
  items.forEach(item => {
    if (item.statBonuses) {
      item.statBonuses.strength = item.statBonuses.strength || 0;
      item.statBonuses.agility = item.statBonuses.agility || 0;
      item.statBonuses.vitality = item.statBonuses.vitality || 0;
      item.statBonuses.wisdom = item.statBonuses.wisdom || 0;
      item.statBonuses.will = item.statBonuses.will || 0;
    } else {
      item.statBonuses = {
        strength: 0,
        agility: 0,
        vitality: 0,
        wisdom: 0,
        will: 0
      }
    }
  });

  if (filters.length > 0) {
    filters.forEach(filter => {
      console.log(filter);
      switch (filter) {
        case "str":
          filtered = items.filter(item => item.statBonuses.strength > 0);
          break;
        case "agi":
          filtered = items.filter(item => item.statBonuses.agility > 0);
          break;
        case "vit":
          filtered = items.filter(item => item.statBonuses.vitality > 0);
          break;
        case "wis":
          filtered = items.filter(item => item.statBonuses.wisdom > 0);
          break;
        case "will":
          filtered = items.filter(item => item.statBonuses.will > 0);
          break;
        default:
          filtered = items;
      }

      filteredItems = filteredItems.concat(filtered);
    });
  } else {
    filteredItems = items;
  }

  return filteredItems;
}

// Filters based on input from the Stats component.
function filterStatRequirements(items, stats) {
  // Set the default values if requirements aren't provided.
  items.forEach(item => {
    if (item.requirements) {
      item.requirements.strength = item.requirements.strength || 0;
      item.requirements.agility = item.requirements.agility || 0;
      item.requirements.vitality = item.requirements.vitality || 0;
      item.requirements.wisdom = item.requirements.wisdom || 0;
      item.requirements.will = item.requirements.will || 0;
    } else {
      item.requirements = {
        strength: 0,
        agility: 0,
        vitality: 0,
        wisdom: 0,
        will: 0
      }
    }
  });

  // If no filters are provided, return all items.
  if (stats.strength === "" &&
    stats.agility === "" &&
    stats.vitality === "" &&
    stats.wisdom === "" &&
    stats.will === "") {
    return items;
  }

  return items
    .filter(item => item.requirements.strength <= stats.strength)
    .filter(item => item.requirements.agility <= stats.agility)
    .filter(item => item.requirements.vitality <= stats.vitality)
    .filter(item => item.requirements.wisdom <= stats.wisdom)
    .filter(item => item.requirements.will <= stats.will);
}

// Retrieve all equipment that is available based of unselected chips from JobSelection component.
function filterAvailableItemTypes(items, availableItemTypes) {
  if (availableItemTypes.length > 0) {
    return items.filter(item => availableItemTypes.includes(item.type));
  } else {
    return items;
  }
}

function Equipment(props) {
  const { classes } = props;

  let filteredItems = [];
  filteredItems = filterStatRequirements(items, props.stats);
  filteredItems = filterSelectedItemTypes(filteredItems, props.typeFilters);
  filteredItems = filterSelectedStatBonuses(filteredItems, props.statBonusFilters);
  filteredItems = filterAvailableItemTypes(filteredItems, props.availableItems);

  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell numeric>Strength</TableCell>
          <TableCell numeric>Agility</TableCell>
          <TableCell numeric>Vitality</TableCell>
          <TableCell numeric>Wisdom</TableCell>
          <TableCell numeric>Will</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {filteredItems.map(row => {
          return (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell numeric>{row.requirements.strength}</TableCell>
              <TableCell numeric>{row.requirements.agility}</TableCell>
              <TableCell numeric>{row.requirements.vitality}</TableCell>
              <TableCell numeric>{row.requirements.wisdom}</TableCell>
              <TableCell numeric>{row.requirements.will}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

Equipment.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Equipment);