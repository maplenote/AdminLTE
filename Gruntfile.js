// AdminLTE Gruntfile
module.exports = function (grunt) {

  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      less : {
        // If any .less file changes in directory "build/less/" run the "less"-task.
        files: ["build/bootstrap-less/variables.less","build/less/*.less", "build/less/skins/*.less", "dist/js/app.js","dist/**/*.html"],
        tasks: ["less:adminlte","less:skin", "uglify","cssmin:skin","cssmin:adminlte"],
        options: {
          livereload: true
        },
      },
      bootstrap: {
        // If any .less file changes in directory "build/less/" run the "less"-task.
        files: ["build/bootstrap-less/*.less","build/bootstrap-less/mixins/*.less"],
        tasks: ["less:bootstrap","cssmin:bootstrap"],
        options: {
          livereload: true
        },
      },
      html: {
        // If any .less file changes in directory "build/less/" run the "less"-task.
        files: ["dist/**/*.html"],
        options: {
          livereload: true
        },
      },
    },
    // "less"-task configuration
    // This task will compile all less files upon saving to create both AdminLTE.css and AdminLTE.min.css
    less: {
      skin: {
        // Development not compressed
        // development: {
          options: {
            // Whether to compress or not
            strictMath: true,
            sourceMap: true,
            // optimization: 2,
            // sourceMapURL: "skin.css.map",
            // // sourceMapRootpath: "dist/css/skins/",
            // sourceMapBasepath: function (f) {
            //     this.sourceMapFilename = f.substring(0, f.lastIndexOf('.'))+'.css.map';
            //     this.sourceMapURL = f.substr(f.lastIndexOf('/') + 1);
            //     return "dist/css/skins/";
            // },
            // outputSourceFiles: true,
            // sourceMapURL: '<%= pkg.name %>.css.map',
            // sourceMapFilename: 'dist/css/skins/<%= pkg.name %>.css.map',
            compress: false
          },
          files: [{
            expand: true,
            cwd: 'build/less/skins/',
            src: ['*.less'],
            dest: 'dist/css/skins/',
            ext: '.css'
          }]
      },
      adminlte: {
        // Development not compressed
        // development: {
          options: {
            // Whether to compress or not
            strictMath: true,
            sourceMap: true,
            outputSourceFiles: true,
            sourceMapURL: '<%= pkg.name %>.css.map',
            sourceMapFilename: 'dist/css/<%= pkg.name %>.css.map',
            compress: false
          },
          files: {
            // compilation.css  :  source.less
            "dist/css/AdminLTE.css": "build/less/AdminLTE.less",
          }
        
      },
      bootstrap: {
        // Development not compressed
        // development: {
          options: {
            // Whether to compress or not
            strictMath: true,
            sourceMap: true,
            outputSourceFiles: true,
            sourceMapURL: 'bootstrap.css.map',
            sourceMapFilename: 'bootstrap/css/bootstrap.css.map',
            // compress: false
          },
          files: {
            "bootstrap/css/bootstrap.css": "build/bootstrap-less/bootstrap.less",
          }
        
      },

    },
    cssmin: {
      options: {
        // TODO: disable `zeroUnits` optimization once clean-css 3.2 is released
        //    and then simplify the fix for https://github.com/twbs/bootstrap/issues/14837 accordingly
        compatibility: 'ie8',
        keepSpecialComments: '*',
        sourceMap: true,
        advanced: false
      },
      skin: {
        files: [{
          expand: true,
          cwd: 'dist/css/skins/',
          src: ['*.css', '!*.min.css'],
          dest: 'dist/css/skins/',
          ext: '.min.css'
        }]
      },
      adminlte: {
        src: "dist/css/AdminLTE.css",
        dest: "dist/css/AdminLTE.min.css"
      },
      bootstrap: {
        src: "bootstrap/css/bootstrap.css",
        dest: 'bootstrap/css/bootstrap.min.css'
      }
    },
    // Uglify task info. Compress the js files.
    uglify: {
      options: {
        mangle: true,
        preserveComments: 'some'
      },
      my_target: {
        files: {
          'dist/js/app.min.js': ['dist/js/app.js']
        }
      }
    },
    // Build the documentation files
    includes: {
      build: {
        src: ['*.html'], // Source files
        dest: 'documentation/', // Destination directory
        flatten: true,
        cwd: 'documentation/build',
        options: {
          silent: true,
          includePath: 'documentation/build/include'
        }
      }
    },

    // Optimize images
    image: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'build/img/',
          src: ['**/*.{png,jpg,gif,svg,jpeg}'],
          dest: 'dist/img/'
        }]
      }
    },

    // Validate JS code
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      core: {
        src: 'dist/js/app.js'
      },
      demo: {
        src: 'dist/js/demo.js'
      },
      pages: {
        src: 'dist/js/pages/*.js'
      }
    },

    // Validate CSS files
    csslint: {
      options: {
        csslintrc: 'build/less/.csslintrc'
      },
      dist: [
        'dist/css/AdminLTE.css',
      ]
    },

    // Validate Bootstrap HTML
    bootlint: {
      options: {
        relaxerror: ['W005']
      },
      files: ['pages/**/*.html', '*.html']
    },

    // Delete images in build directory
    // After compressing the images in the build/img dir, there is no need
    // for them
    clean: {
      build: ["build/img/*"]
    }
  });

  // Load all grunt tasks

  // LESS Compiler
  grunt.loadNpmTasks('grunt-contrib-less');
  // cssmin
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  // Watch File Changes
  grunt.loadNpmTasks('grunt-contrib-watch');
  // Compress JS Files
  grunt.loadNpmTasks('grunt-contrib-uglify');
  // Include Files Within HTML
  grunt.loadNpmTasks('grunt-includes');
  // Optimize images
  grunt.loadNpmTasks('grunt-image');
  // Validate JS code
  grunt.loadNpmTasks('grunt-contrib-jshint');
  // Delete not needed files
  grunt.loadNpmTasks('grunt-contrib-clean');
  // Lint CSS
  grunt.loadNpmTasks('grunt-contrib-csslint');
  // Lint Bootstrap
  grunt.loadNpmTasks('grunt-bootlint');

  // Linting task
  grunt.registerTask('lint', ['jshint', 'csslint', 'bootlint']);

  // The default task (running "grunt" in console) is "watch"
  grunt.registerTask('default', ['watch']);
};
