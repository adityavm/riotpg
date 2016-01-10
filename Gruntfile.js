module.exports = function(grunt) {
  // Load all grunt tasks
  require("jit-grunt")(grunt);

  var initConfig = {
    pkg:                grunt.file.readJSON("package.json"),
    livereload_port_1:  36001,
    less_dir:           "src/less/",
    src_dir:            "src/",
    view_dir:           "src/view/",
    libjs_dir:          "bower_components/",
    extlibjs_dir:       "external_libs/",
    out_dir:            "src/build/",
    zip_package_name:   "package.zip"
  };

  // Initialize a configuration object
  grunt.initConfig(initConfig);

  // Path to libraries
  var libs = {
    dev: [
      "<%= libjs_dir %>riot/riot.js",
    ],
    test: [
      "<%= libjs_dir %>riot/riot.js",
    ],
    prod: []
  },
  app_scripts = {
    dev: [
      "<%= src_dir %>js/core.js",
      "<%= src_dir %>**/*.js",
      "!<%= out_dir %>**/*.js",
    ],
    test: [],
    prod: []
  },
  libs_css = [
  ];

  // Further config properties
  var configs = {
    concurrent: {
      reload: {
        tasks: ["connect:dev", "watch:less", "watch:src", "watch:riot", "watch:babel", "watch:build"],
        options: {
          logConcurrentOutput: true
        }
      },
      dev: {
        tasks: ["clean:build", "less:dev", "riot", "uglify:libs_bundle", "concat:app_bundle"],
        options: {
          logConcurrentOutput: true
        }
      },
    },

    less: {
      dev: {
        options: {
          paths:              "<%= less_dir %>",
          sourceMap:          true,
          sourceMapFilename:  "<%= out_dir %>css/index.css.map",
          sourceMappingURL:   "<%= out_dir %>css/index.css.map",
          sourceMapRootpath:  "",
          outputSourceFiles:  true,
          yuicompress:        false
        },
        files: {
          "<%= out_dir %>css/index.css": [libs_css, "<%= less_dir %>index.less"]
        }
      },
      prod: {}
    },

    babel: {
      options: {
        sourceMap:  true,
      },
      dist: {
        src:        ["<%= out_dir %>js/index.js"],
        dest:       "<%= out_dir %>js/bundle.js"
      }
    },

    concat: {
      libs_bundle: {
        options: {
          sourceMap:          true,
          sourceMapName:      "<%= out_dir %>js/libs.js.map",
          sourceMappingURL:   "<%= out_dir %>js/libs.js.map",
          stripBanners:       true,
          separator:          ";\n"
        },
        files: {
          "<%= out_dir %>js/libs.js": libs.dev
        }
      },
      app_bundle: {
        options: {
          sourceMap:          true,
          sourceMapName:      "<%= out_dir %>js/index.js.map",
          sourceMappingURL:   "<%= out_dir %>js/index.js.map",
          stripBanners:       true,
          separator:          ";\n"
        },
        files: {
          "<%= out_dir %>js/index.js": app_scripts.dev
        }
      }
    },

    connect: {
      dev: {
        options: {
          port:       8008,
          hostname:   "127.0.0.1",
          base:       "src",
          //protocol: "https",
          keepalive:  true
        }
      }
    },

    compress: {
      main: {
        options: {
          archive:      "<%= zip_package_name %>",
          pretty:       true
        },
        expand:         true,
        cwd:            "<%= deploy_dir %>/",
        src:            ["**/*"],
        dest:           "/"
      }
    },

    clean: {
      build:          ["<%= out_dir %>"]
    },

    uglify: {
      libs_bundle: {
        options: {
          mangle:             false,
          sourceMap:          true,
          sourceMapName:      "<%= out_dir %>js/libs.js.map",
          preserveComments:   false,
          compress:           true,
          screwIe8:           true
        },
        files: {
          "<%= out_dir %>js/libs.js": libs.test
        }
      }
    },

    riot: {
      options:{
        concat: true,
      },
      dist: {
        src: "<%= src_dir %>/**/*.tag",
        dest: "<%= out_dir %>js/tags.js",
      }
    },

    watch: {
      src: {
        files:  ["<%= src_dir %>**/*.html", "<%= src_dir %>**/*.js", "!<%= out_dir %>**/*.js"],
        tasks:  ["concat:app_bundle"]
      },
      riot: {
        files: ["<%= src_dir %>js/*.tag"],
        tasks: ["riot"]
      },
      less: {
        files:  ["<%= less_dir %>**/*.less"],
        tasks:  ["less:dev"]
      },
      babel: {
        files:  ["<%= out_dir %>js/index.js"],
        tasks:  ["babel"]
      },
      build: {
        files:  ["<%= out_dir %>js/bundle.js", "<%= out_dir %>js/index.js", "<%= out_dir %>js/tags.js", "<%= out_dir %>css/index.css"],
        options: {
          livereload: initConfig.livereload_port_1
        }
      }
    }
  };

  // Recursively merges properties
  grunt.config.merge(configs);

  // Enable time information
  require("time-grunt")(grunt);

  // Set default task
  grunt.registerTask("default", ["concurrent:dev", "babel", "concurrent:reload"]);
};
