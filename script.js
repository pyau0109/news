document.addEventListener("DOMContentLoaded", function() {
    
    // UI 元件
    const guessSlider = document.getElementById("guess-slider");
    const sliderDisplay = document.getElementById("slider-display");
    const resultFeedback = document.getElementById("result-feedback");
    const childAgeDisplay = document.getElementById("child-age");
    const ageWarning = document.getElementById("age-warning");

    // 階段區塊
    const stage1 = document.getElementById("stage-1");
    const stage1Result = document.getElementById("stage-1-result");
    const stage2 = document.getElementById("stage-2");
    const stage3 = document.getElementById("stage-3");

    // 遊戲畫面區塊
    const gameMain = document.getElementById("game-main");
    const gameG1 = document.getElementById("game-g1");
    const gameG3 = document.getElementById("game-g3");
    const g3Event1 = document.getElementById("g3-event-1");
    const g3Event2 = document.getElementById("g3-event-2");
    const gameG4 = document.getElementById("game-g4");
    const gameG5 = document.getElementById("game-g5");
    const gameG6 = document.getElementById("game-g6");
    const gameR1 = document.getElementById("game-r1");
    const gameR2 = document.getElementById("game-r2");

    // 遊戲按鈕
    const btnG3Action1 = document.getElementById("btn-g3-action-1");
    const btnG3Action2 = document.getElementById("btn-g3-action-2");
    const btnG3ToG4 = document.getElementById("btn-g3-to-g4");

    // 切換顯示的通用函式
    function switchScreen(hideElement, showElement) {
        if(hideElement) {
            hideElement.classList.add("hidden");
            hideElement.classList.remove("active");
        }
        if(showElement) {
            showElement.classList.remove("hidden");
            showElement.classList.add("active");
        }
    }

    // 檢查並觸發 M: 3歲提醒
    function updateAge(ageString, isWarning = false) {
        childAgeDisplay.textContent = ageString;
        if (isWarning) {
            ageWarning.classList.remove("hidden");
            // 彈出提醒 (符合 M 階段需求)
            alert("【M：3歲提醒】根據數據，3歲以上的特殊兒童極難被收養，因此媒合難度大幅提升！(倒計時加速)");
        }
    }

    // ================= 階段 1：滑桿 =================
    guessSlider.addEventListener("input", function() {
        sliderDisplay.textContent = this.value;
    });

    document.getElementById("btn-submit-guess").addEventListener("click", function() {
        let guess = parseInt(guessSlider.value);
        let actual = 18; // 基於 PDF: 18% (13/77)

        if (guess >= (actual - 2) && guess <= (actual + 2)) {
            resultFeedback.textContent = "你的猜測很準確！";
        } else if (guess > actual) {
            resultFeedback.textContent = "狀況比想像中嚴峻！";
        } else {
            resultFeedback.textContent = "願意收養特殊兒童的家庭比你想像中更少...";
        }
        switchScreen(stage1, stage1Result);
    });

    document.getElementById("btn-to-stage-2").addEventListener("click", function() {
        switchScreen(stage1Result, stage2);
        switchScreen(gameMain, gameMain); 
    });

    document.getElementById("btn-to-stage-3").addEventListener("click", function() {
        switchScreen(stage1Result, stage3);
    });

    // ================= 階段 2：遊戲流程 =================

    // Main -> G1
    document.getElementById("btn-start-task").addEventListener("click", function() {
        switchScreen(gameMain, gameG1);
        updateAge("1歲 2個月");
    });

    // G1 -> G3
    document.getElementById("btn-g1-next").addEventListener("click", function() {
        switchScreen(gameG1, gameG3);
        updateAge("1歲 6個月");
    });

    // G3 事件 1 (醫療)
    btnG3Action1.addEventListener("click", function() {
        this.textContent = "✓ 已安排早療";
        this.disabled = true;
        this.style.backgroundColor = "#2ecc71";
        switchScreen(null, g3Event2); // 顯示事件 2
        updateAge("2歲 1個月");
    });

    // G3 事件 2 (安置變數)
    btnG3Action2.addEventListener("click", function() {
        this.textContent = "✓ 已協調安置";
        this.disabled = true;
        this.style.backgroundColor = "#2ecc71";
        switchScreen(null, btnG3ToG4); // 顯示前往 G4 的按鈕
        updateAge("2歲 8個月");
    });

    // G3 -> G4
    btnG3ToG4.addEventListener("click", function() {
        switchScreen(gameG3, gameG4);
        updateAge("3歲 0個月", true); // 觸發 M 警告
    });

    // G4 選擇分支
    // 選擇「適合 (左滑)」 -> 進入 G5 審查
    document.getElementById("btn-g4-accept").addEventListener("click", function() {
        switchScreen(gameG4, gameG5);
        updateAge("4歲 5個月"); // N+3個月的耗時
    });

    // 選擇「不適合 (右滑)」 -> 直接失敗 R1
    document.getElementById("btn-g4-reject").addEventListener("click", function() {
        switchScreen(gameG4, gameR1);
        updateAge("6歲 0個月"); // 滿 6 歲
    });

    // G5 -> G6
    document.getElementById("btn-g5-to-g6").addEventListener("click", function() {
        switchScreen(gameG5, gameG6);
        updateAge("5歲 2個月");
    });

    // G6 -> R2 (成功結局)
    document.getElementById("btn-g6-to-r2").addEventListener("click", function() {
        switchScreen(gameG6, gameR2);
        // 倒計時停止
    });

    // 所有 R1/R2 -> Stage 3 (新聞報導)
    const finalBtns = document.querySelectorAll(".btn-to-stage-3-final");
    finalBtns.forEach(btn => {
        btn.addEventListener("click", function() {
            switchScreen(stage2, stage3);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
});
