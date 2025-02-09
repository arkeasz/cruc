import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ["pending", "in-progress", "completed"],
        default: "pending"
    },
    priority: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "medium"
    },
    dueDate: {
        type: Date,
        default: null
    },
    tags: {
        type: [String],
        default: []
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

TaskSchema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
});

TaskSchema.pre("findOneAndUpdate", function (next) {
    this.set({ updatedAt: Date.now() });
    next();
});

const Task = mongoose.model("Task", TaskSchema);
export default Task;
