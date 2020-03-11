class TextInput extends Control {
    constructor (config) { super(config); this.Type = 'text'; }
}

class TelInput extends Control {
    constructor (config) { super(config); this.TypeName = 'tel'; }
}

class DateInput extends Control {
    constructor (config) { super(config); this.TypeName = 'date'; }
}

class DatetimeInput extends Control {
    constructor (config) { super(config); this.TypeName = 'datetime-local'; }
}

class EmailInput extends Control {
    constructor (config) { super(config); this.TypeName = 'email'; }
}

class NumberInput extends Control {
    constructor (config) { super(config); this.TypeName = 'number'; }
}

class PasswordInput extends Control {
    constructor (config) { super(config); this.TypeName = 'password'; }
}

class TimeInput extends Control {
    constructor (config) { super(config); this.TypeName = 'time'; }
}
