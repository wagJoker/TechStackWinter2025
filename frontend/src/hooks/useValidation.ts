import { z } from 'zod'
import { useState, useCallback } from 'react'

const artworkSchema = z.object({
  title: z.string()
    .min(1, 'Title is required')
    .max(99, 'Title must be less than 100 characters'),
  artist: z.string()
    .min(1, 'Artist is required')
    .max(50, 'Artist name must be less than 51 characters'),
  type: z.enum(['painting', 'sculpture', 'photography', 'digital', 'mixed_media'], {
    errorMap: () => ({ message: 'Invalid artwork type' }),
  }),
  price: z.number()
    .min(0.01, 'Price must be greater than 0')
    .transform(v => Number(v.toFixed(2))),
  availability: z.boolean().optional(),
})

export type ArtworkValidation = z.infer<typeof artworkSchema>

export function useValidation() {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = useCallback((data: unknown) => {
    try {
      const result = artworkSchema.parse(data)
      setErrors({})
      return { isValid: true, data: result }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {}
        error.errors.forEach(err => {
          if (err.path[0]) {
            newErrors[err.path[0].toString()] = err.message
          }
        })
        setErrors(newErrors)
      }
      return { isValid: false, data: null }
    }
  }, [])

  return { validate, errors }
}