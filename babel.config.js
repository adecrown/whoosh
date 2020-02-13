module.exports = {
  "presets": [
    ["@babel/preset-env", {
      "modules": false
    }]
  ],
  "env": {
    "test": {
      "presets": [
        ["@babel/preset-env", {
          "targets": {
            "browsers": ["last 2 versions", "safari >= 7"],
            node: 'current'
          }
        }]
      ],
      "plugins": ["@babel/plugin-transform-runtime",{
        "regenerator": true
      }]
    }
  },
  "plugins": ["@babel/plugin-syntax-dynamic-import", "transform-dynamic-import","@babel/plugin-transform-runtime"]
}