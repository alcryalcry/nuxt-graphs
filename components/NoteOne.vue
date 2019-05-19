<template>
  <div 
    :class="[{ isFocused: isFocused }, background]" 
    class="note">
    <!-- @mouseenter="isHovered = true"
    @mouseleave="isHovered = false" -->

    <div class="note__title-wrapper">
      <h5
        v-show="needTitle"
        ref="title"
        class="note__title"
        contenteditable="true"
        @focus="isFocused = true"
        @blur="
          inputText('title', $event);
          isFocused = false;
        "
        @keydown.enter.prevent="enterClick($event)"
        v-text="title"
      />
      <button 
        class="note__row-remove" 
        @click="removeRow('title')">
        <icon-close />
      </button>
    </div>
    <div class="note__content">
      <div class="note__content-inner">
        <div class="note__content-wrapper">
          <div
            v-for="(row, index) in rows"
            :key="row.id"
            :class="{ isChecked: row.checked }"
            class="note__row"
          >
            <button 
              class="note__row-label" 
              @click="toggleCheckRow(index)">
              <icon-check />
            </button>
            <div
              ref="rows"
              class="note__row-text"
              contenteditable="true"
              @focus="isFocused = true"
              @blur="
                inputText(index, $event);
                isFocused = false;
              "
              @keydown.enter.exact.prevent="enterClick($event, index)"
              v-text="row.text"
            />
            <button 
              class="note__row-remove" 
              @click="removeRow(index)">
              <icon-close />
            </button>
          </div>
        </div>
      </div>
      <div 
        class="note__row note__row--add" 
        @click="addRow">
        <button class="note__row-label">
          <icon-plus />
        </button>
        <div class="note__row-text">New item</div>
      </div>
    </div>
    <button 
      class="note__remove" 
      @click="removeNote">
      <icon-close />
    </button>
    <div class="note__actions">
      <button
        :class="{ isHidden: needTitle }"
        class="note__title-button"
        title="Добавить заголовок"
        @click="addTitle"
      >
        <icon-plus />
      </button>
      <div class="note__backgrounds-wrapper">
        <!-- <button 
          class="note__backgrounds-show" 
          :class="{'isHidden': isBackgroundsOpen}" 
          @click="isBackgroundsOpen = true">

          <icon-menu />
        </button>
        <div class="note__backgrounds-list" :class="{'isOpen': isBackgroundsOpen}"> -->
        <div class="note__backgrounds-list isOpen">
          <button
            v-for="background in backgrounds"
            :key="background"
            :class="background"
            class="note__background"
            title="Сделать фоновым цветом"
            @click="setBackgroundNote(background)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import iconCheck from '~/assets/svg/check.svg';
import iconClose from '~/assets/svg/close.svg';
import iconPlus from '~/assets/svg/plus.svg';
import iconMenu from '~/assets/svg/menu.svg';

