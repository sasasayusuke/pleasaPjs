function commonSetFlowchart(useStatus, id = 'flowchartId', boxClass = 'boxClass', color = "red") {
    let html = `
        <div id="${id}" class="flow">
        </div>
        <style>
            .flow {
                margin: 0 auto 50px;
            }
            .flow .${boxClass}.${color} {
                background-color: ${color};
                color: white;
            }
            .flow .${boxClass} {
                margin: 0 auto 33px;
                width: 66%;
                text-align: center;
                padding: 10px;
                border: 3px solid #326E93;
                -webkit-border-radius: 5px;
                border-radius: 5px;
                position: relative;
                font-weight: bold; /* テキストの指定 */
                background-color: cornsilk
            }
            .flow .${boxClass}:after {
                border-top: 20px solid #FFC300;
                border-left: 50px solid transparent;
                border-right: 50px solid transparent;
                content: "";
                position: absolute;
                bottom: -28px; /* 三角形の高さ＋ボックスのボーダーをマイナスに */
                margin-left: -100px; /* 中央寄せに使用 */
                left: 180px;
            }

            .flow .${boxClass}:last-child:after {
                border: none; /* 最後のボックスだけ三角形を表示しない */
            }
        </style>`
    $("#CommentField").prepend(html)

    for (let s of useStatus) {
        let boxDiv = document.createElement("div")
        boxDiv.classList.add(boxClass)
        boxDiv.innerHTML = s.value
        if (commonGetVal('注文ステータス') == s.value) boxDiv.classList.add(color)
        document.getElementById(id).appendChild(boxDiv)
    }
}

