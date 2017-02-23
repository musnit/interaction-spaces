import React, { Component } from 'react';
import BigBlocksSelector from '~/src/components/big-blocks-selector/BigBlocksSelector';
import SortableDraggableButton from '~/src/components/draggable/SortableDraggableButton';
import {
  Modal,
  FormGroup,
  FormControl,
  ControlLabel,
  InputGroup,
  Button,
} from 'react-bootstrap';

const defaultStyles = {
  selectedBlockImage: {
    width: '45px',
    height: '45px',
    border: '1px solid #ccc',
    borderRadius: '23px',
    backgroundColor: '#eeeeee',
    display: 'flex'
  },
  selectedBlockText: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: '15px',
    color: '#8f8f8f',
    fontWeight: 200
  },
  selectorButton: {
    width: '100%',
    height: '45px',
    backgroundColor: 'transparent',
    border: '1px solid #ccc',
    color: '#ccc',
    borderRadius: '4px',
    display: 'flex',
    marginBottom: '5px'
  },
  selectorButtonError: {
    borderColor: '#a94442',
  },
  editButton: {
    color: 'rgb(204, 204, 204)',
    cursor: 'pointer',
    marginLeft: '15px'
  },
  label: {},
  previews: { display: 'flex', flexFlow: 'column' },
  main: {},
  selectedBlock: { display: 'flex', flexDirection: 'row', marginTop: '10px' },
  levelText: {
    marginLeft: '4px'
  },
};

const miniStyles = {
  main: Object.assign({}, defaultStyles.main, {}),
  selectedBlockImage: Object.assign({}, defaultStyles.selectedBlockImage, {
    width: '38px',
    height: '38px',
  }),
  selectedBlockText: Object.assign({}, defaultStyles.selectedBlockText, {}),
  selectorButton: Object.assign({}, defaultStyles.selectorButton, {}),
  editButton: Object.assign({}, defaultStyles.editButton, {}),
  label: Object.assign({}, defaultStyles.label, {
    fontSize: 14,
  }),
  previews: Object.assign({}, defaultStyles.previews, {
    fontSize: 12,
  }),
  selectedBlock: Object.assign({}, defaultStyles.selectedBlock, {}),
  levelText: Object.assign({}, defaultStyles.levelText, {}),
};

const top5Styles = {
  main: Object.assign({}, miniStyles.main, {
    textAlign: 'center',
  }),
  selectedBlockImage: Object.assign({}, miniStyles.selectedBlockImage, {
    marginLeft: 'auto',
    marginRight: 'auto'
  }),
  selectedBlockText: Object.assign({}, miniStyles.selectedBlockText, {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '5px',
  }),
  selectorButton: Object.assign({}, miniStyles.selectorButton, {}),
  editButton: Object.assign({}, miniStyles.editButton, {}),
  label: Object.assign({}, miniStyles.label, {}),
  previews: Object.assign({}, miniStyles.previews, {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }),
  selectedBlock: Object.assign({}, miniStyles.selectedBlock, {
    flexDirection: 'column'
  }),
  levelText: Object.assign({}, miniStyles.levelText, {
    display: 'block',
    marginLeft: '0px'
  }),
};

const themes = {
  default: defaultStyles,
  mini: miniStyles,
  top5: top5Styles,
  sortableDraggable: defaultStyles,
};

const SelectedBlock = props => {
  const styles = themes[props.theme || 'default'];
  return <div style={styles.selectedBlock}>
      <div
        style={styles.selectedBlockImage}
      >
        <img src={props.iconURL} style={{ width: '100%', height: '100%', objectFit: 'contain', margin: 'auto', padding: '5px' }} />
      </div>
      <div
        style={styles.selectedBlockText}
      >
        <span>{props.label}</span>
        <span style={styles.levelText}>{props.level? `(${props.level})` : ''}</span>
      </div>
    </div>;
};

const BigBlocksSelectorButton = props => {
  const styles = themes[props.theme || 'default'];
  return (
    <Button
      style={!props.hasError ? styles.selectorButton : Object.assign({}, styles.selectorButton, styles.selectorButtonError)}
      onClick={props.onClick}
      className={"header-button " + props.className}
    >
      <img src={'/images/add-image.png'} style={{ width: '14px', height: 'auto', marginTop: 'auto', marginBottom: 'auto', marginLeft: '5px', marginRight: '10px' }} />
      Select {props.label}
    </Button>
  );
};

