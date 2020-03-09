class TextInput extends Control {}

class TelInput extends Control {
    constructor (config) { super(config); this.Type = 'tel'; }
}

class DateInput extends Control {
    constructor (config) { super(config); this.Type = 'date'; }
}

class DatetimeInput extends Control {
    constructor (config) { super(config); this.Type = 'datetime'; }
}

class EmailInput extends Control {
    constructor (config) { super(config); this.Type = 'email'; }
}

class NumberInput extends Control {
    constructor (config) { super(config); this.Type = 'number'; }
}

class PasswordInput extends Control {
    constructor (config) { super(config); this.Type = 'password'; }
}

class TimeInput extends Control {
    constructor (config) { super(config); this.Type = 'time'; }
}
