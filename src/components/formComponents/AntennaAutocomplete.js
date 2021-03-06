import React, { Component } from 'react'
import MyAutoComplete from './MyAutoComplete'
import Typography from 'material-ui/Typography'

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class AntennaAutocomplete extends Component {
    state = {
        selected: {}
    };

    setSelected = (selected) => {
        this.setState({
            selected
        })
    }

    render() {

        return (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <MyAutoComplete
                    setSelected={this.setSelected}
                    label='Antenna' 
                    hintText='Type antenna serial number' 
                    list={this.props.data.antennas}
                    primary='serialNumber'
                    secondary='partNumber'
                    />

                    {this.state.selected.partNumber ? <Typography type="caption">{'PN: ' + this.state.selected.partNumber }</Typography> : null}
            </div>
        )
    }
}

const AntennaAutocompleteWithData = graphql(gql`
    query AntennaList {
        antennas:  allAntenna {
            id
            serialNumber
            partNumber
        }
    }

`)(AntennaAutocomplete)

export default AntennaAutocompleteWithData