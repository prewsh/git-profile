// const hamburger = document.getElementById('nav-bars')
// const navUL = document.getElementById('nav-links')

// hamburger.addEventListener("click", ()=>{
//     navUL.classList.toggle('show');
//     console.log("i am clicked")
// })


const github_datas ={
    "token": "f59b0ee122ee7f8d2e152ce87f51d387f9857682",
    "username": "prewsh" 
}

fetch ('https://api.github.com/graphql/', {
    method: 'POST',
    header: { credentials:"include", 'Content-Type': 'application/json', Authentication: "bearer " + github_datas["token"], },
    body: JSON.stringify({
        query: `
         query practice {
            user(login: ${github_datas["username"]}){
            viewer {
            login
            bio
            avatarUrl
            name
            repositories(orderBy: {field: CREATED_AT, direction: ASC}, first: 10) {
                totalCount
                nodes {
                name
                description
                }
            }
            }
        }
    }          
        `
    })
})

.then (res => res.json())
.then(data => {
    console.log(data)
})


// const github_data ={
//     "token": "f59b0ee122ee7f8d2e152ce87f51d387f9857682",
//     "username": "prewsh" 
// }

// const fetch = require("node-fetch");

// const body ={
//     "query": `
//         query practice {
//             user(login: ${github_data["username"]}){
//             viewer {
//             login
//             bio
//             avatarUrl
//             name
//             repositories(orderBy: {field: CREATED_AT, direction: ASC}, first: 10) {
//                 totalCount
//                 nodes {
//                 name
//                 description
//                 }
//             }
//             }
//         }
//     }
//     `
// };

// const baseUrl = "https://api.github.com/graphql/";

// const headers = {
//     'Content-Type': 'application/json',
//     Authentication: "bearer " + github_data["token"]
// }

// fetch(baseUrl, {
//     method: "POST",
//     headers: headers,
//     body: JSON.stringify(body)
// }).then (res => {console.log(JSON.stringify(res))})
//  .catch(err=> console.log(JSON.stringify(err)))