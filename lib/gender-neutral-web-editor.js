'use babel';

import GenderNeutralWebEditorView from './gender-neutral-web-editor-view';
import { CompositeDisposable } from 'atom';
fs = require('fs');

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

  //$("div.mw-parser-output h3 span.mw-headline em").text() <- on wiktionary get the artikel of any word
  toggle() {
    let raw = fs.readFileSync('C:/Users/Stefi/github/gender-neutral-web-editor/data/pronouns.json');
    let pronouns = JSON.parse(raw);
    console.log(pronouns);

    var found = false;
    let editor
    var neutralized
    if (editor = atom.workspace.getActiveTextEditor()){
      let selection = editor.getSelectedText()
      while(!found){
      for (var key in pronouns){ //iterate over the types of pronouns
        for(var array = 0; array < pronouns[key].length; array++){ //iterate over arrays
          for(var dictionary = 0; dictionary < array.length; dictionary++){ //iterate over dictionary
            for(var genus in dictionary){ //iterate over genders
              if(selection === dictionary[genus]){ //find matching value of genus key
                neutralized = `<span data-first="${dictionary["m"]}" data-second="${dictionary["f"]}" data-third="${dictionary["n"]}" data-y="${dictionary["n"]}">' + ${selection} + '</span>`
                found = true;
                break;
              }
            }
          }
        }
      }
    }
    //   if(selection === 'Psycholog:innen'){
    //     neutralized = '<span data-first="Psycholog" data-second="innen" data-third="ys" data-y="Psychologys">' + selection + '</span>'
    //   }
    //   switch (selection) {
    //     case 'Psycholog:innen':
    //       neutralized = '<span data-first="Psycholog" data-second="innen" data-third="ys" data-y="Psychologys">' + selection + '</span>'
    //       break
    //     case 'Expert:innen':
    //       neutralized = '<span data-first="Expert" data-second="innen" data-third="ys" data-y="Expertys">' + selection + '</span>'
    //       break
    //     case 'Schüler:innen':
    //       neutralized = '<span data-first="Schüler" data-second="innen" data-third="Schülys" data-y="Schülys">' + selection + '</span>'
    //       break
    //     case 'der:die':
    //       neutralized = '<span data-first="der" data-second="die" data-third="das" data-y="das">' + selection + '</span>'
    //       break
    //     case 'Lobende':
    //       neutralized = '<span data-first="Lobende" data-second="" data-third="Lobendy" data-y="Lobendy">' + selection + '</span>'
    //       break
    //     case 'Belohnende':
    //       neutralized = '<span data-first="Belohnende" data-second="" data-third="Belohnendy" data-y="Belohnendy">' + selection + '</span>'
    //       break
    //     case 'ein:e':
    //       neutralized = '<span data-first="ein" data-second="e" data-third="ein" data-y="ein">' + selection + '</span>'
    //       break
    //     case 'Gutachter:in':
    //       neutralized = '<span data-first="Gutachter" data-second="in" data-third="Gutachty" data-y="Gutachty">' + selection + '</span>'
    //       break
    //     case 'ihn:sie':
    //       neutralized = '<span data-first="ihn" data-second="sie" data-third="es" data-y="es">' + selection + '</span>'
    //       break
    //     case 'Übeltäter:in':
    //       neutralized = '<span data-first="Übeltäter" data-second="in" data-third="Übeltäty" data-y="Übeltäty">' + selection + '</span>'
    //       break
    //     default:
    //     neutralized = '**OOPS**'
    //   }
       editor.insertText(neutralized)
     }
  }

};
