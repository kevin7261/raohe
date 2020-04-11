
function loadGeoJson_SpaceSyntax(layer) {

  fetch(PATHNAME_GEOJSON + layer.m_sPathName,
         {mode: 'no-cors', method: 'GET'})
    .then(response => response.json())
    .then(json => 
    {
      layer.m_Feature = L.geoJSON(json, {

        style: function (feature) {

          return {
            stroke: layer.m_Style.m_bStroke,
            color: layer.m_Style.m_cColor,//scaleColor(feature.properties.t1024_integration),
            weight: layer.m_Style.m_fWeight,
            opacity: layer.m_Style.m_fOpacity,
            fill: layer.m_Style.m_bFill,
            fillColor: layer.m_Style.m_cFillColor,
            fillOpacity: layer.m_Style.m_fFillOpacity,
            //bubblingMouseEvents: true
          };
        },

        onEachFeature: function(feature, layer) {

            layer.bindPopup("ref: " + feature.properties.ref + "<br>" + 
                            "angular_connectivity: " + feature.properties.angular_connectivity + "<br>" +
                            "axial_line_ref: " + feature.properties.axial_line_ref + "<br>" +
                            "connectivity: " + feature.properties.connectivity + "<br>" +
                            "segment_length: " + feature.properties.segment_length + "<br>" +
                            "t1024_choice: " + feature.properties.t1024_choice + "<br>" +
                            "t1024_choice_seg: " + feature.properties.t1024_choice_seg + "<br>" +
                            "t1024_integration: " + feature.properties.t1024_integration + "<br>" +
                            "t1024_integration_seg: " + feature.properties.t1024_integration_seg + "<br>" +
                            "t1024_node_count: " + feature.properties.t1024_node_count + "<br>" +
                            "t1024_total_depth: " + feature.properties.t1024_total_depth + "<br>" +
                            "t1024_total_depth_seg: " + feature.properties.t1024_total_depth_seg);// + "<br>" +
                            //"t1024_total_segment_length: " + feature.properties.t1024_total_segment_length);
        }

      });//.addTo(map);
    })
    .catch(error => console.log("loadGeoJson_SpaceSyntax >>" + error.message));
}

function loadGeoJson(cFeature) {

  fetch(PATHNAME_GEOJSON + cFeature.m_sPathName,
         {mode: 'no-cors', method: 'GET'})
    .then(response => response.json())
    .then(json => 
    {
      cFeature.m_Feature = L.geoJSON(json, {

        style: function (feature) {

            let style = cFeature.m_Style;

            return {
              stroke: style.m_bStroke,
              color: style.m_cColor,
              weight: style.m_fWeight,
              opacity: style.m_fOpacity,
              fill: style.m_bFill,
              fillColor: style.m_cFillColor,
              fillOpacity: style.m_fFillOpacity,
            };
        }
      });//.addTo(map);

      displayFeature(cFeature);
    })
    .catch(error => console.log("loadGeoJson >>" + error.message + "/" + cFeature.m_sPathName));
}

