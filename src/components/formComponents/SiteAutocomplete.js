import React, { Component } from 'react'
import MyAutoComplete from './MyAutoComplete'
import Typography from 'material-ui/Typography'

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class SiteAutocomplete extends Component {
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
                    label='Site' 
                    hintText='Type sitename' 
                    list={this.props.data.sites}
                    primary='name'
                    secondary='location'
                    />

                <Typography type="caption">{ this.state.selected.location }</Typography>
            </div>
        )
    }
}

const SiteAutocompleteWithData = graphql(gql`
    query SiteList {
        sites: allContinuousSite {
            id
            name
            location
        }
    }

`)(SiteAutocomplete)

export default SiteAutocompleteWithData