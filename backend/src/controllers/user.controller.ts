/* eslint-disable camelcase */
import User from '../services/user.service'


export const register = async (req: any, res: any) => {

  const { name, email, password } = req.body

  try {
    const user = await User.create(name, email, password)
    return user
  }
  
  catch (error) {
    return res.status(500).json({ error })
  }

}
