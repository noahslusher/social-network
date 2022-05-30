const { Schema, model, Types } = require('mongoose')
const dateFormat = require('../utils/dateFormat')
let validate = require('mongoose-validator')


const reactionSchema = new Schema (
 {
  reactionId: {
   type: Schema.Types.ObjectId,
   default: () => new Types.ObjectId()
  },
  reactionBody: {
   type: String,
   required: true,
   maxlength: 280
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
  minLength: 1,
  maxLength: 280
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
 },
 id: false
}
)

ThoughtSchema.virtual('reactionCount').get(function() {
 return this.reactions.length
})

const Thought = model('Thought', ThoughtSchema)

module.exports = Thought