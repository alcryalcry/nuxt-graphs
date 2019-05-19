<template>
  <button 
    :type="type" 
    class="button" 
    @click="$emit('clickAction')">
    <slot>Button</slot>
  </button>
</template>

<script>
export default {
  name: 'AppButton',
  props: {
    type: {
      type: String,
      default: 'button'
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss">
.button {
  display: inline-block;
  padding: 0 2rem;
  font-size: 1.8rem;
  font-weight: 700;
  line-height: 4rem;
  color: $white;
  border: 3px solid $darkBlueText;
  border-radius: 0.75rem;
  background: $darkBlueText;
  text-transform: uppercase;
  cursor: pointer;
  transition: $trans;

  &:active {
    border-color: darken($darkBlueText, 10%);
    background-color: darken($darkBlueText, 10%);
    transform: translate3d(0, 0.1rem, 0);
  }

  &.isCyan {
    color: $darkBlueText;
    background: $darkBlue;
    border-color: $darkBlueText;
  }

  @include mq(1024, 9999) {
    &:hover {
      border-color: darken($darkBlueText, 10%);
      background-color: darken($darkBlueText, 10%);

      &.isCyan {
        border-color: $darkBlueText;
        background-color: $darkBlueText;
        color: $darkBlue;
      }
    }
  }
}
</style>
