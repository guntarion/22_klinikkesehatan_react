import { z } from 'zod';

export const patientSchema = z.object({
  name: z.string().min(3, 'Nama harus minimal 3 karakter'),
  nik: z.string().length(16, 'NIK harus 16 digit'),
  dateOfBirth: z.string().min(1, 'Tanggal lahir harus diisi'),
  gender: z.enum(['L', 'P'], {
    required_error: 'Jenis kelamin harus dipilih',
  }),
  address: z.string().min(10, 'Alamat harus minimal 10 karakter'),
  phoneNumber: z.string().min(10, 'Nomor telepon harus minimal 10 digit'),
  email: z.string().email('Email tidak valid').optional().or(z.literal('')),
  bloodType: z.enum(['A', 'B', 'AB', 'O']).optional(),
  rhesus: z.enum(['+', '-']).optional(),
  allergies: z.string().optional(),
});
