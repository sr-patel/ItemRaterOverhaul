document.addEventListener('DOMContentLoaded', function () {
    // Function to calculate the result and rating
    function calculateResultAndRating(criticalRate, criticalDamage) {
        const total = criticalRate * 2 + criticalDamage;
        let rating = "";
        let textColor = "";

        if (total > 40) {
            rating = "Perfect Quality";
            textColor = "darkgreen"; // Set text color to darkgreen for "Perfect Quality"
        } else if (total > 30) {
            rating = "High Quality";
            textColor = "green"; // Set text color to green for "High Quality"
        } else if (total > 20) {
            rating = "Acceptable";
            textColor = "goldenrod"; // Set text color to goldenrod for "Acceptable"
        } else if (total > 10) {
            rating = "Low Quality";
            textColor = "orange"; // Set text color to orange for "Low Quality"
        } else {
            rating = "Useless";
            textColor = "red"; // Set text color to red for "Useless"
        }

        return { total, rating, textColor };
    }

    // Calculate and display results for each calculator
    for (let i = 1; i <= 5; i++) {
        const criticalRateInput = document.getElementById(`criticalRate${i}`);
        const criticalDamageInput = document.getElementById(`criticalDamage${i}`);
        const outputElement = document.getElementById(`output${i}`);

        function updateOutput() {
            const criticalRate = parseFloat(criticalRateInput.value);
            const criticalDamage = parseFloat(criticalDamageInput.value);

            const { total, rating, textColor } = calculateResultAndRating(criticalRate, criticalDamage);

            // For the last calculator (Calculator 5), divide the output by 2
            outputElement.textContent = `Result: ${i === 5 ? (total / 2).toFixed(2) : total.toFixed(2)} - ${rating}`;
            outputElement.style.color = textColor; // Set text color dynamically
        }

        criticalRateInput.addEventListener('input', updateOutput);
        criticalDamageInput.addEventListener('input', updateOutput);
    }

    // Calculate and display the overall average when the "Calculate Average" button is clicked
    const calculateAverageButton = document.getElementById('calculateAverageButton');
    const averageResultElement = document.getElementById('averageResult');
    const logList = document.getElementById('log-list');
    const logButton = document.getElementById('logButton');
    const customStringInput = document.getElementById('customString'); // Add this line

    calculateAverageButton.addEventListener('click', function () {
        let totalSum = 0;

        for (let i = 1; i <= 5; i++) {
            const total = parseFloat(document.getElementById(`output${i}`).textContent.split(" ")[1]);
            // For the last calculator (Calculator 5), divide the value by 2
            totalSum += i === 5 ? total / 2 : total;
        }

        const average = totalSum / 5;

        let rating = "";
        let textColor = "";

        if (average > 40) {
            rating = "Perfect Quality";
            textColor = "darkgreen"; // Set text color to darkgreen for "Perfect Quality"
        } else if (average > 30) {
            rating = "High Quality";
            textColor = "green"; // Set text color to green for "High Quality"
        } else if (average > 20) {
            rating = "Acceptable";
            textColor = "goldenrod"; // Set text color to goldenrod for "Acceptable"
        } else if (average > 10) {
            rating = "Low Quality";
            textColor = "orange"; // Set text color to orange for "Low Quality"
        } else {
            rating = "Useless";
            textColor = "red"; // Set text color to red for "Useless"
        }

        // Use the custom string input or default to "Average Result:"
        const customString = customStringInput.value || "Average Result";
        averageResultElement.textContent = `${customString}: ${average.toFixed(2)} - ${rating}`;
        averageResultElement.style.color = textColor; // Set text color dynamically

        // Do not log the result when the average button is clicked
    });

    // Add an event listener to the log button to log the result
    logButton.addEventListener('click', function () {
        const averageResultText = averageResultElement.textContent;
        const textColor = averageResultElement.style.color; // Get text color from the displayed result
        const logEntry = document.createElement('li');
        logEntry.textContent = averageResultText;
        logEntry.style.color = textColor; // Set text color for the log entry
        logList.appendChild(logEntry);
    });
});
