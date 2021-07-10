const $score = document.querySelector('#score');
const $question = document.querySelector('#question');
const $advertising = document.querySelector('#advertising');
const $background = document.querySelector('#background');
const $result = document.querySelector('#result');
const $umbrellas = document.querySelectorAll('#umbrella');
const $continue = document.querySelector('#continue');
const audio = new Audio('../audio/click.mp3');

class Score {
    constructor(){
        this.$result = $result;
        this.foundUmbrellas = 0;
        this.score = `${this.foundUmbrellas} / 5`;
    }
    
    render(){
        this.$result.innerHTML = this.score;
    }

    find(){
        this.foundUmbrellas = this.foundUmbrellas + 1;
        this.score = `${this.foundUmbrellas} / 5`;
        this.render();
    }
}

const score = new Score();
score.render();

const startAnimation = () => {
    setTimeout(() => {
        $score.classList.add('score-animation');
        $background.classList.add('background-animation');
        $background.classList.add('mask-disappearance');
        $question.classList.add('question-animation');
        $background.addEventListener('transitionend', () => {
            $background.classList.add('mask-disappearance-index');
         })
        $question.addEventListener('transitionend', () => {
           $question.style.display = 'none';
           initializationFind();
        })
    }, 1000)
}

const calculateDifference = (width) => {
    const effectwidth = Number(width.slice(0, width.length - 2));
    const difference = effectwidth / 2;
    return difference;
}

const effect = (left, top) => {
    const $effect = document.createElement('div');
    const $img = document.createElement('img');
    $effect.classList.add('effect');
    setTimeout(() => {
        $effect.classList.add('effect-animation');
    }, 0);
    $img.setAttribute('src', './images/effect.gif');
    $img.setAttribute('alt', 'effect');
    $img.style.width = 170 + 'px';
    $effect.append($img);
    $effect.style.left = left - calculateDifference($img.style.width) + 'px';
    $effect.style.top = top - calculateDifference($img.style.width) + 'px';
    $effect.addEventListener('transitionend', () => {
        $effect.style.display = 'none';
    })
    return $effect;
}

const scoreEffect = () => {
    const $scoreEffect = document.createElement('div');
    $scoreEffect.classList.add('score-effect');
    const $img = document.createElement('img');
    $img.setAttribute('src', './images/score-effect.gif');
    $img.setAttribute('alt', 'score-effect');
    $scoreEffect.append($img);
    $scoreEffect.addEventListener('transitionend', () => {
        $scoreEffect.style.display = 'none';
    });
    setTimeout(() => {
        $scoreEffect.classList.add('score-effect-animation');
    }, 0)
    return $scoreEffect;
}

const find = (e) =>{
    const differenceX = Math.round(e.clientX - $background.getBoundingClientRect().x);
    const differenceY = Math.round(e.clientY - $background.getBoundingClientRect().y);
    $background.append(effect(differenceX, differenceY));
    $advertising.append(scoreEffect());
    audio.play()
    const $umbrella = e.target;
    if(!$umbrella.classList.contains('umbella')){
        score.find();
        $umbrella.parentNode.classList.add('umbrella-animation');
    } else {
        score.find();
        $umbrella.classList.add('umbrella-animation');
    }
    if(score.foundUmbrellas === 3){
        $umbrellas.forEach(umbrella => {
            umbrella.removeEventListener('click', find);
            umbrella.removeEventListener('transitionend', () => {
                umbrella.style.display = 'none';
            })
        });
        $background.addEventListener('transitionend', () => {
            $background.classList.add('mask-appearance-index');
        });
        setTimeout(() => {
            $background.classList.remove('background-animation');
            $background.classList.add('background-animation-end');
            $background.classList.add('mask-appearance');
            $score.classList.add('score-animation-end');
        }, 1000)
        setTimeout(() => {
            $continue.style.display = 'block';
        }, 2000)
    }
}

const initializationFind = () => {
    $umbrellas.forEach(umbrella => {
        umbrella.addEventListener('click', find);
        umbrella.addEventListener('transitionend', () => {
            umbrella.style.display = 'none';
        })
    });
    $score.addEventListener('transitionend', () => {
        $score.style.display = 'none';
    });
}

startAnimation();