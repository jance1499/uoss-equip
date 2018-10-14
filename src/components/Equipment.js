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

function filterSelectedItemTypes(items, filters) {
  let filteredItems = [];

  if (filters.length > 0) {
    filters.forEach(function (filter) {
      let filtered = items.filter(item => item.type === filter);
      filteredItems = filteredItems.concat(filtered);
    })
  } else {
    filteredItems = items;
  }

  return filteredItems;
}

function filterStatRequirements(items, stats) {
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
  filteredItems = filterSelectedItemTypes(filteredItems, props.filters);
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