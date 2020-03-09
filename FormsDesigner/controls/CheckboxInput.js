class CheckboxInput extends Control {

    /**
     * Creates a new Control with the given configuration
     * @param {object} config - The configuration for the control.
     * @param {string} config.Id - The identifier for the control.
     * @param {ControlSize} config.Size - The ControlSize of the control.
     * @param {string} config.Label - The label displayed on top of the control.
     * @param {string} config.Value - The default value for the control.
     * @param {boolean} config.Required - Whether the control is required.
     * @param {boolean} config.Disabled - Whether the control is disabled.
     * @param {boolean} config.Checked - Whether the checkbox is checked by default.
     */
    constructor(config) {
        super(config);
        this.Checked = config.Checked;
    }

    Render() {
        if (this.Options && this.Options.length > 0) {
            if (typeof(this.Options[0]) == 'String') {
                optionsElem = this.Options.map(opt => `<option>${opt}</option>`).join('');
            } else {
                optionsElem = this.Options.map(opt => `<option value="${opt.Value}">${opt.Text}</option>`).join('');
            }
        }
        let idElem = this.Id != '' ? `id="${this.Id}"` : '';
        let html = 
        `<div class="field">
            <div class="control"  ${this.RenderReadonly()}>
                <label class="checkbox" ${this.RenderDisabled()}>
                    <input ${idElem} type="checkbox" ${this.RenderRequired()} ${this.RenderDisabled()}>
                    ${this.Label}
                </label>
            </div>
        </div>`;
        return html;
    }

}