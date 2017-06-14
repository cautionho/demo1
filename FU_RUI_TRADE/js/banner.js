$(function() {
	var picContainer = document.getElementsByClassName('banner-container')[0];
	var picNum = document.getElementsByClassName('banner-num')[0];

	var bannerImg = picContainer.firstElementChild.firstElementChild;
	var bannerHeight;

	bannerImg.onload = function() {
		bannerHeight = bannerImg.height;
		picContainer.style.height = bannerHeight + 'px';
	}

	$(window).resize(function() {
		bannerHeight = bannerImg.height;
		picContainer.style.height = bannerHeight + 'px';
		$(picContainer).children().css("height", bannerHeight + 'px');
	})

	var timer = null;

	var showIndex = 0;

	timer = setInterval(showPic, 3000);

	function showPic() {

		$('.banner-container li').eq(showIndex).fadeIn(500).siblings().fadeOut(500);

		$('.banner-num li').eq(showIndex).css('background-color', 'green').siblings().css('background-color', 'rgba(0,0,0,.5)');

		showIndex = showIndex >= $('.banner-container li').length ? 0 : showIndex + 1;

	}

	//团队风采
	var teamContainer = document.getElementById('team-banner-container');

	var distance;

	var img = teamContainer.firstElementChild.firstElementChild;

	var ImgW, half;

	var teamTimer = null;

	var step = -2;

	img.onload = function() {

		ImgW = parseInt(window.getComputedStyle(img, null).width);

		distance = parseInt(window.getComputedStyle(teamContainer.firstElementChild, null).marginRight);

		teamContainer.innerHTML += teamContainer.innerHTML;

		teamContainer.style.width = ImgW * $(teamContainer).children().length + distance * ($(teamContainer).children().length + 1) + 'px';

		half = parseInt(teamContainer.style.width) / 2 - distance / 2;

		teamContainer.style.left = '0';

		teamTimer = setInterval(showTeam, 20);

		$(window).resize(function() {
//			ImgW = parseInt(window.getComputedStyle(img, null).width);
			distance = parseInt(window.getComputedStyle(teamContainer.firstElementChild, null).marginRight);
			teamContainer.style.width = ImgW * $(teamContainer).children().length + distance * ($(teamContainer).children().length + 1) + 'px';
			half = parseInt(teamContainer.style.width) / 2 - distance / 2;
		})
	}

	teamContainer.addEventListener('mouseover', stopShow);

	teamContainer.addEventListener('mouseout', beginShow);

	function showTeam() {
		teamContainer.style.left = parseInt(teamContainer.style.left) + step + 'px';

		//判断边界
		if(-parseInt(teamContainer.style.left) >= half) {
			teamContainer.style.left = '0';
		}

	}

	function stopShow() {
		clearInterval(teamTimer);
	}

	function beginShow() {
		clearInterval(teamTimer);
		teamTimer = setInterval(showTeam, 20);
	}

})