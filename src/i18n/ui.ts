const defaultUiTranslation = {
  translation: {
    "header.pricing.button": "Pricing",
    "dialog.title": "💸Pricing",
    "dialog.description":
      "Just kidding! 😉 Ollaix is free and open source, so don't hesitate to contribute! 🚀",
    "dialog.code": "You can find the source code on ",
    "dialog.close": "Close",
    "initial.message.title": "How can I help you today?",
    "initial.message.subtitle": "Select a model and ask your question below.",
    "chat.message.thinking.loading.title": "Thinking...",
    "chat.message.thinking.title": "Show reasoning",
    "chatform.placeholder": "Type your question",
    "chat.error": "Oops! An error occurred:",
    "404.page.title": "Page not found",
    "404.page.subtitle": "Sorry, we couldn’t find the page you’re looking for.",
    "404.page.goback": "Go back home",
  },
};

type LangType = "en" | "fr";
type UiTranslationType = typeof defaultUiTranslation;
export type UiTranslation = keyof typeof defaultUiTranslation["translation"];

export const resources: Record<LangType, UiTranslationType> = {
  en: defaultUiTranslation,
  fr: {
    translation: {
      "header.pricing.button": "Tarifs",
      "dialog.title": "💸Tarifs",
      "dialog.description":
        "Je plaisante ! 😉 Ollaix est gratuit et open source, alors n'hésitez pas à contribuer ! 🚀",
      "dialog.code": "Vous pouvez trouver le code source sur ",
      "dialog.close": "Fermer",
      "initial.message.title": "Comment puis-je vous aider aujourd'hui ?",
      "initial.message.subtitle":
        "Sélectionnez un modèle et posez votre question ci-dessous.",
      "chat.message.thinking.loading.title": "Réflexion en cours...",
      "chat.message.thinking.title": "Afficher le raisonnement",
      "chatform.placeholder": "Saisissez votre question",
      "chat.error": "Oups ! Une erreur est survenue :",
      "404.page.title": "Page non trouvée",
      "404.page.subtitle":
        "Désolé, nous n'avons pas trouvé la page que vous recherchez.",
      "404.page.goback": "Retour à l'accueil",
    },
  },
};
