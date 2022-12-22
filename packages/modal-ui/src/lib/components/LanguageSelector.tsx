import React from "react";

interface LanguageSelectorProps {
  changeLanguage: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  changeLanguage,
}) => {
  return (
    <div
      style={{
        background: "aliceblue",
        position: "fixed",
        top: 0,
      }}
      onChange={changeLanguage}
    >
      <input type="radio" value="en" name="language" defaultChecked /> English
      <input type="radio" value="es" name="language" /> Spanish
      <input type="radio" value="fr" name="language" /> French
      <input type="radio" value="de" name="language" /> German
      <input type="radio" value="bg" name="language" /> Bulgarian
      <input type="radio" value="ko" name="language" /> Korean
    </div>
  );
};
