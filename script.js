var serverNotes = [
    {id: 0, text: 'Единственная часть тела, которая не имеет кровоснабжения, — роговица глаза. Кислород она получает непосредственно из воздуха. '},
    {id: 1, text: 'Емкость мозга человека превышает 4 терабайта.'},
    {id: 2, text: 'До 7 месяцев ребенок может дышать и глотать одновременно.'},
    {id: 3, text: 'Наш череп состоит из 29 различных костей.'},
    {id: 4, text: 'Нервный импульс из мозга движется со скоростью 274 км/ч.'},
    {id: 5, text: 'Один человеческий мозг генерирует больше электрических импульсов в течение одного дня, чем все телефоны мира, вместе взятые.'},
    {id: 6, text: 'Сердце человека перекачивает 182 млн литров крови за свою жизнь.'},
    {id: 7, text: '50 тыс. клеток в вашем теле отмирают и заменяются на новые в то время, как вы читаете это предложение.'},
    {id: 8, text: 'Зародыш приобретает отпечатки пальцев в возрасте от 3 месяцев.'},
    {id: 9, text: 'Женские сердца бьются быстрее, чем мужские.'},
    {id: 10, text: 'Человек по имени Чарльз Осборн икал в течение 68 лет.'},
    {id: 11, text: 'Праворукие люди живут в среднем на 9 лет дольше, чем левши.'},
    {id: 12, text: 'Примерно 2/3 людей наклоняют голову вправо, когда целуются.'},
];

Vue.component('i-note', {
    functional: true,
    render: function(createElement) {
        return (
            createElement('svg', {
                class: 'i-note',
                attrs: {
                    viewBox: '0 0 50 50',
                    width: '50',
                    height: '50',
                    focusable: 'false',
                    ariaHidden: 'true',
                    xmlns: 'http://www.w3.org/2000/svg',
                    'xmlns:xlink': 'http://www.w3.org/1999/xlink'
                }
            }, [
                createElement('rect', {
                    attrs: {fill: 'none'}
                }),
                createElement('path', {
                    class: 'i-note__el',
                    attrs: {
                        d: 'M14.742,28.793  c-1.558,1.559-1.558,4.085,0,5.643c1.558,1.559,4.084,1.559,5.642,0l15.104-15.104'
                    }
                }),
                createElement('path', {
                    class: 'i-note__el',
                    attrs: {
                        d: 'M27.025,10.869L7.336,30.557  c-3.115,3.115-3.115,8.17,0.001,11.285s8.169,3.115,11.284,0l24.627-24.626c2.336-2.336,2.336-6.126,0-8.463  c-2.338-2.338-6.129-2.337-8.465,0l-20.041,20.04'
                    }
                })
            ])
        );
    }
});

Vue.component('c-notes', {
    template: '#c-notes',
    data() {
        return {
            notes: [],
            dubleNotes: [],
            currentNote: {},
            isLoad: false,
        };
    },
    computed: {
        noteText() {return this.currentNote.text;}
    },
    mounted() {
        // Создаём предзагрузчик
        var spin = new Spinner().spin();
        this.$refs.spinContainer.appendChild(spin.el);
        var that = this;
        // В этом месте нам приходят данные с сервера
        setTimeout(function() {
            that.notes = serverNotes;
            // Делаем копию массива с заметками
            that.dubleNotes = that.notes.slice();
            // Получаем первую заметку
            that.currentNote = that.getRandomNote();
            // Убиваем прелоадер
            spin.stop();
            that.isLoad = true;
        }, 1000);
    },
    methods: {
        // Метод, для генерации следующей заметки
        onNextNote() {this.currentNote = this.getRandomNote();},
        // Получем рандомную заметку
        getRandomNote() {
            // Если массив в заметками закончился, то записываем в него копию исходного массива
            if (this.notes.length === 0) {
                this.notes = this.dubleNotes.slice();
            }
            // Удаляем рандомную заметку и при этом возвращаем её
            return this.notes.splice(this.randomIndex(), 1)[0];
        },
        // Возвращаем рандомный индекс из массива заметок
        randomIndex() {
            var min = 0,
                max = this.notes.length - 1,
                rand = min + Math.random() * (max + 1 - min);
            return Math.floor(rand);
        }
    }
});

new Vue({el: '#app-notes'});