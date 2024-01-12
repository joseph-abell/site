exports.handler = async (event) => {
    const { userInput } = JSON.parse(event.body);
    const isPotato = userInput.toLowerCase() === "potato";

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:8080",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify({ isPotato }),
    };
  };
  