const { translate } = require('free-translate');

const text = "I Love this World";
const to = "mr";
(async () => {
  const translatedText = await translate(text, { from: 'en', to: to });

  console.log(translatedText); // こんにちは世界
})();
