// IMPORTS
const axios = require("axios");
const { Password, Input } = require("enquirer");

// LOGIN
const login = async () => {

	// TRY-CATCH BLOCK
  try {

    //  DEFINE PROPT FOR USERNAME
    const usernamePrompt = new Input({
      message: "Username:",
      initial: "",
    });
    
    const pinPrompt = new Password({
      message: 'Pin:',
      initial: "",
    });

    // PROMPT USERNAME
    const username = await usernamePrompt.run();
    const pin = await pinPrompt.run();

    // REQUEST LOGIN
    const res = await axios({
      method: 'POST', 
			url: `${process.env.SERVER_BASE_URL}/auth`,
      data: {
        username: username,
        pin: pin
      },
    });
    

	// HANDLE ERROS
  } catch(error) {

		// PRINT ERROR
    console.error(error);

  }

};

// EXPORTS
module.exports = {
  login,
};
