const main = document.querySelector('#main');
const qna = document.querySelector('#qna');
const result = document.querySelector('#result');
const endPoint = qnaList.length;
const select = [];

function calResult(){
    let pointArray = [
        {name: '10', value: 0, key: 0},
        {name: '5', value: 0, key: 1},
        {name: '0', value: 0, key: 2}
    ]
    for(let i = 0; i < endPoint; i++) {
        let target = qnaList[i].a[select[i]];
        for(let j=0; j < target.type.length; j++) {
            for(let k=0; k< pointArray.length; k++) {
                if(target.type[j] === pointArray[k].name){
                    pointArray[k].value += 1;
                }
            }
        }
    }

    let resultArray = pointArray.sort(function (a,b) {
        if(a.value > b.value) {
            return -1;
        }
        if(a.value < b.value) {
            return 1;
        }
        return 0;
    });

    console.log(resultArray);

    let resultWord = resultArray[0].key;
    return resultWord;
}

function goResult() {
    qna.style.WebkitAnimation = "fadeOut 1s";
    qna.style.animation = "fadeOut 1s";
    setTimeout(()=>{
        result.style.WebkitAnimation = "fadeIn 1s";
        result.style.animation = "fadeIn 1s";
        setTimeout(()=>{
            qna.style.display = "none";
            result.style.display = "block";
        },450)})

    calResult();
}

function addAnswer(answerText, qIdx, idx) {
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
            select[qIdx] = idx;

            for(let i=0; i < children.length; i++) {
                children[i].style.display = 'none';
            }
            goNext(++qIdx);
        },450)
    }, false); // false는 addEventListener의 옵션부분, 생략해도 될듯 (parent, child의 버블링 제어)
}

function goNext(qIdx){ 
    if(qIdx === endPoint) {
        goResult();
        return;
    }
    let q = document.querySelector('.qBox');
    q.innerHTML = qnaList[qIdx].q;
    let img = document.querySelector('.imgBox');
    img.src=qnaList[qIdx].img;
    
    for(let i in qnaList[qIdx].a){
        addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
    }
    let status = document.querySelector('.statusBar');
    status.style.width = (100/endPoint) * (qIdx+1) + '%';

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

 