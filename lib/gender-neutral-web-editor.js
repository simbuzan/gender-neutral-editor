'use babel';

import GenderNeutralWebEditorView from './gender-neutral-web-editor-view';
import { CompositeDisposable } from 'atom';

export default {

  genderNeutralWebEditorView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.genderNeutralWebEditorView = new GenderNeutralWebEditorView(state.genderNeutralWebEditorViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.genderNeutralWebEditorView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'gender-neutral-web-editor:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.genderNeutralWebEditorView.destroy();
  },

  serialize() {
    return {
      genderNeutralWebEditorViewState: this.genderNeutralWebEditorView.serialize()
    };
  },

  toggle() {
    console.log('GenderNeutralWebEditor was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
