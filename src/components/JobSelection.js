import React from 'react'
import Select from 'react-select';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import EquipmentFilter from './EquipmentFilter'
import jobs from '../data/Jobs.json'


const styles = theme => ({
  root: {
    margin: 16
  },
  jobSelect: {
    paddingBottom: theme.spacing.unit * 2
  }
});

const options = [];

for (let i = 0; i < jobs.length; i++) {
  options.push({ value: jobs[i].name, label: jobs[i].name });
}

class JobSelection extends React.Component {
  constructor(props) {
    super(props);

    this.state = { equipment: jobs[0].equipment };
  }

  handleChange = selectedOption => {
    let job = jobs.find(item => {
      return item.name === selectedOption.value
    });

    this.setState({ equipment: job.equipment });
    let availableItems = job.equipment.weapon.concat(job.equipment.body).concat(job.equipment.head); 
    this.props.setAvailableItems(availableItems)
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Select
          className={classes.jobSelect}
          placeholder="Select a Job"
          onChange={this.handleChange}
          options={options}
        />

        <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Weapons</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
        <EquipmentFilter
          setFilter={this.props.setFilter}
          filterItems={this.state.equipment.weapon}
          filters={this.props.filters}
        />
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Armor</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
        <div className={classes.column}>

        <EquipmentFilter
          setFilter={this.props.setFilter}
          filterItems={this.state.equipment.body}
          filters={this.props.filters}
        />        
        <EquipmentFilter
          setFilter={this.props.setFilter}
          filterItems={this.state.equipment.head}
          filters={this.props.filters}
        />        
        <EquipmentFilter
          setFilter={this.props.setFilter}
          filterItems={this.state.equipment.bracelet}
          filters={this.props.filters}
        />
        <EquipmentFilter
          setFilter={this.props.setFilter}
          filterItems={this.state.equipment.accessory}
          filters={this.props.filters}
        />
        </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      </div>
    );
  }
}

export default withStyles(styles)(JobSelection);