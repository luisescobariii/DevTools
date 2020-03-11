class SelectInput extends Control {

    /**
     * Creates a new Control with the given configuration
     * @param {object} config - The configuration for the control.
     * @param {string} config.Id - The identifier for the control.
     * @param {ControlSize} config.Size - The ControlSize of the control.
     * @param {string} config.Label - The label displayed on top of the control.
     * @param {string} config.Value - The default value for the control.
     * @param {string} config.Placeholder - The placeholder for the control.
     * @param {string} config.Icon - The Id of the icon for the control.
     * @param {boolean} config.Required - Whether the control is required.
     * @param {boolean} config.Readonly - Whether the control is readonly.
     * @param {boolean} config.Disabled - Whether the control is disabled.
     * @param {boolean} config.Loading - Whether the control is loading.
     * @param {string[]|object[]} config.Options - List of options available to select.
     * @param {string} config.Options[].Value - Value of the option.
     * @param {string} config.Options[].Text - Text of the option.
     * @param {boolean} config.Options[].Selected - True for the selected option.
     */
    constructor(config) {
        super(config);
        if (config.Options) {
            if (!Array.isArray(config.Options)) { throw 'Options is not iteratable'; }
            this.Options = config.Options;
        }
    }

    Render() {
        let labelElem = this.label != '' ? `<label class="label ${this.RenderSize()}">${this.Label}</label>` : '';
        let optionsElem = '';
        if (this.Options && this.Options.length > 0) {            
            if (typeof(this.Options[0]) == 'String') {
                optionsElem = this.Options.map(opt => `<option>${opt}</option>`).join('');
            } else {
                for (let option of this.Options) {
                    let selectedElem = option.Selected ? 'selected' : '';
                    optionsElem +=`<option value="${option.Value}" ${selectedElem}>${option.Text}</option>`;
                }
            }
        }        
        let idElem = this.Id != '' ? `id="${this.Id}"` : '';
        
        let html = 
        `<div class="field">
            ${labelElem}
            <div class="control ${this.RenderLoading()}" ${this.RenderRequired()} ${this.RenderReadonly()} ${this.RenderDisabled()}>                
                <div class="select ${this.RenderSize()}"><select ${idElem}>${optionsElem}</select></div>
            </div>
        </div>`;
        return html;
    }

}