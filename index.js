// // // let query='a=1&b=2&c=3';
// // // let arrayQuery=query.split("&")

// // // let result={}
// // // for(let i=0;i<arrayQuery.length;i++){
// // //     result[arrayQuery[i][0]]=arrayQuery[i][2]
// // // }

// // // let string=[]
// // // for(key in result){
// // //    string.push(`${key}=${result[key]}`)
// // // }
// // // console.log(string.join("&"))

// // class Linkedlist {
// //   constructor(data, next) {
// //     this.data = data;
// //     this.next = next;
// //   }
// //   append(data) {
// //     console.log(this)
// //     let temp = this.next;
// //     while (temp.next != null) {
// //       temp = this.next;
// //     }
// //     console.log(temp)
// //   }
// // }

// // const node = new Linkedlist(10, null);
// // console.log(node);
// // node.append(10)


// class Stack{
//     constructor(){
//         this.data=[]
//     }
//     push(data){
//         this.data[this.data.length]=data
//         return 
//     }
//     pop(){
//         let temp=this.data[this.data.length-1]
//         this.data.length=this.data.length-1
//         return temp
//     }
//     display(){
//         console.log(this.data)
//     }
//     peek(){
//         return this.data[this.data.length-]
//     }

// }
// const stack=new Stack()

// stack.push(10)
// stack.push(13)
// // console.log(stack.pop())
// stack.display()
// stack.push(30)
// stack.display()


//stack using 2 queue

class Stack{
    constructor(){
        this.q1=[];
        this.q2=[];
    }
    push(data){
        this.q1[this.q1.length]=data
        return this.q1
    }

    pop(){
        
    }
}

const stack=new Stack()

console.log(stack.push(10))
console.log(stack.push(12))
console.log(stack.push(13))

