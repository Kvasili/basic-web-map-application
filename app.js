

var options = {

    zoom : 4,
    extend : [23.7, 38],
    center : ol.proj.fromLonLat(this.extend),
    view: new ol.View({
        center: this.center, //needs to be projected coords
        zoom : 4,
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
        })
    ],
    target: "map",
    keyboardEventTarget: document,
};

var map = new ol.Map({
    view : options.view,
    layer : options.layers,
    target : options.target
}) ;

map.on('moveend', function(){

    var extend = ol.proj.toLonLat( map.getView().getCenter() );
    var zoom =  map.getView().getZoom();
    localStorage.setItem("extend", JSON.stringify(extend));
    localStorage.setItem("zoom", JSON.stringify(zoom));
    //console.log(extend, zoom); 
})

map.on('moveend', function(){
    var extend = JSON.parse(localStorage.getItem('extend')); 
    var zoom = JSON.parse(localStorage.getItem('zoom')); 
    console.log(extend, zoom); 
})