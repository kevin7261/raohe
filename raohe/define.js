
const PATHNAME_GEOJSON = "geojson/"

// ------------------------------------------------------------------------

var styleRoadLine = {
                      bStroke: true,
                      cColor: "#F00",
                      fWeight: 1,
                      fOpacity: 1.0,
                      bFill: false,
                      cFillColor: "#000",
                      fFillOpacity: 0.0,
                   };

var styleRoadArea = {
                      bStroke: true,
                      cColor: "#00F",
                      fWeight: 1,
                      fOpacity: 1.0,
                      bFill: false,
                      cFillColor: "#000",
                      fFillOpacity: 0.0,
                   };

var styleResearchArea = {
                      bStroke: true,
                      cColor: "#F00",
                      fWeight: 1,
                      fOpacity: 1.0,
                      bFill: false,
                      cFillColor: "#000",
                      fFillOpacity: 0.0,
                   };

var ctrlItemRoadLine = {
                      sID: "id_btn_roadline",
                      sCls: "cls_btn_row_2",
                      sCls_Clicked: "cls_btn_row_2_clicked",
                   };

var ctrlItemRoadArea = {
                      sID: "id_btn_roadarea",
                      sCls: "cls_btn_row_2",
                      sCls_Clicked: "cls_btn_row_2_clicked",
                   };

var ctrlItemResearchArea_1 = {
                      sID: "id_btn_researcharea_1",
                      sCls: "cls_btn_row_2",
                      sCls_Clicked: "cls_btn_row_2_clicked",
                   };

var cfRoadLine = new cFeature("道路線", "raohe_road.geojson", false, styleRoadLine, ctrlItemRoadLine);
var cfRoadArea = new cFeature("道路輪廓", "raohe_area.geojson", true, styleRoadArea, ctrlItemRoadArea);
var cfResearchArea_1 = new cFeature("研究範圍", "research_area_1.geojson", false, styleResearchArea, ctrlItemResearchArea_1);

// ------------------------------------------------------------------------------------------

var styleSpaceSyntax = {
                      bStroke: true,
                      cColor: "#000",
                      fWeight: 2,
                      fOpacity: 1.0,
                      bFill: false,
                      cFillColor: "#000",
                      fFillOpacity: 0.0,
                   };

var ctrlItemSpaceSyntax_All = {
                                sID: "id_btn_spacesyntax_option_all",
                                sCls: "cls_btn_spacesyntax_options",
                                sCls_Clicked: "cls_btn_spacesyntax_options_clicked",
                              };

var vcfSpaceSyntax = 
[
  new cFeature_SpaceSyntax("All", "raohe_road.geojson", false, styleSpaceSyntax, ctrlItemSpaceSyntax_All),
];

var vSpaceSyntaxDisplayMode = 
[
  {caption: "Connectivity", name: "connectivity", ctrl_item_id: "id_btn_spacesyntax_option_connectivity", display: false},
  {caption: "Segment Length", name: "segment_length", ctrl_item_id: "id_btn_spacesyntax_option_segment_length", display: false},
  {caption: "Integration", name: "integration", ctrl_item_id: "id_btn_spacesyntax_option_integration", display: false},
  {caption: "Total Depth", name: "total_depth", ctrl_item_id: "id_btn_spacesyntax_option_total_depth", display: false},
];

function resetSpaceSyntaxDisplay() {

  for (let i = 0; i < vSpaceSyntaxDisplayMode.length; i++) 
    vSpaceSyntaxDisplayMode[i].display = false;
}

function toggleSpaceSyntaxDisplayMode(name) {

  for (let i = 0; i < vSpaceSyntaxDisplayMode.length; i++) {

    if (vSpaceSyntaxDisplayMode[i].name == name)
      vSpaceSyntaxDisplayMode[i].display = !vSpaceSyntaxDisplayMode[i].display;
    else
      vSpaceSyntaxDisplayMode[i].display = false;
  } 
}

function isSpaceSyntaxDisplayModeDisplay(name = "") {

  let bDisplay = false;

  if (name == "") {

    for (let i = 0; i < vSpaceSyntaxDisplayMode.length; i++) {
      
      if (vSpaceSyntaxDisplayMode[i].display == true) {
        
        bDisplay = true;

        break;
      }
    }

  } else {

    for (let i = 0; i < vSpaceSyntaxDisplayMode.length; i++) {
      
      if (vSpaceSyntaxDisplayMode[i].name == name) {
        
        bDisplay = vSpaceSyntaxDisplayMode[i].display;

        break;
      }
    }
  }

  return bDisplay;
}

