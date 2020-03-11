'use strict';
let  UserFormElements, SelectedElemId;

const appConfig = {
    animation: 150
};

(() => {

    UserFormElements = [];
        
    Sortable.create(document.getElementById('page-element'), {
        group: {
            name: 'page',
            pull: 'clone',
            put: false
        },
        sort: false,
        animation: appConfig.animation,
        ghostClass: 'dragging'
    });

    Sortable.create(document.getElementById('section-element'), {
        group: {
            name: 'section',
            pull: 'clone',
            put: false
        },
        sort: false,
        animation: appConfig.animation,
        ghostClass: 'dragging'
    });

    Sortable.create(document.getElementById('row-element'), {
        group: {
            name: 'row',
            pull: 'clone',
            put: false
        },
        sort: false,
        animation: appConfig.animation,
        ghostClass: 'dragging'
    });

    Sortable.create(document.getElementById('control-element'), {
        group: {
            name: 'control',
            pull: 'clone',
            put: false
        },
        sort: false,
        animation: appConfig.animation,
        ghostClass: 'dragging'
    });

    Sortable.create(document.getElementById('form-output'), {
        group: {
            name: 'page',
            put: ['page']
        },
        sort: true,
        animation: appConfig.animation,
        onAdd: AddFormPage,
        ghostClass: 'dragging'
    });

    document.querySelector('#btn-preview').addEventListener('click', () => {
        document.querySelector('#form-output').classList.toggle('preview-mode');
    });

    document.querySelector('#body-properties').addEventListener('change', e => {
        if (e.target) {
            UpdateControlElement();
        }
    });

})();

async function AddFormPage(e) {
    let elemId = UUID();
    e.item.dataset.elemId = elemId;
    UserFormElements.push(new PageContainer({ElemId: elemId}));

    let elem = e.item.querySelector('.element-container');
    Sortable.create(elem, {
        group: {
            name: 'section',
            put: ['section']
        },
        sort: true,
        animation: appConfig.animation,
        onAdd: AddFormSection,
        ghostClass: 'dragging'
    });
}

async function AddFormSection(e) {   
    let elemId = UUID();
    e.item.dataset.elemId = elemId;
    UserFormElements.push(new SectionContainer({ElemId: elemId}));
    
    let elem = e.item.querySelector('.element-container');
    Sortable.create(elem, {
        group: {
            name: 'row',
            put: ['row']
        },
        sort: true,
        animation: appConfig.animation,
        onAdd: AddFormRow,
        ghostClass: 'dragging'
    });
}

async function AddFormRow(e) {
    let elemId = UUID();
    e.item.dataset.elemId = elemId;
    UserFormElements.push(new RowContainer({ElemId: elemId}));

    let elem = e.item.querySelector('.element-container');
    Sortable.create(elem, {
        group: {
            name: 'control',
            put: ['control']
        },
        sort: true,
        animation: appConfig.animation,
        onAdd: AddFormControl,
        onChoose: SelectElement
    });
}

async function AddFormControl(e) {
    let elemId = UUID();
    e.item.dataset.elemId = elemId;    
    UserFormElements.push(new ControlContainer({ ElemId: elemId }));

    await SelectElement(e);
    UpdateControlElement();
}

async function ReadControlConfig() {
    return {
        Type: Number.parseInt(ReadFormValue('fb-inType')),
        Id: ReadFormValue('fb-inId'),
        Size: Number.parseInt(ReadFormValue('fb-inSize')),
        Label: ReadFormValue('fb-inLabel'),
        Value: ReadFormValue('fb-inValue'),
        Placeholder: ReadFormValue('fb-inPlaceholder'),
        Required: ReadFormValue('fb-inRequired'),
        Readonly: ReadFormValue('fb-inReadonly'),
        Disabled: ReadFormValue('fb-inDisabled'),
        Loading: ReadFormValue('fb-inLoading')
    };
}

function ReadFormValue(id) {
    let input = document.getElementById(id);
    if (!input) { return null; }
    return input.type == 'checkbox' || input.type == 'radio' ? input.checked : input.value;
}

async function UpdateControlElement() {
    let item = document.querySelector(`.element-card[data-elem-id="${SelectedElemId}"]`);
    let config = await ReadControlConfig();
    UserFormElements.find(e => e.ElemId == SelectedElemId).Control = config;
    item.querySelector('.element-container').innerHTML = await GetControl(config);    
}

async function SelectElement(e) {
    document.querySelectorAll('.element-card.selected')
        .forEach(elem => elem.classList.remove('selected'));
    e.item.classList.add('selected');

    SelectedElemId = e.item.dataset.elemId;
    let elem = UserFormElements.find(el => el.ElemId == SelectedElemId);
    if (elem.Type == ContainerType.Control) {
        document.querySelector('#body-properties').innerHTML =
        await FormBuilder.RenderControlForm(elem.Control);
    }
}

async function BindBodyProperties(elemId) {
    
}

async function GetControl(control) {
    
    let elem;
    switch (control.Type) {
        case ControlType.Card: elem = new CardContainer(); break;
        case ControlType.Section: elem = new SectionContainer(); break;
        case ControlType.Checkbox: elem = new CheckboxInput(control); break;
        case ControlType.Date: elem = new DateInput(control); break;
        case ControlType.Datetime: elem = new DatetimeInput(control); break;
        case ControlType.Email: elem = new EmailInput(control); break;
        case ControlType.Number: elem = new NumberInput(control); break;
        case ControlType.Password: elem = new PasswordInput(control); break;
        case ControlType.Text: elem = new TextInput(control); break;
        case ControlType.Select: elem = new SelectInput(control); break;
    }
    return elem.Render();
}

function SwitchTab(id) {
    document.querySelectorAll('.tabs li').forEach(elem => elem.classList.remove('is-active'));
    document.querySelectorAll('.tab-body').forEach(elem => elem.classList.add('is-hidden'));
    
    let tab = document.getElementById(id);
    tab.classList.add('is-active');
    document.getElementById(tab.dataset.target).classList.remove('is-hidden');
}

function Sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

function UUID() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}