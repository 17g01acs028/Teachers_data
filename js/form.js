function getValues() {
    const form = document.getElementById("myForm");
    const formElements = form.elements;

    const values = {};

    for (let i = 0; i < formElements.length; i++) {
        const element = formElements[i];

        if (element.name) {
            switch (element.type) {
                case 'checkbox':
                    values[element.name] = element.checked;
                    break;
                case 'radio':
                    if (element.checked) {
                        values[element.name] = element.value;
                    }
                    break;
                default:
                    values[element.name] = element.value;
                    break;
            }

            // Display both name and value
            console.log(element.name + ": " + values[element.name]); 
        }
    }
}
