const routerBase = process.env.DEPLOY_ENV === 'GH_PAGES' ? {
  router: {
    base: '/'
  }
} : {}

module.exports = {
  mode: 'universal',

  server: {
    port: 8080
  },

  /*
  ** Headers of the page
  */
  head: {
    title: 'nuxt-graphs',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Graphs game based on Nuxt.js' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  ...routerBase,
  build: {
    /*
    ** Run ESLint on save
    */
    filenames: {
      chunk: '[name].js'
    },
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.devtool = '#source-map'
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            fix: true
          }
        })
      }

      // SVG Loader
      config.module.rules
        .filter(r => r.test.toString().includes('svg'))
        .forEach((r) => {
          r.test = /\.(png|jpe?g|gif)$/
        })
      config.module.rules.push({
        test: /\.svg$/,
        loader: 'vue-svg-loader'
      })
    }
  },
  /*
	** Now you can use SASS (global, vars etc) in your assets
  */
  modules: ['@nuxtjs/style-resources'],
  styleResources: {
    scss: [
      'assets/scss/core/normalize.scss',
      'assets/scss/core/vars.scss',
      'assets/scss/core/mixins.scss',
      'assets/scss/core/fonts.scss',
      'assets/scss/core/common.scss',
      'assets/scss/core/grid.scss'
    ]
  }
}
