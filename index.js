var request = require('request');
const FormData = require('form-data');
const fs = require('fs');
let domains = [
"mmeac-a1",
"mmeac-a2",
"mmeac-a3",
"mmeac-a4"
//"dshetkar0101"
];
let excludeDisplayNames = [
"krushna lavhare",
"Shetkar Dnyaneshwar",
"Onkar Ramesh Londhe"
]; 
// Global Variables
let username = "";
let apiToken = "";
let base64Encode = btoa(`${username}:${apiToken}`);
console.log(base64Encode);
/*function addAttachment(domain, ticket){
 const filePath = "attachments/table-design.png";
 const form = new FormData();
 const stats = fs.statSync(filePath);
 const fileSizeInBytes = stats.size;
 const fileStream = fs.createReadStream(filePath);

 form.append('file', fileStream, {knownLength: fileSizeInBytes});

 fetch(`https://${domain}.atlassian.net/rest/api/3/issue/${ticket.key}/attachments`, {
     method: 'POST',
     body: form,
     headers: {
         'Authorization': `Basic ${base64Encode}`,
         'Accept': 'application/json'
     }
 })
}*/
function createIssue(domain, user, domainIndex, userNumber){
    let bodyData = {
        "fields": {
          "assignee": {
            "id": user.accountId,
          },
          "summary":"HTML and CSS Assignment: Letter Design",
          "description": {
            "content": [
              {
                "content": [
                  {
                    "text":
                    `HTML and CSS Assignment: Letter Design 

 

                    Goal: 
                    
                    The goal of this assignment is to create a letter template using HTML and CSS. The HTML structure is predefined, and your task is to apply CSS styling to achieve a visually appealing and professional letter design. 
                    
                    Reference Video: https://apnasite-my.sharepoint.com/:v:/g/personal/vilas_apnasite_in/EbGYtZ_aUOBOqX1hP8MkNFYB2dC8Rh3VB2q-7B_y9UD_tQ  
                    
                     
                    
                    Prerequisite: 
                    
                    Navigate to following link 
                    
                    https://apnasite-my.sharepoint.com/personal/vilas_apnasite_in/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Fvilas%5Fapnasite%5Fin%2FDocuments%2F02%20MMEAC%20%2D%20Maha%20Mission%20Education%20and%20Career%20Council%2F00%20Training%2F00%20Full%20Time%20Courses%2F01%20Full%20Stack%2F00%20Assignments%2F04%20Letter%20Head&ga=1 
                    
                    2. Inside designs folder varies designs are kept your design number is ${domainIndex*8 + userNumber + 1} 
                    
                    3. Download sample-code and complete the assignment 
                     
                    
                    Assignment Instructions: 
                    
                    1. HTML Structure: 
                    
                    The HTML structure is fixed and should not be modified except for adding classes or elements inside the .letter-background div. 
                    
                    Utilize the given structure to create a letter design. 
                    
                    2. CSS Styling: 
                    
                    2.1 Background: 
                    
                    Apply a background color or gradient to the .letter-background div to enhance the visual appeal of the letter. 
                    
                    2.2 Fonts: 
                    
                    Use custom web fonts for text elements. Explore Google Fonts or other font services to choose suitable fonts. 
                    
                    2.3 Layout: 
                    
                    Apply appropriate positioning and transforms to achieve the desired layout. 
                    
                    Utilize border-radius for rounded corners where necessary. 
                    
                    3. Header Styling: 
                    
                    Style the header elements (logo, company name, header body, letter reference, and date) to align with the letter theme. 
                    
                    Add appropriate margin, padding, and text styling to enhance readability. 
                    
                    4. Body (Section) Styling: 
                    
                    Style the sender details, letter subject, salutation, message body, and signature. 
                    
                    Ensure a clear hierarchy and readability in the letter body section. 
                    
                    5. Footer Styling: 
                    
                    Style the organization phone, email, website, and address to fit the letter design. 
                    
                    Use different font sizes, colors, or other styling properties to make the organization details stand out. 
                    
                    6. Measurement Unit: 
                    
                    For width, use mm unit. 
                    
                    For font size and border, use pt unit. Do not use px, em, or any unit other than mm and pt. 
                    
                    Submission: 
                    
                    Create a folder for your assignment. 
                    
                    Include the HTML file and a separate CSS file (styles.css). 
                    
                    Include any additional images used in the design. 
                    
                    Commit the assignment code and push it into a GitHub repository named “letter-design-assignment.” 
                    
                    Evaluation Criteria: 
                    
                    Proper use of HTML elements for content structure. 
                    
                    Clear and effective application of advanced CSS properties for styling. 
                    
                    Visual appeal and professionalism of the letter design. 
                    
                    Responsiveness of the design for different screen sizes. 
                    
                    Creativity and attention to detail in the design. 
                    
                    Bonus points for incorporating additional features or styling. 
                    
                     `,
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
            "key": "MA"
          }
        }
      };
    request({
        url:`https://${domain}.atlassian.net/rest/api/3/issue`,
        method: 'POST',
        headers: {
          'Authorization': `Basic ${base64Encode}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyData)
      },function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
       // addAttachment();
      })
}

domains.forEach((domain,domainIndex)=>{
    console.log(domain);
    var options = {
        'method': 'GET',
        'url': `https://${domain}.atlassian.net/rest/api/3/user/assignable/search?project=MA`,
        'headers': {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${base64Encode}`,
          'Cookie': 'atlassian.xsrf.token=54970bc8aef099cfb07c00f18edc90f6f1536012_lin'
        }
      };
      request(options, function (error, response) {
        if (error) throw new Error(error);
        let body = JSON.parse(response.body);
        console.log(body);
        let onlyAssignableUsers = body.filter((user)=>!excludeDisplayNames.includes(user.displayName));
        onlyAssignableUsers.forEach((single,designNumber)=>{
          createIssue(domain, single,domainIndex, designNumber);
        });
      });
})

