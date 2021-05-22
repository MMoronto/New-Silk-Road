window.onload = init;

function init(){  
    const map = new ol.Map({
        view: new ol.View({
            center: [-110, 40],
            zoom: 0.50,
            extent: [-5837786.856305197, -8622668.2727381, 10266905.484192658, 9308650.467931474],
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

    const styleForSelect = function(feature){
        let projID = feature.get('ID');
        let projIDString = projID.toString();
        const styles = [
                new ol.style.Style({
                    image: new ol.style.Circle({
                        fill: new ol.style.Fill({
                            color: [247, 26, 10, 0.5]
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
                            color: [87, 9, 9, 1]
                        }),
                        stroke: new ol.style.Stroke({
                            color: [87, 9, 9, 1],
                            width: 0.5
                        })
                    })
                })
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
        map.forEachFeatureAtPixel(evt.pixel, function(feature, layer){
            let featureName = feature.get('Projectname'); //from json file
            let navElement = navElements.children.namedItem(featureName);
            mainLogic(feature, navElement)
        })
    })

    function mainLogic(feature, clickedAnchorElement){
         // Re-assign active class to clicked element
        let currentActiveStyledElement = document.querySelector('.active');
        currentActiveStyledElement.className = currentActiveStyledElement.className.replace('active', '');   
        clickedAnchorElement.className = 'active';

        // Change the view based on the feature
        let featureCoordinates = feature.get('geometry').getCoordinates();
        mapView.animate({center: featureCoordinates}, {zoom: 5})

        let afriProjFeatures = afriProjLayer.getSource().getFeatures();
        afriProjFeatures.forEach(function(feature){
            feature.setStyle(afriProjStyle);
        })
        feature.setStyle(styleForSelect)

        let featureName = feature.get('Projectname'); //from JSON file
        let featureImage = feature.get('ProjectImage'); //from JSON file
        projNameElement.innerHTML = 'Name of the project: ' + featureName
        projImageElement.setAttribute('src', './data/Projectimages/' + featureImage + '.jpg');
    }
    
    // Navigation Button Logic
    const anchorNavElements = document.querySelectorAll('.column-navigation > a');
    for(let anchorNavElement of anchorNavElements){
        anchorNavElement.addEventListener('click', function(e){
            let clickedAnchorElement = e.currentTarget;
            let clickedAnchorElementID = clickedAnchorElement.id;
            let afriProjFeatures = afriProjLayer.getSource().getFeatures();
            afriProjFeatures.forEach(function(feature){
                console.log(feature.get('Projectname')); // From JSON file
            })
        })
    } 
}