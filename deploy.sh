wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.1/install.sh | bash
nvm install stable
npm install -g bower

# Quill
bower install quill
cd bower_components/quill
npm install
npm test
cd ../../

# Bootstrap
bower install bootstrap
cd bower_components/bootstrap
npm install
npm test

