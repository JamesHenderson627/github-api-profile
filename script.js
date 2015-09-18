window.onload = function(){

	var urlRoot = "https://api.github.com/users/",
		apiKey = "token=b2c2b15ece321a95a9799ca05af9949d7500d195"

	var profileImg = function(profObj) {
		var img = $("#profilePic")[0];
		img.innerHTML = "<img src=" + profObj.avatar_url + ">"
	}

	var getNames = function(profObj) {
		var yourName = $("#fullName")[0],
			userName = $("#userName")[0]
		yourName.innerHTML = "<h2>" + profObj.name + "</h2>" 
		userName.innerHTML = "<p>" + profObj.login + "</p>" 
	}

	// var convertJoinDate = function(profObj) {
	// 	var joinDate = new Date(profObj.created_at);
	// 	console.log(joinDate);
	// 	joinDate = joinDate.toString().split(" ").slice(0,3).join(" ");
	// 	return joinDate;
	// }

	var getJoinDate = function(profObj) {
		var date = $("#joined")[0];
			// joinDate = new Date(profObj.created_at.toString());
			// joinDate = joinDate.split(" ").slice(0,3).join(" ");
		date.innerHTML = "<i class='fa fa-clock-o'></i>" + "<p> Joined on " + profObj.created_at + " </p>"
	}

	var counterclicks = function(profObj) {
		var counter1 = $("#followers")[0],
			counter2 = $("#starred")[0],
			counter3 = $("#following")[0]
		counter1.innerHTML = "<p>" + "<span>" + profObj.followers + "</span>" + "<br>" + "Followers</p>";
		counter2.innerHTML = "<p> <span>0</span> <br> Starred</p>";
		counter3.innerHTML = "<p>" + "<span>" + profObj.following + "</span>" + "<br>" + "Following</p>";
	}

	//Insert Repo name, Language, Star Counter, Fork Counter, and Update Time into each Repo div 
	var repoList = function(repoObj) {
		var repoElement = $("#repoData")[0];
		repoObj.forEach(function(repObj){
			repoElement.innerHTML += "<div class='repos'><p class='repoName'>" + repObj.name + 
			"</p><p class='forks'><i class='fa fa-code-fork'></i>" + repObj.forks_count + 
			"</p><p class='stargazers'><i class='fa fa-star'></i>" + repObj.stargazers_count + 
			"</p><p class='language'>" + repObj.language + "</p><div class='update'><p>Updated " + 
			repObj.updated_at + " hours ago</div></div>"
		})
	}

	var profileSuccess = function(profileData) {
		console.log("I got the profile things!");
		console.log(profileData);
		profileImg(profileData);
		getNames(profileData);
		// convertJoinDate(profileData);
		getJoinDate(profileData);
		counterclicks(profileData)
	}

	var repoSuccess = function(repoData) {
		console.log("I got the repo things!");
		console.log(repoData);
		repoList(repoData);
	}

	var doAjax = function(query) {
		var ajaxRepo = {
			url: urlRoot + query.replace("#", "") + "/repos",
			success: repoSuccess,
			data: {
				"apiKey":  apiKey
			}
		}

		$.ajax(ajaxRepo);
		console.log("Get the repo things!");

		var ajaxProfile = {
			url: urlRoot + query.replace("#", ""),
			success: profileSuccess,
			data: {
				"apiKey":  apiKey
			}
		}
		
		$.ajax(ajaxProfile)
		console.log("Get the profile things!");
	}

	var getUserQuery = function(event){
		if (event.keyCode === 13) {
			var inputEl = event.srcElement,
				query = inputEl.value
			inputEl.value = ''
			location.hash = query
		}
	}

	var handleInput = function(){
		var inputEl = $('input')[0]
		inputEl.onkeypress = getUserQuery
		var query = location.hash
		doAjax(query)
	}

	window.onhashchange = function(){
		var query = location.hash
		doAjax(query)
	}	

	handleInput();
}