// JS-класс, расширяющий функциональность текстового поля для хранения ссылки на youtube.com
// Данный класс используется для поля таблицы Document, см. Documents.bl
// Аргументы Z8.define():
//    - имя определяемого класса
//    - конфигурация класса, в которой определяется:
Z8.define('org.zenframework.z8.template.controls.YouTube', {
    // Имя наследуемого класса
    extend: 'Z8.form.field.Text',

    // Переопределение метода validate(), который вызывается при каждом изменении значения поля
    validate: function() {
        let value = this.getValue();
        if (this.getValue() != null && this.getValue() !== '') {
            this.setValid(/youtube.com/.test(value));
        }
    },

    htmlMarkup: function() {
        let markup = this.callParent();
        let videoPlayer = {
            tag: 'div',
            id: 'player',
            hidden: 'true'
        };
        markup['cn'].add(videoPlayer);
        if (document.getElementById("youtubeScript") == null) {
            this.addYoutubeScript();
        }
        return markup;
    },

    setValue: function(value, displayValue) {
        let player = document.getElementById('player');
        if (value) {
            if (player) {
                player.removeAttribute('hidden');
                playVideo(value);
            }
        } else {
            if (player) {
                player.setAttribute('hidden', 'true');
                stopVideo();
            }
        }
        this.callParent(value, displayValue);
    },

    addYoutubeScript: function () {
        // 2. This code loads the IFrame Player API code asynchronously.
        let tag = document.createElement('script');
        tag.id = "youtubeScript";
        tag.src = "https://www.youtube.com/iframe_api";
        let firstScriptTag = document.getElementsByTagName('script')[2];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

});