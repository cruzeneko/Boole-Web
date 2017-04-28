# Get current directory
wd=$(pwd)

wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.1/install.sh | bash
nvm install stable
npm install -g bower

# Quill
bower install quill
cd bower_components/quill
npm install
npm test
cd $wd

# Bootstrap
bower install bootstrap
cd bower_components/bootstrap
npm install
npm test
cd $wd

# Slick
bower install kenwheeler/slick

# Drom/Logidrom
bower install drom/logidrom
cd bower_components/logidrom
npm install
cd $wd

# Browserify
npm install -g browserify
browserify js/logidrom.js > js/logidrom_b.js

# JSPdf
bower install MrRio/jsPDF
