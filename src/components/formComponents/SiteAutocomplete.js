import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import MyAutoComplete from './MyAutoComplete'

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class SiteAutocomplete extends Component {
    render() {
        return (
                <MyAutoComplete
                    classes={this.props.classes} 
                    label='Site' 
                    hintText='Type sitename' 
                    list={this.props.data.sites}
                    />
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