const hamburger = document.getElementById('nav-bars')
const navUL = document.getElementById('nav-links')

hamburger.addEventListener("click", ()=>{
    navUL.classList.toggle('show');
    console.log("i am clicked")
})


fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
        "Content-Type" : "application/json",
        "Authorization" : "Bearer 30d61f898c9572f38aa141888be0d27064ea1c8"
    },
    body: JSON.stringify({
        query: `
        query { 
            viewer {
                login
                bio
                email
                avatarUrl
                following {
                    totalCount
                  }
                followers {
                    totalCount
                  }
                name
                websiteUrl
                twitterUsername
                repositories(orderBy: {field: CREATED_AT, direction: DESC}, first: 20) {
                  nodes {
                    name
                    description
                  }
                }
              }
          }
        `
    })
})
.then(res => res.json().then(res => {
    console.log(res)
    // display profile pic 
    let profilePic = document.createElement('img')
    profilePic.src = res.data.viewer.avatarUrl
    let src = document.getElementById("profile-img")
    src.appendChild(profilePic)

    bio = document.getElementById("bio")
    bio.textContent = res.data.viewer.bio

    document.getElementById("profile-name1").textContent=res.data.viewer.name
    document.getElementById("profile-name2").textContent = res.data.viewer.name
    let followers = document.getElementById("followers")
    followers.innerText = `followers ${res.data.viewer.followers.totalCount} `

    let following = document.getElementById("following")
    following.innerText = `following ${res.data.viewer.following.totalCount}`

    let web = document.getElementById("web")
    web.innerText = ` ${res.data.viewer.websiteUrl}`

    let twitter = document.getElementById("twitter")
    twitter.innerText = ` ${res.data.viewer.twitterUsername}`
    // console.log(res.data.followers[totalCount])
    console.log(res.data.viewer.bio)
    console.log(res.data.viewer.login)
    console.log(res.data.viewer.followers.totalCount)

    console.log(res.data.viewer.bio)
    
    console.log(res.data.viewer.repositories.nodes.forEach(node =>{
        console.log(node.name)

        let divv = document.createElement("div")
        divv.className = "divv"

        let nameDiv = document.createElement("div")

        let repoName = document.createElement('h3')
        let repoNameLink = document.createElement('a')
        repoNameLink.href= "#"
        repoNameLink.textContent = `${node.name}`
        repoName.className = "repo-name"
        repoName.appendChild(repoNameLink)
        nameDiv.appendChild(repoName)

        divv.appendChild(nameDiv)
        document.querySelector('.single-repo').appendChild(divv)



        let desc = document.createElement("p");
        desc.textContent = `${node.description}`
        nameDiv.appendChild(desc)


        let starDiv = document.createElement("div")
        starDiv.className = "star-btn"

        let starBtn = document.createElement("button")
        starBtn.className = "btn"
        starBtn.textContent="star"
        starDiv.appendChild(starBtn)

        divv.appendChild(starDiv)

        
    }))
}))

// var img = document.createElement("img");
 
// img.src = "image.png";
// var src = document.getElementById("x");
 
// src.appendChild(img);