export default {
  name: 'NoteOne',
  components: {
    iconCheck,
    iconClose,
    iconPlus,
    iconMenu
  },
  props: {
    background: {
      type: String,
      default: ''
    },
    title: {
      type: [String, Boolean],
      default: null
    },
    rows: {
      type: Array,
      default() {
        return [];
      }
    },
    noteIndex: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      isFocused: false,
      isHovered: false,
      isBackgroundsOpen: false,
      backgrounds: ['', 'isCyan', 'isYellow', 'isGreen', 'isPink']
    };
  },
  computed: {
    needTitle() {
      return this.title !== false;
    }
  },
  watch: {
    // isHovered(val){
    //   if (!val) {
    //     this.isBackgroundsOpen = false;
    //   }
    // }
  },
  methods: {
    inputText(rowIndex, $event) {
      this.$emit('input-text', [
        this.noteIndex,
        rowIndex,
        $event.currentTarget.innerText
      ]);
    },

    toggleCheckRow(rowIndex) {
      this.$emit('toggle-check-row', [rowIndex, this.noteIndex]);
    },

    setCursorToEnd(el) {
      if (!el.innerText.length) {
        return;
      }

      let range = document.createRange();
      let sel = window.getSelection();
      range.setStart(el.childNodes[0], el.innerText.length);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
    },

    enterClick(e, index) {
      if (e.target === this.$refs.title) {
        this.$refs.rows[0].focus();
        this.setCursorToEnd(this.$refs.rows[0]);
        return;
      }

      if (index < this.$refs.rows.length - 1) {
        this.$refs.rows[index + 1].focus();
        this.setCursorToEnd(this.$refs.rows[index + 1]);
        return;
      }

      if (index === this.$refs.rows.length - 1) {
        this.addRow();
        return;
      }
    },

    addTitle() {
      this.$emit('add-title');
    },

    addRow() {
      this.$emit('add-row');
    },

    setFocusToRow(data) {
      if (data === 'title') {
        this.$refs.title.focus();
        return;
      }
      this.$refs.rows[data - 1].focus();
    },

    removeRow(rowIndex) {
      this.$emit('remove-row', [rowIndex, this.noteIndex]);
    },

    removeNote() {
      this.$emit('remove-note');
    },

    setBackgroundNote(background) {
      this.$emit('set-background-note', [this.noteIndex, background]);
    }
  }
};
</script>

<style lang="scss">
.notes-enter-active,
.notes-leave-active {
  transform-origin: top left;
  transition: opacity $trans, transform $trans;
}

.notes-leave-to {
  opacity: 0;
  transform: scale(0);
}

.notes-enter {
  opacity: 0;
  transform: translateY(1rem);
}

