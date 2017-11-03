import React, { Component } from 'react'
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from 'material-ui/TextField';
import { MenuItem } from 'material-ui/Menu';
import Paper from 'material-ui/Paper';

function renderInput(inputProps) {
    const { classes, autoFocus, value, ref, label, ...other } = inputProps;

    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
        <TextField
        style={{ marginTop: '10px', marginRight: '10px' }}
        label={label}
        autoFocus={autoFocus}
        value={value}
        inputRef={ref}
        InputProps={{
            classes: {
            input: classes.input,
            },
            ...other,
        }}
        />
        </div>

    );
}
  
function renderSuggestion(suggestion, { query, isHighlighted }) {
    const matches = match(suggestion.name, query);
    const parts = parse(suggestion.name, matches);

    const sub = suggestion.location

    return (
        <MenuItem selected={isHighlighted} component="div">
        <div>
            {parts.map((part, index) => {
            return part.highlight ? (
                <span key={index} style={{ fontWeight: 300 }}>
                {part.text}
                </span>
            ) : (
                <strong key={index} style={{ fontWeight: 500 }}>
                {part.text}
                </strong>
            );
            })}
        </div>
        <small>{' : ' + sub}</small>
        </MenuItem>
    );
}
  
function renderSuggestionsContainer(options) {
    const { containerProps, children } = options;

    return (
        <Paper {...containerProps} square>
            {children}
        </Paper>
    );
}
  
function getSuggestionValue(suggestion) {
    return suggestion.name;
}
  
function getSuggestions(value, list) {
    const inputValue = value.trim().toUpperCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0
        ? []
        : list.filter(suggestion => {
            const keep = count < 5 && suggestion.name.toUpperCase().slice(0, inputLength) === inputValue;

            if (keep) {
                count += 1;
            }

            return keep;
        });
}

class MyAutoComplete extends Component {
    state = {
       value: '',
       suggestions: [],
    };

    handleSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: getSuggestions(value, this.props.list),
        });
    };
    
    handleSuggestionsClearRequested = () => {
      this.setState({
        suggestions: [],
      });
    };
    
    handleChange = (event, { newValue }) => {
      this.setState({
        value: newValue,
      });
    };

    render() {
        const { classes } = this.props;

        return (
            <Autosuggest
                theme={{
                        container: classes.container,
                        suggestionsContainerOpen: classes.suggestionsContainerOpen,
                        suggestionsList: classes.suggestionsList,
                        suggestion: classes.suggestion,
                    }}
                renderInputComponent={renderInput}
                suggestions={this.state.suggestions}
                onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
                renderSuggestionsContainer={renderSuggestionsContainer}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={{
                        autoFocus: true,
                        classes,
                        placeholder: this.props.hintText,
                        value: this.state.value,
                        onChange: this.handleChange,
                        label: this.props.label
                    }}
            />
        )
    }
}


export default MyAutoComplete