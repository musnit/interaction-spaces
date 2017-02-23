import ImageUploader from './components/ImageUploader';
import CheckboxControl from './components/CheckboxControl';
import BlockSelectorControl from './components/BlockSelectorControl';
import DropdownSelectControl from './components/DropdownSelectControl';
import TextAreaControl from './components/TextAreaControl';
import MultiLineTextControl from './components/MultiLineTextControl';
import SortableDraggableControl from './components/SortableDraggableControl';
import SliderControl from './components/SliderControl';

export const sequelizeTypeMapping = {
  STRING: { type: 'string' },
  BOOLEAN: { type: 'checkbox' }
}

export const typeComponentMapping = {
  image: ImageUploader,
  checkbox: CheckboxControl,
  blockSelector: BlockSelectorControl,
  dropdownSelect: DropdownSelectControl,
  textArea: TextAreaControl,
  multiLineText: MultiLineTextControl,
  sortableDraggable: SortableDraggableControl,
  slider: SliderControl,
};

export const readOnlyTypeComponentMapping = {
  blockSelector: BlockSelectorControl,
  dropdownSelect: DropdownSelectControl,
};
