'use babel';

import GenderNeutralWebEditorView from './gender-neutral-web-editor-view';
import {
    CompositeDisposable
} from 'atom';
fs = require('fs');

export default {

    genderNeutralWebEditorView: null,
    rightPanel: null,
    subscriptions: null,

    activate(state) {
        this.genderNeutralWebEditorView = new GenderNeutralWebEditorView(state.genderNeutralWebEditorViewState);
        this.rightPanel = atom.workspace.addRightPanel({
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
        this.rightPanel.destroy();
        this.subscriptions.dispose();
        this.genderNeutralWebEditorView.destroy();
    },

    serialize() {
        return {
            genderNeutralWebEditorViewState: this.genderNeutralWebEditorView.serialize()
        };
    },

    toggle() {
        let raw = fs.readFileSync('C:/Users/Stefi/github/gender-neutral-web-editor/data/pronouns.json');
        let json = JSON.parse(raw);

        if (this.rightPanel.isVisible()) { //on toggle open and close rightPanel
            this.rightPanel.hide();
        } else {
            this.rightPanel.show();
            const form = document.getElementById("form");
            form.addEventListener("submit", this.insertValues);

            const update_button = document.getElementById("update_button");
            update_button.addEventListener("click", this.updateValues);

            const remove_button = document.getElementById("remove_button");
            remove_button.addEventListener("click", this.removeHTML);
        }
    },

    find_match(selection, json) {
        var neutralized
        for (const [pos, types] of Object.entries(json)) {
            for (const [type, dictionaries] of Object.entries(types)) { //iterate over the types of pronouns: personal, possesive...
                for (var dict_index = 0; dict_index < dictionaries.length; dict_index++) { //iterate over the dictionaries {m: , f: , n:}, {...}, ...
                    for (const [key, value] of Object.entries(dictionaries[dict_index])) { //iterate over k,v pairs m: , f: , n:
                        if (selection === value) {
                            var match = Object.entries(dictionaries[dict_index]); //current dictionary -> eg. [[m,er],[f,sie],[n,es]]
                            return neutralized = `<span data-first="${match[0][1]}" data-second="${match[1][1]}" data-third="${match[2][1]}" data-y="${match[2][1]}">' + ${selection} + '</span>`;
                        }
                    }
                }
            }
        }
        return null;
    },

    //get the inputs from the form - OBSOLETE
    /*getInputs() {
        var form = document.getElementById("form");
        var masc = form.getElementsByTagName("input")[0].value;
        var femn = form.getElementsByTagName("input")[1].value;
        var neut = form.getElementsByTagName("input")[2].value;

        console.log(`M: ${masc}, F: ${femn}, N: ${neut}`);

        let inputs = {
            "m": masc,
            "f": femn,
            "n": neut
        };
        return inputs;
    },*/

    //insert span into the editor
    insertValues(event) {
        event.preventDefault();
        let editor
        if (editor = atom.workspace.getActiveTextEditor()) {
            const form = document.getElementById("form");

            //get selected text
            var selection
            let selections = editor.getSelections();
            if (selections.length >= 1) {
                selection = selections[0].getText(); //return the selected word, for multiple selections it should be the same word
            } else { //if nothing is selected
                selection = "";
            }
            console.log(`Got selection: ${selection}`)

            //get inputs
            var masc = form.getElementsByTagName("input")[0].value;
            var femn = form.getElementsByTagName("input")[1].value;
            var neut = form.getElementsByTagName("input")[2].value;

            let dataThird = "";
            let dataY = "";
            if(neut === "y" || neut === "ys"){
              //data-y is root+data-third
              dataY = neut;
              dataThird = `${masc}${dataY}`;
            } else {
              //data-third == data-y they're both a full word
              dataThird = dataY = neut;
            }

            console.log(`M: ${masc}, F: ${femn}, N: ${neut}`);
            console.log(`Selection: ${selection}`);

            if (selection === "" || selection.startsWith("<span")) { //take neutral as default
                editor.insertText(`<span data-first="${masc}" data-second="${femn}" data-third="${dataThird}" data-y="${dataY}">' ${dataThird} '</span>`);
            } else {
                editor.insertText(`<span data-first="${masc}" data-second="${femn}" data-third="${dataThird}" data-y="${dataY}">' ${selection} '</span>`);
            }
        }
    },

    //updates a span in editor
    updateValues(){
      //event.preventDefault();
      let editor
      if (editor = atom.workspace.getActiveTextEditor()) {
        var selection
        let selections = editor.getSelections();
        if (selections.length >= 1) {
          selection = selections[0].getText(); //return the selected span, for multiple selections it should be the same span
          let trimmed = selection.trim(); //trim whitespaces before and after //.replace(/\s/g, ""); //remove all white spaces
          let beginning = trimmed.substring(0, 5); //<span
          let isEnd = trimmed.endsWith("</span>"); //</span> -> boolean

          if(beginning === "<span" && isEnd){

            let femn;
            let masc;
            let neut;
            let y;
            let displayed;
            matches = [...trimmed.matchAll(/(["'])(?:\\.|[^\\])*?\1/g)];
              masc_span = matches[0][0].replace(/['"]+/g, '');
              femn_span = matches[1][0].replace(/['"]+/g, '');
              neut_span = matches[2][0].replace(/['"]+/g, '');

              var masc_form = form.getElementsByTagName("input")[0];
              var femn_form = form.getElementsByTagName("input")[1];
              var neut_form = form.getElementsByTagName("input")[2];

              masc_form.value = masc_span;
              femn_form.value = femn_span;
              neut_form.value = neut_span;
          } else {
            //please select the full span from <span ... to </span>
          }
        } else { //if nothing is selected
            //please select a span to update
        }
      }

    },

    removeHTML(){
      let editor
      if (editor = atom.workspace.getActiveTextEditor()) {
        var selection
        let selections = editor.getSelections();
        if (selections.length >= 1) {
          selection = selections[0].getText(); //return the selected span, for multiple selections it should be the same span
          let trimmed = selection.trim(); //trim whitespaces before and after //.replace(/\s/g, ""); //remove all white spaces
          let beginning = trimmed.substring(0, 5); //<span
          let isEnd = trimmed.endsWith("</span>"); //</span> -> boolean

          if(beginning === "<span" && isEnd){ //full span
            let displayed;
            matches = [...trimmed.matchAll(/(["'])(?:\\.|[^\\])*?\1/g)];
              displayed = matches[4][0].replace(/['"]+/g, '').trim();
              editor.insertText(displayed);
          }
        }
    }
  }

    //returns the most recent selected text
    /*getSelectedText() {
        let editor
        if (editor = atom.workspace.getActiveTextEditor()) {
            let selections = editor.getSelections();
            if (selections.length >= 1) {
                return selections[0].getText(); //return the selected word, for multiple selections it should be the same word
            } else { //if nothing is selected
                return "";
            }
        }
    }*/
};