.note {
  position: relative;
  padding: 2rem 0 0;
  width: 28.5rem;
  border: 1px solid $bordergray;
  border-radius: 0.5rem;
  transition: opacity $trans, transform $trans, background-color $trans;

  @include mq(1024, 9999) {
    &:hover {
      .note__remove {
        opacity: 1;
      }

      .note__actions {
        opacity: 1;
        pointer-events: auto;
      }
    }
  }

  &.isFocused {
    .note__actions {
      opacity: 1;
      pointer-events: auto;
    }
  }

  &__actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem;
    opacity: 0;
    pointer-events: none;
    transition: opacity $trans;
  }

  &__title-wrapper {
    position: relative;

    @include mq(1024, 9999) {
      &:hover {
        .note__row-remove {
          opacity: 1;
        }
      }
    }
  }

  &__title-button {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    color: $lightgray2;
    background-color: transparent;
    cursor: pointer;
    pointer-events: auto;
    transition: background-color $trans, opacity $trans;

    &:active {
      background-color: $bordergray;
    }

    @include mq(1024, 9999) {
      &:hover {
        background-color: $bordergray;
      }
    }
  }

  // &__content-inner {
  //   overflow: hidden;
  //   max-height: 20rem;
  // }
  //
  // &__content-wrapper {
  // }

  &__backgrounds-wrapper {
    position: relative;
  }

  &__backgrounds-show {
    position: absolute;
    top: calc(50% - 1.25rem);
    right: 0;
    width: 2.5rem;
    height: 2.5rem;
    padding: 0.5rem;
    border-radius: 50%;
    color: $lightgray2;
    background-color: transparent;
    cursor: pointer;
    transition: background-color $trans, opacity 0.2s 0.2s $easeOutCubic;

    &:active {
      background-color: $bordergray;
    }

    @include mq(1024, 9999) {
      &:hover {
        background-color: $bordergray;
      }
    }
  }

  &__backgrounds-list {
    display: flex;
    align-items: center;
    pointer-events: none;

    &.isOpen {
      pointer-events: auto;

      .note__background {
        opacity: 1;
        transform: translateY(0.5rem);
        transition: 0.4s $easeOutCubic;

        @for $num from 1 through 30 {
          &:nth-of-type(#{$num}) {
            transition-delay: #{$num * 0.04}s;
          }
        }
      }
    }
  }

  &__background {
    position: relative;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background-color: $white;
    border: 1px solid $bordergray;
    cursor: pointer;

    opacity: 0;
    transform: translate3d(-1rem, 0, 0);

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: 50%;
      background: $black;
      opacity: 0;
      transition: opacity $trans;
    }

    &:active {
      &::before {
        opacity: 0.1;
      }
    }

    @include mq(1024, 9999) {
      &:hover {
        &::before {
          opacity: 0.1;
        }
      }
    }

    & + & {
      margin-left: 0.5rem;
    }
  }

  &__title {
    padding: 0 4rem 1rem 2rem;
    font-size: 1.6rem;

    &:focus {
      + .note__row-remove {
        opacity: 1;
      }
    }
  }

  &__row {
    position: relative;
    padding: 0.6rem 5rem;
    font-size: 1.4rem;
    line-height: 1.25;
    text-decoration: line-through;
    text-decoration-color: transparent;
    transition: text-decoration $trans, color $trans;

    @include mq(1024, 9999) {
      &:hover {
        .note__row-remove {
          opacity: 1;
        }
      }
    }

    &.isChecked {
      color: $lightgray2;
      text-decoration-color: $lightgray2;

      .note__row-label {
        border-color: $lightgray2;

        svg {
          position: absolute;
          top: calc(50% - 0.65rem);
          left: calc(50% - 0.65rem);
          width: 1.3rem;
          height: 1.3rem;
          opacity: 1;
        }
      }
    }

    &--add {
      color: $lightgray2;
      cursor: pointer;
      transition: opacity $trans;

      @include mq(1024, 9999) {
        opacity: 0.75;

        &:hover {
          opacity: 1;
        }
      }

      .note__row-label {
        border: none;

        svg {
          opacity: 1;
        }
      }
    }
  }

  &__row-label {
    position: absolute;
    top: 0.7rem;
    left: 2rem;
    width: 1.5rem;
    height: 1.5rem;
    border: 2px solid $gray;
    border-radius: 3px;
    color: $black;
    cursor: pointer;
    transition: border-color $trans;
    z-index: 1;

    &:active {
      border-color: $black;
    }

    .isChecked & {
      &:active {
        border-color: $black;
      }
    }

    @include mq(1024, 9999) {
      .isChecked & {
        &:hover {
          border-color: $black;
        }
      }

      &:hover {
        border-color: $black;
      }
    }

    svg {
      opacity: 0;
      transition: opacity $trans;
    }
  }

  &__row-text {
    white-space: pre-wrap;

    &:focus {
      + .note__row-remove {
        opacity: 1;
      }
    }
  }

  &__row-remove {
    position: absolute;
    top: 0.7rem;
    right: 2rem;
    width: 1.7rem;
    height: 1.7rem;
    cursor: pointer;
    color: $gray;
    opacity: 0;
    transition: opacity $trans, color $trans;
    z-index: 1;

    @include mq(1024, 9999) {
      &:hover {
        color: $black;
      }
    }

    svg {
      width: 100%;
      height: 100%;
    }
  }

  &__remove {
    position: absolute;
    top: -1rem;
    right: -1rem;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background: $gray;
    color: $white;
    cursor: pointer;
    z-index: 1;
    transition: opacity $trans, background-color $trans, color $trans;

    &:active {
      background-color: $black;
    }

    @include mq(1024, 9999) {
      opacity: 0;

      &:hover {
        background-color: $black;
      }
    }

    svg {
      width: 1.7rem;
      height: 1.7rem;
    }
  }
}

.isHidden {
  opacity: 0;
  pointer-events: none;
  transition: opacity $trans;
}

.isCyan {
  background-color: $cyan;
}

.isYellow {
  background-color: $yellow;
}

.isGreen {
  background-color: $green;
}

.isPink {
  background-color: $pink;
}
</style>
