import { z } from "zod";

const schema = z.object({
  personal: z.object({
    firstName: z.string().min(2),
  }),
  security: z.object({
    password: z.string().min(6),
  })
});

const securitySchema = schema.pick({ security: true });

const data = {
  personal: { firstName: "A" },
  security: { password: "123" }
};

const result = securitySchema.safeParse(data);
if (!result.success) {
  console.log(JSON.stringify(result.error.issues.map(i => i.path), null, 2));
} else {
  console.log("Success");
}
