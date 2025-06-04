const userModel = require("../models/user.model.js")

module.exports.createUser = async({
    fullName, email, password
}) => {
    try {
        if (!fullName.firstName || !email || !password) {
            throw new Error("All fields are required");
        }
        console.log("🛠 Creating user with:", { fullName, email });
    
        const user = await userModel.create({
          fullName,
          email,
          password
        });
    
        console.log("✅ Mongoose created user:", user);
        return user;
      } catch (error) {
        console.error("🔥 Error in createUser:", error);
        throw error;
      }
}