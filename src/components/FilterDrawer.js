import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import JobSelection from './JobSelection';
import Stats from './Stats';
import EquipmentFilter from './EquipmentFilter';


const styles = theme => ({
  drawerPaper: {
    position: 'relative',
    width: 320,
    zIndex: 2,
    margin: theme.spacing.unit
  },
  toolbar: theme.mixins.toolbar
});

function FilterDrawer(props) {
  const { classes } = props;
  const statBonuses = ["str", "agi", "vit", "wis", "will"];
  const buffs = ["protect", "shell", "reflect", "mp regen", "praise", "preach", "haste", "regen", "veil"];
  const secondaryStatBonuses = ["attack", "magic attack", "defense", "magic defense", "evasion", "magic evasion", "block"];
  const empowers = ["fire empower", "ice empower", "lightning empower", "earth empower", "water empower", "wind empower", "holy empower", "dark empower"];
  const wards = ["fire ward", "ice ward", "lightning ward", "earth ward", "water ward", "wind ward", "holy ward", "dark ward"];
  const weaponstrikes = ["firestrike", "icestrike", "lightningstrike", "earthstrike", "waterstrike", "windstrike", "holystrike", "darkstrike"];
  const statuses = ["blind", "sleep", "zombie", "silence", "stop", "don't act", "don't move", "mini", "imp", "berserk", "engulf", "curse", "poison", "slow", "petrify"];
  const creatureTypes = ["aberration killer", "aquatic killer", "beast killer", "bird killer", "demon killer", "dragon killer", "elemental killer", "flying killer", "humanoid killer", "insect killer", "lizard killer", "machine killer", "magical killer", "plant killer", "slime killer", "undead killer"];

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <div className={classes.toolbar} />
      <div className={classes.root}>
        <Stats
          setStat={props.setStat}
          stats={props.stats}
        />
        <JobSelection
          setFilter={props.setFilter}
          filters={props.filters}
          setAvailableItems={props.setAvailableItems}
        />
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Primary Stat Bonus</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.details}>
            <EquipmentFilter
              setFilter={props.setFilter}
              filterItems={statBonuses}
              filters={props.filters}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Secondary Stat Bonus</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.details}>
            <EquipmentFilter
              setFilter={props.setFilter}
              filterItems={secondaryStatBonuses}
              filters={props.filters}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Buffs</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.details}>
            <EquipmentFilter
              setFilter={props.setFilter}
              filterItems={buffs}
              filters={props.filters}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Status Immunities</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.details}>
            <EquipmentFilter
              setFilter={props.setFilter}
              filterItems={statuses}
              filters={props.filters}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Empowers</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.details}>
            <EquipmentFilter
              setFilter={props.setFilter}
              filterItems={empowers}
              filters={props.filters}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Weaponstrikes</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.details}>
            <EquipmentFilter
              setFilter={props.setFilter}
              filterItems={weaponstrikes}
              filters={props.filters}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Wards</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.details}>
            <EquipmentFilter
              setFilter={props.setFilter}
              filterItems={wards}
              filters={props.filters}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Killers</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.details}>
            <EquipmentFilter
              setFilter={props.setFilter}
              filterItems={creatureTypes}
              filters={props.filters}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    </Drawer>
  );
}

export default withStyles(styles)(FilterDrawer);