import React, { Component } from 'react'
import MyAutoComplete from './MyAutoComplete'
import Typography from 'material-ui/Typography'

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class ReceiverAutocomplete extends Component {
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
                    label='Receiver' 
                    hintText='Type receiver serial number' 
                    list={this.props.data.Receivers}
                    primary='serialNumber'
                    secondary='partNumber'
                    />

                {this.state.selected.partNumber ? <Typography type="caption">{'PN: ' + this.state.selected.partNumber }</Typography> : null}
            </div>
        )
    }
}

const ReceiverAutocompleteWithData = graphql(gql`
    query ReceiverList {
        Receivers:  allReceiver {
            id
            serialNumber
            partNumber
        }
    }

`)(ReceiverAutocomplete)

export default ReceiverAutocompleteWithData