function getSpaceSyntaxDisplayMode(bDisplay) {

  let modes = [];

  for (let i = 0; i < vSpaceSyntaxDisplayMode.length; i++) {
    
    if (vSpaceSyntaxDisplayMode[i].display == bDisplay) {
      
      modes.push(vSpaceSyntaxDisplayMode[i]);
    }
  }

  return modes;
}

// ------------------------------------------------------------------------------------------

var vPOICatgory = 
[
  {
    index: 0, 
    name: "All", 
    category: "", 
    user_ratings_total_max: 1, 
    user_ratings_total_gp_max: 1, 
    scale: null, 
    scale_gp: null, 
    layer: null
  },
  {
    index: 1,  
    name: "Eating", 
    category: "F", 
    user_ratings_total_max: 1, 
    user_ratings_total_gp_max: 1, 
    scale: null, 
    scale_gp: null, 
    layer: null},
  {
    index: 2,  
    name: "Shopping", 
    category: "S", 
    user_ratings_total_max: 1, 
    user_ratings_total_gp_max: 1, 
    scale: null, 
    scale_gp: null, 
    layer: null
  },
  {
    index: 3,  
    name: "Accomm.", //"Accommodation", 
    category: "L", 
    user_ratings_total_max: 1, 
    user_ratings_total_gp_max: 1, 
    scale: null, 
    scale_gp: null, 
    layer: null
  },
  {
    index: 4,  
    name: "Others", 
    category: "X", 
    user_ratings_total_max: 1, 
    user_ratings_total_gp_max: 1, 
    scale: null, 
    scale_gp: null, 
    layer: null
  },
];

function getPOICategoryByIndex(nIndex) {

  let define = {};

  for (let i = 0; i < vPOICatgory.length; i++) {

    if (vPOICatgory[i].index == nIndex) {
      
      define = vPOICatgory[i];
      
      break;
    }
  }

  return define;
}

function getPOICategoryByCategory(sCategory) {

  let define = {};

  for (let i = 0; i < vPOICatgory.length; i++) {
    
    if (vPOICatgory[i].category == sCategory) {
      
      define = vPOICatgory[i];
      
      break;
    }
  }

  return define;
}

// --------------------------------------------------------------------------------

var stylePOI_A = {
                    bStroke: false,
                    cColor: "#000",
                    fWeight: 1,
                    fOpacity: 0.0,
                    bFill: true,
                    cFillColor: "#FF8C00",
                    fFillOpacity: 0.5,
                 };

var stylePOI_F = {
                    bStroke: false,
                    cColor: "#000",
                    fWeight: 1,
                    fOpacity: 0.0,
                    bFill: true,
                    cFillColor: "#0F0",
                    fFillOpacity: 0.5,
                 };

var stylePOI_S = {
                    bStroke: false,
                    cColor: "#000",
                    fWeight: 1,
                    fOpacity: 0.0,
                    bFill: true,
                    cFillColor: "#F00",
                    fFillOpacity: 0.5,
                 };

var stylePOI_L = {
                    bStroke: false,
                    cColor: "#000",
                    fWeight: 1,
                    fOpacity: 0.0,
                    bFill: true,
                    cFillColor: "#00F",
                    fFillOpacity: 0.5,
                 };

var stylePOI_X = {
                    bStroke: false,
                    cColor: "#000",
                    fWeight: 1,
                    fOpacity: 0.0,
                    bFill: true,
                    cFillColor: "#AAA",
                    fFillOpacity: 0.5,
                 };


var ctrlItemPOI_A = {
                      sID: "id_btn_pois_option_a",
                      sCls: "cls_btn_pois_options",
                      sCls_Clicked: "cls_btn_pois_options_clicked",
                    };

var ctrlItemPOI_F = {
                      sID: "id_btn_pois_option_f",
                      sCls: "cls_btn_pois_options",
                      sCls_Clicked: "cls_btn_pois_options_clicked",
                    };

var ctrlItemPOI_S = {
                      sID: "id_btn_pois_option_s",
                      sCls: "cls_btn_pois_options",
                      sCls_Clicked: "cls_btn_pois_options_clicked",
                    };

var ctrlItemPOI_L = {
                      sID: "id_btn_pois_option_l",
                      sCls: "cls_btn_pois_options",
                      sCls_Clicked: "cls_btn_pois_options_clicked",
                    };

var ctrlItemPOI_X = {
                      sID: "id_btn_pois_option_x",
                      sCls: "cls_btn_pois_options",
                      sCls_Clicked: "cls_btn_pois_options_clicked",
                    };

