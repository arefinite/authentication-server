import { app } from './api/app'
import { connectDB } from './config/db'


const PORT = (process.env.PORT || 5000) as number

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
  connectDB()
})
