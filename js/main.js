$(document).ready(function(){
$('#searchUser').on('keyup', function(e){
  let username = e.target.value;

  // make request to Github
  $.ajax({
    url: 'http://api.github.com/users/'+username,
    data:{
      client_id:'c9d9af54ea92b53a9c3a',
      client_secret:'5c99a1e2f47abb60d789ad8bd20b34d1dcde5686'
    }
  }).done(function(user){
    $.ajax({
      url: 'http://api.github.com/users/' + username+'/repos',
      data: {
        client_id: 'c9d9af54ea92b53a9c3a',
        client_secret: '5c99a1e2f47abb60d789ad8bd20b34d1dcde5686',
        sort: 'created: asc',
        per_page: 5
      }
    }).done(function(repos){
      $.each(repos, function(index, repo){
        $('#repos').append(`
          <div class="card card-body bg-light">
            <div class="row">
            <div class="col-md-7">
              <strong>${repo.name}</strong>:${repo.description}
            </div>
            <div class="col-md-3">
              <span class="badge badge-default">Forks: ${repo.forks_count}</span>
              <span class="badge badge-success">Watchers: ${repo.watchers_count}</span> 
              <span class="badge badge-primary">Stars: ${repo.stargazers_count}</span>
            </div>
            <div class="col-md-2">
              <a href="${repo.html_url}" traget="_blank" class="btn btn-default bg-dark text-white">Repo page</a>
            </div>
            </div>
          </div>
        `);
      })
    })
    $('#profile').html(`
    <div class="card">
      <div class="card-header">
       <h3 class="panel-title">${user.name}</h3>
      </div>
    <div class="card-body">
      <div class="row">
      <div class="col-md-3">
         <img class="thumbnail avatar" src="${user.avatar_url}">
         <a target="_blank" class="btn btn-primary btn-block" href="${user.html_url}">View Profile</a>
      </div>
      <div class="col-md-9">
      <h3></h3
      <h3></h3
      <h3></h3
      <h3></h3
      <span class="badge badge-default">Public Repos: ${user.public_repos}</span>
      <span class="badge badge-dark">Public Gists: ${user.public_gists}</span>
      <span class="badge badge-success">Followers: ${user.followers}</span>
      <span class="badge badge-info">Following: ${user.following}</span>
      <br><br>
      <ul class="list-group">
      <li class="list-group-item">Company: ${user.company}</li>
      <li class="list-group-item">Website/blog: ${user.blog}</li>
      <li class="list-group-item">Location: ${user.location}</li>
      <li class="list-group-item">Member since: ${user.created_at}</li>
      </ul>
      </div>
      </div>
    </div>
    <h3 class="page-header">Latest Repos</h3>
    <div id="repos"></div
    `);
  });
});
});