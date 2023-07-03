# Lambda Manager

![Main page](/repo_img/main.png)

![Main page](/repo_img/sso.png)

Lambda Manager is a project that aims at sharing of files between computers in an easy way.

It especially handles the case of non-tech companies that make use of industrial laboratories to run their business. Usually in this kind of companies, the lab PCs have no access to internet and sometimes you are also not allowed to plug-in an USB (or to only plug-in authorized USBs). 

So, engineers face the problem of not being able to share files between their computers and the lab computer, especially to transfer files from the lab pc to the engineer pc. Here it is where **Lambda Manger** comes in. 

With Lambda Manager sharing files is easy. Just open the web page in the lab pc, upload your files and you will be ready to download them from anywhere.

**Note**: the lab PCs need access to your company server.

## Install

- Clone the repo
- `$ npm install`

### Microsoft SSO

If you do not know how to register an application in Azure Portal, then I recommend you to follow the next tutorial: <a href="https://microsoft.github.io/MicrosoftCloud/tutorials/docs/Authentication-App-With-NextJs-And-Microsoft-Graph/Configuring-Application-Azure-Active-Directory">https://microsoft.github.io/MicrosoftCloud/tutorials/docs/Authentication-App-With-NextJs-And-Microsoft-Graph/Configuring-Application-Azure-Active-Directory</a>

You can use the `.env.example` file as a template for your environment variables.

Check you have enough permissions to use Microsoft Graph: <a href="https://learn.microsoft.com/en-us/graph/api/user-get?view=graph-rest-1.0&tabs=http">https://learn.microsoft.com/en-us/graph/api/user-get?view=graph-rest-1.0&tabs=http</a>

## Navigation

- **/**: main page 
- **/login**: login page
- **/upload**: upload page 

## Running in development mode

`$ npm run dev`

Go to <a href="http://localhost:3000/">localhost:3000</a>. It runs by defult in port 3000.

## Running in production

- `$ npm run build`
- `$ npm run start`

<a href="http://localhost:3000/">localhost:3000</a>. Again, it runs by default in port 3000.