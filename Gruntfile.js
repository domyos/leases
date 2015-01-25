module.exports = function(grunt) {

  grunt.initConfig({
    dirs: {
      js: 'public/js',
      angular: 'bower_components/angular',
      angularResource: 'bower_components/angular-resource',
      angularRoute: 'bower_components/angular-route',
      jquery: 'bower_components/jquery/dist',
      bootstrap: 'bower_components/bootstrap/dist'
    },

    copy: {
      main: {
        files: [
          {
            flatten: true,
            src: ['<%= dirs.angular %>/angular.min.js'],
            dest: 'public/js/libraries/angular.min.js'
          },
          {
            flatten: true,
            src: ['<%= dirs.angularResource %>/angular-resource.min.js'],
            dest: 'public/js/libraries/angular-resource.min.js'
          },
          {
            flatten: true,
            src: ['<%= dirs.angularRoute %>/angular-route.min.js'],
            dest: 'public/js/libraries/angular-route.min.js'
          },
          {
            flatten: true,
            src: ['<%= dirs.jquery %>/jquery.min.js'],
            dest: 'public/js/libraries/jquery.min.js'
          },
          {
            flatten: true,
            src: ['<%= dirs.bootstrap %>/css/bootstrap.min.css'],
            dest: 'public/css/bootstrap.min.css'
          },
          {
            flatten: true,
            src: ['<%= dirs.bootstrap %>/css/bootstrap-theme.min.css'],
            dest: 'public/css/bootstrap-theme.min.css'
          },
          {
            flatten: true,
            src: ['<%= dirs.bootstrap %>/js/bootstrap.min.js'],
            dest: 'public/js/libraries/bootstrap.min.js'
          },
          {
            expand: true,
            flatten: true,
            src: ['<%= dirs.bootstrap %>/fonts/*'],
            dest: 'public/fonts/'
          }
        ]
      }
    },

    watch: {
      all: {
        options: {
          livereload: true
        },
        files: [
          'public/index.html',
          'public/js/app.js',
          'public/js/controllers.js',
          'public/js/services.js',
          'public/js/controllers/*.js',
          'public/js/services/*.js',
          'public/partials/*.html'
        ]
      }
    },

    clean: [
      'bower_components',
      'node_modules',
      'public/css/bootstrap.min.css',
      'public/css/bootstrap-theme.min.css',
      'public/fonts',
      'public/js/libraries'
    ]
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('default', ['copy']);
};