var vcfPOIs = 
[
  new cFeature_POIs("All", "table_pois_categorized.geojson", false, stylePOI_A, ctrlItemPOI_A),
  new cFeature_POIs("Eating", "table_pois_categorized.geojson", false, stylePOI_F, ctrlItemPOI_F),
  new cFeature_POIs("Shopping", "table_pois_categorized.geojson", false, stylePOI_S, ctrlItemPOI_S),
  new cFeature_POIs("Accomm.", "table_pois_categorized.geojson", false, stylePOI_L, ctrlItemPOI_L),
  new cFeature_POIs("Others", "table_pois_categorized.geojson", false, stylePOI_X, ctrlItemPOI_X),
];

// -------------------------------------------------------------------

var vMapDisplayMode = 
[
  {caption: "Display By Heat Map", name: "display_heatmap", ctrl_item_id: "id_btn_pois_option_display_heatmap", display: false},
];

function resetMapDisplay() {

  for (let i = 0; i < vMapDisplayMode.length; i++) 
    vMapDisplayMode[i].display = false;
}

function toggleMapDisplayMode(name) {

  for (let i = 0; i < vMapDisplayMode.length; i++) {

    if (vMapDisplayMode[i].name == name)
      vMapDisplayMode[i].display = !vMapDisplayMode[i].display;
    else
      vMapDisplayMode[i].display = false;
  } 
}

function isMapDisplayMode(name = "") {

  let bDisplay = false;

  if (name == "") {

    for (let i = 0; i < vMapDisplayMode.length; i++) {
      
      if (vMapDisplayMode[i].display == true) {
        
        bDisplay = true;

        break;
      }
    }

  } else {

    for (let i = 0; i < vMapDisplayMode.length; i++) {
      
      if (vMapDisplayMode[i].name == name) {
        
        bDisplay = vMapDisplayMode[i].display;

        break;
      }
    }
  }

  return bDisplay;
}

function getMapDisplayMode(bDisplay) {

  let modes = [];

  for (let i = 0; i < vMapDisplayMode.length; i++) {
    
    if (vMapDisplayMode[i].display == bDisplay) {
      
      modes.push(vMapDisplayMode[i]);
    }
  }

  return modes;
}

// -------------------------------------------------------------------

var vPOIDisplayMode = 
[
  {caption: "SOV Dist. in Google Map", name: "gm_reviewcount", ctrl_item_id: "id_btn_pois_option_gm_reviewcount", display: false},
  //{caption: "SOV Dist. in G+", name: "gp_reviewcount", ctrl_item_id: "id_btn_pois_option_gp_reviewcount", display: false},
  {caption: "Opening Hours - Weekday", name: "openinghours_weekday", ctrl_item_id: "id_btn_pois_option_openinghours_weekday", display: false},
  {caption: "Opening Hours - Weekend", name: "openinghours_weekend", ctrl_item_id: "id_btn_pois_option_openinghours_weekend", display: false},
  {caption: "Popular Times - Weekday", name: "populartimes_weekday", ctrl_item_id: "id_btn_pois_option_populartimes_weekday", display: false},
  {caption: "Popular Times - Weekend", name: "populartimes_weekend", ctrl_item_id: "id_btn_pois_option_populartimes_weekend", display: false},
];

function resetPOIDisplay() {

  for (let i = 0; i < vPOIDisplayMode.length; i++) 
    vPOIDisplayMode[i].display = false;
}

function togglePOIDisplayMode(name) {

  for (let i = 0; i < vPOIDisplayMode.length; i++) {

    if (vPOIDisplayMode[i].name == name)
      vPOIDisplayMode[i].display = !vPOIDisplayMode[i].display;
    else
      vPOIDisplayMode[i].display = false;
  } 
}

function isPOIDisplayMode(name = "") {

  let bDisplay = false;

  if (name == "") {

    for (let i = 0; i < vPOIDisplayMode.length; i++) {
      
      if (vPOIDisplayMode[i].display == true) {
        
        bDisplay = true;

        break;
      }
    }

  } else {

    for (let i = 0; i < vPOIDisplayMode.length; i++) {
      
      if (vPOIDisplayMode[i].name == name) {
        
        bDisplay = vPOIDisplayMode[i].display;

        break;
      }
    }
  }

  return bDisplay;
}

function getPOIDisplayMode(bDisplay) {

  let modes = [];

  for (let i = 0; i < vPOIDisplayMode.length; i++) {
    
    if (vPOIDisplayMode[i].display == bDisplay) {
      
      modes.push(vPOIDisplayMode[i]);
    }
  }

  return modes;
}

