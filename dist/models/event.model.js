import mongoose, { Schema } from "mongoose";
import { EventType } from "../types/event.types.js";
const EventSchema = new Schema({
    eventType: { type: String, enum: Object.values(EventType), required: true },
    userId: { type: String, required: true },
    dealId: { type: String },
    queryText: { type: String },
    brandSlug: { type: String },
    source: { type: String },
    sessionId: { type: String },
    dwellTime: { type: Number },
    scoreDelta: { type: Number },
    url: { type: String },
    processed: { type: Boolean, default: false, index: true },
    timestamp: { type: Date, default: Date.now },
});
export const EventModel = mongoose.model("Event", EventSchema);
