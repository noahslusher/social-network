const { Schema, model, Types } = require('mongoose')
const dateFormat = require('../utils/dateFormat')
let validate = require('mongoose-validator')

var nameValidator = [
 validate ({
  validator: 'isLength',
  arguments: [1, 280],
  message: 'Thought text must be within 1 and 280 characters'
 })
]
const reactionSchema = new Schema (
 {
  reactionId: {
   type: Schema.Types.ObjectId,
   default: () => new Types.ObjectId()
  },
  reactionBody: {
   type: String,
   required: true,
   validate: nameValidator
  },
  username: {
   type: String,
   required: true
  },
  createdAt: {
   type: Date,
   default: Date.now,
   get: createdAtVal => dateFormat(createdAtVal)
 }
 },
 {
  toJSON: {
    getters: true
  }
}
)
const ThoughtSchema = new Schema (
 {
 thoughtText: {
  type: String,
  required: true,
  validate: nameValidator
 },
 createdAt: {
  type: Date,
  default: Date.now,
  get: createdAtVal => dateFormat(createdAtVal)
},
 username: {
  type: String,
  required: true
 },
 reactions: [reactionSchema]
},
{
 toJSON: {
  virtuals: true,
   getters: true
 }
}
)

ThoughtSchema.virtual('reactionCount').get(function() {
 return this.reactions.length
})