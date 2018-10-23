import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import { withStyles } from '@material-ui/core/styles';

import JobSelection from './JobSelection';
import Stats from './Stats';
import ExpansionPanelFilter from './ExpansionPanelFilter';


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
  const primaryStatBonuses = ["str", "agi", "vit", "wis", "will"];
  // const buffs = ["protect", "shell", "reflect", "mp regen", "praise", "preach", "haste", "regen", "veil"];
  // const secondaryStatBonuses = ["attack", "magic attack", "defense", "magic defense", "evasion", "magic evasion", "block"];
  // const empowers = ["fire empower", "ice empower", "lightning empower", "earth empower", "water empower", "wind empower", "holy empower", "dark empower"];
  // const wards = ["fire ward", "ice ward", "lightning ward", "earth ward", "water ward", "wind ward", "holy ward", "dark ward"];
  // const weaponstrikes = ["firestrike", "icestrike", "lightningstrike", "earthstrike", "waterstrike", "windstrike", "holystrike", "darkstrike"];
  // const statuses = ["blind", "sleep", "zombie", "silence", "stop", "don't act", "don't move", "mini", "imp", "berserk", "engulf", "curse", "poison", "slow", "petrify"];
  // const creatureTypes = ["aberration killer", "aquatic killer", "beast killer", "bird killer", "demon killer", "dragon killer", "elemental killer", "flying killer", "humanoid killer", "insect killer", "lizard killer", "machine killer", "magical killer", "plant killer", "slime killer", "undead killer"];
  const filterCategories = {
    "Primary Stat Bonus": {
      setFilters: props.setStatBonusFilters,
      filterItems: primaryStatBonuses,
      filters: props.statBonusFilters
    },
    // "Secondary Stat Bonus": {
    //   setFilter: props.secondaryStatBonusFilter,
    //   filters: secondaryStatBonuses,
    // },
    // "Buffs": buffs,
    // "Status Immunities": statuses,
    // "Empowers": empowers,
    // "Weaponstrikes": weaponstrikes,
    // "Wards": wards,
    // "Killers": creatureTypes
  };

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
          setTypeFilters={props.setTypeFilters}
          typeFilters={props.typeFilters}
          setAvailableItems={props.setAvailableItems}
        />

        <ExpansionPanelFilter
          filterCategories={filterCategories}
        />
      </div>
    </Drawer>
  );
}

export default withStyles(styles)(FilterDrawer);