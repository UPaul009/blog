/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');
const {
  description,
  productName,
  productShortName,
} = require('../../package.json');

const OUT_DIR = path.join(__dirname, '..', '..', 'static');

const iconSizes = [72, 96, 128, 144, 256, 512];

const icons = iconSizes.map(icon => ({
  src: `/static/images/logo/logo-${icon}.png`,
  sizes: `${icon}x${icon}`,
}));

const json = {
  name: productName,
  short_name: productShortName,
  description,
  start_url: '/?homescreen=1',
  background_color: '#6c16c7',
  theme_color: '#6c16c7',
  display: 'standalone',
  icons,
};

module.exports = () => {
  fs.writeFileSync(
    path.join(OUT_DIR, 'manifest.webmanifest'),
    JSON.stringify(json, null, 2)
  );
};