// pages/api/price.js
export default function handler(req:any, res:any) {
  if (req.method === 'POST') {
      const { price, sl } = req.body;
      // Process the received data (e.g., store in a database)
      res.status(200).json({ message: `price : ${price} sl : ${sl} Data received successfully.`,
    
       });
  } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
