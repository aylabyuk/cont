import React, { Component } from 'react'
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from 'material-ui/TextField';
import { MenuItem } from 'material-ui/Menu';
import { ListItemText } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
    container: {
      flexGrow: 1,
      position: 'relative',
      height: 60,
    },
    suggestionsContainerOpen: {
      position: 'absolute',
      marginTop: theme.spacing.unit,
      marginBottom: theme.spacing.unit * 3,
      left: 0,
      right: 0,
    },
    suggestion: {
      display: 'block',
    },
    suggestionsList: {
      margin: 0,
      padding: 0,
      listStyleType: 'none',
    },
    textField: {
      width: '100%',
    },
  });
  

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
        <ListItemText secondary={sub}/>
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
        
        let x = this.props.list.filter(item => (item.name === newValue.toUpperCase() ))
        if(x.length < 1) {
            this.props.setSelected({})
        }

        this.setState({
            value: newValue,
        });
    };

    handleSelected = (e, selected) => {
        this.props.setSelected(selected.suggestion)
    }

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
                onSuggestionSelected={this.handleSelected}
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


export default withStyles(styles)(MyAutoComplete)