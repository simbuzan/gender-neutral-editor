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
    let editor
    var neutralized
    if (editor = atom.workspace.getActiveTextEditor()){
      let selection = editor.getSelectedText()
      if(selection === 'Psycholog:innen'){
        neutralized = '<span data-first="Psycholog" data-second="innen" data-third="ys" data-y="Psychologys">' + selection + '</span>'
      }
      switch (selection) {
        case 'Psycholog:innen':
          neutralized = '<span data-first="Psycholog" data-second="innen" data-third="ys" data-y="Psychologys">' + selection + '</span>'
          break
        case 'Expert:innen':
          neutralized = '<span data-first="Expert" data-second="innen" data-third="ys" data-y="Expertys">' + selection + '</span>'
          break
        case 'Schüler:innen':
          neutralized = '<span data-first="Schüler" data-second="innen" data-third="Schülys" data-y="Schülys">' + selection + '</span>'
          break
        case 'der:die':
          neutralized = '<span data-first="der" data-second="die" data-third="das" data-y="das">' + selection + '</span>'
          break
        case 'Lobende':
          neutralized = '<span data-first="Lobende" data-second="" data-third="Lobendy" data-y="Lobendy">' + selection + '</span>'
          break
        case 'Belohnende':
          neutralized = '<span data-first="Belohnende" data-second="" data-third="Belohnendy" data-y="Belohnendy">' + selection + '</span>'
          break
        case 'ein:e':
          neutralized = '<span data-first="ein" data-second="e" data-third="ein" data-y="ein">' + selection + '</span>'
          break
        case 'Gutachter:in':
          neutralized = '<span data-first="Gutachter" data-second="in" data-third="Gutachty" data-y="Gutachty">' + selection + '</span>'
          break
        case 'ihn:sie':
          neutralized = '<span data-first="ihn" data-second="sie" data-third="es" data-y="es">' + selection + '</span>'
          break
        case 'Übeltäter:in':
          neutralized = '<span data-first="Übeltäter" data-second="in" data-third="Übeltäty" data-y="Übeltäty">' + selection + '</span>'
          break
        default:
        neutralized = '**OOPS**'
      }
      editor.insertText(neutralized)
    }
  }

};
