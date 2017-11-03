import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import DateField from './formComponents/Datefield'
import SiteAutocomplete from './formComponents/SiteAutocomplete'
import AntennaAutocomplete from './formComponents/AntennaAutocomplete'
import ReceiverAutocomplete from './formComponents/ReceiverAutocomplete'
import Paper from 'material-ui/Paper'
  
class MainForm extends Component {
    render() {
        return (
            <Paper className={this.props.classes.rootpaper}>
                <DateField />
                <SiteAutocomplete />
                <ReceiverAutocomplete />
                <AntennaAutocomplete />
            </Paper>
        )
    }
}

MainForm = reduxForm({
    form: 'continuous'
})(MainForm)

export default MainForm