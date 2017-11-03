import React, { Component } from 'react'
import { DatePicker } from 'material-ui-pickers'
import TimeInput from 'material-ui-time-picker'

class DateField extends Component {
    state = {
        selectedDate: new Date(),
        selectedTime: new Date()
    }

    handleDateChange = date => {
        this.setState({ selectedDate: date })
    }

    handleTimeChange = time => {
        this.setState({ selectedTime: time })
    }

    render() {
        const { selectedDate } = this.state

        return (
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <DatePicker 
                    style={{ marginRight: '10px' }}
                    value={ selectedDate }
                    onChange={this.handleDateChange}
                    format='MMMM DD, YYYY'
                    disableFuture
                    animateYearScrolling
                />
                <TimeInput
                    mode='24h'
                    value={this.state.selectedTime}
                    onChange={(time) => this.handleTimeChange(time)}
                />

            </div>
        )
    }
}

export default DateField