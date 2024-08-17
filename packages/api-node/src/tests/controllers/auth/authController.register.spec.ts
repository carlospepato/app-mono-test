import { describe, expect, it, vi } from "vitest";
import authController from "../../../controllers/authController";
import authService from "../../../services/authService";

describe("AuthController.register", () => {
  it("should return 400 if user already exists", async () => {
    vi.spyOn(authService, "register").mockResolvedValue({ message: "User already exists", user: { name: "John Doe", email: "john.doe@example.com" } })
    
    const mockRequest = {
      body: { email: "john.doe@example.com", password: "dialog" }
    } as any

    const mockReply = {
      code: vi.fn().mockReturnThis(),
      send: vi.fn()
    } as any

    await authController.register(mockRequest, mockReply)

    expect(mockReply.code).toHaveBeenCalledWith(400)
    expect(mockReply.send).toHaveBeenCalledWith({ message: "User already exists", user: { name: "John Doe", email: "john.doe@example.com" } })
    
  })

  it("should return 201 if user is created", async () => {
    vi.spyOn(authService, "register").mockResolvedValue({ user: { name: "John Doe", email: "john.doe@example.com" } })

    const mockRequest = {
      body: { email: "john.doe@example.com", password: "dialog" }
    } as any

    const mockReply = {
      code: vi.fn().mockReturnThis(),
      send: vi.fn()
    } as any

    await authController.register(mockRequest, mockReply)

    expect(mockReply.code).toHaveBeenCalledWith(201);
    expect(mockReply.send).toHaveBeenCalledWith({ message: "User created", user: { name: "John Doe", email: "john.doe@example.com" } })
  })
})