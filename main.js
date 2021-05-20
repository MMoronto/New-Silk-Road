window.onload = init;

function init(){  
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

    // African Projects GeoJSON
    const afriProjStyle = function(feature){
        let projID = feature.get('ID');
        let projIDString = projID.toString();
        const styles = [
                new ol.style.Style({
                    image: new ol.style.Circle({
                        fill: new ol.style.Fill({
                            color: [77, 219, 105, 0.6]
                        }),
                        stroke: new ol.style.Stroke({
                            color: [6, 125, 34, 1],
                            width: 2
                        }),
                        radius: 12
                    }),
                    text: new ol.style.Text({
                        text: projIDString,
                        scale: 1.5,
                        fill: new ol.style.Fill({
                            color: [232, 26, 26, 1]
                        }),
                        stroke: new ol.style.Stroke({
                            color: [232, 26, 26, 1],
                            width: 0.3
                        })
                    })
                })
            // ]
        ]
        return styles
    }

    const afriProjLayer = new ol.layer.Vector({
        source: new ol.source.Vector({
            format: new ol.format.GeoJSON(),
            url: './data/African_projects.geojson'
        }),
        style: afriProjStyle
    })
    map.addLayer(afriProjLayer);

    // Map Features Click Logic
    const navElements = document.querySelector('.column-navigation')
    const projNameElement = document.getElementById('projectname');
    const projImageElement = document.getElementById('projectimage');
    const mapView = map.getView();

    map.on('singleclick', function(evt){
        map.forEachFeatureAtPixel()
    })
}