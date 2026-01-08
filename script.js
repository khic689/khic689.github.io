document.addEventListener('DOMContentLoaded', function() {
    
    // 1. 設定年份
    const yearSpan = document.getElementById('current-year');
    const currentYear = new Date().getFullYear();
    yearSpan.textContent = currentYear;
    
    // 2. 抓取並渲染 Markdown
    // 請將下方的網址替換成你 GitHub 檔案的 "Raw" 連結
    const githubRawUrl = 'https://raw.githubusercontent.com/khic689/11401_CS203A/refs/heads/main/Note_Of_Array.md';

    async function fetchMarkdown() {
        try {
            const response = await fetch(githubRawUrl);
            if (!response.ok) throw new Error('無法取得檔案，請檢查連結是否正確');
            
            const markdownText = await response.text();
            
            // 使用 marked 將文字轉為 HTML 並放入容器
            document.getElementById('markdown-content').innerHTML = marked.parse(markdownText);
            
            console.log("Markdown 內容已成功載入");
        } catch (error) {
            console.error("載入失敗:", error);
            document.getElementById('markdown-content').innerHTML = 
                `<p style="color: red;">載入失敗：${error.message}</p>`;
        }
    }

    fetchMarkdown();
});
