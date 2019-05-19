const routerBase = {
  router: {
    base: '/'
  }
};


module.exports = {
  mode: 'universal',

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
		extend(config, { isDev, isClient }) {
			if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options : {
            fix : true
          }
        })
      }
      
      // SVG Loader
      config.module.rules
        .filter(r => r.test.toString().includes('svg'))
        .forEach(r => {
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
 css : [
    '@/assets/scss/core/reset.scss',
    '@/assets/scss/core/fonts.scss',
    '@/assets/scss/core/base.scss',
    '@/assets/scss/core/helpers.scss',
  ],
  modules: [
    ['nuxt-sass-resources-loader', 
      [
        '@/assets/scss/core/mixins.scss',
        '@/assets/scss/core/vars.scss'
      ]
    ]
  ]
};

