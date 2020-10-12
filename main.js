const isMobile = (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
const numItems = 5;
const numItemsFull = 200;
const defaultItemIndex = numItemsFull / 2; // should be multiplication of numItems
let firstCroppedOrder = initArray(numItems);
const defaultCroppedOrder = initArray(numItems);
let answerIndices = initArray(numItems);
let blockTimer = null;
let assessTimer = null;
let initScrollBlock = true;
let shouldBlockTouchScroll = true;
let imageSrc = "";

function initArray(num) {
    return Array.from({ length: num }, (_, i) => i)
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function areArraysEqual(array1, array2) {
    return array1.every(function (element, index) {
        return element === array2[index];
    });
}

function forceSnapScroll() {
    for (let i = 0; i < numItems; i++) {
        const scroller = document.getElementById(`scroller${i + 1}`);
        scroller.style.scrollBehavior = "smooth";
        const scaledIndex = scroller.scrollLeft / scroller.scrollWidth * numItemsFull;
        const itemIndex = Math.floor(scaledIndex + 0.5);
        scroller.scrollTo(scroller.scrollWidth / numItemsFull * (itemIndex - 0.5), 0);
    }
}

function makePuzzle() {
    firstCroppedOrder = initArray(numItems);
    answerIndices = initArray(numItems);
    blockTimer = null;
    assessTimer = null;
    initScrollBlock = true;
    shouldBlockTouchScroll = true;

    while (areArraysEqual(firstCroppedOrder, defaultCroppedOrder)) {
        firstCroppedOrder = shuffleArray(firstCroppedOrder);
    }

    for (let i = 0; i < numItems; i++) {
        const scroller = document.getElementById(`scroller${i + 1}`);
        let croppedOrder = initArray(numItems);
        const index = croppedOrder.indexOf(firstCroppedOrder[i]);
        croppedOrder.splice(index, 1); // remove the first cropped order
        croppedOrder = shuffleArray(croppedOrder); // shuffle the rest
        croppedOrder.unshift(firstCroppedOrder[i]); // prepend the first cropped order
        answerIndices[i] = croppedOrder.indexOf(i); // store answer indices

        for (let j = 0; j < numItemsFull; j++) {
            const card = document.createElement("div");
            card.className = "card";

            const cropped = document.createElement("img");
            cropped.className = "cropped";
            cropped.id = `cropped${croppedOrder[j % numItems]}`;
            cropped.src = imageSrc;
            
            const pct = 100 / numItems;
            const posY = croppedOrder[j % numItems] * pct;

            cropped.style.clip = `rect(${posY}vh, 100vw, ${posY + pct}vh, 0vw)`;
            cropped.style.marginTop = `${100 - pct - posY * 2}vh`;

            card.appendChild(cropped);
            scroller.appendChild(card);
        }

        // last dummy card
        const card = document.createElement("div");
        card.className = "card";
        const dummy = document.createElement("p");
        dummy.textContent = "|";
        card.appendChild(dummy);
        scroller.appendChild(card);
    }

    for (let i = 0; i < numItems; i++) {
        const scroller = document.getElementById(`scroller${i + 1}`);
        const direction = i % 2;
        if (!direction) {
            scroller.scrollTo(scroller.scrollWidth / numItemsFull * (defaultItemIndex - numItems + answerIndices[i] - 0.5), 0);
        }
        else {
            scroller.scrollTo(scroller.scrollWidth / numItemsFull * (defaultItemIndex + answerIndices[i] - 0.5), 0);
        }
    }

    console.log(answerIndices);

    setTimeout(function () {
        forceSnapScroll();
        for (let i = 0; i < numItems; i++) {
            firstCroppedOrder[i] = 0; // reuse this
            const scroller = document.getElementById(`scroller${i + 1}`);
            scroller.scrollTo(scroller.scrollWidth / numItemsFull * (defaultItemIndex - 0.5), 0);
            scroller.addEventListener("scroll", function (e) {
                if (initScrollBlock) {
                    if (blockTimer) {
                        clearTimeout(blockTimer);
                    }
                    blockTimer = setTimeout(function () {
                        shouldBlockTouchScroll = false;
                        initScrollBlock = false;
                    }, 100);
                    return;
                }
                const scaledIndex = scroller.scrollLeft / scroller.scrollWidth * numItemsFull;
                // correct overflow scrolling
                if (scaledIndex > numItemsFull - 1) {
                    scroller.scrollTo(scroller.scrollWidth / numItemsFull * (numItemsFull - 1 - 0.5), 0);
                }
                // get the current item index
                const itemIndex = Math.floor(scaledIndex + 0.5) % numItems;
                const nth = parseInt(e.target.id.substring("scroller".length), 10) - 1;
                if (itemIndex !== firstCroppedOrder[nth]) {
                    firstCroppedOrder[nth] = itemIndex;
                }
                if (assessTimer) {
                    clearTimeout(assessTimer);
                }
                assessTimer = setTimeout(function () {
                    forceSnapScroll();
                    if (areArraysEqual(firstCroppedOrder, answerIndices)) {
                        const puzzleWrapper = document.getElementById("puzzle-wrapper");
                        puzzleWrapper.style.animation = "blink 1s";
                        shouldBlockTouchScroll = true;
                        setTimeout(function () {
                            puzzleWrapper.style.animation = "none";
                            initScrollBlock = true;
                            // for (let j = 0; j < numItems; j++) {
                            //     const scroller = document.getElementById(`scroller${j + 1}`);
                            //     scroller.innerHTML = "";
                            //     scroller.parentNode.replaceChild(scroller.cloneNode(true), scroller);
                            // }
                            location.reload(); // this is not ideal, but works for now
                        }, 1000);
                    }
                }, 100);
            });
        }
    }, 2000);
}

window.onload = function() {

    // preload a random image from url
    imageSrc = `https://picsum.photos/${window.innerWidth}/${window.innerHeight}`;
    const img = new Image();
    img.onload = makePuzzle;
    img.onerror = function() {
        console.error("could not load the image:", imageSrc);
        location.reload();
    };
    img.src = imageSrc;
    
    // a hack to prevent scroll freezing
    document.addEventListener("touchstart", function (e) {
        if (!shouldBlockTouchScroll) {
            forceSnapScroll();
        }
    });

    // used to block scrolling
    document.addEventListener('touchmove', function (e) {
        if (shouldBlockTouchScroll) {
            e.preventDefault();
        }
    }, { passive: false });

    // prevent image dragging and menu showing up
    window.ondragstart = function() { return false; }
    window.oncontextmenu = function() { return false; }
}