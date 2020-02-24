// Storing modules
const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");

// Running function
readMeGenerator()


async function readMeGenerator() {
    let userAvatar;
    let userEmail;
    let repoNames;
    try{
        await inquirer //Get username from git hub
        .prompt({
            message: "Enter your GitHub username:",
            name: "username"
            })
            .then(({username}) => { //query Github API for user info and repos
                const repoQueryUrl = `https://api.github.com/users/${username}/repos`;
                const accQueryUrl = `https://api.github.com/users/${username}`;
                console.log("API queried");
                
                // Grabs user bio picture and Email address
                axios.get(accQueryUrl).then(accRes => {
                    userAvatar = accRes.data.avatar_url; 
                    console.log(userAvatar);
                    userEmail = accRes.data.email;
                    console.log(userEmail);
                });

                // Grabs detailed list of user repos
                axios.get(repoQueryUrl).then(repoRes => {
                    // console.log(repoRes.data);
                    
                    repoNames = repoRes.data.map(repo => { // Creates array of repo names for user to select later
                        return repo.name;
                    });
                    console.log(repoNames);
            });
            // TODO: Use repoNames array with iqnuirer to let user choose which repo they want to create readMe for
        });
    }
    catch(err) {
        console.log(err)
    }
}