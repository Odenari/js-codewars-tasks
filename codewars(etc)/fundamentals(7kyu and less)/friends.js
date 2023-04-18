
// Make a program that filters a list of strings and returns
// A list with only your friends name in it.
// If a name has exactly 4 letters in it,
// You can be sure that it has to be a friend of yours! 
// Otherwise, you can be sure he's not...

const friends = ['Ryan', 'Kieran', 'Mark'];

function friend(friends) {
	return friends.filter(friendName => friendName.length === 4);
}
const myFriends = friend(friends);
console.log(myFriends);