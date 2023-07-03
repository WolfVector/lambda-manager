# Lambda Manager

![Main page](/repo_img/main.png)

![Main page](/repo_img/sso.png)

Lambda Manager is a project that look for sharing files between computers, using the web as the interface. 

It especially handles the case of non-tech companies which makes use of industrial laboratories to run their business. Usually in this kind of companies, the lab PCs have no access to internet and sometimes you are also not allowed to plug-in an USB (or to only plug-in authorized USBs). 

So, engineers face the problem of not being able to share files between their computers and the lab computer, especially to transfer files from the lab pc to the engineer pc. Here it is where **Lambda Manger** comes in. 

The project is compose of two systems:

- A web page mean to run on the lab computer. It's going to be in charge of uploading the files to the company server.
- Another web page mean to run on the company server. This web page is going to be accessible from any pc and you will be able to download the files you shared.

In this repository, you are going to find the second web page mentionated above. In order to get the first web page, you can visit <a href="https://github.com/WolfVector/upload-manager">Upload Manager</a> 

## Install

- Clone the repo
- `$ npm install`

### Microsoft SSO

If you do not know how to register an application in Azure Portal, then I recommend you to follow the next tutorial: <a href="https://microsoft.github.io/MicrosoftCloud/tutorials/docs/Authentication-App-With-NextJs-And-Microsoft-Graph/Configuring-Application-Azure-Active-Directory">https://microsoft.github.io/MicrosoftCloud/tutorials/docs/Authentication-App-With-NextJs-And-Microsoft-Graph/Configuring-Application-Azure-Active-Directory</a>

## Navigation

- **/**: main page
- **/login**: login page

## Running in development mode

`$ npm run dev`

Go to <a href="http://localhost:3001/">localhost:3001</a>. It runs by defult in port 3001, you can change this in the **package.json** file.

## Running in production

- `$ npm run build`
- `$ npm run start`

<a href="http://localhost:3001/">. Again, it runs by default in port 3001. Change the **packages.json** file if you desire to modify this behavior.
