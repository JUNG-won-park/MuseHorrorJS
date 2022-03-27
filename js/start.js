const main = document.querySelector('#main');
const qna = document.querySelector('#qna');


function addAnswer(answerText, qIdx) {
    let a = document.querySelector('.answerBox');
    let answer = document.createElement('button');
    answer.classList.add('answerList');
    answer.classList.add('mx-3'); 
    answer.classList.add('mt-2'); 
    answer.classList.add('fadeIn'); 

    a.appendChild(answer);
    
    answer.innerHTML = answerText;
    answer.addEventListener("click", function(){
        let children = document.querySelectorAll('.answerList');
        for(let i=0; i < children.length; i++) {
            children[i].disabled = true; //안써도될꺼같은데 +__________+?
            children[i].style.WebkitAnimation = "fadeOut 0.5s";
            children[i].style.animation = "fadeOut 0.5s";
        }
        setTimeout(()=>{
            for(let i=0; i < children.length; i++) {
                children[i].style.display = 'none';
            }
            goNext(++qIdx);
        },450)
    }, false); // false는 addEventListener의 옵션부분, 생략해도 될듯 (parent, child의 버블링 제어)
}

function goNext(qIdx){ 
    let q = document.querySelector('.qBox');
    q.innerHTML = qnaList[qIdx].q;
    let img = document.querySelector('.imgBox');
    img.src=qnaList[qIdx].img;
    
    for(let i in qnaList[qIdx].a){
        addAnswer(qnaList[qIdx].a[i].answer, qIdx);
    }
}

function begin() {
    main.style.WebkitAnimation = "fadeOut 1s";
    main.style.animation = "fadeOut 1s";
    setTimeout(()=>{
        qna.style.WebkitAnimation = "fadeIn 1s";
        qna.style.animation = "fadeIn 1s";
        setTimeout(()=>{
            main.style.display = "none";
            qna.style.display = "block";
        },450)
        let qIdx = 0;
        goNext(qIdx);
    }, 450)
}

 