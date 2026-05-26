document.addEventListener("DOMContentLoaded", () => {
    // ================= 取得網頁元素 =================
    // 滑桿與數值顯示
    const guessSlider = document.getElementById("guess-slider");
    const sliderDisplay = document.getElementById("slider-display");
    const resultFeedback = document.getElementById("result-feedback");
    
    // 按鈕
    const btnSubmitGuess = document.getElementById("btn-submit-guess");
    const btnToStage2 = document.getElementById("btn-to-stage-2");
    const btnToStage3 = document.getElementById("btn-to-stage-3");

    // 各個階段的區塊
    const stage1 = document.getElementById("stage-1");
    const stage1Result = document.getElementById("stage-1-result");
    const stage2 = document.getElementById("stage-2");
    const stage3 = document.getElementById("stage-3");

    // ================= 功能 1：連動滑桿與數值 =================
    // 當滑桿被拉動時，即時更新下方顯示的數字
    guessSlider.addEventListener("input", (e) => {
        sliderDisplay.textContent = e.target.value;
    });

    // ================= 功能 2：提交答案與邏輯判斷 =================
    btnSubmitGuess.addEventListener("click", () => {
        // 取得讀者拉動的數值
        const userGuess = parseInt(guessSlider.value);
        const actualValue = 16.88; // 現實數據

        // 根據企劃書的邏輯給予不同的回饋文字
        if (userGuess >= (actualValue - 2) && userGuess <= (actualValue + 2)) {
            resultFeedback.textContent = "你的猜測非常準！現實的確如此殘酷...";
        } else if (userGuess < (actualValue - 2)) {
            resultFeedback.textContent = "狀況比你想像中好一點點，但依舊很艱難。";
        } else {
            resultFeedback.textContent = "願意收養特殊兒童的家庭比你想像中更少...";
        }

        // 隱藏第一階段，顯示結果頁
        stage1.classList.add("hidden");
        stage1.classList.remove("active");
        
        stage1Result.classList.remove("hidden");
        stage1Result.classList.add("active");
    });

    // ================= 功能 3：頁面導航切換 =================
    // 點擊「體驗社工尋家路」跳轉到階段 2
    btnToStage2.addEventListener("click", () => {
        stage1Result.classList.add("hidden");
        stage1Result.classList.remove("active");
        
        stage2.classList.remove("hidden");
        stage2.classList.add("active");
    });

    // 點擊「直接閱讀新聞」跳轉到階段 3
    btnToStage3.addEventListener("click", () => {
        stage1Result.classList.add("hidden");
        stage1Result.classList.remove("active");
        
        stage3.classList.remove("hidden");
        stage3.classList.add("active");
    });
});