function loadGeoJson_POIs(cFeature, nIndex) {

  let POICategory = getPOICategoryByIndex(nIndex);

  let heatMapPoints_Stores = [];
  let heatMapPoints_GM = [];
  let heatMapPoints_GP = [];
  let vHeatMapPoints_OpeningHours_Weekday = [];
  let vHeatMapPoints_OpeningHours_Weekend = [];
  let vHeatMapPoints_PopularTimes_Weekday = [];
  let vHeatMapPoints_PopularTimes_Weekend = [];

  for (let i = 0; i < 24; i++) {
    vHeatMapPoints_OpeningHours_Weekday.push([]);
    vHeatMapPoints_OpeningHours_Weekend.push([]);
    vHeatMapPoints_PopularTimes_Weekday.push([]);
    vHeatMapPoints_PopularTimes_Weekend.push([]);
  }

  fetch(PATHNAME_GEOJSON + cFeature.m_sPathName,
         {mode: 'no-cors', method: 'GET'})
    .then(response => response.json())
    .then(json => 
    {
      let vFeatures = json.features.filter(
        function(d) { 
          if ((nIndex == 0 && (d.properties.category == "F" || d.properties.category == "S")) || 
              (d.properties.category == POICategory.category)) 
            return d; 
        });

      POICategory.user_ratings_total_max = d3.max(vFeatures, function (d) { return d.properties.user_ratings_total; });

      let vFeatures_Filter = json.features.filter(function(d) { if (d.properties.category == POICategory.category && d.properties.user_ratings_total > 0) return d; })

      //let nRoofThreshold = Math.round(vFeatures_Filter.length / 5);

      //console.log(POICategory.name, vFeatures_Filter.length, nRoofThreshold, vFeatures[nRoofThreshold].properties.user_ratings_total);
      console.log("rating", POICategory.name, POICategory.user_ratings_total_max, POICategory.user_ratings_total_max / 50);

      POICategory.scale = d3.scaleLinear()
                            .domain([0, 1, POICategory.user_ratings_total_max / 50])//.domain([0, POICategory.user_ratings_total_max])
                            //.domain([0, 1, vFeatures[nRoofThreshold].properties.user_ratings_total])//.domain([0, POICategory.user_ratings_total_max])
                            .range([0, 2, 15])//.range([2, POICategory.user_ratings_total_max / 75])//.range([1, POICategory.user_ratings_total_max / 10]);
                            .clamp(true);

      POICategory.scale_gp = d3.scaleLinear()
                            .domain([0, 1, POICategory.user_ratings_total_gp_max])//.domain([0, POICategory.user_ratings_total_max])
                            .range([0, 2, 15])//.range([2, POICategory.user_ratings_total_max / 75])//.range([1, POICategory.user_ratings_total_max / 10]);
                            .clamp(true);    

      console.log(POICategory.category, POICategory.user_ratings_total_max, POICategory.user_ratings_total_max / 50, POICategory.user_ratings_total_gp_max);

      // -------------------------------------------

      cFeature.m_Feature = L.geoJSON(json, {

        filter: function (feature) {

          if ((nIndex == 0 && feature.properties.category != "X") ||
              feature.properties.category == POICategory.category)
            return true;
        },

        style: function (feature) {

          let style = cFeature.m_Style;

          return {
            stroke: style.m_bStroke,
            color: style.m_cColor,
            weight: style.m_fWeight,
            opacity: style.m_fOpacity,
            fill: style.m_bFill,
            fillColor: style.m_cFillColor,
            fillOpacity: style.m_fFillOpacity,
          };
        },
        
        pointToLayer: function(geoJsonPoint, latlng) {

          //let name = geoJsonPoint.properties.name;
          let nReviewsCount = geoJsonPoint.properties.user_ratings_total;
          //let vTypes = geoJsonPoint.properties.types;

          let fRadius = 2;//geoJsonPoint.properties.user_ratings_total / 15;

          //if (nIndex ==  0 || geoJsonPoint.properties.category == POICategory.category)
          {
            heatMapPoints_Stores.push([geoJsonPoint.geometry.coordinates[1], 
                                       geoJsonPoint.geometry.coordinates[0], 
                                       0.5]);

            heatMapPoints_GM.push([geoJsonPoint.geometry.coordinates[1], 
                                   geoJsonPoint.geometry.coordinates[0], 
                                   nReviewsCount / POICategory.user_ratings_total_max * 80]);

            for (let i = 0; i < 24; i++) {
              
              vHeatMapPoints_OpeningHours_Weekday[i].push([geoJsonPoint.geometry.coordinates[1], 
                                                           geoJsonPoint.geometry.coordinates[0], 
                                                           (geoJsonPoint.properties.opening_hours_weekday[i] * 1)]);

              vHeatMapPoints_OpeningHours_Weekend[i].push([geoJsonPoint.geometry.coordinates[1], 
                                                           geoJsonPoint.geometry.coordinates[0], 
                                                           (geoJsonPoint.properties.opening_hours_weekend[i] * 1)]);
              
              vHeatMapPoints_PopularTimes_Weekday[i].push([geoJsonPoint.geometry.coordinates[1], 
                                                           geoJsonPoint.geometry.coordinates[0], 
                                                           (geoJsonPoint.properties.populartimes_weekday[i] / 100)]);

              vHeatMapPoints_PopularTimes_Weekend[i].push([geoJsonPoint.geometry.coordinates[1], 
                                                           geoJsonPoint.geometry.coordinates[0], 
                                                           (geoJsonPoint.properties.populartimes_weekend[i] / 100)]);
            }

            return L.circle(latlng, {radius: fRadius});
          }
        },

        onEachFeature: function(feature, layer) {
          
          //layer.on('mouseover', function() { 
              
            //console.log("ref", feature.properties.ref);
            //console.log("int", feature.properties.t1024_integration);
          //});

          layer.bindPopup("place_id: " + feature.properties.place_id + "<br>" + 
                          "name: " + feature.properties.name + "<br>" + 
                          "address: " + feature.properties.address + "<br>" + 
                          "location: " + feature.properties.lat + " " + feature.properties.lng + "<br>" + 
                          "opening_hours_weekday: " + feature.properties.opening_hours_weekday + "<br>" + 
                          "opening_hours_weekend: " + feature.properties.opening_hours_weekend + "<br>" + 
                          "user_ratings_total: " + feature.properties.user_ratings_total + "<br>" + 
                          "rating: " + feature.properties.rating + "<br>" + 
                          "price_level: " + feature.properties.price_level + "<br>" + 
                          "types: " + feature.properties.types + "<br>" + 
                          "website: " + feature.properties.website + "<br>" + 
                          "url: " + feature.properties.url + "<br>" + 
                          "populartimes_weekday: " + feature.properties.populartimes_weekday + "<br>" + 
                          "populartimes_weekend: " + feature.properties.populartimes_weekend + "<br>" + 
                          "category: " + feature.properties.category);
        }

      });//.addTo(map);

    }).catch(error => console.log("loadGeoJson_POIs >>" + error.message));

    // -------------------------

    cFeature.m_Feature_HeatMap_Stores = L.heatLayer(heatMapPoints_Stores, 
                                {
                                  maxZoom: 18, // zoom level where the points reach maximum intensity (as intensity scales with zoom), equals maxZoom of the map by default
                                  radius: 6.0, //radius: 12.5, // radius of each "point" of the heatmap, 25 by default
                                  max: 0.5,//0.25,//maximum point intensity, 1.0 by default
                                  //blur: 15, // amount of blur, 15 by default
                                  //minOpacity: 0, // the minimum opacity the heat will start at
                                  gradient: {0.25: 'Lime', 0.5: 'Yellow', 0.75: 'Tomato'}//{0: layer.m_Style.m_cFillColor} //color gradient config, e.g. {0.4: 'blue', 0.65: 'lime', 1: 'red'}
                                });//.addTo(map);

    cFeature.m_Feature_HeatMap_GM = L.heatLayer(heatMapPoints_GM, 
                                {
                                  maxZoom: 18, // zoom level where the points reach maximum intensity (as intensity scales with zoom), equals maxZoom of the map by default
                                  radius: 12.5, //radius: 12.5, // radius of each "point" of the heatmap, 25 by default
                                  max: 0.5,//0.25,//maximum point intensity, 1.0 by default
                                  //blur: 15, // amount of blur, 15 by default
                                  //minOpacity: 0, // the minimum opacity the heat will start at
                                  gradient: {0.25: 'Lime', 0.5: 'Yellow', 0.75: 'Tomato'}//{0: layer.m_Style.m_cFillColor} //color gradient config, e.g. {0.4: 'blue', 0.65: 'lime', 1: 'red'}
                                });//.addTo(map);

    for (let i = 0; i < 24; i++) {

          cFeature.m_vFeature_HeatMap_OpeningHours_Weekday[i] = L.heatLayer(vHeatMapPoints_OpeningHours_Weekday[i],
                                {
                                  maxZoom: 18, // zoom level where the points reach maximum intensity (as intensity scales with zoom), equals maxZoom of the map by default
                                  radius: 6.0, //radius: 12.5, // radius of each "point" of the heatmap, 25 by default
                                  max: 0.5,//0.25,//maximum point intensity, 1.0 by default
                                  //blur: 15, // amount of blur, 15 by default
                                  //minOpacity: 0, // the minimum opacity the heat will start at
                                  gradient: {0.25: 'Lime', 0.5: 'Yellow', 0.75: 'Tomato'}//{0: layer.m_Style.m_cFillColor} //color gradient config, e.g. {0.4: 'blue', 0.65: 'lime', 1: 'red'}
                                });//.addTo(map);

          cFeature.m_vFeature_HeatMap_OpeningHours_Weekend[i] = L.heatLayer(vHeatMapPoints_OpeningHours_Weekend[i],
                                {
                                  maxZoom: 18, // zoom level where the points reach maximum intensity (as intensity scales with zoom), equals maxZoom of the map by default
                                  radius: 6.0, //radius: 12.5, // radius of each "point" of the heatmap, 25 by default
                                  max: 0.5,//0.25,//maximum point intensity, 1.0 by default
                                  //blur: 15, // amount of blur, 15 by default
                                  //minOpacity: 0, // the minimum opacity the heat will start at
                                  gradient: {0.25: 'Lime', 0.5: 'Yellow', 0.75: 'Tomato'}//{0: layer.m_Style.m_cFillColor} //color gradient config, e.g. {0.4: 'blue', 0.65: 'lime', 1: 'red'}
                                });//.addTo(map);


          cFeature.m_vFeature_HeatMap_PopularTimes_Weekday[i] = L.heatLayer(vHeatMapPoints_PopularTimes_Weekday[i],
                                {
                                  maxZoom: 18, // zoom level where the points reach maximum intensity (as intensity scales with zoom), equals maxZoom of the map by default
                                  radius: 14.0, //radius: 12.5, // radius of each "point" of the heatmap, 25 by default
                                  max: 1,//0.25,//maximum point intensity, 1.0 by default
                                  //blur: 15, // amount of blur, 15 by default
                                  //minOpacity: 0, // the minimum opacity the heat will start at
                                  gradient: {0.25: 'Lime', 0.5: 'Yellow', 0.75: 'Tomato'}//{0: layer.m_Style.m_cFillColor} //color gradient config, e.g. {0.4: 'blue', 0.65: 'lime', 1: 'red'}
                                });//.addTo(map);

          cFeature.m_vFeature_HeatMap_PopularTimes_Weekend[i] = L.heatLayer(vHeatMapPoints_PopularTimes_Weekend[i],
                                {
                                  maxZoom: 18, // zoom level where the points reach maximum intensity (as intensity scales with zoom), equals maxZoom of the map by default
                                  radius: 14.0, //radius: 12.5, // radius of each "point" of the heatmap, 25 by default
                                  max: 1,//0.25,//maximum point intensity, 1.0 by default
                                  //blur: 15, // amount of blur, 15 by default
                                  //minOpacity: 0, // the minimum opacity the heat will start at
                                  gradient: {0.25: 'Lime', 0.5: 'Yellow', 0.75: 'Tomato'}//{0: layer.m_Style.m_cFillColor} //color gradient config, e.g. {0.4: 'blue', 0.65: 'lime', 1: 'red'}
                                });//.addTo(map);
    }
}

