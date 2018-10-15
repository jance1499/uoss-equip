import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';

import EquipmentFilter from './EquipmentFilter';

const styles = theme => ({
    root: {
        overflow: 'hidden',
    }
  });

function ExpansionPanelFilter(props) {
    const { classes } = props;

    return (
        <div className={classes.root}>
            {Object.keys(props.filterCategories).map(category => {
                return (
                    <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>{category}</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <EquipmentFilter
                                setFilter={props.setFilter}
                                filterItems={props.filterCategories[category]}
                                filters={props.filters}
                            />
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                );
            })}
        </div>
    );
}

export default withStyles(styles)(ExpansionPanelFilter);