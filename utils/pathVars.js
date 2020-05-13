const COMMON_MODULE_LAYER_PATH = process.env.IS_LOCAL
  ? "@common-module/"
  : "/opt/";

module.exports = {
  COMMON_MODULE_LAYER_PATH,
};
