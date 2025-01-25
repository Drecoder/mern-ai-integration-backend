const Application = require('../models/Application'); // Import the Application model

// Handle the application submission
exports.submitApplication = async (req, res) => {
    const { serialNumber } = req.params; // Extract job serial number from URL
    const applicationData = req.body;    // Get the application data from the request body
    
    try {
        // Create a new application object with the provided data and job serial number
        const application = new Application({
            ...applicationData, // Spread the body data into the application object
            serialNumber,       // Add the job serial number to the application data
        });

        // Save the application to MongoDB
        await application.save();

        // Respond with a success message and the saved application data
        res.status(201).send({
            message: "Application submitted successfully",
            application,
        });
    } catch (error) {
        console.error("Error submitting application:", error);
        // Respond with an error if something goes wrong
        res.status(500).send({
            error: "Failed to submit application. Please try again later.",
        });
    }
};
