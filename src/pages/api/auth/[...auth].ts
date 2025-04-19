import { NextApiRequest, NextApiResponse } from 'next';
import { login, signup } from '../../../lib/auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  try {
    switch (method) {
      case 'POST':
        const { action } = req.query;
        
        if (action === 'signup') {
          const { email, password, name } = req.body;
          const user = await signup({ email, password, name });
          return res.status(201).json(user);
        }
        
        if (action === 'login') {
          const { email, password } = req.body;
          const user = await login(email, password);
          return res.status(200).json(user);
        }
        
        return res.status(400).json({ message: 'Invalid action' });

      default:
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
} 