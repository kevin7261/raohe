
class cFeature {

  constructor(sCaption = "unknow", 
              sPathName = "", 
              bDisplay = true,
              style = 
                {
                  bStroke: true,
                  cColor: "#000",
                  fWeight: 1.0,
                  fOpacity: 1.0,
                  bFill: true,
                  cFiillColor: "#000",
                  fFillOpacity: 1.0,
                },
              ctrlItem = 
                {
                  sID: "",
                  sCls: "", 
                  sCls_Clicked: "",
                },
              feature = null) {

    this.m_sCaption = sCaption;
    this.m_sPathName = sPathName;

    this.m_bDisplay = bDisplay;

    this.m_Style = {
                      m_bStroke: style.bStroke,
                      m_cColor: style.cColor,
                      m_fWeight: style.fWeight,
                      m_fOpacity: style.fOpacity,
                      m_bFill: style.bFill,
                      m_cFillColor: style.cFillColor,
                      m_fFillOpacity: style.fFillOpacity,
                   };

    this.m_CtrlItem = {
                      m_sID: ctrlItem.sID,
                      m_sCls: ctrlItem.sCls,
                      m_sCls_Clicked: ctrlItem.sCls_Clicked,
                   };

    this.m_Feature = {};
  }
};

class cFeature_SpaceSyntax extends cFeature {

  constructor(sCaption, sPathName, bDisplay, style, ctrlItem) {

    super(sCaption, sPathName, bDisplay, style, ctrlItem);
  }
};

class cFeature_POIs extends cFeature {

  constructor(sCaption, sPathName, bDisplay, style, ctrlItem) {

    super(sCaption, sPathName, bDisplay, style, ctrlItem);

    this.m_Feature_HeatMap_Stores = null;
    this.m_Feature_HeatMap_GM = null;
    this.m_Feature_HeatMap_GP = null;

    this.m_vFeature_HeatMap_OpeningHours_Weekday = [];
    this.m_vFeature_HeatMap_OpeningHours_Weekend = [];
    this.m_vFeature_HeatMap_PopularTimes_Weekday = [];
    this.m_vFeature_HeatMap_PopularTimes_Weekend = [];

    for (let i = 0; i < 24; i++) {

      this.m_vFeature_HeatMap_OpeningHours_Weekday.push([]);
      this.m_vFeature_HeatMap_OpeningHours_Weekend.push([]);
      this.m_vFeature_HeatMap_PopularTimes_Weekday.push([]);
      this.m_vFeature_HeatMap_PopularTimes_Weekend.push([]);
    }
  }
};

class cFeature_OSMStores extends cFeature {

  constructor(sCaption, sPathName, bDisplay, style, ctrlItem) {

    super(sCaption, sPathName, bDisplay, style, ctrlItem);

    this.m_Feature_HeatMap = null;
  }
};
