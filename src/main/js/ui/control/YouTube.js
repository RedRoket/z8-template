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
            this.setValid(/^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/.test(value));
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
        return markup;
    },

    setValue: function(value, displayValue) {
        let player = document.getElementById('player');
        if (player) {
            if (value) {
                player.removeAttribute('hidden');
                this.playVideo(this.getVideoId(value));
            } else {
                player.setAttribute('hidden', 'true');
                this.stopVideo();
            }
        }
        this.callParent(value, displayValue);
        if (this.getValue() && this.getValue() !== '') {
            if (document.getElementById("youtubeScript") == null) {
                this.addYoutubeScript();
            }
        }
    },

    addYoutubeScript: function () {
        // 2. This code loads the IFrame Player API code asynchronously.
        let tag = document.createElement('script');
        tag.id = "youtubeScript";
        tag.src = "https://www.youtube.com/iframe_api";
        let firstScriptTag = document.getElementsByTagName('script')[2];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    },

    getVideoId: function (videoUrl) {
        let videoId;
        if (videoId = videoUrl.match(/(\?|&)v=([^&#]+)/)) {
            videoId = videoId.pop();
        } else if (videoId = videoUrl.match(/(\.be\/)+([^\/]+)/)) {
            videoId = videoId.pop();
        } else if (videoId = videoUrl.match(/(\embed\/)+([^\/]+)/) ) {
            videoId = videoId.pop().replace('?rel=0', '').replace('embed/', '');
        }
        videoId = videoId.split('?').length > 0 ? videoId.split('?')[0] : videoId;
        return videoId;
    },

    playVideo: function (videoId) {
        if (player && player.cueVideoById) {
            player.cueVideoById(videoId);
            player.playVideo();
        }
    },

    stopVideo: function () {
        if (player && player.stopVideo) {
            player.stopVideo();
        }
    }

});


// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
    let videoId;
    let videoPlayer = document.getElementById('player');
    if (videoPlayer) {
        let videoUrl = videoPlayer.parentElement.childNodes[1].getAttribute('title');
        if (videoId = videoUrl.match(/(\?|&)v=([^&#]+)/)) {
            videoId = videoId.pop();
        } else if (videoId = videoUrl.match(/(\.be\/)+([^\/]+)/)) {
            videoId = videoId.pop();
        } else if (videoId = videoUrl.match(/(\embed\/)+([^\/]+)/) ) {
            videoId = videoId.pop().replace('?rel=0', '').replace('embed/', '');
        }
        videoId = videoId.split('?').length > 0 ? videoId.split('?')[0] : videoId;
    }
    player = new YT.Player('player', {
        height: '340',
        width: '560',
        videoId: videoId,
        events: {
            'onReady': onPlayerReady,
        }
    });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    event.target.playVideo();
}