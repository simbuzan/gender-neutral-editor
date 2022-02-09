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

        if (this.rightPanel.show()) { //on toggle open and close rightPanel
            this.rightPanel.hide();
        } else {
            this.rightPanel.show();
            const form = document.getElementById("form");
            form.addEventListener("submit", this.insertValues);
            //while(this.rightPanel.show()){
            console.log("...and again!");
            //form.onsubmit = function() {
            //this.insertValues();
            //}
            //}
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
    getInputs() {
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
    },

    //insert span into the editor
    insertValues(event) {
        event.preventDefault();
        let editor
        if (editor = atom.workspace.getActiveTextEditor()) {
            const form = document.getElementById("form");
            //form.onsubmit = function() {
            var selection
            let selections = editor.getSelections();
            if (selections.length >= 1) {
                selection = selections[0].getText(); //return the selected word, for multiple selections it should be the same word
            } else { //if nothing is selected
                selection = "";
            }
            console.log(`Got selection: ${selection}`)
            var masc = form.getElementsByTagName("input")[0].value;
            var femn = form.getElementsByTagName("input")[1].value;
            var neut = form.getElementsByTagName("input")[2].value;

            console.log(`M: ${masc}, F: ${femn}, N: ${neut}`);
            //if(selection === ""){ //take neutral as default
            //  editor.insertText(`<span data-first="${masc}" data-second="${femn}" data-third="${neut}" data-y="${neut}">' + ${neut} + '</span>`);
            //} else {
            editor.insertText(`<span data-first="${masc}" data-second="${femn}" data-third="${neut}" data-y="${neut}">' + ${selection} + '</span>`);
            //}
            //};
        }
    },

    //returns the most recent selected text
    getSelectedText() {
        let editor
        if (editor = atom.workspace.getActiveTextEditor()) {
            let selections = editor.getSelections();
            if (selections.length >= 1) {
                return selections[0].getText(); //return the selected word, for multiple selections it should be the same word
            } else { //if nothing is selected
                return "";
            }
        }
    }
};
