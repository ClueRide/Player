NOTE: When updating the sass.config.js, keep in mind the following:
- Although a Path might be pushed onto the SASS Configuration, the script
itself is only looking for SCSS or SASS files. It does not pickup files
with the extension .css for example.
- I've worked around this problem (poorly), by copying the .css file into 
another file with the .scss extension.  For example

```
cd ./node_modules/leaflet.awesome-markers/dist
cp -p leaflet.awesome-markers.css leaflet.awesome-markers.scss
```

I expect that blowing away the `node_modules` directory and re-installing
everything will require performing this copy once again.
