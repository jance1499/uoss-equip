import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';

import itemData from '../data/Items.json';

const styles = theme => ({
  root: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    maxWidth: 500,
  },
});

// Filter based on the selected chips in the JobSelection component.
function filterSelectedItemTypes(items, filters) {
  let filteredItems = [];

  if (filters.length > 0) {
    filters.forEach((filter) => {
      const filtered = items.filter(item => item.type === filter);
      filteredItems = filteredItems.concat(filtered);
    });
  } else {
    filteredItems = items;
  }

  return filteredItems;
}

// Filter based on the selected chips in the FilterDrawer component for stat bonuses.
function filterSelectedStatBonuses(items, filters) {
  let filtered = [];
  let filteredItems = [];

  // Set the default values if stat bonuses aren't provided.
  const localItems = items;

  for (let i = 0; i < localItems.length; i += 1) {
    if (items[i].statBonuses) {
      localItems[i].statBonuses.strength = localItems[i].statBonuses.strength || 0;
      localItems[i].statBonuses.agility = localItems[i].statBonuses.agility || 0;
      localItems[i].statBonuses.vitality = localItems[i].statBonuses.vitality || 0;
      localItems[i].statBonuses.wisdom = localItems[i].statBonuses.wisdom || 0;
      localItems[i].statBonuses.will = localItems[i].statBonuses.will || 0;
    } else {
      localItems[i].statBonuses = {
        strength: 0,
        agility: 0,
        vitality: 0,
        wisdom: 0,
        will: 0,
      };
    }
  }

  if (filters.length > 0) {
    filters.forEach((filter) => {
      switch (filter) {
        case 'str':
          filtered = localItems.filter(item => item.statBonuses.strength > 0);
          break;
        case 'agi':
          filtered = localItems.filter(item => item.statBonuses.agility > 0);
          break;
        case 'vit':
          filtered = localItems.filter(item => item.statBonuses.vitality > 0);
          break;
        case 'wis':
          filtered = localItems.filter(item => item.statBonuses.wisdom > 0);
          break;
        case 'will':
          filtered = localItems.filter(item => item.statBonuses.will > 0);
          break;
        default:
          filtered = localItems;
      }

      filteredItems = filteredItems.concat(filtered);
    });
  } else {
    filteredItems = localItems;
  }

  return filteredItems;
}

// Filters based on input from the Stats component.
function filterStatRequirements(items, stats) {
  // Set the default values if requirements aren't provided.
  const filteredItems = items;
  for (let i = 0; i < items.length; i += 1) {
    if (items[i].requirements) {
      filteredItems[i].requirements.strength = filteredItems[i].requirements.strength || 0;
      filteredItems[i].requirements.agility = filteredItems[i].requirements.agility || 0;
      filteredItems[i].requirements.vitality = filteredItems[i].requirements.vitality || 0;
      filteredItems[i].requirements.wisdom = filteredItems[i].requirements.wisdom || 0;
      filteredItems[i].requirements.will = filteredItems[i].requirements.will || 0;
    } else {
      filteredItems[i].requirements = {
        strength: 0,
        agility: 0,
        vitality: 0,
        wisdom: 0,
        will: 0,
      };
    }
  }
  // If no filters are provided, return all items.
  if (stats.strength === ''
    && stats.agility === ''
    && stats.vitality === ''
    && stats.wisdom === ''
    && stats.will === '') {
    return filteredItems;
  }

  return filteredItems
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
  }
  return items;
}

function Equipment(props) {
  const {
    stats, typeFilters, statBonusFilters, availableItems, classes,
  } = props;

  let filteredItems = [];
  filteredItems = filterStatRequirements(itemData, stats);
  filteredItems = filterSelectedItemTypes(filteredItems, typeFilters);
  filteredItems = filterSelectedStatBonuses(filteredItems, statBonusFilters);
  filteredItems = filterAvailableItemTypes(filteredItems, availableItems);

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
        {filteredItems.map(row => (
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
        ))}
      </TableBody>
    </Table>
  );
}

Equipment.defaultProps = {
  stats: {
    strength: '0',
    agility: '0',
    vitality: '0',
    wisdom: '0',
    will: '0',
  },
  statBonusFilters: [],
  typeFilters: [],
  availableItems: [],
};

Equipment.propTypes = {
  stats: PropTypes.shape({
    strength: PropTypes.string,
    agility: PropTypes.string,
    vitality: PropTypes.string,
    wisdom: PropTypes.string,
    will: PropTypes.string,
  }),
  statBonusFilters: PropTypes.arrayOf(PropTypes.string),
  typeFilters: PropTypes.arrayOf(PropTypes.string),
  availableItems: PropTypes.arrayOf(PropTypes.string),
  classes: PropTypes.shape({
    table: PropTypes.string,
  }).isRequired,
};

export default withStyles(styles)(Equipment);
