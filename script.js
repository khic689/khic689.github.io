document.addEventListener('DOMContentLoaded', function() {
    
    // 1. 設定年份
    const yearSpan = document.getElementById('current-year');
    if(yearSpan) yearSpan.textContent = new Date().getFullYear();
    
    // 2. 配置你的 GitHub 基本路徑
    // 格式：https://raw.githubusercontent.com/使用者名稱/倉庫名稱/分支名稱/
    const baseUrl = 'https://github.com/khic689/11401_CS203A';

    const contentDiv = document.getElementById('markdown-content');
    const buttons = document.querySelectorAll('.btn-note');

    // 抓取並解析 Markdown 的函數
    async function loadMarkdown(fileName) {
        contentDiv.innerHTML = '<p style="color: #999;">Loading...</p>';
        try {
            const response = await fetch(baseUrl + fileName);
            if (!response.ok) throw new Error('找不到檔案');
            
            const markdownText = await response.text();
            contentDiv.innerHTML = marked.parse(markdownText);
            
            // 讓網頁自動捲動回頂端，方便閱讀
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error) {
            contentDiv.innerHTML = `<p style="color: red;">載入失敗：${error.message}</p>`;
        }
    }

    // 為所有按鈕綁定點擊事件
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // 移除其他按鈕的選取狀態，並加上當前按鈕的選取狀態
            buttons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // 取得 data-url 屬性值並載入
            const fileName = this.getAttribute('data-url');
            loadMarkdown(fileName);
        });
    });

    // 預設載入第一個檔案（README.md）
    loadMarkdown('README.md');
});
