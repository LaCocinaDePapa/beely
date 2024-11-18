import pkg from 'pg'
import { config } from 'dotenv'

config()

const { Pool } = pkg

const pool = new Pool({
  connectionString: process.env.PSQL
})

export const connectDB = async () => {
  let client
  try {
    client = await pool.connect()
    console.log('connected')
    client.release()
  } catch (error) {
    console.error(error)
    return error.message
  }
}

export default pool
