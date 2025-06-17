// src/lib/api.ts
import axios from 'axios'
import Cookies from 'js-cookie'
import { Product, User, Order, Review, ProductFilters, Address } from '@/types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

// API Request/Response Types
export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
  name: string
}

export interface UpdateProfileData {
  name?: string
  email?: string
  phone?: string
  address?: Address
}

export interface CreateProductData {
  name: string
  description: string
  price: number
  category: string
  stock: number
  images: string[]
}

export interface UpdateProductData extends Partial<CreateProductData> {}

export interface CreateOrderData {
  items: Array<{
    productId: string
    quantity: number
    price: number
  }>
  shippingAddress: Address
  billingAddress: Address
  paymentMethod: string
}

export interface CreateReviewData {
  productId: string
  rating: number
  comment: string
}

export interface ProductQueryParams extends ProductFilters {
  page?: number
  limit?: number
}

// Create axios instance
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      Cookies.remove('token')
      window.location.href = '/auth/login'
    }
    return Promise.reject(error)
  }
)

// API endpoints
export const authAPI = {
  login: (credentials: LoginCredentials) =>
    api.post('/auth/login', credentials),
  
  register: (userData: RegisterData) =>
    api.post('/auth/register', userData),
  
  getProfile: () => api.get('/auth/profile'),
  
  updateProfile: (data: UpdateProfileData) => api.put('/auth/profile', data),
}

export const productsAPI = {
  getAll: (params?: ProductQueryParams) => api.get('/products', { params }),
  
  getById: (id: string) => api.get(`/products/${id}`),
  
  create: (productData: CreateProductData) => api.post('/products', productData),
  
  update: (id: string, productData: UpdateProductData) => 
    api.put(`/products/${id}`, productData),
  
  delete: (id: string) => api.delete(`/products/${id}`),
  
  search: (query: string, filters?: ProductFilters) =>
    api.get('/products/search', { params: { q: query, ...filters } }),
}

export const cartAPI = {
  get: () => api.get('/cart'),
  
  add: (productId: string, quantity: number) =>
    api.post('/cart', { productId, quantity }),
  
  update: (itemId: string, quantity: number) =>
    api.put(`/cart/${itemId}`, { quantity }),
  
  remove: (itemId: string) => api.delete(`/cart/${itemId}`),
  
  clear: () => api.delete('/cart'),
}

export const ordersAPI = {
  create: (orderData: CreateOrderData) => api.post('/orders', orderData),
  
  getAll: () => api.get('/orders'),
  
  getById: (id: string) => api.get(`/orders/${id}`),
  
  updateStatus: (id: string, status: Order['status']) =>
    api.put(`/orders/${id}/status`, { status }),
}

export const reviewsAPI = {
  getByProduct: (productId: string) => api.get(`/reviews/product/${productId}`),
  
  create: (reviewData: CreateReviewData) => api.post('/reviews', reviewData),
  
  update: (id: string, reviewData: Partial<CreateReviewData>) => 
    api.put(`/reviews/${id}`, reviewData),
  
  delete: (id: string) => api.delete(`/reviews/${id}`),
}

export default api