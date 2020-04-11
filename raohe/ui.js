
var layerSpaceSyntaxDisplaying = null;

function resetUI() {

  {
    $("#id_btn_roadline").click(function() {

      cfRoadLine.m_bDisplay = !cfRoadLine.m_bDisplay;

      displayFeature(cfRoadLine);
    });

    $("#id_btn_roadarea").click(function() {

      cfRoadArea.m_bDisplay = !cfRoadArea.m_bDisplay;

      displayFeature(cfRoadArea);
    });

    $("#id_btn_researcharea_1").click(function() {

      cfResearchArea_1.m_bDisplay = !cfResearchArea_1.m_bDisplay;

      displayFeature(cfResearchArea_1);
    });
  }

  resetUI_SpaceSyntax();
  resetUI_POIs();
  resetUI_OSMStores();
}

function resetUI_SpaceSyntax() {

  {
    for (let i = 0; i < vcfSpaceSyntax.length; i++) {

      let cFeature = vcfSpaceSyntax[i];
      let ctrlItem = cFeature.m_CtrlItem;

      let sElement = "<span id='" + ctrlItem.m_sID + "' class='" + ctrlItem.m_sCls + "'>" + cFeature.m_sCaption + "</span>";

      $("#id_btn_spacesyntax_options").append(sElement);

      $("#" + ctrlItem.m_sID).click(function() {

        if (layerSpaceSyntaxDisplaying != null)
        {
          layerSpaceSyntaxDisplaying.m_bDisplay = false;

          displaySpaceSyntax(layerSpaceSyntaxDisplaying);
        }

        if (layerSpaceSyntaxDisplaying != cFeature)
        {
          cFeature.m_bDisplay = true;

          displaySpaceSyntax(cFeature);

          layerSpaceSyntaxDisplaying = cFeature;
        }
        else
        {
          layerSpaceSyntaxDisplaying = null;
        }
      });
    }

    for (let i = 0; i < vSpaceSyntaxDisplayMode.length; i++) {

      let mode = vSpaceSyntaxDisplayMode[i];

      let sID = "id_btn_spacesyntax_option_" + mode.name;
      let sCls = "cls_btn_spacesyntax_options";
      //let sCls_Clicked = "cls_btn_spacesyntax_options_clicked";
      let sElement = "<span id='" + sID + "' class='" + sCls + "'>" + mode.caption + "</span>";

      $("#id_btn_spacesyntax_options").append(sElement);
    }

    bDisplaySpaceSyntaxOptions = false;

    $("." + vcfSpaceSyntax[0].m_CtrlItem.m_sCls).hide();
  }

  {  
    $("#id_btn_spacesyntax").click(function() {

      bDisplaySpaceSyntaxOptions = !bDisplaySpaceSyntaxOptions;

      if (bDisplaySpaceSyntaxOptions) {

        $("." + vcfSpaceSyntax[0].m_CtrlItem.m_sCls).show("fast");

        $("#id_btn_spacesyntax").text("－ Space Syntax");
        $("#id_btn_spacesyntax").addClass("cls_btn_row_2_clicked");

      } else {

        $("." + vcfSpaceSyntax[0].m_CtrlItem.m_sCls).hide("fast");

        $("#id_btn_spacesyntax").text("＋ Space Syntax");
        $("#id_btn_spacesyntax").removeClass("cls_btn_row_2_clicked");
      }
    });
  }

  {
    for (let i = 0; i < vSpaceSyntaxDisplayMode.length; i++) {

      let mode = vSpaceSyntaxDisplayMode[i];

      $("#" + mode.ctrl_item_id).click(function() {

        toggleSpaceSyntaxDisplayMode(mode.name);

        if (isSpaceSyntaxDisplayModeDisplay(mode.name)) {

          $("#" + mode.ctrl_item_id).addClass("cls_btn_spacesyntax_options_clicked");

          let modes_Undisplay = getSpaceSyntaxDisplayMode(false);

          for (let j = 0; j < modes_Undisplay.length; j++) 
            $("#" + modes_Undisplay[j].ctrl_item_id).removeClass("cls_btn_spacesyntax_options_clicked");
          
        } else {

          $("#" + mode.ctrl_item_id).removeClass("cls_btn_spacesyntax_options_clicked");
        }

        for (let j = 0; j < vcfSpaceSyntax.length; j++) 
          displaySpaceSyntax(vcfSpaceSyntax[j]);
      });
    }
  }
}