function loadGeoJson_OSMStores(cFeature) {

  let heatMapPoints = [];

  fetch(PATHNAME_GEOJSON + cFeature.m_sPathName,
         {mode: 'no-cors', method: 'GET'})
    .then(response => response.json())
    .then(json => 
    {      
      cFeature.m_Feature = L.geoJSON(json, {

        style: function (feature) {

          let style = cFeature.m_Style;

          return {
            stroke: style.m_bStroke,
            color: style.m_cColor,
            weight: style.m_fWeight,
            opacity: style.m_fOpacity,
            fill: style.m_bFill,
            fillColor: style.m_cFillColor,
            fillOpacity: style.m_fFillOpacity,
          };
        },

        pointToLayer: function(geoJsonPoint, latlng) {

          heatMapPoints.push([geoJsonPoint.geometry.coordinates[1], 
                              geoJsonPoint.geometry.coordinates[0], 
                              1]);

          let fRadius = 2;

          return L.circle(latlng, {radius: fRadius});
        }

      });//.addTo(map);

    }).catch(error => console.log("loadGeoJson_OSMStores >>" + error.message));

    // -------------------------

    cFeature.m_Feature_HeatMap = L.heatLayer(heatMapPoints, 
                                {
                                  maxZoom: 18, // zoom level where the points reach maximum intensity (as intensity scales with zoom), equals maxZoom of the map by default
                                  radius: 12.5, //radius: 12.5, // radius of each "point" of the heatmap, 25 by default
                                  max: 1,//0.25,//maximum point intensity, 1.0 by default
                                  //blur: 15, // amount of blur, 15 by default
                                  //minOpacity: 0, // the minimum opacity the heat will start at
                                  gradient: {0.25: 'Lime', 0.5: 'Yellow', 0.75: 'Tomato'}//{0: layer.m_Style.m_cFillColor} //color gradient config, e.g. {0.4: 'blue', 0.65: 'lime', 1: 'red'}
                                });
}
