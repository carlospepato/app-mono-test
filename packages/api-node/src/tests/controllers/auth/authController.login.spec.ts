import { describe, expect, it, vi } from "vitest"
import authService from "../../../services/authService"
import authController from "../../../controllers/authController"

describe("AuthController.login", () => {
  it("should return 400 if userLogin is null", async () => {

    vi.spyOn(authService, "login").mockResolvedValue(null)
    
    const mockRequest = {
      body: { email: "john.doe@example.com", password: "dialog" }
    } as any

    const mockReply = {
      code: vi.fn().mockReturnThis(),
      send: vi.fn()
    } as any

    await authController.login(mockRequest, mockReply)

    expect(mockReply.code).toHaveBeenCalledWith(400);
    expect(mockReply.send).toHaveBeenCalledWith({ message: "Wrong email or password" })
  })

  it('should return 400 if userLogin.user.name is empty', async () => {

    vi.spyOn(authService, 'login').mockResolvedValue({ user: { name: '', email: 'john.doe@example.com', id: 'dialog' } })

    const mockRequest = {
      body: { email: 'john.doe@example.com', password: 'dialog' }
    } as any

    const mockReply = {
      code: vi.fn().mockReturnThis(),
      send: vi.fn()
    } as any

    await authController.login(mockRequest, mockReply)

    expect(mockReply.code).toHaveBeenCalledWith(400)
    expect(mockReply.send).toHaveBeenCalledWith({ message: 'User not found' })
  })

  it('should return 200 with a token and user data on successful login', async () => {

    vi.spyOn(authService, 'login').mockResolvedValue({ user: { name: 'John Doe', email: 'john.doe@example.com', id: 'dialog' } })
    
    const mockRequest = {
      body: { email: 'john.doe@example.com', password: 'dialog' },
    } as any

    const mockReply = {
      code: vi.fn().mockReturnThis(),
      send: vi.fn(),
      jwtSign: vi.fn().mockResolvedValue('mockedToken')
    } as any

    await authController.login(mockRequest, mockReply)

    expect(mockReply.jwtSign).toHaveBeenCalledWith({}, { sign: { sub: 'dialog' } })
    expect(mockReply.code).toHaveBeenCalledWith(200)
    expect(mockReply.send).toHaveBeenCalledWith({
      message: 'User logged in',
      token: 'mockedToken',
      user: {
        name: 'John Doe',
        email: 'john.doe@example.com',
      }
    })
  })
})