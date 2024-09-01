const employeeIds = ["1234567890", "0987654321", "1111111111", "2222222222"];

export const verifyID = async (req, res) => {
  const { id } = req.body;

  // Validate input
  if (!id || typeof id !== "string") {
    return res
      .status(400)
      .json({ message: "Invalid ID format. ID must be a non-empty string." });
  }

  try {
    // Check if ID exists in the list
    if (employeeIds.includes(id.trim())) {
      return res.status(200).json({ message: "ID Verified" });
    } else {
      return res.status(404).json({ message: "ID not found" });
    }
  } catch (error) {
    console.error("Error during ID verification:", error);
    return res
      .status(500)
      .json({ message: "Internal server error. ID verification failed." });
  }
};
