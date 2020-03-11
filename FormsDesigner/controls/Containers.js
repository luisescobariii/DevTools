const ContainerType = { Page: 0, Section: 1, Row: 2, Control: 3 };

class PageContainer {

    constructor(config) {
        this.Type = ContainerType.Page;
        this.ElemId = config.ElemId;
        this.Title = config.Title || '';
    }

    Render() {
        return `<div class="box"><div class="drop-area"></div></div>`;
    }

}

class SectionContainer {

    constructor(config) {
        this.Type = ContainerType.Section;
        this.ElemId = config.ElemId;
        this.Title = config.Title || '';
    }

}

class RowContainer {

    constructor(config) {
        this.Type = ContainerType.Row;
        this.ElemId = config.ElemId;
        this.Title = config.Title || '';
    }

}

class ControlContainer {

    constructor(config) {
        this.Type = ContainerType.Control;
        this.ElemId = config.ElemId;
        this.Control = {
            Type: ControlType.Text,
            Size: ControlSize.Normal,
            Label: 'Label'
        };
    }

}