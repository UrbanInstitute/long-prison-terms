/*credits to http://alexkatz.me/posts/building-a-custom-html5-audio-player-with-javascript/ */
var playIDFull,
playID,
clip,
duration,
pButton,
playhead,
timeCurrent,
timeline;


d3.selectAll('.play')
    .on("click", function() { console.log('hi')
        playID = d3.select(this).attr('id').split('-')
        playIDFull = "-" + playID[1] + "-" + playID[2]
        console.log(playIDFull);
        clip = document.getElementById('clip' + playIDFull);  // id for audio element
        duration = clip.duration; // Duration of audio clip, calculated here for embedding purposes
        pButton = document.getElementById('pButton' + playIDFull); // play button
        playhead = document.getElementById('playhead' + playIDFull); // playhead
        timeCurrent = document.getElementById('timeCurrent' + playIDFull); // timeCurrent
        timeline = document.getElementById('timeline' + playIDFull); // timeline
        console.log('timeline' + playIDFull)
    



// timeline width adjusted for playhead
var timelineWidth = timeline.offsetWidth - playhead.offsetWidth;

// play button event listenter
pButton.addEventListener("click", play);


// // timeupdate event listener
clip.addEventListener("timeupdate", timeUpdate, false);

// // makes timeline clickable
timeline.addEventListener("click", function(event) {
    moveplayhead(event);
    clip.currentTime = duration * clickPercent(event);
}, false);

// returns click as decimal (.77) of the total timelineWidth
function clickPercent(event) { 
    return (event.clientX - getPosition(timeline)) / timelineWidth;
}

// makes playhead draggable
playhead.addEventListener('mousedown', mouseDown, false);
window.addEventListener('mouseup', mouseUp, false);

// // Boolean value so that audio position is updated only when the playhead is released
var onplayhead = false;

// mouseDown EventListener
function mouseDown() {
    onplayhead = true;
    window.addEventListener('mousemove', moveplayhead, true);
    clip.removeEventListener('timeupdate', timeUpdate, false);
}

// mouseUp EventListener
// getting input from all mouse clicks
function mouseUp(event) {
    if (onplayhead == true) {
        moveplayhead(event);
        window.removeEventListener('mousemove', moveplayhead, true);
        // change current time
        clip.currentTime = duration * clickPercent(event);
        clip.addEventListener('timeupdate', timeUpdate, false);
    }
    onplayhead = false;
}
// mousemove EventListener
// Moves playhead as user drags
function moveplayhead(event) {
    playhead.style.marginLeft = "0px"
//    var newMargLeft = event.clientX - getPosition(timeline);
// console.log(newMargLeft)
//     if (newMargLeft >= 0 && newMargLeft <= timelineWidth) { console.log('1')
//         playhead.style.marginLeft = "0px";
//     }
//     if (newMargLeft < 0) { console.log('2')
//         playhead.style.marginLeft = "0px";
//     }
//     if (newMargLeft > timelineWidth) {console.log('3')
//         playhead.style.marginLeft = "0px";
//     }
}

// timeUpdate
// Synchronizes playhead position with current point in audio
function timeUpdate() { 
    var playPercent = timelineWidth * (clip.currentTime / duration); console.log(clip.currentTime);
    var formattedTime = (clip.currentTime.toString()/100).toFixed(2)
    d3.select(timeCurrent)
        .html(formattedTime.replace('.', ':'))
    playhead.style.marginLeft = "0px";
    playhead.style.width = playPercent + "px";

    if (clip.currentTime == duration) { 
        pButton.className = "";
        pButton.className = "play";
    }
}

//Play and Pause
function play() {
    // start clip
    if (clip.paused) {
        clip.play();
        // remove play, add pause
        pButton.className = "";
        pButton.className = "pause";
        console.log(pButton.className)
    } else { // pause clip
        clip.pause();
        // remove pause, add play
        pButton.className = "";
        pButton.className = "play";
    }
}

// Gets audio file duration
clip.addEventListener("canplaythrough", function() {
    duration = clip.duration; 
}, false);

// getPosition
// Returns elements left position relative to top-left of viewport
function getPosition(el) {
    return el.getBoundingClientRect().left;
}

})
