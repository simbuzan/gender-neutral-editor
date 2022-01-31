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

    //Add submit button
    const submit = document.createElement('button');
    submit.textContent = "Submit";
    submit.setAttribute("type", "button");
    //submit.setAttribute("onclick", this.submit());
    this.element.appendChild(submit);

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
    const form_div = document.createElement('div');
    form_div.setAttribute("id", "form_div");
    this.element.appendChild(form_div);

      const br1 = document.createElement("br");
      br1.textContent = "br1";
      br1.setAttribute("class", "br");

      const br2 = document.createElement("br");
      br2.textContent = "br2";
      br2.setAttribute("class", "br");

      const br3 = document.createElement("br");
      br3.textContent = "br3";
      br3.setAttribute("class", "br");

      const label1 = document.createElement("label");
      label1.textContent = "M";

      const input1 = document.createElement("input");
      input1.textContent = "M";
      input1.setAttribute("id", "masculine");
      input1.setAttribute("type", "text");

      input1.appendChild(label1);

      const label2 = document.createElement("label");
      label2.textContent = "F";

      const input2 = document.createElement("input");
      input2.textContent = "F";
      input2.setAttribute("id", "feminine");
      input2.setAttribute("type", "text");

      input2.appendChild(label2);

      const label3 = document.createElement("label");
      label3.textContent = "N";

      const input3 = document.createElement("input");
      input3.textContent = "N";
      input3.setAttribute("id", "neutral");
      input3.setAttribute("type", "text");

      input3.appendChild(label3);

      const form = document.createElement("form");
      form.textContent = "The form";
      form.setAttribute("id", "form");

      form.appendChild(input1);
      form.appendChild(br1);
      form.appendChild(input2);
      form.appendChild(br2);
      form.appendChild(input3);
      form.appendChild(br3);

      return form;
    }

    submit() {
      var masc_out = document.getElementById("masculine");
      var femn_out = document.getElementById("feminine");
      var neut_out = document.getElementById("neutral");

      var masc = masc_out.value;
      var femn = femn_out.value;
      var neut = neut_out.value;

      const node = document.createTextNode(`M: ${masc}, F: ${femn}, N: ${neut}`);

      return node;

    }

}