function resetUI_POIs() {

  {
    for (let i = 0; i < vcfPOIs.length; i++) {

      let cFeature = vcfPOIs[i];
      let ctrlItem = cFeature.m_CtrlItem;

      let sElement = "<span id='" + ctrlItem.m_sID + "' class='" + ctrlItem.m_sCls + "'>" + cFeature.m_sCaption + "</span>";

      $("#id_btn_pois_options").append(sElement);

      $("#" + ctrlItem.m_sID).click(function() {

        cFeature.m_bDisplay = !cFeature.m_bDisplay;

        displayPOIs(cFeature);
      });
    }

    bDisplayPOIsOptions = false;

    $("." + vcfPOIs[0].m_CtrlItem.m_sCls).hide();

    // -----------------------------------------------------

    for (let i = 0; i < vMapDisplayMode.length; i++) {

      let mode = vMapDisplayMode[i];

      let sID = "id_btn_pois_option_" + mode.name;
      let sCls = "cls_btn_pois_options";
      //let sCls_Clicked = "cls_btn_pois_options_clicked";
      let sElement = "<span id='" + sID + "' class='" + sCls + "'>" + mode.caption + "</span>";

      $("#id_btn_pois_options_sub").append(sElement);
    }

    $("#id_btn_pois_options_sub").hide();

    // -----------------------------------------------------

    for (let i = 0; i < vPOIDisplayMode.length; i++) {

      let mode = vPOIDisplayMode[i];

      let sID = "id_btn_pois_option_" + mode.name;
      let sCls = "cls_btn_pois_options";
      //let sCls_Clicked = "cls_btn_pois_options_clicked";
      let sElement = "<span id='" + sID + "' class='" + sCls + "'>" + mode.caption + "</span>";

      $("#id_btn_pois_options_sub").append(sElement);
    }

    $("#id_btn_pois_options_sub").hide();

    // -----------------------------------------------------

    for (let i = 0; i < vPOIHourMode.length; i++) {

      let mode = vPOIHourMode[i];

      let sID = "id_btn_pois_option_" + mode.name;
      let sCls = "cls_btn_pois_options";
      //let sCls_Clicked = "cls_btn_pois_options_clicked";
      let sElement = "<span id='" + sID + "' class='" + sCls + "'>" + mode.caption + "</span>";

      $("#id_btn_pois_options_sub_2").append(sElement);
    }

    $("#id_btn_pois_options_sub_2").hide();
  }

  {
    $("#id_btn_pois").click(function() {

      bDisplayPOIsOptions = !bDisplayPOIsOptions;

      if (bDisplayPOIsOptions) {

        $("." + vcfPOIs[0].m_CtrlItem.m_sCls).show("fast");

        $("#id_btn_pois").text("－ Stores");
        $("#id_btn_pois").addClass("cls_btn_row_2_clicked");

        $("#id_btn_pois_options_sub").show("fast");
        $("#id_btn_pois_options_sub_2").show("fast");
        $("#id_btn_pois_options_sub_3").show("fast");

      } else {

        $("." + vcfPOIs[0].m_CtrlItem.m_sCls).hide("fast");

        $("#id_btn_pois").text("＋ Stores");
        $("#id_btn_pois").removeClass("cls_btn_row_2_clicked");

        $("#id_btn_pois_options_sub").hide("fast");
        $("#id_btn_pois_options_sub_2").hide("fast");
        $("#id_btn_pois_options_sub_3").hide("fast");
      }
    });
  }

  {
    for (let i = 0; i < vMapDisplayMode.length; i++) {

      let mode = vMapDisplayMode[i];

      $("#" + mode.ctrl_item_id).click(function() {

        toggleMapDisplayMode(mode.name);

        if (isMapDisplayMode(mode.name)) {

          $("#" + mode.ctrl_item_id).addClass("cls_btn_pois_options_clicked");

          let modes_Undisplay = getMapDisplayMode(false);

          for (let j = 0; j < modes_Undisplay.length; j++) 
            $("#" + modes_Undisplay[j].ctrl_item_id).removeClass("cls_btn_pois_options_clicked");
          
        } else {

          $("#" + mode.ctrl_item_id).removeClass("cls_btn_pois_options_clicked");
        }

        for (let j = 0; j < vcfPOIs.length; j++) 
          displayPOIs(vcfPOIs[j]);
      });
    }
  }

  {
    for (let i = 0; i < vPOIDisplayMode.length; i++) {

      let mode = vPOIDisplayMode[i];

      $("#" + mode.ctrl_item_id).click(function() {

        togglePOIDisplayMode(mode.name);

        if (isPOIDisplayMode(mode.name)) {

          $("#" + mode.ctrl_item_id).addClass("cls_btn_pois_options_clicked");

          let modes_Undisplay = getPOIDisplayMode(false);

          for (let j = 0; j < modes_Undisplay.length; j++) 
            $("#" + modes_Undisplay[j].ctrl_item_id).removeClass("cls_btn_pois_options_clicked");
          
        } else {

          $("#" + mode.ctrl_item_id).removeClass("cls_btn_pois_options_clicked");
        }

        if (!isPOIDisplayMode("openinghours_weekday") &&
            !isPOIDisplayMode("openinghours_weekend") &&
            !isPOIDisplayMode("populartimes_weekday") &&
            !isPOIDisplayMode("populartimes_weekend")) {

          resetPOIHour();

          for (let j = 0; j < vPOIHourMode.length; j++) 
            $("#" + vPOIHourMode[j].ctrl_item_id).removeClass("cls_btn_pois_options_clicked");

        } else if ((isPOIDisplayMode("openinghours_weekday") ||
                    isPOIDisplayMode("openinghours_weekend") ||
                    isPOIDisplayMode("populartimes_weekday") ||
                    isPOIDisplayMode("populartimes_weekend")) &&
                   !isPOIHourMode()) {

          resetPOIHour();
          togglePOIHourMode("hour_0");

          for (let j = 0; j < vPOIHourMode.length; j++) 
            $("#" + vPOIHourMode[j].ctrl_item_id).removeClass("cls_btn_pois_options_clicked");

          $("#" + vPOIHourMode[0].ctrl_item_id).addClass("cls_btn_pois_options_clicked");
        }

        for (let j = 0; j < vcfPOIs.length; j++) 
          displayPOIs(vcfPOIs[j]);
      });
    }
  }

  {
    for (let i = 0; i < vPOIHourMode.length; i++) {

      let mode = vPOIHourMode[i];

      $("#" + mode.ctrl_item_id).click(function() {

        togglePOIHourMode(mode.name);

        if (isPOIHourMode(mode.name)) {

          $("#" + mode.ctrl_item_id).addClass("cls_btn_pois_options_clicked");

          let modes_Undisplay = getPOIHourMode(false);

          for (let j = 0; j < modes_Undisplay.length; j++) 
            $("#" + modes_Undisplay[j].ctrl_item_id).removeClass("cls_btn_pois_options_clicked");
          
        } else {

          $("#" + mode.ctrl_item_id).removeClass("cls_btn_pois_options_clicked");
        }

        if (!isPOIHourMode()) {

          resetPOIDisplay();

          for (let j = 0; j < vPOIDisplayMode.length; j++) 
            $("#" + vPOIDisplayMode[j].ctrl_item_id).removeClass("cls_btn_pois_options_clicked");

        }

        for (let j = 0; j < vcfPOIs.length; j++) 
          displayPOIs(vcfPOIs[j]);
      });
    }
  }
}

