import { types, flow } from "mobx-state-tree";
import { i18nx } from "../../../i18n";
import { withEnvironment } from "../../extensions/with-environment";
//import * as Localization from "expo-localization"
var rtlDetect = require("rtl-detect");
import { languageDetails } from "./schema";
export const i18nStore = types
  .model({
    appLanguage: types.maybeNull(types.string),
    isRTL: false,
  })
  .extend(withEnvironment)
  .actions((self) => ({
    setAppLanguage: flow(function* (language) {
      i18nx.locale = language;
      self.isRTL = languageDetails[language].direction == "rtl";
      self.appLanguage = language;
    }),
    setSystemDefault: flow(function* () {
      i18nx.locale = navigator.languages[0] || navigator.language;
      self.isRTL = rtlDetect.isRtlLang(i18nx.locale);
      self.appLanguage = null;
    }),
    getCurrentLanguage: () => {
      if (self.appLanguage) return self.appLanguage;
      /*TODO
                DOESN'T ACCOUNT FOR LANGUAGE LOCAL VARIANTS 
             */
      return (navigator.languages[0] || navigator.language).split("-")[0];
    },
  }));
