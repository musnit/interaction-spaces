import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import Select from 'react-select';

import './BigBlocksSelector.css';
import './FancyLayout.css';

const selectedIcons = {
  tick: '/images/check-circle-blue.png',
  hide: '/images/dummy_icon.png',
};

const Selectable = props => (
  <div className="big-blocks-selectable">
    {
      props.iconURL &&
        (
          <img
            src={props.iconURL}
            style={props.imageStyle}
            className="big-blocks-selectable-icon"
          />
        )
    }
    {<div className="big-blocks-selectable-icon-underlay"></div>}
    {<div className="big-blocks-selectable-icon-underlay-cover"></div>}
    {
      props.selected && !props.singular && selectedIcons[props.selectedIcon] &&
        (
          <img
            src={selectedIcons[props.selectedIcon]}
            className="big-blocks-selected-icon"
          />
        )
    }
    <div
      className={
        `big-blocks-selectable-labels ${!props.iconURL
          ? 'big-blocks-selectable-labels-noimage'
          : ''}`
      }
    >
      <div>{props.label}</div>
      {
        props.subtext &&
          <div className="big-blocks-selectable-subtext">{props.subtext}</div>
      }
    </div>
  </div>
);

const SearchBar = props => (
  <Select
    className="big-blocks-selectable-search"
    name="search"
    value={undefined}
    options={props.options}
    onChange={props.onChange}
    placeholder={(
        <span>
          <img
            style={{width: '20px', height: '20px'}}
            src={'/images/search.png'}
            className="big-blocks-search-icon"
          />Search
        </span>
      )}
  />
);

const defaultStyle = { width: '100%', position: 'relative' };

const clearButtonStyle = {
  bottom: '25px',
  right: '25px',
  position: 'absolute',
  zIndex: '1',
  background: 'rgba(25, 168, 153, 0.82)',
}

const defaultSelectableStyle = {
  width: '20%',
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '30px',
};

const defaultSelectionsStyle = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  maxHeight: '500px',
  overflowY: 'scroll',
};

const defaultButtonStyle = {
  height: 'auto',
  marginRight: 'auto',
  marginLeft: 'auto',
  background: 'none',
  color: '#999999',
  fontSize: '16px',
  outline: 'none !important',
};

const defaultImageStyle = {
  border: 'solid 2px #e6e6e6',
  width: 110,
  height: 110,
  objectFit: 'contain',
  marginBottom: 10,
  padding: 20,
};

class BigBlocksSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selections: props.selectables.reduce((accum, selectable) => {
        accum[selectable.value] = { selected: false };
        return accum;
      }, {}),
      numSelections: 0,
    };
    this.initializeWith(this.props.input.value)
  }

  initializeWith(initialData) {
    if (Array.isArray(this.props.input.value)) {
      const initialSelections = this.props.input.value;
      this.state.numSelections = initialSelections.length;
      initialSelections.forEach(selection => {
        this.state.selections[selection.value] = {
          selected: true,
          level: selection.level
        }
      });
    }
  }

  singularToggle = value => {
    const cleanSelections = this.props.selectables.reduce(
      (accum, selectable) => {
        accum[selectable.value] = {
          selected: false,
          level: this.state.selections[selectable.value].level,
        };
        return accum;
      },
      {},
    );
    cleanSelections[value].selected = true;
    this.onChange(cleanSelections);
  };

  toggle = value => {
    if (this.props.singular) {
      this.singularToggle(value);
      return;
    }
    const selections = this.state.selections;
    const oldSelected = this.state.selections[value].selected;
    const oldLevel = this.state.selections[value].level;
    let newSelection = {};
    newSelection[value] = { selected: !oldSelected, level: oldLevel };
    const newSelections = Object.assign({}, selections, newSelection);
    const numSelections = this.state.numSelections + (oldSelected ? -1 : 1);
    this.onChange(newSelections, numSelections);
  };

  levelChanged = value => level => {
    const selections = this.state.selections;
    const oldSelected = this.state.selections[value].selected;
    let newSelection = {};
    newSelection[value] = {
      selected: oldSelected,
      level: level && level.value,
    };
    const newSelections = Object.assign({}, selections, newSelection);
    this.onChange(newSelections);
  };

  clear = _ => {
    const clearedSelections = Object.keys(this.state.selections).reduce((accum, key) => {
      accum[key] = { selected: false };
      return accum;
    }, {});
    this.onChange(clearedSelections, 0);
  }

  search = selectable => {
    const label = (selectable.label || '').toLowerCase();
    const searchText = (this.refs.search && this.refs.search.value ||
      '').toLowerCase();
    return label.includes(searchText);
  };

  onChange = (newSelections, numSelections) => {
    let newState = { selections: newSelections };

    if (numSelections !== undefined) {
      newState.numSelections = numSelections;
    }

    this.setState(newState);

    let currentSelectables = this.props.selectables
      .filter(
        item =>
          item.label in newSelections && newSelections[item.label].selected,
      )
      .map(item => Object.assign({}, item, { level: newSelections[item.label].level }));

    if (this.props.input && this.props.input.onChange) {
      this.props.input.onChange(currentSelectables);
    }

    if (this.props.onChangeSelection) {
      this.props.onChangeSelection(currentSelectables);
    }
  };

  updateSearch = () => {
    this.setState({ searchText: this.refs.search && this.refs.search.value });
  };

  render() {
    const numColumns = this.props.numColumns || 5;
    const selectedIcon = this.props.selectedIcon || 'tick';
    const computedStyle = Object.assign({}, defaultStyle, this.props.style);
    const computedSelectableStyle = Object.assign(
      {},
      defaultSelectableStyle,
      this.props.selectableStyle,
      { width: 100 / numColumns + '%' },
    );
    const computedSelectionsStyle = Object.assign(
      {},
      defaultSelectionsStyle,
      this.props.selectionsStyle,
    );
    const computedButtonStyle = Object.assign(
      {},
      defaultButtonStyle,
      this.props.buttonStyle,
    );
    const computedImageStyle = Object.assign(
      {},
      defaultImageStyle,
      this.props.imageStyle,
    );
    const filteredSelectables = this.props.searchable
      ? this.props.selectables.filter(this.search)
      : this.props.selectables;
    const maxSelected = this.props.max &&
      this.state.numSelections === this.props.max;
    const layoutCSS = 'big-blocks-selector-layout-' +
      (this.props.layout || 'normal');
    return (
      <div
        className={`big-blocks-selector ${layoutCSS ? layoutCSS : ''} ${numColumns ? 'col_'+ numColumns : ''}`}
        style={computedStyle}
      >
        {
          this.props.searchable &&
            (
              <SearchBar
                onChange={option => this.toggle(option.value)}
                options={this.props.selectables}
              />
            )
        }
        {!this.props.hideClearButton  && <Button onClick={this.clear} style={clearButtonStyle}>
          Clear All
        </Button>}
        <div
          className={
            `big-blocks-selector-selections ${maxSelected
              ? 'maximum-selected'
              : ''}`
          }
          style={computedSelectionsStyle}
        >
          {filteredSelectables.map(selectable => {
              const selected = this.state.selections[selectable.value].selected;
              const level = this.state.selections[selectable.value].level;
              const inverted = this.props.inverseSelection;
              return (
                <div
                  className={
                    `big-blocks-selectable-main ${selected
                      ? 'big-blocks-selectable-selected'
                      : ''}`
                  }
                  style={computedSelectableStyle}
                  key={selectable.value}
                >
                  <Button
                    className="big-blocks-button"
                    style={computedButtonStyle}
                    onClick={
                      !maxSelected || selected
                        ? () => this.toggle(selectable.value)
                        : _ => {}
                    }
                  >
                    <Selectable
                      iconURL={selectable.iconURL}
                      selectedIcon={selectedIcon}
                      imageStyle={computedImageStyle}
                      selected={selected}
                      label={selectable.label}
                      subtext={selectable.subtext}
                      singular={this.props.singular}
                    />
                  </Button>
                  {this.props.levels && (
                        <div className="big-blocks-levels-selector">
                          {
                            selected &&
                              (
                                <Select
                                  name="level"
                                  value={level}
                                  options={this.props.levels}
                                  onChange={this.levelChanged(selectable.value)}
                                />
                              )
                          }
                        </div>
                      )}
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

export default BigBlocksSelector;
