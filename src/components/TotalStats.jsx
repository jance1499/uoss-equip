import React from "react"
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField"
import { withStyles } from "@material-ui/core/styles";

import Stats from './Stats'

const styles = theme => ({
    container: {
        display: "flex",
        flexWrap: "wrap",
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 100,
    }
});

class TotalStats extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalStats: 5,
            levelRequired: 1
        };

        this.handleStatChange = this.handleStatChange.bind(this)
    }

    handleStatChange(totalStats) {
        this.setState(
            {
                totalStats: totalStats,
                levelRequired: this.calculateMinimumLevel(totalStats)
            });
    }

    calculateMinimumLevel(totalStats) {
        let currentLevel = 1;

        if (totalStats <= 594) {
            currentLevel =  Math.ceil(totalStats / 6);
        } else {
            let currentLevel = 100;
            let postLegendStats = totalStats - 594;
            let statGain = 7;
            
            while (postLegendStats > 0) {    
                for (let i = 0; i < 10; i++) {
                    postLegendStats-=statGain;
                    if (postLegendStats > 0) {
                        ++currentLevel;
                    } else {
                        return currentLevel;
                    }
                }
                
                if (statGain < 12) {
                    statGain++;
                }
            }
        }

        return currentLevel;
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <TextField
                    name="totalStats"
                    label="Total Stats"
                    value={this.state.totalStats}
                    margin="normal"
                    disabled={true}
                    className={classes.textField}
                />
                <TextField
                    name="levelNeededForStats"
                    label="Minimum Level"
                    value={this.state.levelRequired}
                    margin="normal"
                    disabled={true}
                    className={classes.textField}
                />
                <Stats
                    handleStatChange={this.handleStatChange}
                />
            </div>
        );
    }
}

TotalStats.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TotalStats);

