import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Eval {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;

  @Column('json')
  options: EvalOptions;
}

class EvalOptions {
  choices?: string[];
  maxRating?: number;
  placeholder?: string;
}

// import { z } from 'zod';

// // EvalOptions schema
// const EvalOptionsSchema = z.object({
//   type: z.enum(['multipleChoice', 'rating', 'textOnly']),
//   question: z.string().min(1, 'Question is required'),
//   choices: z.array(z.string()).optional(), // For multipleChoice
//   maxRating: z.number().int().positive().optional(), // For rating
//   placeholder: z.string().optional(), // For textOnly
// });

// export const RecipeSchema = z.object({
//   name: z.string().min(1, 'Recipe name is required'),
//   ingredients: z
//     .array(z.string().min(1, 'Ingredient cannot be empty'))
//     .min(1, 'At least one ingredient is required'),
// });

// // Eval schema
// export const EvalSchema = z.object({
//   username: z.string().min(1, 'Username is required'),
//   startTime: z
//     .string()
//     .refine((val) => !isNaN(Date.parse(val)), { message: 'Invalid date' }),
//   endTime: z
//     .string()
//     .refine((val) => !isNaN(Date.parse(val)), { message: 'Invalid date' }),
//   options: EvalOptionsSchema,
// });

// // Example: EvalForm.tsx
// import React from 'react';
// import { useForm, Controller } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { TextField, Select, MenuItem, Button } from '@mui/material';
// import { EvalSchema } from './eval.entity'; // import your Zod schema

// export default function EvalForm() {
//   const { control, handleSubmit, watch } = useForm({
//     resolver: zodResolver(EvalSchema),
//     defaultValues: {
//       username: '',
//       startTime: '',
//       endTime: '',
//       options: {
//         type: 'multipleChoice',
//         question: '',
//         choices: [],
//         maxRating: undefined,
//         placeholder: '',
//       },
//     },
//   });

//   const optionType = watch('options.type');

//   const onSubmit = (data) => {
//     console.log(data);
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <Controller
//         name="username"
//         control={control}
//         render={({ field, fieldState }) => (
//           <TextField
//             {...field}
//             label="Username"
//             error={!!fieldState.error}
//             helperText={fieldState.error?.message}
//             fullWidth
//             margin="normal"
//           />
//         )}
//       />

//       <Controller
//         name="startTime"
//         control={control}
//         render={({ field, fieldState }) => (
//           <TextField
//             {...field}
//             label="Start Time"
//             type="datetime-local"
//             error={!!fieldState.error}
//             helperText={fieldState.error?.message}
//             fullWidth
//             margin="normal"
//             InputLabelProps={{ shrink: true }}
//           />
//         )}
//       />

//       <Controller
//         name="endTime"
//         control={control}
//         render={({ field, fieldState }) => (
//           <TextField
//             {...field}
//             label="End Time"
//             type="datetime-local"
//             error={!!fieldState.error}
//             helperText={fieldState.error?.message}
//             fullWidth
//             margin="normal"
//             InputLabelProps={{ shrink: true }}
//           />
//         )}
//       />

//       <Controller
//         name="options.type"
//         control={control}
//         render={({ field }) => (
//           <Select {...field} label="Option Type" fullWidth margin="normal">
//             <MenuItem value="multipleChoice">Multiple Choice</MenuItem>
//             <MenuItem value="rating">Rating</MenuItem>
//             <MenuItem value="textOnly">Text Only</MenuItem>
//           </Select>
//         )}
//       />

//       <Controller
//         name="options.question"
//         control={control}
//         render={({ field, fieldState }) => (
//           <TextField
//             {...field}
//             label="Question"
//             error={!!fieldState.error}
//             helperText={fieldState.error?.message}
//             fullWidth
//             margin="normal"
//           />
//         )}
//       />

//       {optionType === 'multipleChoice' && (
//         <Controller
//           name="options.choices"
//           control={control}
//           render={({ field }) => (
//             <TextField
//               {...field}
//               label="Choices (comma separated)"
//               fullWidth
//               margin="normal"
//               onChange={e => field.onChange(e.target.value.split(','))}
//             />
//           )}
//         />
//       )}

//       {optionType === 'rating' && (
//         <Controller
//           name="options.maxRating"
//           control={control}
//           render={({ field, fieldState }) => (
//             <TextField
//               {...field}
//               label="Max Rating"
//               type="number"
//               error={!!fieldState.error}
//               helperText={fieldState.error?.message}
//               fullWidth
//               margin="normal"
//             />
//           )}
//         />
//       )}

//       {optionType === 'textOnly' && (
//         <Controller
//           name="options.placeholder"
//           control={control}
//           render={({ field }) => (
//             <TextField
//               {...field}
//               label="Placeholder"
//               fullWidth
//               margin="normal"
//             />
//           )}
//         />
//       )}

//       <Button type="submit" variant="contained" color="primary">
//         Submit
//       </Button>
//     </form>
//   );
// }

// import React from 'react';
// import { useForm, useFieldArray, Controller } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { TextField, Button, Box } from '@mui/material';
// import { RecipeSchema } from './eval.entity'; // adjust path as needed

// export default function RecipeForm() {
//   const { control, handleSubmit } = useForm({
//     resolver: zodResolver(RecipeSchema),
//     defaultValues: {
//       name: '',
//       ingredients: [''],
//     },
//   });

//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: 'ingredients',
//   });

//   const onSubmit = (data) => {
//     console.log(data);
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <Controller
//         name="name"
//         control={control}
//         render={({ field, fieldState }) => (
//           <TextField
//             {...field}
//             label="Recipe Name"
//             error={!!fieldState.error}
//             helperText={fieldState.error?.message}
//             fullWidth
//             margin="normal"
//           />
//         )}
//       />

//       <Box>
//         {fields.map((item, index) => (
//           <Box key={item.id} display="flex" alignItems="center" mb={1}>
//             <Controller
//               name={`ingredients.${index}`}
//               control={control}
//               render={({ field, fieldState }) => (
//                 <TextField
//                   {...field}
//                   label={`Ingredient ${index + 1}`}
//                   error={!!fieldState.error}
//                   helperText={fieldState.error?.message}
//                   fullWidth
//                   margin="normal"
//                 />
//               )}
//             />
//             <Button
//               type="button"
//               color="secondary"
//               onClick={() => remove(index)}
//               disabled={fields.length === 1}
//               style={{ marginLeft: 8 }}
//             >
//               Remove
//             </Button>
//           </Box>
//         ))}
//         <Button type="button" onClick={() => append('')}>
//           Add Ingredient
//         </Button>
//       </Box>

//       <Button type="submit" variant="contained" color="primary" style={{ marginTop: 16 }}>
//         Submit
//       </Button>
//     </form>
//   );
// }
