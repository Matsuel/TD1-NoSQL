import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    company: { type: String, required: true },
    dates: { type: String, required: true },
    description: { type: String, required: true }
});

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    experience: { type: [experienceSchema], default: [] },
    skills: { type: [String], default: [] },
    information: {
        type: {
            bio: { type: String, default: "" },
            location: { type: String, default: "" },
            website: { type: String, default: "" }
        },
        default: {},
        _id: false
    },
    friends: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        required: false,
    },
    isDeleted: { type: Boolean, default: false },
});

export const User = mongoose.model("User", userSchema);
