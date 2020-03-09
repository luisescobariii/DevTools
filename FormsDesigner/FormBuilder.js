class FormBuilder {

    /**
     * Creates a form to build a control.
     * @param {ControlType} controlType The ControlType Id.
     */
    static async RenderControlForm(controlType) {
        let extraProperties = [];
        switch (controlType) {
            case ControlType.Select: extraProperties.push('Options'); break;
            case ControlType.Checkbox: extraProperties.push('Checked'); break;
        }
        
        let html = '';
        html += new TextInput({ Id: 'fb-inId', Label: 'ID' }).Render(); 
        html += new TextInput({ Id: 'fb-inLabel', Label: 'Label' }).Render();
        html += new TextInput({ Id: 'fb-inValue', Label: 'Value' }).Render();
        html += new TextInput({ Id: 'fb-inPlaceholder', Label: 'Placeholder' }).Render();
        html += new SelectInput({ Id: 'fb-inSize', Label: 'Size',
            Options: [
                { Value: 0, Text: 'Small' },
                { Value: 1, Text: 'Normal' },
                { Value: 2, Text: 'Medium' },
                { Value: 3, Text: 'Large' },
            ]
        }).Render();
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