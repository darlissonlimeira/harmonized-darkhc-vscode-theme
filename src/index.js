const fs = require("fs");
const getTheme = require("./theme");
const harmonizedDarkHc = require("./harmonizedDarkHc");
const harmonizedDark = require("./harmonizedDark");

const solarizedDarkUrl =
  "https://api.github.com/repos/microsoft/vscode/contents/extensions/theme-solarized-dark/themes/solarized-dark-color-theme.json";
const solarizedLightUrl =
  "https://api.github.com/repos/microsoft/vscode/contents/extensions/theme-solarized-light/themes/solarized-light-color-theme.json";
const commonAccentColors = {
  "statusBar.debuggingBackground": "#859900",
  "statusBar.foreground": "#ffffff",
  "statusBar.debuggingForeground": "#ffffff",
  "statusBar.noFolderForeground": "#ffffff",
  "statusBarItem.remoteForeground": "#ffffff",
};

// Dark hc
getTheme({
  name: "Harmonized dark",
  url: solarizedDarkUrl,
})
  .then((solarizedDark) => {
    const theme = {
      ...solarizedDark,
      tokenColors: [
        ...solarizedDark.tokenColors,
        ...harmonizedDark.tokenColors,
      ],
      colors: {
        ...solarizedDark.colors,
        ...harmonizedDarkHc.colors,
        "statusBarItem.remoteBackground":
          solarizedDark.colors["statusBar.background"],
        "statusBarItem.remoteForeground":
          solarizedDark.colors["statusBar.foreground"],
      },
    };
    const theme_ = {
      ...theme,
      colors: {
        ...theme.colors,
        ...commonAccentColors,
        "statusBar.background": "#2aa198",
        "statusBarItem.remoteBackground": "#2aa198",
        "statusBar.noFolderBackground": "#586e75",
      },
    };
    fs.writeFileSync("./themes/dark-hc.json", JSON.stringify(theme, null, 2));
  })
  .catch((e) => console.error("Oops", e))
  .finally(() => console.log("Harmonized dark (hc) themes written."));
