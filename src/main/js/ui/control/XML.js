// JS-класс, расширяющий функциональность текстового поля, добавляющий посветку XML синтаксиса
// Данный класс используется для поля таблицы Document, см. Documents.bl
// Аргументы Z8.define():
//    - имя определяемого класса
//    - конфигурация класса, в которой определяется:
Z8.define('org.zenframework.z8.template.controls.XML', {
    // Имя наследуемого класса
    extend: 'Z8.form.field.Text',
    tag: 'div',

    controlMarkup: function() {
        var value = this.valueToRaw(this.getValue());
        var enabled = this.isEnabled();
        var readOnly = this.isReadOnly();
        var length = this.length;

        var tag = this.getInputTag();
        var inputCls = this.getInputCls().join(' ');
        value = Format.htmlEncode(value);
        var input = { tag: tag, name: 'input', contenteditable: true, cls: "xmlcode", tabIndex: this.getTabIndex(), spellcheck: false, type: this.password ? 'password' : 'text', title: this.tooltip || '', placeholder: this.placeholder, autocomplete: this.autocomplete, value: tag == 'input' ? value : null, html: tag != 'input' ? value : null };

        if(!enabled)
            input.disabled = null;

        if(readOnly)
            input.readOnly = null;

        if(length != 0)
            input.maxlength = length;

        var result = [input];
        var triggers = this.triggers;

        if(!Z8.isEmpty(triggers)) {
            triggers = Array.isArray(triggers) ? triggers : [triggers];
            this.triggers = [];

            for(var i = 0, length = triggers.length; i < length; i++) {
                var trigger = triggers[i];
                var cls = DOM.parseCls(trigger.cls).pushIf('trigger-' + (length - i));
                trigger = new Z8.button.Trigger({ primary: true, tooltip: trigger.tooltip, icon: trigger.icon, handler: trigger.handler, scope: trigger.scope, cls: cls });
                result.push(trigger.htmlMarkup());

                this.triggers.push(trigger);
            }
        }

        return result;
    },

    setValue: function(value, displayValue) {
        this.callParent(value, displayValue);

        let el = document.querySelector("div.xmlcode");
        if (el != null) {
            hljs.highlightBlock(el);
        }
    }

});