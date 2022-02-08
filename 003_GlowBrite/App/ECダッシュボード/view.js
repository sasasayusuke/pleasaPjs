
const PUBLIC_FLG_EC = false
var tmpValue = ''

readMessageMaster(true)
readIconMaster(true)
readCompanyInfo(PUBLIC_FLG_EC)

$p.events.on_grid_load = function () {

	html = `
	<div id="infoArea">
		<div class="utilBoxShadow">ECサイト全般</div>
		<div id="signalArea"></div>
		<div class="utilBoxShadow">ECサイトお知らせ情報</div>

		<div class='multipletab'>
			<div class='tab-buttons'>
				<span id='content1'>キャスティングシステム</span>
				<span id='content2'>WWS</span>
				<span id='content3'>IBM Zメインフレーム</span>
				<span id='content4'>物流センターシステム</span>

			</div>
			<div class='tab-content'>
				<div id='content1'>
					<div class="utilCardBox">
						<span class="utilCardBox-title">お知らせ</span>
						<p>
						</p>
					</div>

					<div class="utilCardBox">
						<span class="utilCardBox-title">システムトピックス</span>
						<p>
						</p>
					</div>
				</div>


				<div id='content2'>
					<div class="utilCardBox">
						<span class="utilCardBox-title">お知らせ</span>
						<p>
						</p>
					</div>

					<div class="utilCardBox">
						<span class="utilCardBox-title">システムトピックス</span>
						<p>
						</p>
					</div>
				</div>


				<div id='content3'>
					<div class="utilCardBox">
						<span class="utilCardBox-title">お知らせ</span>
						<p>
						</p>
					</div>

					<div class="utilCardBox">
						<span class="utilCardBox-title">システムトピックス</span>
						<p>
						</p>
					</div>
				</div>


				<div id='content4'>
					<div class="utilCardBox">
						<span class="utilCardBox-title">お知らせ</span>
						<p>
						</p>
					</div>

					<div class="utilCardBox">
						<span class="utilCardBox-title">システムトピックス</span>
						<p>
						</p>
					</div>
				</div>
			</div>
		</div>
		<div class="utilBoxShadow">グローブライドお知らせ情報</div>
		<div class='multipletab'>
			<div class='tab-buttons'>
				<span id='content5'>物流センターシステム</span>
			</div>
			<div class='tab-content'>
				<div id='content5'>
					<div class="utilCardBox">
						<span class="utilCardBox-title">お知らせ</span>
						<p>
						</p>
					</div>
					<div class="utilCardBox">
						<span class="utilCardBox-title">お知らせ</span>
						<p>
						</p>
					</div>
					<div class="utilCardBox">
						<span class="utilCardBox-title">お知らせ</span>
						<p>
						</p>
					</div>
					<div class="utilCardBox">
						<span class="utilCardBox-title">お知らせ</span>
						<p>
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
	`

	$("#SiteMenu").prepend(html)
	// 上へアイコン削除
	$("nav.cf")[1].remove()

}



// セット秒後に実行
window.setTimeout(function() {
	setDashboard()
	setClickTab()
}, 2000)

//3秒毎に実行
window.setInterval(function() {
	readCompanyInfo(PUBLIC_FLG_EC)
	setTable()
}, 3000)


function setDashboard() {

	let allowData = []
	let target = document.getElementById('signalArea')

	// 臨時休業中を除く
	allowData = utilFilterObject(companyData, companyColumn.closed.value, false)
	allowData = utilSortObject(
		allowData,
		{
			category: companyColumn.sort.value,
			type: 'Number',
			ascending: true
		}
	)
	allowData.forEach(v => {
		let item = document.createElement('div')
		item.id = 'dashboard_' + v[companyColumn.companyId.value]
		item.className = 'flexItem'
		item.classList.add('dashboard_' + v[companyColumn.status.value])

		let title = document.createElement('p')
		title.innerHTML = v[companyColumn.companyName.value]
		item.appendChild(title)
		let colors = ['red', 'green', 'yellow']
		colors.forEach(c => {
			let signalImg = new Image()
			signalImg.src = utilGetIconSrc('signal', c, PUBLIC_FLG_EC)
			signalImg.className = 'signalImage'
			signalImg.classList.add('dashboard_' + c)
			signalImg.draggable = false
			item.appendChild(signalImg)
		})
		let status = document.createElement('p')
		status.innerHTML = utilGetMaster(v[companyColumn.status.value])
		item.appendChild(status)

		target.appendChild(item)
	})
}


function setTable() {
	if (utilIsNull(tmpValue) || !utilEqualObject(companyData, tmpValue)) {
		tmpValue = companyData
	}
}


function changeProcess() {
	let target = document.getElementById('dashboard')
	target.classList.remove(PROCESS)
	target.classList.remove(NORMAL)
	target.classList.add(NORMAL)

}

function setClickTab() {
	$.FindContainer = function () {
		$('.tab-content>div').each(function findcontent() {
			var newindex = $('.activetab').index();
			var newheight = $('.activetab').height();
			$('.tab-content').animate({
				'height': newheight+20
			}, 100);
			var otherindex = $(this).index();
			var substractindex = otherindex - newindex;
			var currentwidth = $('.multipletab').width();
			var newpositions = substractindex * currentwidth;
			$(this).animate({
				'left': newpositions
			});
		});
	};
	$.FindId = function () {
		$('.tab-content>div').each(function () {
			if ($(this).attr('id') == $('.active').attr('id')) {
				$('.tab-content>div').removeClass('activetab');
				$(this).addClass('activetab');
			}
		});
	};
	$('.tab-buttons>span').first().addClass('active');
	$('.tab-content>div').each(function () {
		var activeid = $('.active').attr('id');
		if ($(this).attr('id') == activeid) {
			$(this).addClass('activetab');
		}
		var currentheight = $('.activetab').height();
		var currentwidth = $('.multipletab').width();
		var currentindex = $(this).index();
		var currentposition = currentindex * currentwidth;
		$(this).css({
			'left': currentposition,
				'width': currentwidth - 40,
				'padding': '10px 20px'
		});
		$(this).attr('data-position', currentposition);
		$('.tab-content').css('height', currentheight+20);
	});
	$('.tab-buttons>span').click(function () {
		$('.tab-buttons>span').removeClass('active');
		$(this).addClass('active');
		var currentid = $('.active').attr('id');
		$.FindId();
		$.FindContainer();
	});

}