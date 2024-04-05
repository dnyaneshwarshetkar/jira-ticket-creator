var request = require('request');
let domains = [
/*"mmeac-c1",
"mmeac-c2",
"mmeac-c3",
"mmeac-c4",*/
/*"mmeac-a1",
"mmeac-a2",
"mmeac-a3",
"mmeac-a4"*/
"dshetkar0101"
];
let excludeDisplayNames = [
"krushna lavhare",
"Shetkar Dnyaneshwar",
"Onkar Ramesh Londhe"
]; 
// Global Variables
let username = "";
let password = "";
function createIssue(domain, user){
    let bodyData = {
        "fields": {
          "assignee": {
            "id": user.accountId,
          },
          "summary":"HTML Forms",
          "description": {
            "content": [
              {
                "content": [
                  {
                    "text": "Assignment 2: HTML Forms\n\nCreate an HTML form with the following elements:\n\nInput fields:\nFull Name (text input)\nEmail Address (email input)\nAge (number input)\nRadio buttons:\nChoose your preferred programming language (JavaScript, Python, Java).\nCheckboxes:\nSelect at least two of your favorite foods.\nDropdown menu:\nSelect your level of proficiency in HTML (Beginner, Intermediate, Advanced).\nTextarea:\nWrite a brief message about why you're interested in web development.\nSubmit button:\nCreate a button labeled \"Submit\" to submit the form.",
                    "type": "text"
                  }
                ],
                "type": "paragraph"
              }
            ],
            "type": "doc",
            "version": 1
          },
          "issuetype": {
            "id": "10001"
          },
          "project": {
            "key": "KAN"
          }
        }
      };
    request({
        url:`https://${domain}.atlassian.net/rest/api/3/issue`,
        method: 'POST',
        headers: {
          'Authorization': `Basic `,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyData)
      },function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
      })
}
domains.forEach((domain)=>{
    console.log(domain);
    var options = {
        'method': 'GET',
        'url': `https://${domain}.atlassian.net/rest/api/3/user/assignable/search?project=KAN`,
        'headers': {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ',
          'Cookie': 'atlassian.xsrf.token=54970bc8aef099cfb07c00f18edc90f6f1536012_lin'
        }
      };
      request(options, function (error, response) {
        if (error) throw new Error(error);
        let body = JSON.parse(response.body);
        console.log(body);
        let onlyAssignableUsers = body.filter((user)=>!excludeDisplayNames.includes(user.displayName));
        onlyAssignableUsers.forEach(single=>{
          createIssue(domain, single);
        });
      });
})

