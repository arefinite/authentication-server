import { connect } from "mongoose"

export const connectDB = async () => {
  try {
    await connect(process.env.DB_URI as string)
    console.log('Database connection established')
  } catch (err) {
    throw new Error(`Database connection error: ${err}`)
  }
}