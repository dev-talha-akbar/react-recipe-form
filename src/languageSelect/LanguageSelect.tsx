import { useState } from "react";

import Dropdown from "react-bootstrap/Dropdown";

import i18n from "../i18n";

interface SupportedLanguageMap {
  [x: string]: string;
}

const supportedLanguagesMap: SupportedLanguageMap = {
  en: "English",
  de: "Deutsch",
};

export default function LanguageSelect() {
  const [selectedLanguage, setSelectedLanguage] = useState(
    i18n.resolvedLanguage
  );

  const supportedLanguages = Object.keys(supportedLanguagesMap);

  if (!selectedLanguage || !supportedLanguagesMap[selectedLanguage]) {
    return;
  }

  return (
    <Dropdown
      onSelect={async (lng) => {
        if (lng && supportedLanguagesMap[lng]) {
          await i18n.changeLanguage(lng);
          setSelectedLanguage(lng);
        }
      }}
    >
      <Dropdown.Toggle variant="light" id="languageSelect">
        <i className="bi bi-translate"></i>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {supportedLanguages
          .filter((lng) => lng !== selectedLanguage)
          .map((lng) => (
            <Dropdown.Item key={lng} eventKey={lng}>
              {supportedLanguagesMap[lng]}
            </Dropdown.Item>
          ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
