const copyConfig = require('../node_modules/@ionic/app-scripts/config/copy.config');
copyConfig.copyFonts.src.push('{{ROOT}}/node_modules/font-awesome/fonts/**/*');
copyConfig.copyImages = {
  src: ['{{ROOT}}/node_modules/leaflet.awesome-markers/dist/images/*'],
  dest: '{{BUILD}}/images'
};
