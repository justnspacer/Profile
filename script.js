document.addEventListener('DOMContentLoaded', function () {
  const target = document.getElementById('targetImage');
  const tomato = document.getElementById('tomato');
  const splat = document.getElementById('splat');
  const splatSound = document.getElementById('splatSound');
  const muteButton = document.getElementById('muteButton');
  const throwCounterDisplay = document.getElementById('throwCounter');
  let throwCounter = 0;
  let isMuted = false;

  target.addEventListener('click', initiateThrow);
  target.addEventListener('touchend', initiateThrow);
  muteButton.addEventListener('click', toggleMute);

  function initiateThrow(e) {
    throwCounter++;
    throwCounterDisplay.textContent = throwCounter;
    // Calculate where the tomato should land
    const endX = e.clientX;
    const endY = e.clientY;

    // Start the tomato throw from somewhere (adjust as needed)
    const startX = endX - 100;
    const startY = endY + 100;

    tomato.style.left = startX + 'px';
    tomato.style.top = startY + 'px';
    tomato.style.display = 'block';

    // Move and animate the tomato in a curve
    tomato.animate(
      [
        { transform: `translate(0, 0) scale(1)` },
        {
          transform: `translate(${endX - startX}px, ${
            endY - startY
          }px) scale(1)`,
        },
      ],
      {
        duration: 500, //throw speed
        easing: 'ease-out',
      }
    ).onfinish = () => {
      // Switch to splat image at the end location
      tomato.style.display = 'none';
      splat.style.left = endX + 'px';
      splat.style.top = endY + 'px';
      splat.style.display = 'block';

      // Play the splat sound effect
      splatSound.play();

      // Hide the splat image after some time
      setTimeout(() => {
        splat.style.display = 'none';
      }, 1000);
    };
  }

  function toggleMute() {
    isMuted = !isMuted;
    splatSound.muted = isMuted;
    muteButton.textContent = isMuted ? 'Unmute' : 'Mute';
  }
});
