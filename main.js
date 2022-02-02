// window is a global variable of browser

window.onload = init ; 

function init(){

    var controlFullScreen = new ol.control.FullScreen();
    var scaleLIne = new ol.control.ScaleLine(); 
    var mousePositon = new ol.control.MousePosition();

    var mapOverVIew = new ol.control.OverviewMap({

        collapsed : false,
        rotateWithView : true,
        layers : [
            new ol.layer.Tile({

                source : new ol.source.XYZ({
                    
                    attributionsCollapsible: false,
                    url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
                    maxZoom: 19
                }),

                //visible:false,
            })
        ],

        //className : 'overview-id-test'

    }); 


    var extend = [23.7, 38];

    var map = new ol.Map({
        // view
        // layers
        // target
        view: new ol.View({
            center: ol.proj.fromLonLat(extend), //needs to be projected coords
            zoom : 3,
            maxZoom: 23,
            minZoom: 0,
            rotation : 0
        }),

        layers:[ 
            new ol.layer.Tile({

                source : new ol.source.XYZ({
                    
                    attributionsCollapsible: false,
                    url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
                    maxZoom: 19

                    }),

                //visible:false,
                

                zIndex:2

            })
        ],

        target: "js-map",
        keyboardEventTarget: document,
        controls : ol.control.defaults().extend([

            controlFullScreen,
            scaleLIne,
            mousePositon,
            mapOverVIew

        ]) 
        
    })


    var layerGroup = new ol.layer.Group({
        layers: [
            new ol.layer.Tile({

                source : new ol.source.OSM({
                   
                    url: 'http://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
                    maxZoom: 19
                }),
                zIndex: 1,
                opacity: 1,
                visible: false,
                extent: [2140145.60701732, 4144926.2459412785, 3019249.4931872766,5129186.0993564455]

            }),

            new ol.layer.Tile({
                source: new ol.source.BingMaps({
                    key: "AjP17pMRZ9vxvY0Cw3hXLtMVHAFWOL0M-2AN_Q9zDvGBfaBuQLEHBThi9_4YB01k",
                    imagerySet : "Road" //Aerial, AerialWithLabels, Road, CanvasDark, CanvasGray, OrdnanceSurvey
                }),
                visible: false,
                zIndex:4
            })
        ],
 
    })

    //map.addLayer(layerGroup) ;

    var cartDBBaseLayer = new ol.layer.Tile({

        source : new ol.source.XYZ({        
            url:'https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{scale}.png', 
            }),

        zIndex:6,
        visible:false

    })

    //map.addLayer(cartDBBaseLayer) ;

    var tileDebuggerLayer = new ol.layer.Tile({
        source: new ol.source.TileDebug(),
        zIndex:7
        
    });

    //map.addLayer(tileDebuggerLayer);

    // stamen basemap layer
    var stamenLayer = new ol.layer.Tile({

        source : new ol.source.XYZ({        
            url:'http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg', 
            }),

        zIndex:10,
        visible:false

    });

    //map.addLayer(stamenLayer);


    // TileArcgisRest layer
    var tileArcGisLayer = new ol.layer.Tile({

        source : new ol.source.TileArcGISRest({        
            url:'http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Demographics/ESRI_Population_World/MapServer', 
            }),

        zIndex:12,
        //visible:false

    });

    //map.addLayer(tileArcGisLayer);



    var popupContainerElement = document.getElementById('popup-coordinates');

    var popup = new ol.Overlay({
        element : popupContainerElement,
        positioning : 'center-right'
    })

    map.addOverlay(popup);

   

    map.on('click', function(e){
        // get coordianted from map
        var clickedCoordinates = e.coordinate;
        //popup.setPosition(undefined);
        //popup.setPosition(clickedCoordinates);
        popupContainerElement.innerHTML = clickedCoordinates; 

    })

    /////////////////////////////////////////////////////////////////////////////////////////////
    //////     INTERACTIONS   /////////////////////////////

     // DragRotate Interaction

    var dragRotateInteraction = new ol.interaction.DragRotate({
        condition: ol.events.condition.altKeyOnly,
        duration : 250
    }) 

    map.addInteraction(dragRotateInteraction);

    // DragRotate Interaction   
    var drawInteraction = new ol.interaction.Draw({
        type: 'Polygon'//'MultiLineString',
        //freehand: true
        
    })

    //map.addInteraction(drawInteraction);

    drawInteraction.on('drawend', function(e){
        console.log("draw finished!!"); 
        var parser = new ol.format.GeoJSON();
        var drawFeatures = parser.writeFeaturesObject([e.feature] );
        console.log(drawFeatures.features[0].geometry.coordinates);

        // var projection = parser.readProjection([e.feature]) ;  
        // console.log(projection);
    })


    


}