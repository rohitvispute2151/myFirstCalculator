const numbers = document.querySelectorAll('[data-num]');
const operations = document.querySelectorAll('[data-opr]');
const equlas = document.querySelector('[data-equal]');
const del = document.querySelector('[data-del]');
const clear = document.querySelector('[data-clear]');
const prevText = document.querySelector('[data-prev-ele]');
const currText = document.querySelector('[data-curr-ele]');

class calculator{
    constructor(currText,prevText){
        this.currText = currText;
        this.prevText = prevText;
        this.currOpr = "";
        this.prevOpr = "";
        this.opr = "";
    }


    clear(){
        this.currOpr = '';
        this.prevOpr = '';
        this.opr = '';
    }

    del(){
        this.currOpr = this.currOpr.slice(0,-1)
    }

    appendNumber(number){
        if(number == '.' && this.currOpr.includes('.')) return;
        this.currOpr = this.currOpr.toString() + number.toString();
    }

    operation(opr){
        if(this.currOpr === '') return;
        if(this.prevOpr !== ''){
            this.compute();
        }
        this.opr  = opr;
        this.prevOpr = this.currOpr;
        this.currOpr = '';
    }

    compute(){
        let result ;
        const currNum = parseFloat(this.currOpr);
        const prevNum = parseFloat(this.prevOpr);
        if(isNaN(prevNum) || isNaN(currNum)) return
        switch(this.opr){
            case '➕' :
                result = prevNum + currNum ;
                break ;

            case '➖' :
                result = prevNum - currNum ;
                break ;

            case '✖️' :
                result = prevNum * currNum ;
                break ;

            case '➗' :
                result = prevNum / currNum ;
                break ;
            default:
            return
        }
        this.currOpr = result ;
        this.prevOpr = '';
        this.opr = '';
    }

    updateOutput(){
        if(this.opr != null){
            this.prevText.innerText = `${this.prevOpr} ${this.opr}`
        }
        this.currText.innerText = this.currOpr;
    }

}

const calc = new calculator(currText,prevText);

numbers.forEach( number =>{
    number.addEventListener("click",()=>{
        calc.appendNumber(number.innerText);
        calc.updateOutput();
    })
})

operations.forEach( opr =>{
    opr.addEventListener("click",()=>{
        calc.operation(opr.innerText);
        calc.updateOutput();
    })
})

equlas.addEventListener("click", ()  => {
    calc.compute();
    calc.updateOutput();
})

clear.addEventListener("click",() => {
    calc.clear();
    calc.updateOutput();
})

del.addEventListener("click",()=>{
    calc.del();
    calc.updateOutput(); 
})