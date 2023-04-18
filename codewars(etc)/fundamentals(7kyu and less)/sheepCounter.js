// function countSheeps(arrayOfSheep) {
// 	// TODO May the force be with you
// 	let counter = 0;
// 	for (let sheep of arrayOfSheep) {
// 		if(!sheep) {
// 			continue;
// 		}
// 		if(sheep) {
// 			counter++;
// 		}
// 	}
// 	return counter;
// }


const sheeps = [true, true, false, null, [true, true, [true, false], false], undefined];
function counterSheepsRec(sheepsArray) {
	return sheepsArray ? sheepsArray.filter(sheep => sheep === true).length : 'Erorr';
}
const res = counterSheepsRec(sheeps);
console.log(res);