async function updateReport() {

    // a要素を作成する
    let ele = document.createElement('a')
    // a要素にメールリンクを追加
    let mailto = 'mailto:example@example.com?cc=ccperson1@example.com,ccperson2@example.com,ccperson3@example.com'
    ele.setAttribute('href', mailto)
    ele.style.visibility = 'hidden'
    document.body.appendChild(ele)
    // HTMLドキュメントに追加したa要素を実行(clickイベント発火)
    ele.click()
    document.body.removeChild(ele)
}
