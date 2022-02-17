'use babel';

export default class GenderNeutralWebEditorView {

    constructor(serializedState) {
        // Create root element
        this.element = document.createElement('div');
        this.element.classList.add('gender-neutral-web-editor');

        // Create message element
        const message = document.createElement('div');
        message.textContent = 'Please insert the masculine root, feminine suffix and y-alternative of this word.';
        message.classList.add('message');
        this.element.appendChild(message);

        //Create mini-form
        const form = this.createForm();
        this.element.appendChild(form);

        const update_button = document.createElement("button");
        update_button.textContent = "Update values";
        update_button.setAttribute("id", "update_button");
        update_button.style.display = "block";
        this.element.appendChild(update_button);

        const remove_button = document.createElement("button");
        remove_button.textContent = "Remove HTML";
        remove_button.setAttribute("id", "remove_button");
        remove_button.style.display = "block";
        this.element.appendChild(remove_button);
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
        this.appendInputLabel("root", form);

        //feminine label+input
        this.appendInputLabel("suffix", form);

        //neutral label+input
        this.appendInputLabel("yAlternative", form);

        const submit_button = document.createElement("input");
        submit_button.textContent = "Submit";
        submit_button.setAttribute("type", "submit");
        submit_button.setAttribute("id", "submit_button");
        submit_button.style.display = "block";
        form.appendChild(submit_button);

        return form;
    }

    appendInputLabel(data, form) {
        const label = document.createElement("label");
        label.setAttribute("for", `"${data}"`);

        const input = document.createElement("input");
        input.setAttribute("id", `"${data}"`);
        input.setAttribute("type", "text");
        input.setAttribute("placeholder", `${data}`)
        input.style.display = "block";
        input.required = true;

        form.appendChild(label);
        form.appendChild(input);
    }

}
