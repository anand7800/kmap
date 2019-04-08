

// var  x = {
//     a: "anand",
//     b: "yadav"
// }

// console.log("111",x.a,x.b,x.c);
// var k=123

// x['c'] = k;

// console.log(x.a,x.b,x.c)
// console.log(x);


// function* generator(){
//      [
//        yield {
//           "varianceKey": "color",
//           "varianceValue": [
//             {
//               "display": "red",
//               "value": "red"
//             },
//             {
//               "display": "blue",
//               "value": "blue"
//             }
//           ]
//         },
//        yield {
//           "varianceKey": "size",
//           "varianceValue": [
//             {
//               "display": "xl",
//               "value": "xl"
//             },{
//                 "display": "xl",
//                 "value": "xl"
//               }
//           ]
//         },
//        yield {
//           "varianceKey": "material",
//           "varianceValue": [
//             {
//               "display": "silk",
//               "value": "silk"
//             },
//             {
//               "display": "cotton",
//               "value": "cotton"
//             }
//           ]
//         }
//       ]
//     }
    
//     var z = [];
//     for( i=0;i<=1;i++){
//         var gen = generator();
//         var x = {};
//         for (var y of gen){
//             x[y.varianceKey]=y.varianceValue[i].value
//        //console.log(y.varianceValue[i].display)
//         }
//         z.push(x);
//     }
//     console.log(z);
//     // console.log(gen.next().value.varianceValue[0].value)
//     // console.log(gen.next().value.varianceValue[0].value)
//     // console.log(gen.next().value.varianceValue[0].value)




 
  // var pushh = [
  //   {
  //     "varianceKey": "color",
  //     "varianceValue": [{
  //         "display": "red",
  //         "value": "red"
  //       },
  //       {
  //         "display": "blue",
  //         "value": "blue"
  //       }
  //     ]
  //   }, {
  //     "varianceKey": "size",
  //     "varianceValue": [{
  //       "display": "xl",
  //       "value": "xl"
  //     }]
  //   }, {
  //     "varianceKey": "material",
  //     "varianceValue": [{
  //         "display": "silk",
  //         "value": "silk"
  //       },
  //       {
  //         "display": "cotton",
  //         "value": "cotton"
  //       },
  //       {
  //         "display": "cottffffon",
  //         "value": "cottffffon"
  //       }
  //     ]
  //   }
  //   ]

  //   let arr = [], pushObj= {}

  //   function processLoop(arrrr, pushObj, arr, i){
  //     arrrr.forEach(obj => {
  //       pushObj[pushh[i].varianceKey] = obj.value
  //       arr.push(pushObj)   
  //     })
  //     return arr
  //   }
  //   let arr11 = []
  //   pushh.forEach(( objj, i) => {
  //     arr11 = processLoop(objj.varianceValue, pushObj, arr, i)
      
  //   })
  //   console.log(arr11)
    
    
  //   // pushh[0].varianceValue.forEach(color => {
  //   //   pushh[1].varianceValue.forEach(size => {
  //   //     pushh[2].varianceValue.forEach(material => {
  //   //       let pushObj = {}
  //   //       pushObj[pushh[0].varianceKey] = color.value
  //   //       pushObj[pushh[1].varianceKey] = size.value
  //   //       pushObj[pushh[2].varianceKey] = material.value
  //   //       // let pushObj = {color: color.value, size: size.value, material: material.value}
  //   //       arr.push(pushObj)   
  //   //     })
  //   //   })
  //   // })

  //   console.log(arr)
    
    

  // var room = [
  //             {
  //               floor1:
  //               [
  //                 {block1 : [room1,room2,room5,room6]},
  //                 {block2 : [room3,room4,room7,room8]},
  //                 {block3 : [room9,room10,room13,room14]},
  //                 {block4 : [room11,room12,room15,room16]}
  //               ]
  //             },
  //             {
  //               floor2:
  //               [
  //                 {block5 : [room17,room18,room21,room22]},
  //                 {block6 : [room19,room20,room23,room24]},
  //                 {block7 : [room25,room26,room29,room30]},
  //                 {block8 : [room27,room28,room31,room32]}
  //               ]
  //             }

  // ]

//console.log(Math.floor(Math.random()*10e9));



/** DIAMOND PIRAMID */
// function main()
// {
//     var i, space, rows, k=0,x ="";

//    rows =5;

//     for(i=1; i<=rows; i++)
//     {k=0;
//         for(space=1; space<=rows-i; space++)
//         {
//             x+=" ";
//         }

//         while(k != 2*i-1)
//         {
//             x+="*";
//             ++k;
//         }

//         x+="\n";
//     }
    
//    console.log(x);
// }

// main();



/**TRIANGULAR PIRAMID */
// var x = "";
// for(var i = 0; i<4 ;i++){
//   for(var j=0; j<=i;j++){
//     x+="*";
//   }
//   x+="\n"
// }
// console.log(x);

