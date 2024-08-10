import i18n from "i18next"
import {initReactI18next} from "react-i18next";
import LanguaeDetector from "i18next-browser-languagedetector";

import translationEn from './translation.en.json'
import translationKo from './translation.ko.json'

const resource =  {
	en: {
			translation: translationEn
	},
	ko: {
			translation: translationKo
	}
};

i18n
	.use(LanguaeDetector) // 사용자 언어 탐지
	.use(initReactI18next)	// i18n 객체를 react-18next에 전달
	.init({
			resources: resource,
			lng: "ko",
			fallbackLng: 'ko',
			// ns: ['translation'],
			// defaultNS: "translation",
			debug: true,
			keySeparator: false, // we do not use keys in form messages.welcome
			interpolation: {
					escapeValue: false // react already safes from xss
			}
	});

export default i18n;
