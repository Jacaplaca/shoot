import React from "react";
import PropTypes from "prop-types";
import Autosuggest from "react-autosuggest";
import EventListener, { withOptions } from "react-event-listener";
import { withStyles } from "@material-ui/core/styles";
import { dynamicSort, fetchDB, fetchDBall } from "../functions/functions";
import { simpleSuggestion } from "./Suggestions";
// import SuggestionsContainer from "./SuggestionsContainer";
import InputSelectTextField from "./InputSelectTextField";
// import TextField from "@material-ui/core/TextField";
import UpDownButton from "../skins/UpDownButton";

// https://codepen.io/moroshko/pen/KVaGJE debounceing loading

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getSuggestionValue(suggestion) {
  //console.log("getSuggestionValue");
  return suggestion.name;
}

function shouldRenderSuggestions() {
  return true;
}

const styles = theme => ({
  root: {
    // height: 250,
    width: "100%",
    // flexGrow: 1,
    marginBottom: theme.spacing.unit / 2
  },
  container: {
    position: "relative"
  },
  suggestionsContainerOpen: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
    maxHeight: 300,
    overflowY: "auto",
    background: "white",
    boxShadow: theme.shadows[5]
  },
  suggestion: {
    display: "block"
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: "none"
  },
  divider: {
    height: theme.spacing.unit * 1
  }
  // input: {
  //   margin: 44
  // }
});

class InputSelectBaza extends React.Component {
  //suggestionsRef = React.createRef();

  state = {
    //error: "Wpisz poprawną datę",
    value: "",
    single: "",
    popper: "",
    suggestions: [],
    // suggestions: [{ id: 1, name: "aaa", value: "aaa111" }],
    isloading: false,
    fetchowane: [],
    fetchowaneRest: null,
    offset: 0,
    openSuggestions: true
  };

  // componentDidMount() {
  //   window.addEventListener("click", console.log(e), false);
  // }

  renderSuggestionsContainer = ({ containerProps, children, query }) => {
    const { suggestions, fetchowane, offset, fetchowaneRest } = this.state;
    const { object } = this.props;
    // console.log("renderSuggestionsContainer", query, suggestions);
    return (
      <div>
        <div {...containerProps}>
          {children && offset > 0 && !object && (
            <UpDownButton
              icon={"ExpandLess"}
              onClick={() => this.handleUp(query)}
            />
          )}
          {children}
          {children && fetchowaneRest && !object && (
            <UpDownButton
              onClick={() => this.handleDown(query)}
              icon={"ExpandMore"}
            />
          )}
        </div>
      </div>
    );
  };

  handleUp = query => {
    this.changeOffset(-1, query);
  };

  handleDown = query => {
    this.changeOffset(1, query);
    this.suggestions.scrollTo(0, 0);
  };

  changeOffset = async (direction, query) => {
    const { offset, fetchowane } = this.state;
    const addToState = async () => {
      this.setState({ offset: offset + this.props.limit * direction }, () => {
        this.onSuggestionsFetchRequested({ value: query });
      });
    };
    if (fetchowane.length >= this.props.limit && direction === 1) {
      addToState();
    } else if (direction === -1) {
      addToState();
    }
  };

  onChange2 = e => {
    // console.log("onChange2", e);
    let newValue = "";
    if (e.type === "click") {
      console.log(e.target);
      newValue = e.target.textContent;
      // this.setState({ openSuggestions: false });
    } else {
      newValue = e.target.value;
      this.setState({ openSuggestions: true });
    }
    // console.log("onChange2", newValue);
    if (newValue.length > 4) {
      this.suggestions.scrollTo(0, 300);
    }
    this.setState({
      value: newValue
      // openSuggestions: e.type === "click" ? false : true
    });
    const wybrano = this.state.fetchowane.filter(x => x.name === newValue)[0];
    // console.log(wybrano);
    let input = {
      target: {
        // value: wybrano ? wybrano.id : newValue,
        // value: newValue,
        // value: wybrano._id,
        value: e.target.title,
        name: this.props.name,
        text: wybrano ? wybrano.name : newValue,
        type: "inputSelectBaza"
      }
    };
    newValue !== ""
      ? this.setState({ clear: true })
      : this.setState({ clear: false });

    this.props.wybrano(input);
    this.onSuggestionsFetchRequested({ value: newValue });
  };

  loadSuggestions = async (value, fetched) => {
    // console.log("loadSuggestions", value, fetched);
    let fetchowane;
    let fetchowaneRest;
    if (this.props.object) {
      fetchowane = this.props.object;
    } else {
      fetchowane = this.props.reverse
        ? fetched
            //.sort(dynamicSort("name"))
            .splice(0, this.props.limit)
            .reverse()
        : fetched.sort(dynamicSort("name")).splice(0, this.props.limit);
      fetchowaneRest = this.props.reverse
        ? fetched
            //.sort(dynamicSort("name"))
            .splice(0, 1)
            .reverse()
        : fetched.sort(dynamicSort("name")).splice(0, 5);
    }
    this.setState({
      fetchowane,
      fetchowaneRest:
        fetchowaneRest && fetchowaneRest.length === 0 ? null : fetchowaneRest,
      isloading: false,
      suggestions: this.getSuggestions(fetchowane, value, this.props.names)
    });
  };

