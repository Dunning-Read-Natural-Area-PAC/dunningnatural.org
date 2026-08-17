var wms_layers = [];

var lyr_CookCountyAerialImagery2025_0 = new ol.layer.Tile({
                            source: new ol.source.TileWMS(({
                              url: "https://gis.cookcountyil.gov/imagery/services/CookOrtho2025/ImageServer/WMSServer",
                              attributions: ' ',
                              params: {
                                "LAYERS": "CookOrtho2025:orthoMosaic2025",
                                "TILED": "true",
                                "VERSION": "1.3.0"},
                            })),
                            title: 'Cook County Aerial Imagery 2025',
                            popuplayertitle: 'Cook County Aerial Imagery 2025',
                            type: 'base',
                            opacity: 1.000000,
                            
                            
                          });
              wms_layers.push([lyr_CookCountyAerialImagery2025_0, 0]);
var lyr_Elevationmodel_1 = new ol.layer.Image({
        opacity: 1,
        
    title: 'Elevation model<br />\
    <img src="styles/legend/Elevationmodel_1_0.png" /> <=633 ft<br />\
    <img src="styles/legend/Elevationmodel_1_1.png" /> 633-635 ft<br />\
    <img src="styles/legend/Elevationmodel_1_2.png" /> 635-637 ft<br />\
    <img src="styles/legend/Elevationmodel_1_3.png" /> 637-639 ft<br />\
    <img src="styles/legend/Elevationmodel_1_4.png" /> 639-641 ft<br />\
    <img src="styles/legend/Elevationmodel_1_5.png" /> 641-643 ft<br />\
    <img src="styles/legend/Elevationmodel_1_6.png" /> 643-645.000000<br />\
    <img src="styles/legend/Elevationmodel_1_7.png" /> >645 ft<br />' ,
        
        
        source: new ol.source.ImageStatic({
            url: "./layers/Elevationmodel_1.png",
            attributions: ' ',
            projection: 'EPSG:3857',
            alwaysInRange: true,
            imageExtent: [-9774438.267954, 5153892.073324, -9773437.273727, 5154296.736614]
        })
    });
var format_Trails_2 = new ol.format.GeoJSON();
var features_Trails_2 = format_Trails_2.readFeatures(json_Trails_2, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Trails_2 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Trails_2.addFeatures(features_Trails_2);
var lyr_Trails_2 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_Trails_2, 
                style: style_Trails_2,
                popuplayertitle: 'Trails',
                interactive: true,
                title: '<img src="styles/legend/Trails_2.png" /> Trails'
            });
var format_202510Plantings_3 = new ol.format.GeoJSON();
var features_202510Plantings_3 = format_202510Plantings_3.readFeatures(json_202510Plantings_3, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_202510Plantings_3 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_202510Plantings_3.addFeatures(features_202510Plantings_3);
var lyr_202510Plantings_3 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_202510Plantings_3, 
                style: style_202510Plantings_3,
                popuplayertitle: '2025-10 Plantings',
                interactive: true,
    title: '2025-10 Plantings<br />\
    <img src="styles/legend/202510Plantings_3_0.png" /> American plum<br />\
    <img src="styles/legend/202510Plantings_3_1.png" /> bitternut hickory<br />\
    <img src="styles/legend/202510Plantings_3_2.png" /> blue-fruited dogwood<br />\
    <img src="styles/legend/202510Plantings_3_3.png" /> common ninebark<br />\
    <img src="styles/legend/202510Plantings_3_4.png" /> common serviceberry<br />\
    <img src="styles/legend/202510Plantings_3_5.png" /> common witch-hazel<br />\
    <img src="styles/legend/202510Plantings_3_6.png" /> interior shadbush<br />\
    <img src="styles/legend/202510Plantings_3_7.png" /> New Jersey tea<br />\
    <img src="styles/legend/202510Plantings_3_8.png" /> purple chokeberry<br />\
    <img src="styles/legend/202510Plantings_3_9.png" /> red osier dogwood<br />\
    <img src="styles/legend/202510Plantings_3_10.png" /> shagbark hickory<br />\
    <img src="styles/legend/202510Plantings_3_11.png" /> shrubby St. John\'s-wort<br />\
    <img src="styles/legend/202510Plantings_3_12.png" /> white oak<br />' });
var group_boundaries = new ol.layer.Group({
                                layers: [],
                                fold: 'close',
                                title: 'boundaries'});
var group_IndividualPINs = new ol.layer.Group({
                                layers: [],
                                fold: 'open',
                                title: 'Individual PINs'});
var group_Natureplayareaplanning = new ol.layer.Group({
                                layers: [],
                                fold: 'close',
                                title: 'Nature play area planning'});
var group_elevationmap = new ol.layer.Group({
                                layers: [],
                                fold: 'close',
                                title: 'elevation map'});

lyr_CookCountyAerialImagery2025_0.setVisible(true);lyr_Elevationmodel_1.setVisible(false);lyr_Trails_2.setVisible(true);lyr_202510Plantings_3.setVisible(true);
var layersList = [lyr_CookCountyAerialImagery2025_0,lyr_Elevationmodel_1,lyr_Trails_2,lyr_202510Plantings_3];
lyr_Trails_2.set('fieldAliases', {'ID': 'ID', 'UUID': 'UUID', 'name': 'name', 'remarks': 'remarks', 'start_time': 'start_time', 'end_time': 'end_time', });
lyr_202510Plantings_3.set('fieldAliases', {'fid': 'fid', 'inat_id': 'inat_id', 'common_name': 'Common Name', 'scientific_name': 'Scientific name', 'dead_on_or_before': 'dead_on_or_before', });
lyr_Trails_2.set('fieldImages', {'ID': '', 'UUID': '', 'name': '', 'remarks': '', 'start_time': '', 'end_time': '', });
lyr_202510Plantings_3.set('fieldImages', {'fid': 'Hidden', 'inat_id': 'Hidden', 'common_name': 'TextEdit', 'scientific_name': 'TextEdit', 'dead_on_or_before': 'Hidden', });
lyr_Trails_2.set('fieldLabels', {'ID': 'no label', 'UUID': 'no label', 'name': 'no label', 'remarks': 'no label', 'start_time': 'no label', 'end_time': 'no label', });
lyr_202510Plantings_3.set('fieldLabels', {'fid': 'no label', 'inat_id': 'no label', 'common_name': 'inline label - visible with data', 'scientific_name': 'inline label - visible with data', 'dead_on_or_before': 'no label', });
lyr_202510Plantings_3.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});