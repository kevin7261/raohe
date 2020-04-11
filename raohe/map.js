
var map;

const MAP_CENTER_LAT = 25.0511725;//24.178825;
const MAP_CENTER_LON = 121.5740792;//120.645740;
const MAP_LAYER = 16;//17;//16;
//const COLOR_MAIN = "#FFFFFF";

function setMapView() {

  map = L.map('id_map', {
    // options can go in here
    attributionControl: false,
    zoomControl: false,
    //renderer: L.canvas()
  }).setView([MAP_CENTER_LAT, MAP_CENTER_LON], MAP_LAYER);

  L.control.scale({imperial:false}).addTo(map);

  L.control.zoom({position:"bottomleft"}).addTo(map);

  L.control.attribution({
    prefix: 'smilekevin 2020'
  }).addTo(map);

  map.on("moveend", update);
}

function setBaseMap() {

  let baseMap_MapboxFengchia = L.tileLayer('https://api.mapbox.com/styles/v1/smilekevin/cjsh4uzb91osy1fpeutvja0cu/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoic21pbGVrZXZpbiIsImEiOiJjaWlraTR2N3kwMWI3dTFrcHpjbzdrMmo4In0.atRzOfOtv50DKfiTdW9owA', {                           
      maxZoom: 18
  });

  let baseMap_NLSC_EMAP = L.tileLayer('https://wmts.nlsc.gov.tw/wmts/EMAP/default/GoogleMapsCompatible/{z}/{y}/{x}', {
    maxZoom: 19
  });

  let baseMap_NLSC_PHOTO2015 = L.tileLayer('https://wmts.nlsc.gov.tw/wmts/PHOTO2015/default/GoogleMapsCompatible/{z}/{y}/{x}', {
    maxZoom: 18
  });

  let baseMap_NLSC_LUIMAP03 = L.tileLayer('https://wmts.nlsc.gov.tw/wmts/LUIMAP03/default/GoogleMapsCompatible/{z}/{y}/{x}', {
    maxZoom: 18
  });

  let baseMap_NLSC_EMAP7 = L.tileLayer('https://wmts.nlsc.gov.tw/wmts/EMAP7/default/GoogleMapsCompatible/{z}/{y}/{x}', {
    maxZoom: 18
  });

  let baseMap_NLSC_EMAP8 = L.tileLayer('https://wmts.nlsc.gov.tw/wmts/EMAP8/default/GoogleMapsCompatible/{z}/{y}/{x}', {
    maxZoom: 18
  });

  let baseMap_NLSC_EMAP97 = L.tileLayer('https://wmts.nlsc.gov.tw/wmts/EMAP97/default/GoogleMapsCompatible/{z}/{y}/{x}', {
    maxZoom: 18
  });

  let baseMap_OpenStreetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19
    //attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  });

  let baseMap_CartoCDN = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    subdomains: 'abcd',
    maxZoom: 19
  });

  let baseMap_MapBoxStreet = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', { 
      maxZoom: 18, 
      id: 'mapbox.streets', 
      accessToken: 'pk.eyJ1Ijoic21pbGVrZXZpbiIsImEiOiJjaWlraTR2N3kwMWI3dTFrcHpjbzdrMmo4In0.atRzOfOtv50DKfiTdW9owA' 
  });

  let baseMap_MapBoxSatellite = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', { 
      maxZoom: 18, 
      id: 'mapbox.satellite', 
      accessToken: 'pk.eyJ1Ijoic21pbGVrZXZpbiIsImEiOiJjaWlraTR2N3kwMWI3dTFrcHpjbzdrMmo4In0.atRzOfOtv50DKfiTdW9owA' 
  });

  let baseMap_MapBoxDark = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', { 
      maxZoom: 18, 
      id: 'mapbox.dark', 
      accessToken: 'pk.eyJ1Ijoic21pbGVrZXZpbiIsImEiOiJjaWlraTR2N3kwMWI3dTFrcHpjbzdrMmo4In0.atRzOfOtv50DKfiTdW9owA' 
  });

/*
mapbox.streets
mapbox.light
mapbox.dark
mapbox.satellite
mapbox.streets-satellite
mapbox.wheatpaste
mapbox.streets-basic
mapbox.comic
mapbox.outdoors
mapbox.run-bike-hike
mapbox.pencil
mapbox.pirates
mapbox.emerald
mapbox.high-contrast
*/

  baseMap_WMFLabs = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
      maxZoom: 18
  });

  baseMap_None = L.tileLayer('', {});

  L.control.layers({
      "MapBox Fengchia": baseMap_MapboxFengchia,
      "NLSC EMAP": baseMap_NLSC_EMAP,
      "NLSC Photo 2015": baseMap_NLSC_PHOTO2015,
      "NLSC LUIMAP 03": baseMap_NLSC_LUIMAP03,
      "NLSC EMAP 7": baseMap_NLSC_EMAP7,
      "NLSC EMAP 8": baseMap_NLSC_EMAP8,
      "NLSC EMAP 97": baseMap_NLSC_EMAP97,
      "OpenStreetMap": baseMap_OpenStreetMap,
      "Carto CDN": baseMap_CartoCDN,
      "MapBox Street": baseMap_MapBoxStreet,
      "MapBox Satellite": baseMap_MapBoxSatellite,
      "MapBox Dark": baseMap_MapBoxDark,
      "WMFLabs": baseMap_WMFLabs,
      "None": baseMap_None
  },{/*features*/}).addTo(map).setPosition('bottomright');

  //baseMap_MapboxFengchia.addTo(map);
  baseMap_None.addTo(map);
}

function update()
{
  console.log("update");
}
