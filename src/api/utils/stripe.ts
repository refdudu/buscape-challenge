import { Stripe } from "stripe";

export const stripe = new Stripe(
    "sk_test_51NvpPEAPGbqWjK7MnFZA07bHtxANr5gfdvteFRJT6Ve5j8OQqwXQEYaZxpeEtqZ1BKJeK0GRe9OJNlnnCIBMkEZe00u51duQgQ",
    {
        apiVersion: "2023-08-16",
        typescript: true
    }
);
