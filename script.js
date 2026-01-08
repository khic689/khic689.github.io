document.addEventListener('DOMContentLoaded', function() {
    
    // 1. 設定年份
    const yearSpan = document.getElementById('current-year');
    if(yearSpan) yearSpan.textContent = new Date().getFullYear();
    
    // 2. 重要：請修改這裡！！
    // 範例：'https://raw.githubusercontent.com/khic689/MyNotes/main/'
    const baseUrl = 'https://github.com/khic689/11401_CS203A';

    const contentDiv = document.getElementById('markdown-content');
    const buttons = document.querySelectorAll('.btn-note');

    async function loadMarkdown(fileName) {
        contentDiv.innerHTML = '<p style="color: #999;">載入中...</p>';
        
        try {
            const targetUrl = baseUrl + fileName;
            console.log("正在嘗試抓取:", targetUrl); // 除錯用

            const response = await fetch(targetUrl);
            
            if (!response.ok) {
                throw new Error(`找不到檔案 (${response.status})。請檢查 baseUrl 與檔案名稱是否正確。`);
            }
            
            const markdownText = await response.text();
            
            // 檢查 marked 是否載入成功
            if (typeof marked === 'undefined') {
                throw new Error("Marked 函式庫未正確載入，請檢查網路連線。");
            }

            contentDiv.innerHTML = marked.parse(markdownText);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
        } catch (error) {
            console.error("發生錯誤:", error);
            contentDiv.innerHTML = `<p style="color: red; border: 1px dashed red; padding: 10px;">
                ⚠️ 錯誤：${error.message}<br><br>
                <small>請檢查瀏覽器 Console (F12) 查看詳細訊息。</small>
            </p>`;
        }
    }

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            buttons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            const fileName = this.getAttribute('data-url');
            loadMarkdown(fileName);
        });
    });

    // 初始載入
    loadMarkdown('README.md');
});
