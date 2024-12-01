import levenshtein from "js-levenshtein";

// Function to find nearest match with array of objects
function findNearestMatch(array, searchTerm, property) {
	if (typeof searchTerm !== "string") {
		console.error("Search term is not a valid string.");
		return { match: null, similarity: "0%" };
	}

	let closestMatch = null;
	let minDistance = Infinity;

	array.forEach((item) => {
		if (item[property] && typeof item[property] === "string") {
			const distance = levenshtein(searchTerm, item[property]);
			// console.log(searchTerm, item[property])
			// console.log(`Comparing "${searchTerm}" with "${item[property]}" - Distance: ${distance}`);

			if (distance < minDistance) {
				minDistance = distance;
				closestMatch = item;
			}
		}
	});

	// Check if a match was found
	if (closestMatch === null) {
		return { match: null, similarity: "0%" }; // No match found
	}

	// Calculate the similarity percentage
	const maxLength = Math.max(
		searchTerm.length,
		closestMatch[property].length
	);
	const similarityPercent = ((maxLength - minDistance) / maxLength) * 100;

	return {
		match: closestMatch,
		similarity: similarityPercent.toFixed(2) + "%",
	};
}

export { findNearestMatch };
