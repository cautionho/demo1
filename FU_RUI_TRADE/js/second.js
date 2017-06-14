$(function() {

	//修改页面的banner  标题    内容
	var title = window.location.href.slice(window.location.href.indexOf('?') + 1);

	//请求地址
	var url;

	var jobContent = []; //存放内容

	//jobs news company
	switch(title) {
		case 'jobs':
			document.title = '弗睿 - 招贤纳士';
			document.getElementById('second-title').innerText = '招贤纳士';
			document.getElementsByClassName('second-title-english')[0].innerText = 'Recruit';
			url = '/FU_RUI_TRADE/json/job.json';
			break;
		case 'news':
			document.title = '弗睿 - 业界资讯';
			document.getElementById('second-title').innerText = '业界资讯';
			document.getElementsByClassName('second-title-english')[0].innerText = 'Industry Information';
			url = '/FU_RUI_TRADE/json/news.json';
			$('.second-banner img').attr('src','/FU_RUI_TRADE/img/news.jpg');
			break;
		case 'company':
			document.title = '弗睿 - 公司动态';
			document.getElementById('second-title').innerText = '公司动态';
			document.getElementsByClassName('second-title-english')[0].innerText = 'Company Dynamics';
			url = '/FU_RUI_TRADE/json/company.json';
			$('.second-banner img').attr('src','/FU_RUI_TRADE/img/news.jpg');
			break;
		default:
			document.title = '广州弗睿贸易有限公司';
			document.getElementById('second-title').innerText = '广州弗睿贸易有限公司';
			document.getElementsByClassName('second-title-english')[0].innerText = 'Frler';
			document.getElementById('second-list').innerHTML = '<li>暂无内容</li>';
			$('.second-banner img').attr('src','/FU_RUI_TRADE/img/news.jpg');
			break;
	}

	$.ajax({
		type: "get",
		url: url,
		async: false,
		success: function(data) {

			//初始化
			document.getElementById('second-list').innerHTML = '';
			
			if(title == 'jobs'){
				document.getElementsByClassName('idea-box')[0].style.display = 'block';
				document.getElementsByClassName('idea')[0].innerHTML = '<p>广州弗睿贸易有限公司的用人理念是：以人为本，人尽其才。人才是企业的生存之本，人力资源是企业最重要的战略资源。以公平、公正、公开的原则，建立科学的用人机制，力争使每一个有思想、有能力、有热情的人都能发挥自己的才干。</p>';
			}else{
				document.getElementsByClassName('idea-box')[0].style.display = 'none';
			}

			//循环
			for(var item in data.result) {
				document.getElementById('second-list').innerHTML += '<li class="second-list-content"><i>' + data.icon + '</i><a href="javascript:void(0)" data-num="' + item.trim() + '">' + data.result[item].title + '</a><span>' + data.result[item].createTime + '</span></li>';
				jobContent.push(data.result[item].content);
			}
			console.log(jobContent);
		}

	});

	$('#second-list').delegate('a', 'mousedown', showContent);
	$('#return-list').on('mousedown', returnList)

	function showContent() {
		var index = $(this).attr('data-num');
		//判断显示div
		$('#content-list').hide().siblings('#content-show').show();

		var jobContainer = document.getElementsByClassName('show-jobs')[0];
		var newsContainer = document.getElementsByClassName('show-news')[0];

		$('.show-jobs').show().siblings('div').hide();
		$('.content-show-title h3').text(jobContent[index][0].name);
		$('.content-show-title span').eq(0).text(jobContent[index][0].createTime);
		$('.content-show-title span').eq(1).text(jobContent[index][0].from);

		//初始化容器
		jobContainer.innerHTML = '';
		newsContainer.innerHTML = '';

		switch(title) {
			case 'jobs':

				for(var item in jobContent[0][0].get) {
					jobContainer.innerHTML += '<div class="job-get">' + jobContent[0][0].get[item] + '</div>'
				}

				//职位描述
				var jobDescribe = '<ul class="job-msg"><h4>职位描述：</h4>';

				for(var item in jobContent[index][0].describe) {
					jobDescribe += '<li>' + jobContent[index][0].describe[item] + '</li>';
				}

				jobDescribe += '</ul>';

				//职位要求
				var jobRequire = '<ul class="job-msg"><h4>职位要求：</h4>';
				for(var item in jobContent[index][0].require) {
					jobRequire += '<li>' + jobContent[index][0].require[item] + '</li>';
				}
				jobRequire += '</ul>';

				//薪资构成
				var jobPay = '<ul class="job-msg"><h4>薪资构成：</h4>';
				jobPay += '<li>' + jobContent[index][0].pay + '</li>';
				jobPay += '</ul>';

				//公司待遇福利
				var jobWelfare = '<ul class="job-msg"><h4>公司待遇福利：</h4>';
				for(var item in jobContent[index][0].welfare) {
					jobWelfare += '<li>' + jobContent[index][0].welfare[item] + '</li>';
				}
				jobWelfare += '</ul>';

				//工作时间
				var workTime = '<ul class="job-msg"><h4>工作时间：</h4>';
				workTime += '<li>'+jobContent[index][0].workTime + '</li>';
				workTime += '</ul>';

				//职能类别
				var jobType = '<ul class="job-msg"><h4>职能类别：</h4>';
				jobType += '<li>' + jobContent[index][0].category + '</li>';
				jobType += '</ul>';

				jobAll = jobDescribe + jobRequire + jobPay + jobWelfare + workTime + jobType;

				jobContainer.innerHTML += jobAll;

				break;
			case 'news':
				$('.show-news').show().siblings('div').hide();
				for(var item in jobContent[index][0].article){
					console.log(jobContent[index][0].article[item]);
					newsContainer.innerHTML += '<p class="tindent">'+jobContent[index][0].article[item]+'</p>';
				}
				break;
			case 'company':
				$('.show-company').show().siblings('div').hide();
				break;
			default:
				$('.show-jobs').show().siblings('div').hide();
				break;
		}
	}

	function returnList() {
		$('#content-show').hide().siblings('#content-list').show();
	}

})