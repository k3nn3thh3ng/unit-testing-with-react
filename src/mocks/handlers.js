import { rest } from "msw";

export const handlers = [
  rest.get("http://localhost:3030/scoops", (_, res, ctx) => {
    return res(
      ctx.json([
        {
          name: "Chocolate",
          imagePath: "/images/chocolate.png",
        },
        {
          name: "Vanilla",
          imagePath: "/images/vanilla.png",
        },
      ])
    );
  }),
  rest.get("http://localhost:3030/toppings", (_, res, ctx) => {
    return res(
      ctx.json([
        {
          name: "Biscoff",
          imagePath: "/images/biscoff_topping.png",
        },
        {
          name: "Rocher",
          imagePath: "/images/rocher_topping.png",
        },
        {
          name: "Chocolate",
          imagePath: "/images/chocolate_topping.png",
        },
      ])
    );
  }),
  rest.post("http://localhost:3030/orders", (_, res, ctx) => {
    const randomNumber = Math.floor(Math.random() * 1000000);
    return res(
      ctx.json({
        orderId: randomNumber,
      })
    );
  }),
];
