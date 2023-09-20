import { Schema, model, models } from "mongoose";

const PromptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  prompt: {
    type: String,
    required: [true, '提示是必须的!']
  },
  tag: {
    type: String,
    required: [true, '标签是必须的!']
  },
})

const Prompt = models.Prompt || model('Prompt', PromptSchema)
export default Prompt