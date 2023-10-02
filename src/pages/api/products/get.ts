// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { stripe } from "@/api/utils/stripe";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    return main(req, res);
}
const main = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;
    if (method !== "GET") return res.status(405).send("");

    const { data: products } = await stripe.products.list({
        active: true,
        expand: ["data.price"]
    });

    return res.status(200).json({ products });
};
