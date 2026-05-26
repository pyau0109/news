document.addEventListener("DOMContentLoaded", function() {
        
    const guessSlider = document.getElementById("guess-slider");
    const sliderDisplay = document.getElementById("slider-display");
    const resultFeedback = document.getElementById("result-feedback");
    const childAge = document.getElementById("child-age");
    const ageWarning = document.getElementById("age-warning");

    const stage1 = document.getElementById("stage-1");
    const stage1Result = document.getElementById("stage-1-result");
    const stage2 = document.getElementById("stage-2");
    const stage3 = document.getElementById("stage-3");

    const gameMain = document.getElementById("game-main");
    const gameG3 = document.getElementById("game-g3");
    const gameG4 = document.getElementById("game-g4");
    const gameG5 = document.getElementById("game-g5");
    const gameR1 = document.getElementById("game-r1");

    function switchScreen(hideElement, showElement) {
        hideElement.classList.add("hidden");
        hideElement.classList.remove("active");
        showElement.classList.remove("hidden");
        showElement.classList.add("active");
    }

    guessSlider.addEventListener("input", function() {
        sliderDisplay.textContent = this.value;
    });

    document.getElementById("btn-submit-guess").addEventListener("click", function() {
        let guess = parseInt(guessSlider.value);
        if (guess >= 14 && guess <= 18) {
            resultFeedback.textContent = "你的猜測非常準！國內現實數據的確如此殘酷...";
        } else if (guess < 14) {
            resultFeedback.textContent = "實際狀況比你想像中稍微好一點，但依舊艱難。";
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

    document.getElementById("btn-start-task").addEventListener("click", function() {
        switchScreen(gameMain, gameG3);
        childAge.textContent = "1歲 4個月";
    });

    document.getElementById("btn-g3-to-g4").addEventListener("click", function() {
        switchScreen(gameG3, gameG4);
        childAge.textContent = "2歲 3個月";
    });

    document.getElementById("btn-g4-to-g5").addEventListener("click", function() {
        switchScreen(gameG4, gameG5);
        childAge.textContent = "3歲 2個月";
        ageWarning.classList.remove("hidden"); 
    });

    document.getElementById("btn-g5-to-r1").addEventListener("click", function() {
        switchScreen(gameG5, gameR1);
        childAge.textContent = "6歲 0個月";
    });

    document.getElementById("btn-r1-to-stage-3").addEventListener("click", function() {
        switchScreen(stage2, stage3);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
