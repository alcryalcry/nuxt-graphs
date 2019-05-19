<template>
  <nav 
    v-on-clickaway="closeSidebar" 
    class="sidebar">
    <button 
      class="hamburger" 
      @click="toggleSidebarStatus">
      <icon-burger />
    </button>
    <a 
      href="https://alcryalcry.github.io/" 
      class="sidebar__logo">
      <logo-nuxt />
    </a>
    <div class="sidebar__section-wrapper">
      <div
        v-for="(section, i) in menuSections"
        :key="i"
        class="sidebar__section"
      >
        <h3 class="sidebar__title">{{ section.title }}</h3>
        <ul class="sidebar__list">
          <li 
            v-for="(link, i) in section.items" 
            :key="i">
            <nuxt-link
              :to="link.href"
              class="sidebar__link"
              @click.native="closeSidebar"
            >
              <span class="sidebar__link-icon">
                <component :is="link.icon" />
              </span>
              <span class="sidebar__link-text">{{ link.text }}</span>
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
    <a
      class="sidebar__bottom"
      href="https://github.com/alcryalcry"
      target="_blank"
    >
      <span class="sidebar__bottom-icon">
        <icon-git />
      </span>
      <span class="sidebar__bottom-text">I'm on <br >GitHub</span>
    </a>
  </nav>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway';
import iconGit from '~/assets/svg/github.svg';
import iconNotes from '~/assets/svg/notes.svg';
import iconTests from '~/assets/svg/tests.svg';
import iconShop from '~/assets/svg/shop.svg';
import iconGraph from '~/assets/svg/graph.svg';
import iconBurger from '~/assets/svg/burger.svg';
import logoNuxt from '~/assets/svg/logo-nuxt.svg';

export default {
  name: 'Sidebar',
  components: {
    iconGit,
    iconNotes,
    iconTests,
    iconShop,
    iconGraph,
    iconBurger,
    logoNuxt
  },
  mixins: [clickaway],
  data() {
    return {
      menuSections: [
        {
          title: 'Views',
          items: [
            {
              href: '/',
              text: 'Notes',
              icon: iconNotes
            },
            {
              href: '/graphsRandom',
              text: 'GraphsRandom',
              icon: iconGraph
            },
            {
              href: '/graphs',
              text: 'Graphs',
              icon: iconGraph
            },
            {
              href: '/tests',
              text: 'Tests',
              icon: iconTests
            },
            {
              href: '/shop',
              text: 'Shop',
              icon: iconShop
            }
          ]
        }
      ]
    };
  },
  methods: {
    toggleSidebarStatus() {
      this.$store.commit('toggleSidebarStatus');
    },
    closeSidebar() {
      this.$store.commit('closeSidebar');
    }
  }
};
</script>

<style lang="scss">
.sidebar {
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-flow: column nowrap;
  width: 28rem;
  height: 100%;
  border-right: 1px solid $bordergray;
  opacity: 1;
  background: #fff;
  transform: translateX(-100%);
  transition: transform 0.3s $easeOutCubic, opacity 0.3s 0.3s $easeOutCubic;

  @include mq(767) {
    width: 26rem;
  }

  .isSidebarOpen & {
    transform: translateX(0);
  }

  .hamburger {
    position: absolute;
    top: 1.4rem;
    left: calc(100% + 2rem);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
    width: 5rem;
    color: $lightgray2;
    cursor: pointer;

    @include mq(1024, 9999) {
      &:hover {
        &::before {
          background-color: $lightgray;
        }
      }
    }

    @include mq(767) {
      top: 0.75rem;
      left: calc(100% + 0.75rem);
      width: 4.5rem;
    }

    &::before {
      content: "";
      z-index: -1;
      position: absolute;
      top: calc(50% - 3rem);
      left: calc(50% - 3rem);
      width: 6rem;
      height: 6rem;
      border-radius: 50%;
      background-color: transparent;
      transition: background-color $trans;

      @include mq(767) {
        content: none;
      }
    }

    svg {
      width: 100%;
      height: 100%;
    }
  }

  &__logo {
    display: block;
    padding: 2.4rem;
    font-size: 0;
    border-bottom: 1px solid $bordergray;
    filter: grayscale(0);
    transition: filter $trans;

    svg {
      max-width: 100%;
      height: 4.5rem;
    }

    @include mq(1024, 9999) {
      &:hover {
        filter: grayscale(100%);
      }
    }
  }

  &__section {
    padding: 3rem 0;
    border-bottom: 1px solid $bordergray;
  }

  &__section-wrapper {
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  &__list {
    padding: 0;
  }

  &__title {
    padding: 0 2.4rem 2rem;
    font-size: 2rem;
    font-weight: 400;
  }

  &__link {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 1.4rem 2.4rem;
    font-size: 1.6rem;
    list-style: none;
    color: $gray;

    &.nuxt-link-exact-active {
      background: $lightgray;

      @include mq(1024, 9999) {
        &:hover {
          background: darken($lightgray, 3%);
        }
      }
    }

    @include mq(1024, 9999) {
      &:hover {
        background: $lightgray;
      }
    }
  }

  &__link-icon {
    display: inline-block;
    vertical-align: top;
    margin: 0 1rem 0 0;
    width: 2.4rem;
    height: 2.4rem;
    color: $gray;
  }

  &__bottom {
    display: flex;
    align-items: center;
    margin: auto 0 0;
    padding: 2.4rem;
    border-top: 1px solid $bordergray;

    @include mq(1024, 9999) {
      &:hover {
        .sidebar__bottom-icon {
          color: $black;
        }
      }
    }
  }

  &__bottom-icon {
    display: inline-block;
    vertical-align: top;
    margin: 0 1.5rem 0 0;
    width: 5rem;
    height: 5rem;
    color: $gray;
    transition: color $trans;
  }

  &__bottom-text {
    color: $gray;
    font-weight: 700;
    font-size: 2.2rem;
    line-height: 1.25;
    transition: color $trans;
  }
}
</style>
