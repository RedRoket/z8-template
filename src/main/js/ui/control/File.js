// JS-класс, расширяющий функциональность текстового поля, добавляющий посветку XML синтаксиса
// Данный класс используется для поля таблицы Document, см. Documents.bl
// Аргументы Z8.define():
//    - имя определяемого класса
//    - конфигурация класса, в которой определяется:
Z8.define('org.zenframework.z8.template.controls.File', {
    // Имя наследуемого класса
    extend: 'Z8.form.field.File',

    htmlMarkup: function() {
        let markup = this.callParent();
        let audioPlayer = {
            tag: 'audio',
            id: 'audio-player',
            controls: '',
            hidden: 'true'
        };
        markup['cn'].add(audioPlayer);
        return markup;
    },

    setValue: function(value, displayValue) {
        let audioPlayer = document.getElementById('audio-player');
        let audioSource = document.getElementById('audioSource');
        if (audioPlayer && audioSource) {
            audioPlayer.removeChild(audioSource);
        }
        if (value && value[0] && audioPlayer && this.isAudioFile(value[0].name)) {
            let source = document.createElement('source');
            source.setAttribute('id', 'audioSource');
            source.setAttribute('src', `${value[0].path}?&id=${value[0].id}&session=${Application.session}`);
            audioPlayer.appendChild(source);
            audioPlayer.load();
            audioPlayer.removeAttribute('hidden');
        } else if (audioPlayer) {
            audioPlayer.setAttribute('hidden', 'true');
        }
        this.callParent(value, displayValue);
    },

    isAudioFile: function (file) {
        return file ? file.endsWith('.mp3') || file.endsWith('.ogg') || file.endsWith('.wav') : false;
    }

});