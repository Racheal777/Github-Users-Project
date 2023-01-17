const search = document.getElementById("search");
const form = document.querySelector("form");

const url = "https://api.github.com/users";
const main = document.querySelector("#cards");

async function fetchData(username) {
  try {
    const response = await axios.get(url + "/" + username);
    console.log(response.data);
    createCard(response.data);
    console.log(response.data)
  } catch (error) {
    if (error) {
        const errors = 
        ` <h2 class = "error">User not found</h2>`
        main.innerHTML = errors;
      console.log("Username does not exist");
    }
  }
}

async function fetchRepos(username) {
  try {
    //fetch the user's repositories
    const response = await axios.get(url + "/" + username + "/repos");
   
    //store it in the displayRepos that is already looping
    displayRepos(response.data);
  } catch (error) {
    console.log(error);
  }
}

function displayRepos(userRepo) {
  const reposElement = document.querySelector(".links");
  //forEach method is used to loop through an array
  //target is used in anchor tag, to allow display into a new tab
  //.appendChild is use to add an element to the parent
  userRepo.forEach((repo) => {
    const repoTag = document.createElement("a");
    repoTag.href = repo.html_url;
    repoTag.target = "-blank";
    repoTag.innerText = repo.name;

    reposElement.appendChild(repoTag);
   
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const user = search.value;
//if user is found, display details and repos
  if (user) {
    fetchData(user);
    
    fetchRepos(user);
  }else{
   
  }
});



const createCard = (user) => {
    
  const userCard = `
 
    <section class="section">
    
   
                    <div class="top-flex">
                    <div class="top-picture">
                        <div>
                            <img src=${user.avatar_url}alt="pic" srcset="">
                        </div>

                        <div class = "details">
                            <h2><strong>${user.name}</strong></h2>
                            <h3>${user.login}</h3>
                            <p>${user.location}</p>
                        </div>

                    </div>

                    <div>
                        <button class="btn"><a href=${user.url}>Visit Profile</a> </button>
                    </div>
                </div>

                <div class="about">
                    <h2>About</h2>
                    <p>${user.bio}</p>
                </div>

                <div class="middle-flex">
                    <div class="followers">
                        <h2>Followers</h2>
                        <p>${user.followers}</p>
                    </div>

                    <div class="followers">
                        <h2>Following</h2>
                        <p>${user.following}</p>
                    </div>

                    <div class="followers">
                        <h2>Repos</h2>
                        <p>${user.public_repos}</p>
                    </div>
                </div>

                <div class="repo">
                    <h2>Repositories</h2>
                    <p class ="links"></p>
                </div>
                </section>
   
    
</section>`;

  main.innerHTML = userCard;
};
