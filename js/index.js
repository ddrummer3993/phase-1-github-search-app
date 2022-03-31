
//create function(s) to use input data to fetch user from API

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#github-form').addEventListener('submit', fetchUser);
});

function fetchUser(event) {
    event.preventDefault();
    let userName = event.target.search.value
    fetch(`https://api.github.com/search/users?q=${userName}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json'
        }
      })
      .then(resp => resp.json())
      .then(data => {
          usersObj = data.items
          usersObj.map(obj => createCard(obj))
      });
}

//create function to manipulate the DOM and post user info/data

function createCard(obj){
    let listItem = document.createElement('li');

    let userName = document.createElement('h1');
    userName.innerText = obj.login;
    userName.addEventListener('click', handleUserClick);

    let avatar = document.createElement('img');
    avatar.src = obj.avatar_url;

    let lineBreak = document.createElement('br');

    let profileLink = document.createElement('a');
    profileLink.href = obj.html_url;
    profileLink.innerText = 'github profile link'

    listItem.appendChild(userName);
    listItem.appendChild(profileLink);
    listItem.appendChild(lineBreak);
    listItem.appendChild(avatar);

    document.querySelector('#user-list').appendChild(listItem);
}

//create function to fetch repo data when user is clicked --- click event listener added in previous createCard() function

function handleUserClick(event) {
    let userName = event.target.innerText;
    fetch(`https://api.github.com/users/${userName}/repos`, {
        method: 'GET',
        headers: {
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json'
        }
      })
      .then(resp => resp.json())
      .then(data => data.map(obj => repoList(obj)));
}

function repoList(obj) {
    let listItem = document.createElement('li');

    let repoName = document.createElement('p');
    repoName.innerText = obj.name;

    let repoLink = document.createElement('a');
    repoLink.href = obj.html_url;
    repoLink.innerText = obj.html_url;

    listItem.appendChild(repoName);
    listItem.appendChild(repoLink);

    document.querySelector('#repos-list').appendChild(listItem);
}