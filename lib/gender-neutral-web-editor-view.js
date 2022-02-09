'use babel';

export default class GenderNeutralWebEditorView {

    constructor(serializedState) {
        // Create root element
        this.element = document.createElement('div');
        this.element.classList.add('gender-neutral-web-editor');

        // Create message element
        const message = document.createElement('div');
        message.textContent = 'Please insert the male, female and neutral form of this word.';
        message.classList.add('message');
        this.element.appendChild(message);

        //Create mini-form
        const form = this.createForm();
        this.element.appendChild(form);

        const close_button = document.createElement("button");
        close_button.textContent = "Close";
        close_button.setAttribute("id", "close_button");
        close_button.style.display = "block";
        this.element.appendChild(close_button);


    }

    // Returns an object that can be retrieved when package is activated
    serialize() {}

    // Tear down any state and detach
    destroy() {
        this.element.remove();
    }

    getElement() {
        return this.element;
    }

    createForm() {
        //form
        const form = document.createElement("form");
        form.setAttribute("id", "form");

        //masculine label+input
        this.appendInputLabel("masculine", form);

        //feminine label+input
        this.appendInputLabel("feminine", form);

        //neutral label+input
        this.appendInputLabel("neutral", form);

        const submit_button = document.createElement("input");
        submit_button.textContent = "Submit";
        submit_button.setAttribute("type", "submit");
        submit_button.setAttribute("id", "submit_button");
        submit_button.style.display = "block";
        form.appendChild(submit_button);

        return form;
    }

    appendInputLabel(gender, form) {
        const label = document.createElement("label");
        label.setAttribute("for", `"${gender}"`);

        const input = document.createElement("input");
        input.setAttribute("id", `"${gender}"`);
        input.setAttribute("type", "text");
        input.setAttribute("placeholder", `${gender}`)
        input.style.display = "block";
        input.required = true;

        form.appendChild(label);
        form.appendChild(input);
    }

}
