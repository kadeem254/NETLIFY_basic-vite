import "dotenv/config"

export const handler = async function (event, context) {
  const data = {
    function_data: "Just some string from the netlify function",
    secret_key: `Held in .env file: ${process.env.SECRET_KEY}`
  }

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};