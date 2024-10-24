// Config Register
export const MIN_PASSWORD = 6;
export const AVATAR_GENERATOR = 'https://api.dicebear.com/9.x/identicon/svg?seed='
export const USED_EMAIL = { message: 'Email sudah terdaftar' };
export const REQUIRED_FIELD = { message: 'Email, password, and name are required' };
export const PASSWORD_LENGTH = (MIN_PASSWORD: number) => { return { message: `Password minimal ${MIN_PASSWORD} karakter` } }
export const REGISTERED = { message: 'User berhasil didaftarkan' }



// Config Login
export const LOGGED = (token: string) => { return { message: 'Berhasil masuk', token } }
export const INVALID = { message: 'Periksa kembali email atau password Anda!' }

// Config Profile
export const UNAUTHORIZED = { message: 'Anda tidak memiliki akses!' }

export const SERVER_ERROR = { message: 'Terjadi kesalahan pada server, coba kembali beberapa saat lagi' }