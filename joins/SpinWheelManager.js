async function getRandomOffer() {
  try {
    // Get all active offers
    const offers = await getActiveOffers();
    
    // Calculate total probability
    const totalProbability = offers.reduce((sum, offer) => 
      sum + parseFloat(offer.probability_percentage), 0);

    // Generate random number between 0 and total probability
    const randomNum = Math.random() * totalProbability;
    
    // Initialize accumulator
    let accumulatedProbability = 0;
    
    // Find the winning offer based on probability ranges
    for (const offer of offers) {
      accumulatedProbability += parseFloat(offer.probability_percentage);
      if (randomNum <= accumulatedProbability) {
        return offer;
      }
    }

    // Fallback return first offer if something goes wrong
    return offers[0];
    
  } catch (error) {
    console.error('Error getting random offer:', error.message);
    throw error;
  }
}
