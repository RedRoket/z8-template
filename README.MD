Z8 Template - пример проекта на базе фреймворка [Z8](https://github.com/zenframework/z8/)

Описание фреймворка Z8, а также проекта Z8 Template приведено в [Wiki проекта Z8](https://github.com/zenframework/z8/wiki)

# Z8 Template Project Build How-to

Copy _gradle.properties.default_ to _gradle.properties_ then choose one of project building options.

You have 2 options to develope Z8 porject:
1. Using Z8 Project sources from Git - _z8.home_ must point to Z8 Project folder, Gradle build script assumes Z8 Project is in Eclipse workspace
1. Using Z8 Project binaries - _z8Home_ must not be set

Eclipse workspace configuration:
1. If you use Z8 Project sources, Z8 Project must be in the same workspace.
1. If you use Z8 Project binaries, subproject _org.zenframework.z8.lang_ must be in the same workspace. Other Z8 dependencies are resolved with Gradle Maven plugin.

# Tasks summary

1. **Подсветка XML синтаксиса**
    - для реализации подсветки использовалась сторонняя библиотека highlight.js
    - в связи с тем, что данная бибилиотка не поддерживает работу с тэгом 'textarea', было принятно решения переопределить метод controlMarkup() стандартного JavaScript-компоненты Z8 Text.js
2. **YouTube проигрыватель**
    - для реализации использовалось официальное API от Google (см. https://developers.google.com/youtube/iframe_api_reference?hl=ru)
    - немного по функционалу проигрывателя:
        - _отображается и запускается проигрыватель при вводе ссылки в поле 'YouTube' (TODO - есть небольшой баг, когда 1-ый раз открываешь стр. с зараннее задонной ссылкой)_
        - _если изменить ссылку с видео, проигрыватель автоматически обновит видоролик_
        - _если удалить ссылку с видео, проигрыватель остановится и будет скрыт_
        - _на поле для ввода добавлена проверка на наличие подстроки 'youtube.com'_
3. **Проигрыватель аудиофайлов**
    - для реализации использовался стандартный HTML тэг 'audio'
    - для получения контроля над полем 'Файл' был создан наследник от стандартного JavaScript-компоненты Z8 File.js