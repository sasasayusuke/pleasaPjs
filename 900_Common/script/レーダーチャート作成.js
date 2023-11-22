$p.events.on_editor_load_arr.push(function () {
    let content = `
    <style>
        body {
            font-family: Arial, sans-serif;
        }
        .container {
            display: flex;
            flex-direction: column;
        }
        .chart-container, .table-container {
            box-sizing: border-box;
        }
        table {n
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            text-align: left;
            border: 1px solid #ddd;
        }
    </style>

    <div id="pdf-target" class="container">
        
        <h1 id="pdf-company" hidden></h1>
        <h2 id="pdf-manager" hidden></h2>

        <div class="chart-container">
            <canvas id="radarChart"></canvas>
        </div>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>カテゴリ</th>
                        <th>期待度</th>
                        <th>満足度</th>
                        <th>コメント</th>
                    </tr>
                </thead>
                <tbody id="tableBody">
                    <!-- Data will be populated here by JavaScript -->
                </tbody>
            </table>
        </div>
    </div>
    `
    let commentField = document.getElementById("CommentField")
    commentField.innerHTML = content
    let labels = [
        "お客さまからの要望への提案",
        "弊社技術者の業務に対する取組み",
        "弊社技術者の技術力",
        "弊社技術者の業務知識",
        "不具合発生時の対応",
        "お客様への報告・連絡・相談",
        "品質向上のための取組み",
        "作業スケジュールを遵守するための姿勢",
        "営業もしくは弊社全体での技術者に対するフォロー",
        "弊社技術者のコミュニケーション能力",
        "弊社技術者のコストパフォーマンス",
        "セキュリティルールを遵守するための姿勢",
    ]
    let data1 = [
        commonGetVal("期待度1", true),
        commonGetVal("期待度2", true),
        commonGetVal("期待度3", true),
        commonGetVal("期待度4", true),
        commonGetVal("期待度5", true),
        commonGetVal("期待度6", true),
        commonGetVal("期待度7", true),
        commonGetVal("期待度8", true),
        commonGetVal("期待度9", true),
        commonGetVal("期待度10", true),
        commonGetVal("期待度11", true),
        commonGetVal("期待度12", true),
    ]

    let data2 = [
        commonGetVal("満足度1", true),
        commonGetVal("満足度2", true),
        commonGetVal("満足度3", true),
        commonGetVal("満足度4", true),
        commonGetVal("満足度5", true),
        commonGetVal("満足度6", true),
        commonGetVal("満足度7", true),
        commonGetVal("満足度8", true),
        commonGetVal("満足度9", true),
        commonGetVal("満足度10", true),
        commonGetVal("満足度11", true),
        commonGetVal("満足度12", true),
    ]

    let comments = [
        commonGetVal("コメント1"),
        commonGetVal("コメント2"),
        commonGetVal("コメント3"),
        commonGetVal("コメント4"),
        commonGetVal("コメント5"),
        commonGetVal("コメント6"),
        commonGetVal("コメント7"),
        commonGetVal("コメント8"),
        commonGetVal("コメント9"),
        commonGetVal("コメント10"),
        commonGetVal("コメント11"),
        commonGetVal("コメント12"),
    ]

    let first = true

    // Radar Chartの初期化
    let ctx = document.getElementById('radarChart').getContext('2d');
    let radarChart;

    // 1秒ごとに実行する関数
    setInterval(function() {
        let checkData1 = [
            commonGetVal("期待度1", true),
            commonGetVal("期待度2", true),
            commonGetVal("期待度3", true),
            commonGetVal("期待度4", true),
            commonGetVal("期待度5", true),
            commonGetVal("期待度6", true),
            commonGetVal("期待度7", true),
            commonGetVal("期待度8", true),
            commonGetVal("期待度9", true),
            commonGetVal("期待度10", true),
            commonGetVal("期待度11", true),
            commonGetVal("期待度12", true),
        ]

        let checkData2 = [
            commonGetVal("満足度1", true),
            commonGetVal("満足度2", true),
            commonGetVal("満足度3", true),
            commonGetVal("満足度4", true),
            commonGetVal("満足度5", true),
            commonGetVal("満足度6", true),
            commonGetVal("満足度7", true),
            commonGetVal("満足度8", true),
            commonGetVal("満足度9", true),
            commonGetVal("満足度10", true),
            commonGetVal("満足度11", true),
            commonGetVal("満足度12", true),
        ]

        let checkComments = [
            commonGetVal("コメント1"),
            commonGetVal("コメント2"),
            commonGetVal("コメント3"),
            commonGetVal("コメント4"),
            commonGetVal("コメント5"),
            commonGetVal("コメント6"),
            commonGetVal("コメント7"),
            commonGetVal("コメント8"),
            commonGetVal("コメント9"),
            commonGetVal("コメント10"),
            commonGetVal("コメント11"),
            commonGetVal("コメント12"),
        ]

        if (!arraysAreEqual(data1, checkData1) || !arraysAreEqual(data2, checkData2) || !arraysAreEqual(comments, checkComments) || first) {
            first = false
            data1 = checkData1
            data2 = checkData2
            comments = checkComments
            // チャートが既に存在する場合、それを破棄
            if (radarChart) {
                radarChart.destroy();
            }

            // 新しいデータでチャートを更新
            radarChart = new Chart(ctx, {
                type: 'radar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: '期待度',
                        data: data1,
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    },
                    {
                        label: '満足度',
                        data: data2,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        r: {
                            min: 0,
                            max: 5,
                            ticks: {
                                beginAtZero: true,
                                stepSize: 1
                            },
                            pointLabels: {
                                fontSize: 60
                            }
                        }
                    },
                    maintainAspectRatio: false
                }
            })
            var tableBody = document.getElementById('tableBody');
            tableBody.innerHTML = ""
            for (let i = 0; i < labels.length; i++) {
                let row = tableBody.insertRow()
                let cell1 = row.insertCell(0)
                let cell2 = row.insertCell(1)
                let cell3 = row.insertCell(2)
                let cell4 = row.insertCell(3)
                let cell5 = row.insertCell(4)
                cell1.textContent = i + 1
                cell2.textContent = labels[i]
                cell3.textContent = data1[i]
                cell4.textContent = data2[i]
                cell5.textContent = comments[i]
            }
        }


    }, 1000)

    // ボタン追加
    commonAddButton('printPdf', printPdf, 'レポート出力', "レーダーチャートのPDFを出力します", "", "ui-icon-print")
})
function arraysAreEqual(arr1, arr2) {
    return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
}

function printPdf() {
    let company = document.getElementById('pdf-company')
    let manager = document.getElementById('pdf-manager')

    company.innerText = commonGetVal("会社名")
    manager.innerText = commonGetVal("担当者名")
    let fileName = `${company.innerText}_ ${manager.innerText}.pdf`

    company.hidden = false
    manager.hidden = false

    let element = document.getElementById('pdf-target');
    let opt = {
        margin: 10,
        filename: fileName,
        image: {
            type: 'jpeg',
            quality: 0.98
        },
        html2canvas: {
            scale: 2
        },
        jsPDF: {
            unit: 'mm',
            format: 'a4',
            orientation: 'portrait',
        },
    }

    html2pdf().from(element).set(opt).save();
}