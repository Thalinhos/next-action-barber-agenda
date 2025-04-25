import { z } from 'zod';

/* ====== ENUMS ====== */
export const RoleEnum = z.enum(['CLIENT', 'ADMIN']);
export type Role = z.infer<typeof RoleEnum>;

export const BookingStatusEnum = z.enum(['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED']);
export type BookingStatus = z.infer<typeof BookingStatusEnum>;

/* ====== SCHEMAS ====== */

// Schema para User
export const UserSchema: any = z.object({
  id: z.string().uuid('ID deve ser um UUID válido'),
  email: z.string().email('Email inválido').min(1, 'Email é obrigatório'),
  name: z.string().min(1, 'Nome é obrigatório').max(255, 'Nome muito longo'),
  password: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres').optional(),
  role: RoleEnum.default('CLIENT'),
  createdAt: z.coerce.date().default(() => new Date()),
  updatedAt: z.coerce.date().default(() => new Date()),
  services: z.lazy(() => ServiceSchema.array()).optional(),
  bookings: z.lazy(() => BookingSchema.array()).optional(),
}).strict();

// Schema para Service
export const ServiceSchema: any = z.object({
  id: z.string().uuid('ID deve ser um UUID válido'),
  title: z.string().min(1, 'Título é obrigatório').max(255, 'Título muito longo'),
  description: z.string().min(1, 'Descrição é obrigatória'),
  price: z.number().min(0, 'Preço não pode ser negativo'),
  duration: z.number().int().min(1, 'Duração deve ser pelo menos 1 minuto'),
  providerId: z.string().uuid('ProviderId deve ser um UUID válido'),
  provider: z.lazy(() => UserSchema.optional()),
  bookings: z.lazy(() => BookingSchema.array().optional()),
  createdAt: z.coerce.date().default(() => new Date()),
  updatedAt: z.coerce.date().default(() => new Date()),
}).strict();

// Schema para Booking
export const BookingSchema: any = z.object({
  id: z.string().uuid('ID deve ser um UUID válido'),
  serviceId: z.string().uuid('ServiceId deve ser um UUID válido'),
  service: z.lazy(() => ServiceSchema.optional()),
  clientId: z.string().uuid('ClientId deve ser um UUID válido'),
  client: z.lazy(() => UserSchema.optional()),
  scheduledAt: z.coerce.date().min(new Date(), 'Agendamento deve ser no futuro'),
  status: BookingStatusEnum.default('PENDING'),
  createdAt: z.coerce.date().default(() => new Date()),
  updatedAt: z.coerce.date().default(() => new Date()),
}).strict();

/* ====== TYPES ====== */
export type User = z.infer<typeof UserSchema>;
export type Service = z.infer<typeof ServiceSchema>;
export type Booking = z.infer<typeof BookingSchema>;