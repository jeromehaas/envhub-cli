// IMPORTS
const axios = require("axios");

// GET ALL SECRETS
const getAllSecrets = async () => {

	// SEND REQUEST
  const res = await axios({
    mehtod: "GET",
		url: `${process.env.SERVER_BASE_URL}/secrets`,
    headers: {
      "Content-type": "application/json",
			"Authorization": process.env.AUTH_KEYPASS,
    },
  });

	// GET SECRETS
  const { secrets } = res.data.data;

	// RETURN SECRETS
	return secrets;

};

// EXPORTS
module.exports = {
  getAllSecrets,
};
