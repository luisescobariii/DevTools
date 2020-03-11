class FormBuilder {

    /**
     * Creates a form to build a control.
     * @param {ControlType} controlType The ControlType Id.
     */
    static async RenderControlForm(config) {
        let extraProperties = [];
        switch (config.Type) {
            case ControlType.Select: extraProperties.push('Options'); break;
            case ControlType.Checkbox: extraProperties.push('Checked'); break;
        }
        
        let html = '';
        let typeOptions = [
            { Value: 0, Text: 'Checkbox' },
            { Value: 1, Text: 'Date' },
            { Value: 2, Text: 'Datetime' },
            { Value: 3, Text: 'Email' },
            { Value: 4, Text: 'Number' },
            { Value: 5, Text: 'Password' },
            { Value: 6, Text: 'Search' },
            { Value: 7, Text: 'Select' },
            { Value: 8, Text: 'Tel' },
            { Value: 9, Text: 'Text' },
            { Value: 10, Text: 'Textarea' },
            { Value: 11, Text: 'Time' }
        ];
        typeOptions.find(o => o.Value == config.Type).Selected = true;
        html += new SelectInput({ Id: 'fb-inType', Label: 'Type', Options: typeOptions }).Render();
        html += new TextInput({ Id: 'fb-inId', Label: 'ID', Value: config.Id }).Render(); 
        html += new TextInput({ Id: 'fb-inLabel', Label: 'Label', Value: config.Label }).Render();
        html += new TextInput({ Id: 'fb-inValue', Label: 'Value', Value: config.Value }).Render();
        html += new TextInput({ Id: 'fb-inPlaceholder', Label: 'Placeholder', Value: config.Placeholder }).Render();
        let sizeOptions = [
            { Value: 0, Text: 'Small' },
            { Value: 1, Text: 'Normal' },
            { Value: 2, Text: 'Medium' },
            { Value: 3, Text: 'Large' },
        ];
        sizeOptions.find(o => o.Value == config.Size).Selected = true;
        html += new SelectInput({ Id: 'fb-inSize', Label: 'Size', Options: sizeOptions }).Render();
        html += new CheckboxInput({ Id: 'fb-inRequired', Label: 'Required' }).Render();
        html += new CheckboxInput({ Id: 'fb-inReadonly', Label: 'Readonly' }).Render();
        html += new CheckboxInput({ Id: 'fb-inDisabled', Label: 'Disabled' }).Render();
        html += new CheckboxInput({ Id: 'fb-inLoading', Label: 'Loading' }).Render();

        if (extraProperties.includes('Options')) {
            html += new TextInput({ Id: 'fb-inOptions', Label: 'Options' }).Render();
        }

        if (extraProperties.includes('Checked')) {
            html += new CheckboxInput({ Id: 'fb-inChecked', Label: 'Checked' }).Render();
        }

        // Icon
        return html;
    }

}