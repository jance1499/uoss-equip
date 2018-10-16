import React from 'react'
import Chip from '@material-ui/core/Chip';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  chip: {
    margin: theme.spacing.unit / 2,
  },
});

function EquipmentFilter(props) {
    const { classes } = props;

    return (
      <div>
        {props.filterItems.map(item => {
          let filterIsOn = false;

          if (props.filters.indexOf(item) > -1) {
            filterIsOn = true;
          }

          return (
            <Chip
              key={item}
              label={item}
              clickable
              onClick={() => props.setFilters(item)}
              className={classes.chip}
              color={ filterIsOn ? "primary" : "default" }
            />
          );
        })}
      </div>
    );
}

EquipmentFilter.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EquipmentFilter);

