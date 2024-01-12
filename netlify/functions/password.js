// netlify/functions/potato.js
exports.handler = async (event) => {
    const { userInput } = JSON.parse(event.body);
    const isPotato = userInput.toLowerCase() === "potato";

    return {
      statusCode: 200,
      body: JSON.stringify({ isPotato }),
    };
  };
  