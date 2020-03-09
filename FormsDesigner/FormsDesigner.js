let DragData, UserForm, UserFormControls;

const config = {
    animation: 150
};

(() => {
    UserForm = {
        pages: []
    };

    USerFormControls = [];
    
    // document.querySelectorAll('.card[draggable="true"]').forEach(elem => {
    //     elem.addEventListener('dragstart', DragElement);
    //     elem.addEventListener('dragend', HideTargets);
    // });
    
    Sortable.create(document.getElementById('page-element'), {
        group: {
            name: 'page',
            pull: 'clone',
            put: false
        },
        sort: false,
        animation: config.animation,
        ghostClass: 'dragging'
    });

    Sortable.create(document.getElementById('section-element'), {
        group: {
            name: 'section',
            pull: 'clone',
            put: false
        },
        sort: false,
        animation: config.animation,
        ghostClass: 'dragging'
    });

    Sortable.create(document.getElementById('row-element'), {
        group: {
            name: 'row',
            pull: 'clone',
            put: false
        },
        sort: false,
        animation: config.animation,
        ghostClass: 'dragging'
    });

    Sortable.create(document.getElementById('control-element'), {
        group: {
            name: 'control',
            pull: 'clone',
            put: false
        },
        sort: false,
        animation: config.animation,
        ghostClass: 'dragging'
    });

    Sortable.create(document.getElementById('form-output'), {
        group: {
            name: 'page',
            put: ['page']
        },
        sort: true,
        animation: config.animation,
        onAdd: AddFormPage,
        ghostClass: 'dragging'
    });

})();

async function AddFormPage(e) {
    let elem = e.item.querySelector('.element-container');
    Sortable.create(elem, {
        group: {
            name: 'section',
            put: ['section']
        },
        sort: true,
        animation: config.animation,
        onAdd: AddFormSection,
        ghostClass: 'dragging'
    });
}

async function AddFormSection(e) {   
    let elem = e.item.querySelector('.element-container');
    Sortable.create(elem, {
        group: {
            name: 'row',
            put: ['row']
        },
        sort: true,
        animation: config.animation,
        onAdd: AddFormRow,
        ghostClass: 'dragging'
    });
}

async function AddFormRow(e) {   
    let elem = e.item.querySelector('.element-container');
    Sortable.create(elem, {
        group: {
            name: 'control',
            put: ['control']
        },
        sort: true,
        animation: config.animation,
        onAdd: AddFormControl,
        ghostClass: 'dragging'
    });
}

async function AddFormControl(e) {  
    console.log(e.item);
}

async function UpdateFormPage(e) {
    UserForm.pages.find(p => p.index == e.oldIndex);
    
}

async function RenderUserForm() {
    console.clear();
    console.log(UserForm);
    
    let html = '';
    for (let page of UserForm.pages) {
        html += await RenderFormPage(page);
    }
    
    document.getElementById('form-output').innerHTML = html;
}

async function RenderFormSection(page) {
    let html = '';
    for (let section of page.sections) {
        html += await RenderFormSection(section);
    }
    return html;
}

async function RenderFormSection(section) {
    let html = '';
    for (let row of section.rows) {
        html += await RenderFormRow(row);
    }
    return html;
}

async function RenderFormRow(row) {
    let html = '';
    for (let control of row.controls) {
        html += await GetControl(control);
    }
    return html;
}

function HideTargets(e) {
    document.querySelectorAll('.drop-area').forEach(elem => elem.classList.remove('valid'));
}

function DragElement(e) {
    DragData = e.target.dataset.selection;
    document.querySelectorAll('.drop-area').forEach(elem => {
        if (!elem.dataset.valids || elem.dataset.valids.split(',').includes(DragData)) {
            elem.classList.add('valid');
        } else {
            elem.classList.remove('valid');
        }
    });
}

function HighlightTarget(e, entering) {
    if (entering) {
        e.target.classList.add('drop-hover');
    } else {
        e.target.classList.remove('drop-hover');
    }
}

function AllowDrag(e) {
    if (e.target.dataset.validControls && !e.target.dataset.valids.split(',').includes(DragData)) { return; }
    e.preventDefault();
}

async function DropElement(e) {
    e.preventDefault();
    e.target.classList.remove('highlight');
    
    let controlType = ControlType[DragData];   
    
    UserForm.rows.push({
        type: controlType,
        config: {        
            Id: '', Label: DragData, Value: '', Placeholder: '', Size: 1,
            Required: false, Readonly: false, Disabled: false, Loading: false, Options: []
        }
    });
    
    let controlForm = await FormBuilder.RenderControlForm(controlType);    
    document.getElementById('body-properties').innerHTML = controlForm;
    
    DragData = null;
    document.querySelectorAll('.drag-area').forEach(elem => elem.classList.remove('valid'));
    RenderUserForm();
}

async function GetControl(control) {
    
    let elem;
    
    switch (control.type) {
        case ControlType.Card: elem = new CardContainer(); break;
        case ControlType.Section: elem = new SectionContainer(); break;
        case ControlType.Checkbox: elem = new CheckboxInput(config); break;
        case ControlType.Date: elem = new DateInput(control.config); break;
        case ControlType.Datetime: elem = new DatetimeInput(control.config); break;
        case ControlType.Email: elem = new EmailInput(control.config); break;
        case ControlType.Number: elem = new NumberInput(control.config); break;
        case ControlType.Password: elem = new PasswordInput(control.config); break;
        case ControlType.Text: elem = new TextInput(control.config); break;
        case ControlType.Select: elem = new SelectInput(control.config); break;
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