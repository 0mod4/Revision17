# Revision17

## Local testing

Linux (requires Chromium:
```
python -m http.server &; chromium "http://localhost:8000" &> /dev/null; kill $!
```
OSX:
```
cd Revision17/
python -m SimpleHTTPServer 8000
