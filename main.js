window.onload = init;

function init(){  
    // ##Specify view##
    const map = new ol.Map({
        view: new ol.View({
            center: [0, -0, 0, 0],
            zoom: 1,
            extent: [0, -0, 0, 0]
        }),
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ]
    })
}