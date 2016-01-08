#!/bin/sh


service mongodb restart

su sacha <<'EOF'

git pull --rebase

node server.js &

mongod --smallfiles &

EOF