const EditButton = props => {
  const styles = themes[props.theme || 'default'];
  return (
    <span
      className={props.className}
      style={styles.editButton}
      onClick={props.onClick}
    >
      Edit
    </span>
  );
};

export default class BlockSelectorControl extends Component {
  constructor(props) {
    super(props);
    this.state = { showOverlay: false, selected: [] };
  }

  componentDidMount() {
    if (this.props.input && this.props.input.value) {
      this.setState({ selected: this.props.input.value })
    }
    if (!this.props.input && this.props.value) {
      this.setState({ selected: this.props.value })
    }
  }

  onChangeSelection(selected) {
    this.setState({ selected: selected });
  }

  close = _ => {
    let levelsFilled = true;
    this.state.selected.forEach((item) => levelsFilled = levelsFilled && !!item.level);
    if (this.props.levelsRequired && !levelsFilled) {
      return alert(`Please add your level of expertise for each of your ${this.props.children.toLowerCase()}`);
    }
    this.closeModal();
  }

  closeModal = _ => {
    if(this.props.modal !== false) {
      if(this.props.overlayClosed) {
        this.props.overlayClosed();
      }
      this.setState({ showOverlay: false });
    }
  }

  showModal = _ => {
    this.setState({ showOverlay: true });
  }

  render() {
    const {
      placeholder,
      type,
      input,
      meta,
      icon,
      selectables,
      levels,
      modal,
      searchable,
      max,
      numColumns,
      theme,
    } = this.props;
    const styles = themes[theme || 'default'];
    let selected = this.state.selected;
    const empty = this.state.selected.length === 0;

    const selector = <div style={{ width: '100%'}}>
      {meta && meta.error && (
        <div className="field-error">{"* " + meta.error}</div>
      )}
      <BigBlocksSelector
        hideClearButton
        onChangeSelection={selected => this.onChangeSelection(selected)}
        selectables={selectables}
        levels={levels}
        input={input}
        searchable={searchable}
        max={max}
        numColumns={numColumns}
        ref={(_bbs) => { this._bbs = _bbs; }}
      />
    </div>;

    let label;
    let previews;

    if (theme != 'sortableDraggable') {
      label = <ControlLabel style={styles.label}>{this.props.children}</ControlLabel>;
      previews = <div style={styles.previews}>
        {
          selected.map(
            selected => (
              <SelectedBlock
                key={selected.id}
                label={selected.label}
                level={selected.level}
                iconURL={selected.iconURL}
                theme={theme}
              />
            ),
          )
        }
      </div>;
    } else {
      label = <SortableDraggableButton
        name={this.props.children}
        canEdit={selected && selected.length > 0}
        showPlus={!selected || selected.length == 0}
        description={selected.map(s => s.label).join(', ')}
        onClick={this.showModal}
        />
      previews = undefined;
    }
    if (!input) {
      return <FormGroup style={styles.main}>{label}{previews}</FormGroup>
    }
    return (
      modal === false? selector : <FormGroup
        style={styles.main}
        controlId={input.name}
        validationState={meta.error ? 'error' : meta.success ? 'success' : null}
      >
        {label}
        {meta.error && (
          <div className="field-error">{"* " + meta.error}</div>
        )}
        {!empty && (theme != 'sortableDraggable') && <EditButton
          className={this.props.className}
          theme={theme}
          onClick={this.showModal}
        />}
        {empty && (theme != 'sortableDraggable') && <BigBlocksSelectorButton
          className={this.props.className}
          hasError={meta.error ? true: false}
          label={this.props.children}
          theme={theme}
          onClick={this.showModal}
        />}
        {previews}
        <Modal
          show={this.state.showOverlay}
          onHide={this.close}
        >
          <Modal.Header closeButton>
            <Modal.Title>Select {this.props.children}</Modal.Title>
          </Modal.Header>
            {selector}
          <Modal.Footer>
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              paddingLeft: '20px',
              paddingRight: '20px',
            }}>
              <Button
                disabled={!this.state.selected.length}
                className="btn-inverse"
                onClick={() => this._bbs.clear()}
              >
                Clear All
              </Button>
              <Button onClick={this.close}>
                Done
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
        {<FormControl.Feedback />}
      </FormGroup>
    );
  }
}