  getSuggestions = (fetchowane, value, names) => {
    // console.log("getSuggestions", value, fetchowane, names);
    const regex = new RegExp(value.toLowerCase());
    let filtered = [];

    for (let field of names) {
      filtered.push(
        ...fetchowane.filter(suggestion =>
          regex.test(suggestion[field].toLowerCase())
        )
      );
    }
    return filtered.reduce((x, y) => (x.includes(y) ? x : [...x, y]), []);
  };

  onSuggestionsFetchRequested = async ({ value }) => {
    // console.log(
    //   `onSuggestionsFetchRequested value: ${value}`,
    //   this.props.object
    // );
    let fetchedFromDB;
    if (value.length >= this.props.startAfter) {
      // console.log(value);
      if (this.props.object) {
        this.loadSuggestions(value, this.props.object);
      } else {
        this.setState({ isloading: true });
        if (this.props.limit === 999999) {
          fetchedFromDB =
            this.state.fetchowane.length === 0
              ? await fetchDBall(this.props.name)
              : this.state.fetchowane;
        } else {
          fetchedFromDB = await fetchDB(
            value,
            this.state.offset,
            this.props.name,
            this.props.limit
          );
        }
        fetchedFromDB && this.loadSuggestions(value, fetchedFromDB);
      }
    }
  };

  onSuggestionsClearRequested = () => {
    // console.log("onSuggestionsClearRequested");
    this.setState({
      suggestions: [],
      offset: 0
    });
  };

  storeInputReference = autosuggest => {
    if (autosuggest !== null) {
      this.input = autosuggest.input;
      this.suggestions = autosuggest.suggestionsContainer;
    }
  };

  clicked = e => {
    // console.log("clicked", e.target);
    if (e.target.name !== this.props.name) {
      this.setState({ openSuggestions: false });
    }
  };

  render() {
    const {
      classes,
      label,
      placeholder,
      value: valueProps,
      error,
      suggestion,
      wybrano
      // disabled
    } = this.props;
    const { suggestions, value, single, isloading } = this.state;

    const inputProps = {
      //autoFocus: focus,
      label: error ? "Wybierz poprawną datę" : isloading ? "Szukam..." : label,
      placeholder,
      classes,
      // value: valueProps,
      value,
      onChange: this.onChange2,
      error,
      //clearvalue: this.clearvalue,
      isloading,
      name: this.props.name
      // isloading:
      //   this.props.isloading === undefined ? isloading : this.props.isloading
    };

    const Field = () => {
      return (
        <InputSelectTextField
          value={this.state.value}
          // value={valueProps}
          // onChange={this.onChange}
          onChange={e => this.onChange2(e)}
          // onChange={e => console.log(e.target.value)}
          // onChange={}
          name={this.props.name}
          label={label}
          ref={this.storeInputReference}
          onClick={() =>
            this.setState({
              suggestions: this.props.object,
              openSuggestions: true
            })
          }
        />
      );
    };

    return (
      <React.Fragment>
        <EventListener target={document} onClick={this.clicked} />
        <Autosuggest
          focusInputOnSuggestionClick
          alwaysRenderSuggestions={this.state.openSuggestions}
          //autoFocus={true}
          //focusInputOnSuggestionClick
          //alwaysRenderSuggestions={true}

          theme={{
            // renderInputComponent: classes.root,
            container: classes.container,
            suggestionsContainerOpen: classes.suggestionsContainerOpen,
            suggestionsList: classes.suggestionsList,
            suggestion: classes.suggestion
          }}
          // renderInputComponent={InputSelectTextField}
          renderInputComponent={Field}
          //renderInputComponent={InputSelectTextFieldOld}
          //renderInputComponent={InputComponent}
          //suggestions={suggestions.splice(0, 50)}
          // suggestions={this.props.object}
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          shouldRenderSuggestions={shouldRenderSuggestions}
          renderSuggestion={suggestion}
          inputProps={inputProps}
          renderSuggestionsContainer={this.renderSuggestionsContainer}
          //renderSuggestionsContainer={SuggestionsContainer}
          ref={this.storeInputReference}
        />
      </React.Fragment>
    );
  }
}

InputSelectBaza.propTypes = {
  classes: PropTypes.object.isRequired,
  startAfter: PropTypes.number,
  suggestion: PropTypes.func,
  names: PropTypes.array
};

InputSelectBaza.defaultProps = {
  //error: false,
  //helperText: "",
  startAfter: 0,
  suggestion: simpleSuggestion,
  names: ["name"],
  clearOffset: () => {},
  limit: 999999
  //isloading: false
};

export default withStyles(styles)(InputSelectBaza);
