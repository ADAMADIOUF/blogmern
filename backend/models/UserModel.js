import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const { Schema } = mongoose // Import Schema from mongoose

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    resetPasswordToken: {
      type:String
    },
    resetPasswordExpire:{
      type:Date
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    secret: { type: String, required: true },
    about: { type: String },
    photo: {
      type: String,
    },
    following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },

  {
    timestamps: true,
  }
)

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User
