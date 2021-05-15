window.onload = init;

function init(){  
    // ##Specify view##
    const map = new ol.Map({
        view: new ol.View({
            center: [-110, 40],
            zoom: 0.50,
            extent: [-2928417.2600459913, -5356355.993575926, 6819329.638905743, 5231577.155380443],
        }),
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        target: 'openlayers-map'
    })

    map.on('click', function(e){
        console.log(e.coordinate);
    })
}