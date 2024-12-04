const connectDB = require("../config/db.js");

class UserModel {
  static async connectDB() {
    const db = await connectDB();
    return db.collection("users");
  }

  static async createUser(user) {
    const collection = await this.connectDB;
    return collection.insertOne(user);
  }

  static async getUserById(id) {
    const collection = await this.connectDB();
    return collection.findOne({ _id: new ObjectId(id) });
  }

  static async deleteUser(id) {
    const collection = await this.connectDb();
    return collection.deleteOne({ _id: new ObjectId(id) });
  }
}

module.exports = UserModel;