function resetUI_OSMStores() {

  {
    for (let i = 0; i < vOSMStoresDisplayMode.length; i++) {

      let mode = vOSMStoresDisplayMode[i];

      let sID = "id_btn_osmstores_option_" + mode.name;
      let sCls = "cls_btn_osmstores_options";
      //let sCls_Clicked = "cls_btn_osmstores_options_clicked";
      let sElement = "<span id='" + sID + "' class='" + sCls + "'>" + mode.caption + "</span>";

      $("#id_btn_osmstores_options").append(sElement);
    }

    bDisplayOSMStoresOptions = false;

    $("." + cfOSMStores.m_CtrlItem.m_sCls).hide();
  }

  {
    $("#id_btn_osmstores").click(function() {

      bDisplayOSMStoresOptions = !bDisplayOSMStoresOptions;

      if (bDisplayOSMStoresOptions) {

        $("." + cfOSMStores.m_CtrlItem.m_sCls).show("fast");

        $("#id_btn_osmstores").text("－ OpenStreetMap Stores");
        $("#id_btn_osmstores").addClass("cls_btn_row_2_clicked");

      } else {

        $("." + cfOSMStores.m_CtrlItem.m_sCls).hide("fast");

        $("#id_btn_osmstores").text("＋ OpenStreetMap Stores");
        $("#id_btn_osmstores").removeClass("cls_btn_row_2_clicked");
      }
    });
  }

  {
    for (let i = 0; i < vOSMStoresDisplayMode.length; i++) {

      let mode = vOSMStoresDisplayMode[i];

      $("#" + mode.ctrl_item_id).click(function() {

        toggleOSMStoresDisplayMode(mode.name);

        if (isOsmStoresDisplayModeDisplay(mode.name)) {

          $("#" + mode.ctrl_item_id).addClass("cls_btn_osmstores_options_clicked");

          let modes_Undisplay = getOsmStoresDisplayMode(false);

          for (let j = 0; j < modes_Undisplay.length; j++) 
            $("#" + modes_Undisplay[j].ctrl_item_id).removeClass("cls_btn_osmstores_options_clicked");
          
        } else {

          $("#" + mode.ctrl_item_id).removeClass("cls_btn_osmstores_options_clicked");
        }

        displayOSMStores(cfOSMStores);
      });
    }
  }
}

