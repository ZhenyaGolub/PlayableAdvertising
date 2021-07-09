const $score = document.querySelector('#score');
const $question = document.querySelector('#question');
const $background = document.querySelector('#background');
const $result = document.querySelector('#result');
const $umbrellas = document.querySelectorAll('#umbrella');
const $continue = document.querySelector('#continue');

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

const find = (e) =>{
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