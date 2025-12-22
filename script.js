// 等待網頁結構載入完成
document.addEventListener('DOMContentLoaded', function() {
    
    // 找到我們在 HTML footer 中預留的位置
    const yearSpan = document.getElementById('current-year');
    
    // 獲取目前的年份
    const currentYear = new Date().getFullYear();
    
    // 將年份填入該位置
    yearSpan.textContent = currentYear;
    
    console.log("極簡風頁面已載入，目前年份為：" + currentYear);
});