// -------------------------------------------------------------------

var vPOIHourMode = [];

for (let i = 0; i < 24; i++) {

  data = {caption: i.toString(), 
          name: "hour_" + i.toString(), 
          ctrl_item_id: "id_btn_pois_option_hour_" + i.toString(), 
          display: false};

  vPOIHourMode.push(data);
}

function resetPOIHour() {

  for (let i = 0; i < vPOIHourMode.length; i++) 
    vPOIHourMode[i].display = false;
}

function togglePOIHourMode(name) {

  for (let i = 0; i < vPOIHourMode.length; i++) {

    if (vPOIHourMode[i].name == name)
      vPOIHourMode[i].display = !vPOIHourMode[i].display;
    else
      vPOIHourMode[i].display = false;
  } 
}

function isPOIHourMode(name = "") {

  let bDisplay = false;

  if (name == "") {

    for (let i = 0; i < vPOIHourMode.length; i++) {
      
      if (vPOIHourMode[i].display == true) {
        
        bDisplay = true;

        break;
      }
    }

  } else {

    for (let i = 0; i < vPOIHourMode.length; i++) {
      
      if (vPOIHourMode[i].name == name) {
        
        bDisplay = vPOIHourMode[i].display;

        break;
      }
    }
  }

  return bDisplay;
}

function getPOIHourMode(bDisplay) {

  let modes = [];

  for (let i = 0; i < vPOIHourMode.length; i++) {
    
    if (vPOIHourMode[i].display == bDisplay) {
      
      modes.push(vPOIHourMode[i]);
    }
  }

  return modes;
}

// -------------------------------------------------------------------

var bDisplayOSMStoresOptions = false;

var styleOSMStores = {
                      bStroke: false,
                      cColor: "#000",
                      fWeight: 1,
                      fOpacity: 0.0,
                      bFill: true,
                      cFillColor: "#FF8C00",
                      fFillOpacity: 0.5,
                   };

var ctrlItemOSMStores = {
                      sID: "id_btn_osmstores_option",
                      sCls: "cls_btn_osmstores_options",
                      sCls_Clicked: "cls_btn_osmstores_options_clicked",
                   };

var cfOSMStores = new cFeature_OSMStores("OSM Shop", "taipei.geojson", true, styleOSMStores, ctrlItemOSMStores);

var vOSMStoresDisplayMode = 
[
  {caption: "Location", name: "shop_point", ctrl_item_id: "id_btn_osmstores_option_shop_point", display: false},
  {caption: "Heatmap", name: "shop_heatmap", ctrl_item_id: "id_btn_osmstores_option_shop_heatmap", display: false},
];

function resetOSMStoresDisplay() {

  for (let i = 0; i < vOSMStoresDisplayMode.length; i++) 
    vOSMStoresDisplayMode[i].display = false;
}

function isOSMStoresDisplay() {

  let bDisplay = false;

  for (let i = 0; i < vOSMStoresDisplayMode.length; i++) {

    if (vOSMStoresDisplayMode[i].display) {

      bDisplay = true;
      break;
    }
  }

  return bDisplay;
}

function toggleOSMStoresDisplayMode(name) {

  for (let i = 0; i < vOSMStoresDisplayMode.length; i++) {

    if (vOSMStoresDisplayMode[i].name == name)
      vOSMStoresDisplayMode[i].display = !vOSMStoresDisplayMode[i].display;
    else
      vOSMStoresDisplayMode[i].display = false;
  } 
}

function isOsmStoresDisplayModeDisplay(name = "") {

  let bDisplay = false;

  if (name == "") {

    for (let i = 0; i < vOSMStoresDisplayMode.length; i++) {
      
      if (vOSMStoresDisplayMode[i].display == true) {
        
        bDisplay = true;

        break;
      }
    }

  } else {

    for (let i = 0; i < vOSMStoresDisplayMode.length; i++) {
      
      if (vOSMStoresDisplayMode[i].name == name) {
        
        bDisplay = vOSMStoresDisplayMode[i].display;

        break;
      }
    }
  }

  return bDisplay;
}

function getOsmStoresDisplayMode(bDisplay) {

  let modes = [];

  for (let i = 0; i < vOSMStoresDisplayMode.length; i++) {
    
    if (vOSMStoresDisplayMode[i].display == bDisplay) {
      
      modes.push(vOSMStoresDisplayMode[i]);
    }
  }

  return modes;
}
