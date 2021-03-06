const strings = {
  pl: {
    LOGIN_BUTTON: "Zaloguj się",
    LOGIN_EMAIL: "Adres email",
    LOGIN_PASS: "Hasło",
    LOGIN_WRONG_PASS: "Nieprawidłowe hasło",
    LOGIN_WRONG_EMAIL: "Nieprawidłowy email"
  },
  en: {
    LOGIN_BUTTON: "Login",
    LOGIN_EMAIL: "Email",
    LOGIN_PASS: "Password",
    LOGIN_WRONG_PASS: "Incorrect Password",
    LOGIN_WRONG_EMAIL: "User not found"
  }
};

export const getString = (stringId, language) => {
  if (!language) {
    console.warn("getString, language is undefined");
    return "";
  }
  if (!strings[language][stringId]) {
    const alternativeLanguage = language === "pl" ? "en" : "pl";
    if (!strings[alternativeLanguage][stringId]) {
      console.warn(
        "getString, string not found in any language. ID: ",
        stringId
      );
      return "";
    }
    console.warn(`getString, string not found in ${language}. ID: `, stringId);
    return strings[alternativeLanguage][stringId];
  }
  return strings[language][stringId];
};
