import z from 'zod'

export const paginationSchema = z.object({
  page:z.coerce.number().positive({ message: "Invalid page number" }),
  limit: z.coerce.number().positive({ message: "Invalid limit number" }),
  search:z.string({error:"enter a string"}).optional().default("")
})
