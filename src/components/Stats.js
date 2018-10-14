import React from "react"
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField"
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  container: {
    marginLeft: 16,
    marginRight: 16
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 40,
  }
});

function Stats(props) {
  const { classes } = props;

  return (
    <div className={classes.container}>
      <TextField
        type="number"
        label="Str"
        value={props.stats.strength}
        margin="normal"
        className={classes.textField}
        onChange={props.setStat("strength")}
      />
      <TextField
        type="number"
        label="Agi"
        value={props.stats.agility}
        margin="normal"
        className={classes.textField}
        onChange={props.setStat("agility")}
      />
      <TextField
        type="number"
        label="Vit"
        value={props.stats.vitality}
        margin="normal"
        className={classes.textField}
        onChange={props.setStat("vitality")}
      />
      <TextField
        type="number"
        label="Wis"
        value={props.stats.wisdom}
        margin="normal"
        className={classes.textField}
        onChange={props.setStat("wisdom")}
      />
      <TextField
        type="number"
        label="Will"
        value={props.stats.will}
        margin="normal"
        className={classes.textField}
        onChange={props.setStat("will")}
      />
    </div>
  );
}

Stats.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Stats);