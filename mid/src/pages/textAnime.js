// import React,{useState} from 'react'
// import Texty from 'rc-texty';
// import 'rc-texty/assets/index.css';
// import TweenOne from 'rc-tween-one';
// import Button from 'antd/lib/button';
//
// const [show,setShow] = useState('true');
// export default function textAnime() {
//
//
// }
//
// function geInterval(e) {
//     switch (e.index) {
//         case 0:
//             return 0;
//         case 1:
//             return 150;
//         case 2:
//         case 3:
//         case 4:
//         case 5:
//         case 6:
//             return 150 + 450 + (e.index - 2) * 10;
//         default:
//             return 150 + 450 + (e.index - 6) * 150;
//     }
// }
// function getEnter(e){
//     const t = {
//         opacity: 0,
//         scale: 0.8,
//         y: '-100%',
//     };
//     if (e.index >= 2 && e.index <= 6) {
//         return { ...t, y: '-30%', duration: 150 };
//     }
//     return t;
// }
// function getSplit(e){
//     const t = e.split(' ');
//     const c = [];
//     t.forEach((str, i) => {
//         c.push((
//             <span key={`${str}-${i}`}>
//           {str}
//         </span>
//         ));
//         if (i < t.length - 1) {
//             c.push(<span key={` -${i}`}> </span>);
//         }
//     });
//     return c;
// }
//
// function onClick(){
//     setShow('false');
//     this.setState({
//         show: false,
//     }, () => {
//         this.setState({
//             show: true
//         });
//     });
// }
