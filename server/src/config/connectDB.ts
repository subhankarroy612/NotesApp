import { config } from "dotenv"
import { connect } from "mongoose"
config()

export default function connectDB () {
    return connect(process.env.URL)
}