import 'ol/ol.css';
import {Map, View} from 'ol';

const basemaps = require('./basemaps.js');




import { fromLonLat } from 'ol/proj';

import {defaults} from 'ol/control';
import Attribution from 'ol/control/Attribution';


let attributionControl = new Attribution({
  collapsible:true
})

const map = new Map({
    target: 'map',
    controls: defaults({}),

    // layers: [
    //   new TileLayer({

    //     source: new OSM(),
    //     zIndex:0,
    //     visible:true,
    //     opacity:1
    //   })

    //   new TileLayer({

    //     source : new XYZ({
    //         attributionsCollapsible: false,
    //         url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    //         maxZoom: 19
    //         }),

    //     zIndex:0,
    //     visible:false,
    //     opacity:1,
    //     title:"Test"
    // })

      // new TileLayer({

      //   source : new XYZ({        
      //       url:'https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{scale}.png' 
      //       //attributions:"<h3>data from online sources</>",
      //       }),

      //   zIndex:0,
      //   visible:false,
      //   opacity:1
      // })
    // ],
    view: new View({
      center: fromLonLat([23.7, 38]),
      zoom: 11
    })
  });


//Layer Switcher for the differents layers

map.addLayer(basemaps.layerGroup); 
const baseLayerElements = document.querySelectorAll('.sidebar > input[type=radio]'); 
//console.log(baseLayerElements); 
for(let basemap of baseLayerElements){
  basemap.addEventListener('change', function(){
    //console.log(this); 
    let baselayerValue = this.value; 

    basemaps.layerGroup.getLayers().forEach(function(element, index, array){
      //console.log(element.get('title')); 
      element.setVisible(element.get('title') === baselayerValue);
  
    });
  })
}


//Layer Switcher for the differents custom layers (eg wms from geoserver)
map.addLayer(basemaps.layerGroupB); 
const customLayerElements = document.querySelectorAll('.sidebar > input[type=checkbox]'); 
console.log(customLayerElements); 

for(let basemap of customLayerElements){
  basemap.addEventListener('change', function(){
    console.log(this.value); 
    let customLayerValue = this.value; 
    
    let customLayer; 

    basemaps.layerGroupB.getLayers().forEach(function(element, index, array){
      //console.log(element.get('title')); 
      if(customLayerValue === element.get('title')){
        customLayer = element; 
      }
  
    });
    this.checked ? customLayer.setVisible(true): customLayer.setVisible(false) ; 
  })
}