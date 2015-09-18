window.onload = function(){

	var urlRepoRoot = "https://api.github.com/users/JamesHenderson627/repos?",
		urlProfileRoot = "https://api.github.com/users/JamesHenderson627"
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

	var joinDate = function(profObj) {
		var date = $("#joined")[0];
		date.innerHTML = "<i class='material-icons'>schedule</i>" + "<p> Joined on " + profObj.created_at + " </p>"
	}

	var counterclicks = function(profObj) {
		var counter1 = $("#followers")[0],
			counter2 = $("#starred")[0],
			counter3 = $("#following")[0]
		counter1.innerHTML = "<p>" + "<span>" + profObj.followers + "</span>" + "<br>" + "Followers</p>";
		counter2.innerHTML = "<p> <span>0</span> <br> Starred</p>";
		counter3.innerHTML = "<p>" + "<span>" + profObj.following + "</span>" + "<br>" + "Following</p>";
	}

	var repoList = function(repoArr) {
		// [repObj1, repObj2, repObj3, ...]
		var listElement = $("#repoData")[0];
		repoArr.forEach(function(repObj){
			listElement.innerHTML += "<div>" + repObj.name + "</div>"
		})
		$("#repoData div").append("<hr>");
	}

	var profileSuccess = function(profileData) {
		console.log("I got the profile things!");
		console.log(profileData);
		profileImg(profileData);
		getNames(profileData);
		joinDate(profileData);
		counterclicks(profileData)
	}

	var repoSuccess = function(repoData) {
		console.log("I got the repo things!");
		console.log(repoData);
		repoList(repoData);
	}

	var ajaxRepo = {
		url: urlRepoRoot,
		success: repoSuccess,
		data: {
			"apiKey":  apiKey
		}
	}

	var ajaxProfile = {
		url: urlProfileRoot,
		success: profileSuccess,
		data: {
			"apiKey":  apiKey
		}
	}

	var ajaxProfileResponse = $.ajax(ajaxProfile);
	window.ajaxProfileResponse = ajaxProfileResponse;
	console.log("Get the profile things!");

	var ajaxRepoResponse = $.ajax(ajaxRepo);
	window.ajaxRepoResponse = ajaxRepoResponse;
	console.log("Get the repo things!");	

}