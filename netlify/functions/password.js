exports.handler = async (event) => {
    const { userInput, ...rest } = JSON.parse(event.body);
    const isPassword = userInput?.toLowerCase() === "potato";

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, OPTIONS, POST",
      },
      body: JSON.stringify({ isPassword }),
    };
  };
  