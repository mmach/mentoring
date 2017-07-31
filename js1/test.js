module.exports= ()=>{
    return {
    calculate : (state,extraOperation=null)=>{
        const stack =[];
        let operation={
        sum : (b,a)=>{return Number(a)+Number(b);},
        diff : (b,a)=>{return Number(a)-Number(b);},
        mul : (b,a)=>{ return Number(a)*Number(b);}
        };
        if(extraOperation!=null)
        {
            operation = Object.assign(operation,{ extra : extraOperation});
            console.log(operation);
        }
        return state.split(' ').reduce((prev,item)=>{
            if(/[1-9]/.test(item)){
                stack.push(item);
                return 0 ;
            }else
            {
                let result=0;
                switch(item)
                {
                    case '+': result=operation.sum(stack.pop(),stack.pop());break;
                    case '-' :result=operation.diff(stack.pop(),stack.pop());break;
                    case '*': result= operation.mul(stack.pop(),stack.pop());break;
                    default:result = operation.extra(stack.pop(),stack.pop(),item);
                }
                stack.push(result);    
                return result;
            }
        },stack)
          },
        extraOperation :  (a,b,operation)=>{ return eval(`${b} ${operation} ${a}`); }
 
}};

