FROM gitpod/workspace-full

RUN bash -c ". .nvm/nvm.sh \
             && nvm install v12 && nvm alias default v12 \
             && nvm use default && npm i -g yarn"