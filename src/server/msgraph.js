import { ConfidentialClientApplication }  from "@azure/msal-node"
import path from 'path'

const msalConfig = {
  auth: {
    clientId: process.env.AZURE_AD_CLIENT_ID,
    authority: process.env.AAD_ENDPOINT + '/' + process.env.AZURE_AD_TENANT_ID,
    clientSecret: process.env.AZURE_AD_CLIENT_SECRET
  }
}

const tokenRequest = {
  scopes: [process.env.GRAPH_ENDPOINT + '/.default'],
}

const apiConfig = {
  uri: process.env.GRAPH_ENDPOINT + '/v1.0/users'
}

const cca = new ConfidentialClientApplication(msalConfig)

/**
 * Acquires token with client credentials
 * @param {object} tokenRequest
 */
async function getToken(tokenRequest) {
  return await cca.acquireTokenByClientCredential(tokenRequest)
}

/*const headers = {
  'Access-Control-Allow-Origin': 'http://localhost:3000', 
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}*/

const rootPath = path.join(
  process.cwd(),
  'src',
  'server',
  'uploads'
)

export {
  apiConfig,
  tokenRequest,
  getToken,
  rootPath
}