function displayFeature(cFeature) {

  let sIDName = "#" + cFeature.m_CtrlItem.m_sID;

  if (cFeature.m_bDisplay) {

    cFeature.m_Feature.addTo(map);

    $(sIDName).addClass(cFeature.m_CtrlItem.m_sCls_Clicked);

  } else {

    cFeature.m_Feature.remove();

    $(sIDName).removeClass(cFeature.m_CtrlItem.m_sCls_Clicked);
  }

  if (cFeature.m_bDisplay) {

    if (cFeature.m_CtrlItem.m_sID == ctrlItemResearchArea_1.sID) {

      map.setView([MAP_CENTER_LAT, MAP_CENTER_LON], MAP_LAYER);

    }

  }
}

function displaySpaceSyntax(cFeature) {

  let sIDName = "#" + cFeature.m_CtrlItem.m_sID;

  if (cFeature.m_bDisplay) {

    let vfMin = [];
    let vfMax = [];

    let bColorReverse = false;

    if (isSpaceSyntaxDisplayModeDisplay("connectivity")) {

      cFeature.m_Feature.eachLayer(function (l) {

        vfMin.push(l.feature.properties.connectivity);
        vfMax.push(l.feature.properties.connectivity);

      });

      bColorReverse = false;

    } else if (isSpaceSyntaxDisplayModeDisplay("segment_length")) {

      cFeature.m_Feature.eachLayer(function (l) {

        vfMin.push(l.feature.properties.segment_length);
        vfMax.push(l.feature.properties.segment_length);

      });

      bColorReverse = false;

    } else if (isSpaceSyntaxDisplayModeDisplay("integration")) {

      cFeature.m_Feature.eachLayer(function (l) {

        vfMin.push(l.feature.properties.t1024_integration);
        vfMax.push(l.feature.properties.t1024_integration);

      });

      bColorReverse = false;

    } else if (isSpaceSyntaxDisplayModeDisplay("total_depth")) {

      cFeature.m_Feature.eachLayer(function (l) {

        vfMin.push(l.feature.properties.t1024_total_depth);
        vfMax.push(l.feature.properties.t1024_total_depth);

      });

      bColorReverse = true;
    }

    let fMin = d3.min(vfMin, function (d) { return d; });
    let fMax = d3.max(vfMax, function (d) { return d; });

    let cMin = (bColorReverse) ? '#F00' : '#00F';
    let cMax = (bColorReverse) ? '#00F' : '#F00';

    console.log(fMin, fMax);

    let scaleColor = d3.scaleLinear()
                       .domain([fMin, fMax])
                       .interpolate(d3.interpolateHslLong)
                       .range([d3.rgb(cMin), d3.rgb(cMax)])

    if (isSpaceSyntaxDisplayModeDisplay("connectivity")) {

      cFeature.m_Feature.eachLayer(function (l) {

        l.setStyle({color: scaleColor(l.feature.properties.connectivity)});

      });

    } else if (isSpaceSyntaxDisplayModeDisplay("segment_length")) {

      cFeature.m_Feature.eachLayer(function (l) {

        l.setStyle({color: scaleColor(l.feature.properties.segment_length)});

      });

    } else if (isSpaceSyntaxDisplayModeDisplay("integration")) {

      cFeature.m_Feature.eachLayer(function (l) {

        l.setStyle({color: scaleColor(l.feature.properties.t1024_integration)});

      });

    } else if (isSpaceSyntaxDisplayModeDisplay("total_depth")) {

      cFeature.m_Feature.eachLayer(function (l) {

        l.setStyle({color: scaleColor(l.feature.properties.t1024_total_depth)});

      });

    }

    cFeature.m_Feature.addTo(map);

    $(sIDName).addClass(cFeature.m_CtrlItem.m_sCls_Clicked);

  } else {

    cFeature.m_Feature.remove();

    $(sIDName).removeClass(cFeature.m_CtrlItem.m_sCls_Clicked);
  }
}

