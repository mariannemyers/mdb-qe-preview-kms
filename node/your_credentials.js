/*
return credentials object and ensure it has been populated
**/
function getCredentials() {
  checkForPlaceholders();
  return credentials;
}

const credentials = {
  // Mongo Paths + URI
  MONGODB_URI: "mongodb+srv://you:you@yourcluster.kse61.mongodb.net/?retryWrites=true&w=majority",
  SHARED_LIB_PATH: "/Users/you/Downloads/mongo_crypt_shared_v1-macos-x86_64-enterprise-6.0.4/lib/mongo_crypt_v1.dylib",

  // Azure Credentials
  AZURE_TENANT_ID: "__TENANT_ID__",
  AZURE_CLIENT_ID: "__CLIENT_ID__",
  AZURE_CLIENT_SECRET: "__SECRET_GOES_HERE__",
  AZURE_KEY_NAME: "DEMOKEY",
  AZURE_KEY_VERSION: "31baee91b0de443aabc6170950812ebf",
  AZURE_KEY_VAULT_ENDPOINT: "https://__YOUR_VAULT_HERE__.vault.azure.net/",
};

/*
check if credentials object contains placeholder values
**/
function checkForPlaceholders() {
  const errorBuffer = Array();
  const placeholderPattern = /^<.*>$/;
  for (const [key, value] of Object.entries(credentials)) {
    // check for placeholder text
    if (`${value}`.match(placeholderPattern)) {
      errorMessage = `You must fill out the ${key} field of your credentials object.`;
      errorBuffer.push(errorMessage);
    }
    // check if value is empty
    else if (value == undefined) {
      error_message = `The value for ${key} is empty. Please enter something for this value.`;
    }
  }
  // raise an error if errors in buffer
  if (errorBuffer.length > 0) {
    message = errorBuffer.join("\n");
    throw message;
  }
}

module.exports = { getCredentials };
