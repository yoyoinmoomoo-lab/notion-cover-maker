import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// 기본 설정만 (실제 초기화는 I18nProvider에서)
// 서버 사이드에서도 안전하게 작동하도록 설정
if (typeof window !== "undefined") {
  i18n.use(initReactI18next);
}

export default i18n;
