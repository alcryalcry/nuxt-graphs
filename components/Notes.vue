<template>
  <div class="notes">
    <div class="notes__head">
      <h1 class="title">Notes</h1>
      <button 
        class="notes__add" 
        @click="addNote">
        <div class="notes__add-icon">
          <icon-plus />
        </div>
        New note
      </button>
    </div>
    <transition-group
      class="notes__container"
      mode="out-in"
      name="notes"
      tag="div"
    >
      <app-note-one
        v-for="(note, index) in notes"
        ref="AppNoteOne"
        :key="note.id"
        :note-index="index"
        :background="note.background"
        :rows="note.rows"
        :title="note.title"
        @set-background-note="setBackgroundNote"
        @add-title="addTitle(index)"
        @add-row="addRow(index)"
        @remove-row="removeRow"
        @toggle-check-row="toggleCheckRow"
        @remove-note="removeNote(index)"
        @input-text="inputText"
      />
    </transition-group>
  </div>
</template>

<script>
import AppNoteOne from '~/components/NoteOne.vue';
import iconPlus from '~/assets/svg/plus.svg';

export default {
  name: 'Notes',
  components: {
    AppNoteOne,
    iconPlus
  },
  data() {
    return {
      notes: [
        {
          id: 0,
          background: 'isCyan',
          title: 'Notes',
          rows: [
            {
              id: 0,
              text: 'Sidebar',
              checked: true
            },
            {
              id: 1,
              text: 'Вставка новых строк',
              checked: true
            },
            {
              id: 2,
              text: 'Вставка новых карточек',
              checked: true
            },
            {
              id: 3,
              text: 'Удаление строк',
              checked: true
            },
            {
              id: 4,
              text: 'Удаление карточек',
              checked: true
            },
            {
              id: 5,
              text: 'Держать статус в store',
              checked: true
            },
            {
              id: 6,
              text: 'Анимация',
              checked: true
            },
            {
              id: 7,
              text: 'Фокус на новой строке',
              checked: true
            },
            {
              id: 8,
              text:
                'Уникальные ключи для notes, для rows (БАГ с анимацией isChecked)',
              checked: true
            },
            {
              id: 10,
              text: 'Изменение цвета фона',
              checked: true
            },
            {
              id: 12312,
              text: 'SVG-компоненты',
              checked: true
            },
            {
              id: 9,
              text: 'Заголовки',
              checked: true
            },
            {
              id: 911,
              text: 'Заголовки (БАГИ проверить)',
              checked: true
            },
            {
              id: 34672836487234,
              text: 'isFocused (БАГИ проверить)',
              checked: true
            },
            {
              id: 213123213123123,
              text: 'max-height для карточек',
              checked: false
            },
            {
              id: 9111,
              text: 'Добавление изображений из буфера',
              checked: false
            },
            {
              id: 1232131232138127983721893,
              text: 'Удаление строки с изображением',
              checked: false
            },
            {
              id: 11,
              text: 'Вёрстка на ГРИДАХ',
              checked: false
            },
            {
              id: 12,
              text:
                'Мобильный интерфейс (не забыть про добавление/удаление изображений)',
              checked: false
            },
            {
              id: 13,
              text: 'Хранение данных',
              checked: false
            },
            {
              id: 15,
              text: 'Оповещения об удалении и возможности вернуть изменения',
              checked: false
            },
            {
              id: 14,
              text: '(Необязательно) Оповещения о сохраненных изменениях',
              checked: false
            },
            {
              id: 911112213213,
              text: '(Необязательно) Перетаскивание карточек',
              checked: false
            },
            {
              id: 911112,
              text: '(Необязательно)   Написать документацию (описание)',
              checked: false
            }
          ]
        },
        {
          id: 1,
          background: 'isGreen',
          title: 'Graphs',
          rows: [
            {
              id: 213121,
              text: 'https://www.youtube.com/watch?v=U33dsEcKgeQ',
              checked: false
            },
            {
              id: 1,
              text: 'Рандом рисование',
              checked: true
            },
            {
              id: 1232132131,
              text: 'Баги рандома: 1 - не должно быть обособленных линий',
              checked: true
            },
            {
              id: 1232132112321331,
              text: 'Баги рандома: 3 - проверить циклы',
              checked: true
            },
            {
              id: 123123123123213,
              text: 'Вычисление value у кружков',
              checked: true
            },
            {
              id: 0,
              text: 'Анимация',
              checked: true
            },
            {
              id: 1212111111132132131,
              text:
                'Баги рандома: 2 - линии не должны сливаться и круги не стояли на одной линии',
              checked: false
            },
            {
              id: 499999992399329329,
              text: 'Добавление данных в URL страницы',
              checked: false
            },
            {
              id: 4,
              text: 'Несколько шагов игры (типа турнира)',
              checked: false
            },
            {
              id: 5,
              text: 'Визуальный бар для шагов (как в бутстрапе)',
              checked: false
            },
            {
              id: 6,
              text:
                'Прошлые результаты из/в localstorage или БД (результаты всех игроков)',
              checked: false
            },
            {
              id: 2,
              text: 'Адаптив',
              checked: false
            },
            {
              id: 3,
              text: 'Ресайз',
              checked: false
            }
          ]
        },
        {
          id: 2,
          background: '',
          title: false,
          rows: [
            {
              id: 0,
              text: 'First row in the second note',
              checked: false
            },
            {
              id: 1,
              text: 'Second row in the second note',
              checked: true
            },
            {
              id: 2,
              text: 'Second row in the second note',
              checked: false
            },
            {
              id: 3,
              text: 'Second row in the second note',
              checked: false
            },
            {
              id: 4,
              text: 'Second row in the second note',
              checked: false
            },
            {
              id: 5,
              text: 'Third row in the second note',
              checked: false
            }
          ]
        }
      ]
    };
  },
  methods: {
    inputText(data) {
      const noteIndex = data[0];
      const rowIndex = data[1];
      const text = data[2];

      if (rowIndex === 'title') {
        this.notes[noteIndex].title = text;
        return;
      }

      this.notes[noteIndex].rows[rowIndex].text = text;
    },

    addTitle(noteIndex) {
      this.notes[noteIndex].title = '';
      this.setFocusToRow(noteIndex, true);
    },

    addRow(noteIndex) {
      this.notes[noteIndex].rows.push({
        id: this.setUniqueId(this.notes[noteIndex].rows),
        text: '',
        checked: false
      });
      this.setFocusToRow(noteIndex);
    },

    removeRow(data) {
      const rowIndex = data[0];
      const noteIndex = data[1];

      if (rowIndex === 'title') {
        this.notes[noteIndex].title = false;
        return;
      }
      this.notes[noteIndex].rows.splice(rowIndex, 1);
    },

    toggleCheckRow(data) {
      const rowIndex = data[0];
      const noteIndex = data[1];

      this.notes[noteIndex].rows[rowIndex].checked = !this.notes[noteIndex]
        .rows[rowIndex].checked;
    },

    addNote() {
      this.notes.push({
        id: this.setUniqueId(this.notes),
        background: '',
        title: false,
        rows: [
          {
            id: 0,
            text: '',
            checked: false
          }
        ]
      });
      this.setFocusToRow(this.notes.length - 1);
    },

    removeNote(noteIndex) {
      this.notes.splice(noteIndex, 1);
    },

    setFocusToRow(noteIndex, title) {
      setTimeout(() => {
        // чтобы строка успела добавиться
        if (!title) {
          this.$refs.AppNoteOne[noteIndex].setFocusToRow(
            this.notes[noteIndex].rows.length
          );
          return;
        }
        this.$refs.AppNoteOne[noteIndex].setFocusToRow('title');
      }, 0);
    },

    setBackgroundNote(data) {
      const noteIndex = data[0];
      const background = data[1];

      this.notes[noteIndex].background = background;
    },

    setUniqueId(arr) {
      let arrIds = [];
      let newId = 0;

      arr.forEach(item => arrIds.push(item.id));

      for (let i = 0; arrIds.indexOf(i) !== -1; i++) {
        newId = i + 1;
      }

      return newId;
    }
  }
};
</script>

<style lang="scss">
.notes {
  &__container {
    display: flex;
    flex-flow: row wrap;
    align-items: flex-start;
    margin: -2rem 0 0 -2rem;

    .note {
      margin: 2rem 0 0 2rem;
    }
  }

  &__head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 0 4rem;

    @include mq(767) {
      justify-content: flex-start;
      align-items: flex-start;
      flex-direction: column;
    }

    .title {
      margin: 0;
    }
  }

  &__add {
    display: flex;
    align-items: center;
    font-size: 1.8rem;
    color: $gray;
    opacity: 0.5;
    text-align: center;
    cursor: pointer;
    transition: opacity 0.2s $easeOutCubic;

    @include mq(1024, 9999) {
      &:hover {
        opacity: 1;
      }
    }

    @include mq(767) {
      margin: 2rem 0 0;
    }
  }

  &__add-icon {
    margin: 0 1rem 0 0;
    font-size: 0;
    color: $gray;
    transition: color $trans;

    @include mq(1024, 9999) {
      opacity: 0.5;
    }

    @include mq(767) {
      opacity: 1;
    }

    svg {
      width: 2.4rem;
      height: 2.4rem;
    }
  }
}
</style>
