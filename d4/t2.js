/*

For added security, yet another system policy has been put in place. Now, a valid passphrase must contain no two words that are anagrams of each other - that is, a passphrase is invalid if any word's letters can be rearranged to form any other word in the passphrase.

For example:

abcde fghij is a valid passphrase.
abcde xyz ecdab is not valid - the letters from the third word can be rearranged to form the first word.
a ab abc abd abf abj is a valid passphrase, because all letters need to be used when forming another word.
iiii oiii ooii oooi oooo is valid.
oiii ioii iioi iiio is not valid - any of these words can be rearranged to form any other word.
Under this new system policy, how many passphrases are valid?

*/

function solution(phrases) {
	phrases = str.split("\n");

	function checkPhrase(phrase) {
		phrase = phrase.split(" ").map(function(word) {
			return word.split("").sort().join("");
		}).sort();

		console.log(phrase);

		for (var i = 1; i < phrase.length; i++) {
			if (phrase[i-1] == phrase[i]) return false;
		}
		return true;
	}

	return phrases.filter(checkPhrase).length;
}

console.log(solution(str));