function removeAllMap(cFeature) {
  
  cFeature.m_Feature.remove();

  cFeature.m_Feature_HeatMap_Stores.remove();
  cFeature.m_Feature_HeatMap_GM.remove();

  for (let i = 0; i < 24; i++) {

    cFeature.m_vFeature_HeatMap_OpeningHours_Weekday[i].remove();
    cFeature.m_vFeature_HeatMap_OpeningHours_Weekend[i].remove();
    cFeature.m_vFeature_HeatMap_PopularTimes_Weekday[i].remove();
    cFeature.m_vFeature_HeatMap_PopularTimes_Weekend[i].remove();
  }
}

function displayPOIs(cFeature) {

  removeAllMap(cFeature);

  let sIDName = "#" + cFeature.m_CtrlItem.m_sID;

  if (cFeature.m_bDisplay) {

    if (!isMapDisplayMode("display_heatmap")) {

      cFeature.m_Feature.eachLayer(function (l) {

        let POICategory = getPOICategoryByCategory(l.feature.properties.category);

        let fRadius = 2;

        if      (isPOIDisplayMode("gm_reviewcount")) fRadius = POICategory.scale(l.feature.properties.user_ratings_total);
        else if (isPOIDisplayMode()) {

          for (let i = 0; i < 24; i++) {

            if (isPOIHourMode("hour_" + i.toString())) {

              fRadius = 0;

              if      (isPOIDisplayMode("openinghours_weekday")) fRadius = (l.feature.properties.opening_hours_weekday[i] * 8);
              else if (isPOIDisplayMode("openinghours_weekend")) fRadius = (l.feature.properties.opening_hours_weekend[i] * 8);
              else if (isPOIDisplayMode("populartimes_weekday")) fRadius = (l.feature.properties.populartimes_weekday[i] * 0.2);
              else if (isPOIDisplayMode("populartimes_weekend")) fRadius = (l.feature.properties.populartimes_weekend[i] * 0.2);
            
              break;
            }
          }
        }

        l.setRadius(fRadius);
      });

      cFeature.m_Feature.addTo(map);

    } else { //else if (isMapDisplayMode("display_heatmap")) {

      if (isPOIDisplayMode("gm_reviewcount")) {

        cFeature.m_Feature_HeatMap_GM.addTo(map);

      } else if (isPOIDisplayMode()) {

        for (let i = 0; i < 24; i++) {

          if (isPOIHourMode("hour_" + i.toString())) {

            if      (isPOIDisplayMode("openinghours_weekday")) cFeature.m_vFeature_HeatMap_OpeningHours_Weekday[i].addTo(map);
            else if (isPOIDisplayMode("openinghours_weekend")) cFeature.m_vFeature_HeatMap_OpeningHours_Weekend[i].addTo(map);
            else if (isPOIDisplayMode("populartimes_weekday")) cFeature.m_vFeature_HeatMap_PopularTimes_Weekday[i].addTo(map);
            else if (isPOIDisplayMode("populartimes_weekend")) cFeature.m_vFeature_HeatMap_PopularTimes_Weekend[i].addTo(map);
          
            break;
          }
        }
      } else  {
          cFeature.m_Feature_HeatMap_Stores.addTo(map);
      }
    }

    $(sIDName).addClass(cFeature.m_CtrlItem.m_sCls_Clicked);

  } else {

    $(sIDName).removeClass(cFeature.m_CtrlItem.m_sCls_Clicked);
  }
}

function displayOSMStores(cFeature) {

  let sIDName = "#" + cFeature.m_CtrlItem.m_sID;

  if (isOSMStoresDisplay()) {

    if (isOsmStoresDisplayModeDisplay("shop_point")) {

      cFeature.m_Feature_HeatMap.remove();  
      cFeature.m_Feature.addTo(map);

    } else if (isOsmStoresDisplayModeDisplay("shop_heatmap")) {

      cFeature.m_Feature.remove();
      cFeature.m_Feature_HeatMap.addTo(map);
    }

    $(sIDName).addClass(cFeature.m_CtrlItem.m_sCls_Clicked);

  } else {

    cFeature.m_Feature.remove();
    cFeature.m_Feature_HeatMap.remove();

    $(sIDName).removeClass(cFeature.m_CtrlItem.m_sCls_Clicked);
  }
}
