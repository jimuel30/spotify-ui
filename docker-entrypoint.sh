#!/bin/bash

# Replace the placeholder with the actual BACKEND_DOMAIN environment variable
sed -i "s|__BACKEND_DOMAIN__|$BACKEND_DOMAIN|g" /usr/src/app/dist/spotify-ui/assets/env.js

# Now run the original CMD, which is to start the Angular app
exec "$@"
