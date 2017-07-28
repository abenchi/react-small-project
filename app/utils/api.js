var axios = require('axios');

var gitHub_secrest = {
  client_id: '22a160a1a6accedbe49c',
  client_secret: 'cd1ec77981406c7d320f2c67daddb836e9a6b84f',
  getParam: () => `?client_id=22a160a1a6accedbe49c&client_secret=cd1ec77981406c7d320f2c67daddb836e9a6b84f`
}

var params = '?client_id=22a160a1a6accedbe49c&client_secret=cd1ec77981406c7d320f2c67daddb836e9a6b84f';

function getProfile(username) {
  return axios
  .get(`https://api.github.com/users/${username}${params}`)
  .then(response => response.data)
}

function getRepos(username) {
  return axios
  .get(`https://api.github.com/users/${username}/repos${params}$per_page=100`)
  .then(response => response.data)
}

function countStars(repos){
  return repos.reduce((total, repo)=> total + repo.stargazers_count ,0)
}

function calculateScore(profile, repos){
  return profile.followers * 3 + countStars(repos);
}

function getUserData(username) {
  return axios.all([
    getProfile(username),
    getRepos(username)
  ]).then(data => ({
    profile: data[0],
    score: calculateScore(data[0], data[1])
  }))
}

function sortPlayers(players) {
  return players.sort(function(a,b) {
    return b.score - a.score
  })
}

function handleError (error){
  console.warn(error);
}

module.exports = {
  battle: function(players) {
   return axios
   .all(players.map(getUserData))
   .then(sortPlayers)
   .catch(handleError)

  },

  fetchPopularRepos: function(language) {
    var encodeURI = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`)
    
    return axios.get(encodeURI)
      .then(function(response) {
        return response.data.items;
      })
}
}