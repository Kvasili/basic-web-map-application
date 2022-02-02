
import OSM from 'ol/source/OSM';
import BingMaps from 'ol/source/BingMaps';
import XYZ from 'ol/source/XYZ';
import TileWMS from 'ol/source/TileWMS';
import LayerGroup from 'ol/layer/Group';
import TileLayer from 'ol/layer/Tile';



var osm = new TileLayer({

    source: new OSM(),
    zIndex:0,
    visible:true,
    opacity:1,
    title:"OSM"
});


var imagery = new TileLayer({

    source : new XYZ({
        attributionsCollapsible: false,
        url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        maxZoom: 19
        }),

    zIndex:0,
    visible:false,
    opacity:1,
    title:"imagery"
})

var bingImagery = new TileLayer({
    
    preload: Infinity,
    source: new BingMaps({
      key: 'AjP17pMRZ9vxvY0Cw3hXLtMVHAFWOL0M-2AN_Q9zDvGBfaBuQLEHBThi9_4YB01k',
      imagerySet: "Aerial",
      // use maxZoom 19 to see stretched tiles instead of the BingMaps
      // "no photos at this zoom level" tiles
      maxZoom: 19
    }),
    zIndex:0,
    visible:false,
    opacity:1,
    title:"Bing"
  })

var bibgImageryDark = new TileLayer({

    preload: Infinity,
    source: new BingMaps({
        key: 'AjP17pMRZ9vxvY0Cw3hXLtMVHAFWOL0M-2AN_Q9zDvGBfaBuQLEHBThi9_4YB01k',
        imagerySet: "CanvasDark", //"Aerial",
        // use maxZoom 19 to see stretched tiles instead of the BingMaps
        // "no photos at this zoom level" tiles
        maxZoom: 19
    }),
    zIndex:0,
    visible:false,
    opacity:1,
    title:"Bing-Dark"
})


////////////////////////// topo layers ////////////////////////////////////////////////

var wmsTopoLayer = new TileLayer({
visible: false,
    source: new TileWMS({
        url: 'http://localhost:8080/geoserver/it.geosolutions/wms',
        params: {'FORMAT': "image/png", 
                'VERSION': '1.1.1',
                tiled: true,
                "STYLES": '',
                "LAYERS": 'it.geosolutions:geo2'
        }
    }),
    opacity: 1, 
    //zIndex:2
    title:"topo1"
});

wmsTopoLayer.getSource().setAttributions("<a href=https://http://geoserver.org/>Data from Geoserver</a>"); 
  
var wmsTopoLayer1 = new TileLayer({
    visible: false,
    source: new TileWMS({
        url: 'http://localhost:8080/geoserver/it.geosolutions/wms',
        params: {'FORMAT': "image/png", 
                tiled: true,
            "STYLES": '',
            "LAYERS": 'it.geosolutions:geo1'
        }
    }),
    opacity:1, 
    //zIndex:2
    title:"topo2"
});

//map.addLayer(wmsTopoLayer1);

const layerGroup = new LayerGroup({

    layers:[osm, imagery, bingImagery, bibgImageryDark]

});

const layerGroup4Topos = new LayerGroup({

    layers:[wmsTopoLayer, wmsTopoLayer1]

});


module.exports.layerGroup = layerGroup ;
module.exports.layerGroupB = layerGroup4Topos ;