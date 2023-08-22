module.exports = {
  input: ["./build-i18n/**/*.{js,jsx}"],
  options: {
    removeUnusedKeys: true,
    sort: true,
    func: {
      list: ["i18next.t", "i18n.t", "t", "__"],
      extensions: [".js", ".jsx"],
    },
    trans: {
      component: "Trans",
      i18nKey: "i18nKey",
      defaultsKey: "defaults",
      extensions: [".js", ".jsx"],
      fallbackKey: false,
    },
    lngs: ["en", "de"],
    defaultLng: "en",
    defaultValue: "",
    resource: {
      loadPath: "./public/locales/{{lng}}/{{ns}}.json",
      savePath: "./public/locales/{{lng}}/{{ns}}.json",
      jsonIndent: 2,
      lineEnding: "\n",
    },
    keySeparator: false,
    pluralSeparator: "_",
    contextSeparator: "_",
    contextDefaultValues: [],
    interpolation: {
      prefix: "{{",
      suffix: "}}",
    },
  },
};
