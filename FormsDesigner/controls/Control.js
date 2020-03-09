'use strict';
const ControlType = { Checkbox: 0, Date: 1, Datetime: 2, Email: 3, Number: 4, Password: 5, Search: 6, Select: 7, Tel: 8, Text: 9, Textarea: 10, Time: 11, Card: 12, Section: 13 };
const ControlSize = { Small: 0, Normal: 1, Medium: 2, Large: 3 };

class Control {

    /**
     * Creates a new Control with the given configuration
     * @param {object} config The configuration for the control.
     * @param {string} config.Id The identifier for the control.
     * @param {ControlSize} [config.Size=Normal] The ControlSize of the control.
     * @param {string} config.Label The label displayed on top of the control.
     * @param {string} config.Value The default value for the control.
     * @param {string} config.Placeholder The placeholder for the control.
     * @param {string} config.Icon The Id of the icon for the control.
     * @param {boolean} config.Required Whether the control is required.
     * @param {boolean} config.Readonly Whether the control is readonly.
     * @param {boolean} config.Disabled Whether the control is disabled.
     * @param {boolean} config.Loading Whether the control is loading.
     */
    constructor(config) {
        if (!config) { config = {}; }
        let {Id, Size, Label, Value, Placeholder, Icon, Required, Readonly, Disabled, Loading} = config;

        if (typeof Size != 'undefined') {
            if (typeof(Size) == 'number') {
                if (Size >= 0 && Size < Object.keys(ControlSize).length) { this.Size = Size; }
                else { throw 'Invalid ControlSize: ' + size; }
            } else {
                if (ControlSize[Size]) { this.Size = ControlSize[Size]; }
                else { throw 'Invalid ControlSize: ' + size; }
            }
        } else {
            this.Size = ControlSize.Normal;
        }
        this.type = 'text';
        this.Id = Id || '';
        this.Icon = Icon || '';
        this.Label = Label || '';
        this.Value = Value || '';
        this.Placeholder = Placeholder || '';
        this.Icon = Icon || '';
        this.Required = Required || false;
        this.Readonly = Readonly || false;
        this.Disabled = Disabled || false;
        this.Loading = Loading || false;
    }

    RenderSize() {
        switch(this.Size) {
            case ControlSize.Small: return 'is-small';
            case ControlSize.Medium: return 'is-medium';
            case ControlSize.Large: return 'is-large';
            default: return '';
        }
    }
    RenderRequired() { return this.Required ? 'required' : ''; }
    RenderReadonly() { return this.Readonly ? 'readonly' : ''; }
    RenderDisabled() { return this.Disabled ? 'disabled' : ''; }
    RenderLoading() { return this.Loading ? 'is-loading' : ''; }

    Render() {
        let labelElem = this.label != '' ? `<label class="label  ${this.RenderSize()}">${this.Label}</label>` : '';
        let placeholderElem = this.Placeholder != '' ? `placeholder="${this.Placeholder}"` : '';
        let valueElem = this.Value != '' ? `value="${this.Value}"` : '';
        let idElem = this.Id != '' ? `id="${this.Id}"` : '';
        let html = 
        `<div class="field">
            ${labelElem}
            <div class="control ${this.RenderLoading()}" ${this.RenderRequired()} ${this.RenderReadonly()} ${this.RenderDisabled()}>
                <input ${idElem} class="input ${this.RenderSize()}" type="${this.Type}" ${placeholderElem} ${valueElem}>
            </div>
        </div>`;
        return html;
    }

}