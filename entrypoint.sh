#!/bin/sh
# Replace env vars in JavaScript files
echo "Replacing env vars in JS"
for file in /usr/share/nginx/html/static/js/main.*;
do
  echo "Processing $file ...";

  # Use the existing JS file as template
  if [ ! -f $file.tmpl.js ]; then
    cp $file $file.tmpl.js
  fi

  envsubst '$NODE_ENV $REACT_APP_API_URL $REACT_APP_GOOGLE_KEY  $REACT_APP_ALERT_RANGE' < $file.tmpl.js > $file
done

echo "Starting Nginx"
nginx -g 'daemon off;'
