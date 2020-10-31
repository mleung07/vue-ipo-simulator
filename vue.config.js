module.exports = {
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "IPO Simulator";
      return args;
    });
  },
  pwa: {
    manifestOptions: {
      themeColor: "#17a2b8",
      name: "IPO Simulator",
    },
    iconPaths: {
      favicon32: "img/icons/icon-32x32.png",
      favicon16: "img/icons/icon-16x16.png",
      appleTouchIcon: "img/icons/icon-152x152.png",
      maskIcon: "img/icons/icon-safari.svg",
      msTileImage: "img/icons/icon-144x144.png",
    },
  },
  publicPath:
    process.env.NODE_ENV === "production" ? "/vue-ipo-simulator/" : "/",
};
