document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // 1. UI 顯示/隱藏 切換核心函式 (防止樣式衝突)
    // ==========================================
    function showScreen(targetElement) {
        if (!targetElement) return;
        targetElement.classList.remove("hidden");
        targetElement.classList.add("active");
    }

    function hideScreen(targetElement) {
        if (!targetElement) return;
        targetElement.classList.add("hidden");
        targetElement.classList.remove("active");
    }

    // ==========================================
    // 2. 宣告所有需要控制的 DOM 元素
    // ==========================================
    // 大階段區塊
    const stage1 = document.getElementById("stage-1");
    const stage1Result = document.getElementById("stage-1-result");
    const stage2 = document.getElementById("stage-2");
    const stage3 = document.getElementById("stage-3");

    // 遊戲（階段2）內部子畫面
    const gameMain = document.getElementById("game-main");
    const gameG3 = document.getElementById("game-g3");
    const gameG4 = document.getElementById("game-g4");
    const gameG5 = document.getElementById("game-g5");
    const gameR1 = document.getElementById("game-r1");

    // 互動控制元件
    const guessSlider = document.getElementById("guess-slider");
    const sliderDisplay = document.getElementById("slider-display");
    const resultFeedback = document.getElementById("result-feedback");
    const childAgeDisplay = document.getElementById("child-age");
    const ageWarning = document.getElementById("age-warning");

    // 所有切換按鈕
    const btnSubmitGuess = document.getElementById("btn-submit-guess");
    const btnToStage2 = document.getElementById("btn-to-stage-2");
    const btnToStage3 = document.getElementById("btn-to-stage-3");
    
    const btnStartTask = document.getElementById("btn-start-task");
    const btnG3Action = document.getElementById("btn-g3-action");
    const btnG3ToG4 = document.getElementById("btn-g3-to-g4");
    const btnG4ToG5 = document.getElementById("btn-g4-to-g5");
    const btnG5ToR1 = document.getElementById("btn-g5-to-r1");
    const btnR1ToStage3 = document.getElementById("btn-r1-to-stage-3");

    // ==========================================
    // 3. 階段 1：滑桿即時連動與提交
    // ==========================================
    if (guessSlider && sliderDisplay) {
        guessSlider.addEventListener("input", (e) => {
            sliderDisplay.textContent = e.target.value;
        });
    }

    if (btnSubmitGuess) {
        btnSubmitGuess.addEventListener("click", () => {
            const userGuess = parseInt(guessSlider.value);
            const actualValue = 16.88;

            // 判斷回饋文字邏輯
            if (userGuess >= (actualValue - 2) && userGuess <= (actualValue + 2)) {
                resultFeedback.textContent = "你的猜測非常準！國內現實數據的確如此殘酷...";
            } else if (userGuess < (actualValue - 2)) {
                resultFeedback.textContent = "實際狀況比你想像中稍微好一點點，但依舊極其艱難。";
            } else {
                resultFeedback.textContent = "願意收養特殊需求兒童的家庭，遠比你想像中更少...";
            }

            hideScreen(stage1);
            showScreen(stage1Result);
        });
    }

    // ==========================================
    // 4. 階段 1 結果頁 ➔ 轉場路由
    // ==========================================
    if (btnToStage2) {
        btnToStage2.addEventListener("click", () => {
            hideScreen(stage1Result);
            showScreen(stage2); // 顯示遊戲大容器
            
            // 確保進入遊戲時，畫面初始在 gameMain
            showScreen(gameMain);
            hideScreen(gameG3);
            hideScreen(gameG4);
            hideScreen(gameG5);
            hideScreen(gameR1);
        });
    }

    if (btnToStage3) {
        btnToStage3.addEventListener("click", () => {
            hideScreen(stage1Result);
            showScreen(stage3);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ==========================================
    // 5. 階段 2：社工角色扮演完整關卡鏈
    // ==========================================
    
    // 按鈕：案件指派 ➔ G3 寄養家庭
    if (btnStartTask) {
        btnStartTask.addEventListener("click", () => {
            hideScreen(gameMain);
            showScreen(gameG3);
            // 更新 HUD 時間（模擬時間流逝）
            if (childAgeDisplay) childAgeDisplay.textContent = "1歲 4個月";
        });
    }

    // 按鈕：G3 內部特殊事件點擊
    if (btnG3Action) {
        btnG3Action.addEventListener("click", (e) => {
            e.target.textContent = "✓ 已成功安排早療復健";
            e.target.style.backgroundColor = "#2ecc71";
            e.target.disabled = true;
            if (childAgeDisplay) childAgeDisplay.textContent = "1歲 9個月";
        });
    }

    // 按鈕：G3 ➔ G4 媒合家庭初審
    if (btnG3ToG4) {
        btnG3ToG4.addEventListener("click", () => {
            hideScreen(gameG3);
            showScreen(gameG4);
            if (childAgeDisplay) childAgeDisplay.textContent = "2歲 3個月";
        });
    }

    // 按鈕：G4 ➔ G5 多家庭深度審查
    if (btnG4ToG5) {
        btnG4ToG5.addEventListener("click", () => {
            hideScreen(gameG4);
            showScreen(gameG5);
            // 時間逼近 3 歲警報門檻
            if (childAgeDisplay) childAgeDisplay.textContent = "3歲 2個月";
            if (ageWarning) ageWarning.classList.remove("hidden");
        });
    }

    // 按鈕：G5 ➔ R1 失敗結局
    if (btnG5ToR1) {
        btnG5ToR1.addEventListener("click", () => {
            hideScreen(gameG5);
            showScreen(gameR1);
            // 超過黃金期，達到 6 歲結局
            if (childAgeDisplay) childAgeDisplay.textContent = "6歲 0個月";
        });
    }

    // 按鈕：R1 ➔ 階段 3 深度報導文章
    if (btnR1ToStage3) {
        btnR1ToStage3.addEventListener("click", () => {
            hideScreen(stage2); // 隱藏整個遊戲區
            showScreen(stage3); // 展開新聞報導
            // 自動平滑捲動到最頂端，優化閱讀體驗
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});
